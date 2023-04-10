// contracts/TokenVesting.sol
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "solmate/src/utils/SafeTransferLib.sol";

/**
 * @title TokenVesting
 * @author Aperture Finance
 */
contract TokenVesting is Ownable {
    using SafeTransferLib for ERC20;

    struct VestingSchedule {
        // first slot
        // whether or not the vesting schedule has been initialized
        bool initialized;
        // whether or not the vesting is revocable
        bool revocable;
        // whether or not the vesting has been revoked
        bool revoked;
        // beneficiary of tokens after they are released
        address beneficiary;
        // cliff in seconds, latest year 2106
        uint32 cliff;
        // start time of the vesting period, latest year 2106
        uint32 start;
        // second slot
        // duration of the vesting period in seconds, max 136 years
        uint32 duration;
        // total amount of tokens to be released at the end of the vesting
        uint112 amountTotal;
        // amount of tokens released
        uint112 released;
    }

    // address of the ERC20 token
    ERC20 private immutable _token;

    bytes32[] private vestingSchedulesIds;
    mapping(bytes32 => VestingSchedule) private vestingSchedules;
    uint256 private vestingSchedulesTotalAmount;
    mapping(address => uint256) private holdersVestingCount;

    event Released(uint256 amount);
    event Revoked();

    /**
     * @dev Reverts if no vesting schedule matches the passed identifier.
     */
    modifier onlyIfVestingScheduleExists(bytes32 vestingScheduleId) {
        require(vestingSchedules[vestingScheduleId].initialized == true);
        _;
    }

    /**
     * @dev Reverts if the vesting schedule does not exist or has been revoked.
     */
    modifier onlyIfVestingScheduleNotRevoked(bytes32 vestingScheduleId) {
        require(vestingSchedules[vestingScheduleId].initialized == true);
        require(vestingSchedules[vestingScheduleId].revoked == false);
        _;
    }

    /**
     * @dev Creates a vesting contract.
     * @param token_ address of the ERC20 token contract
     */
    constructor(address token_) {
        require(token_ != address(0x0));
        _token = ERC20(token_);
    }

    /************************************************
     *  GETTERS
     ***********************************************/

    function getCurrentTime() internal view virtual returns (uint256) {
        return block.timestamp;
    }

    /**
     * @dev Returns the address of the ERC20 token managed by the vesting contract.
     */
    function getToken() external view returns (address) {
        return address(_token);
    }

    /**
     * @dev Returns the vesting schedule id at the given index.
     * @return the vesting id
     */
    function getVestingIdAtIndex(
        uint256 index
    ) external view returns (bytes32) {
        require(index < vestingSchedulesIds.length, "index out of bounds");
        return vestingSchedulesIds[index];
    }

    /**
     * @notice Returns the vesting schedule information for a given identifier.
     * @return the vesting schedule structure information
     */
    function getVestingSchedule(
        bytes32 vestingScheduleId
    ) public view returns (VestingSchedule memory) {
        return vestingSchedules[vestingScheduleId];
    }

    /**
     * @dev Returns the number of vesting schedules managed by this contract.
     * @return the number of vesting schedules
     */
    function getVestingSchedulesCount() external view returns (uint256) {
        return vestingSchedulesIds.length;
    }

    /**
     * @notice Returns the total amount of vesting schedules.
     * @return the total amount of vesting schedules
     */
    function getVestingSchedulesTotalAmount() external view returns (uint256) {
        return vestingSchedulesTotalAmount;
    }

    /**
     * @dev Returns the number of vesting schedules associated to a beneficiary.
     * @return the number of vesting schedules
     */
    function getVestingSchedulesCountByBeneficiary(
        address _beneficiary
    ) external view returns (uint256) {
        return holdersVestingCount[_beneficiary];
    }

    /**
     * @notice Returns the vesting schedule information for a given holder and index.
     * @return the vesting schedule structure information
     */
    function getVestingScheduleByAddressAndIndex(
        address holder,
        uint256 index
    ) external view returns (VestingSchedule memory) {
        return
            getVestingSchedule(
                computeVestingScheduleIdForAddressAndIndex(holder, index)
            );
    }

    /**
     * @dev Returns the last vesting schedule for a given holder address.
     */
    function getLastVestingScheduleForHolder(
        address holder
    ) external view returns (VestingSchedule memory) {
        uint256 count = holdersVestingCount[holder];
        require(count != 0, "!vesting");
        unchecked {
            return
                vestingSchedules[
                    computeVestingScheduleIdForAddressAndIndex(
                        holder,
                        count - 1
                    )
                ];
        }
    }

    /**
     * @dev Returns the amount of tokens that can be withdrawn by the owner.
     * @return the amount of tokens
     */
    function getWithdrawableAmount() public view returns (uint256) {
        return _token.balanceOf(address(this)) - vestingSchedulesTotalAmount;
    }

    /**
     * @notice Computes the vested amount of tokens for the given vesting schedule identifier.
     * @return the vested amount
     */
    function computeReleasableAmount(
        bytes32 vestingScheduleId
    )
        external
        view
        onlyIfVestingScheduleNotRevoked(vestingScheduleId)
        returns (uint256)
    {
        return _computeReleasableAmount(vestingSchedules[vestingScheduleId]);
    }

    /**
     * @dev Computes the vesting schedule identifier for an address and an index.
     */
    function computeVestingScheduleIdForAddressAndIndex(
        address holder,
        uint256 index
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(holder, index));
    }

    /**
     * @dev Computes the next vesting schedule identifier for a given holder address.
     */
    function computeNextVestingScheduleIdForHolder(
        address holder
    ) public view returns (bytes32) {
        return
            computeVestingScheduleIdForAddressAndIndex(
                holder,
                holdersVestingCount[holder]
            );
    }

    /**
     * @dev Computes the releasable amount of tokens for a vesting schedule.
     * @return the amount of releasable tokens
     */
    function _computeReleasableAmount(
        VestingSchedule storage vestingSchedule
    ) internal view returns (uint112) {
        uint256 currentTime = getCurrentTime();
        unchecked {
            if (
                (currentTime < vestingSchedule.cliff) ||
                vestingSchedule.revoked == true
            ) {
                return 0;
            } else if (
                currentTime >= vestingSchedule.start + vestingSchedule.duration
            ) {
                return vestingSchedule.amountTotal - vestingSchedule.released;
            } else {
                // start + duration > currentTime >= cliff >= start
                uint256 timeFromStart = currentTime - vestingSchedule.start;
                // duration > timeFromStart >= 0
                // uint112 * uint32 < uint256, cannot overflow
                uint256 vestedAmount = (vestingSchedule.amountTotal *
                    timeFromStart) / vestingSchedule.duration;
                return uint112(vestedAmount) - vestingSchedule.released;
            }
        }
    }

    /**
     * @notice Creates a new vesting schedule for a beneficiary.
     * @param _beneficiary address of the beneficiary to whom vested tokens are transferred
     * @param _start start time of the vesting period
     * @param _cliff duration in seconds of the cliff in which tokens will begin to vest
     * @param _duration duration in seconds of the period in which the tokens will vest
     * @param _revocable whether the vesting is revocable or not
     * @param _amount total amount of tokens to be released at the end of the vesting
     */
    function createVestingSchedule(
        address _beneficiary,
        uint32 _start,
        uint32 _cliff,
        uint32 _duration,
        bool _revocable,
        uint112 _amount
    ) external onlyOwner {
        // We do not validate withdrawable amount here because we want to enable the ability
        // to call `createVestingSchedule()` from the token contract's constructor.
        // `getWithdrawableAmount()` would call the token contract's `balanceOf()` which
        // is not possible during token contract construction.
        //
        // require(
        //     getWithdrawableAmount() >= _amount,
        //     "cannot create vesting schedule because not sufficient tokens"
        // );
        require(_duration != 0, "!duration");
        require(_amount != 0, "!amount");
        bytes32 vestingScheduleId = computeNextVestingScheduleIdForHolder(
            _beneficiary
        );
        uint32 cliff;
        unchecked {
            cliff = _start + _cliff;
            require(cliff >= _start);
            uint32 end = _start + _duration;
            require(end > _start);
        }
        vestingSchedules[vestingScheduleId] = VestingSchedule({
            initialized: true,
            revocable: _revocable,
            revoked: false,
            beneficiary: _beneficiary,
            cliff: cliff,
            start: _start,
            duration: _duration,
            amountTotal: _amount,
            released: 0
        });
        unchecked {
            // Cannot realistically overflow
            uint256 _vestingSchedulesTotalAmount = vestingSchedulesTotalAmount;
            uint256 totalAmount = _vestingSchedulesTotalAmount + _amount;
            require(totalAmount > _vestingSchedulesTotalAmount);
            vestingSchedulesTotalAmount = totalAmount;
            vestingSchedulesIds.push(vestingScheduleId);
            holdersVestingCount[_beneficiary] += 1;
        }
    }

    /**
     * @notice Revokes the vesting schedule for given identifier.
     * @param vestingScheduleId the vesting schedule identifier
     */
    function revoke(
        bytes32 vestingScheduleId
    ) external onlyOwner onlyIfVestingScheduleNotRevoked(vestingScheduleId) {
        VestingSchedule storage vestingSchedule = vestingSchedules[
            vestingScheduleId
        ];
        require(vestingSchedule.revocable == true, "!revocable");
        uint112 vestedAmount = _computeReleasableAmount(vestingSchedule);
        if (vestedAmount != 0) {
            release(vestingScheduleId, vestedAmount);
        }
        unchecked {
            vestingSchedulesTotalAmount -=
                vestingSchedule.amountTotal -
                vestingSchedule.released;
        }
        vestingSchedule.revoked = true;
    }

    /**
     * @notice Withdraw the specified amount if possible.
     * @param amount the amount to withdraw
     */
    function withdraw(uint256 amount) external onlyOwner {
        require(getWithdrawableAmount() >= amount, "!withdrawable");
        _token.safeTransfer(owner(), amount);
    }

    /**
     * @notice Release vested amount of tokens.
     * @param vestingScheduleId the vesting schedule identifier
     * @param amount the amount to release
     */
    function release(
        bytes32 vestingScheduleId,
        uint112 amount
    ) public onlyIfVestingScheduleNotRevoked(vestingScheduleId) {
        VestingSchedule storage vestingSchedule = vestingSchedules[
            vestingScheduleId
        ];
        address sender = msg.sender;
        address beneficiary = vestingSchedule.beneficiary;
        bool isBeneficiary = sender == beneficiary;
        bool isOwner = sender == owner();
        require(isBeneficiary || isOwner, "only beneficiary or owner");
        uint112 releasableAmount = _computeReleasableAmount(vestingSchedule);
        require(releasableAmount >= amount, "!releasable");
        unchecked {
            // released + amount <= released + releasableAmount <= amountTotal
            vestingSchedule.released += amount;
            // vestingSchedulesTotalAmount >= amountTotal >= releasableAmount >= amount
            vestingSchedulesTotalAmount -= amount;
        }
        _token.safeTransfer(beneficiary, amount);
    }
}
