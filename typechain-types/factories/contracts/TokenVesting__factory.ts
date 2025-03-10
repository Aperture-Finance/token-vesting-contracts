/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  TokenVesting,
  TokenVestingInterface,
} from "../../contracts/TokenVesting";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "IndexOutOfBounds",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidBeneficiary",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidCliff",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidDuration",
    type: "error",
  },
  {
    inputs: [],
    name: "NotRevocable",
    type: "error",
  },
  {
    inputs: [],
    name: "NotVesting",
    type: "error",
  },
  {
    inputs: [],
    name: "NotWithdrawable",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyBeneficiaryOrOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "vestingScheduleId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "amountTotal",
        type: "uint112",
      },
    ],
    name: "Created",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "vestingScheduleId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "amount",
        type: "uint112",
      },
    ],
    name: "Released",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "vestingScheduleId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "remainingAmount",
        type: "uint112",
      },
    ],
    name: "Revoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "initialized",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revoked",
            type: "bool",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "start",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "cliff",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint112",
            name: "amountTotal",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "released",
            type: "uint112",
          },
        ],
        internalType: "struct TokenVesting.VestingSchedule[]",
        name: "_vestingSchedules",
        type: "tuple[]",
      },
    ],
    name: "batchCreateVestingSchedule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
    ],
    name: "computeNextVestingScheduleIdForHolder",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "vestingScheduleId",
        type: "bytes32",
      },
    ],
    name: "computeReleasableAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "computeVestingScheduleIdForAddressAndIndex",
    outputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "initialized",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revoked",
            type: "bool",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "start",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "cliff",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint112",
            name: "amountTotal",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "released",
            type: "uint112",
          },
        ],
        internalType: "struct TokenVesting.VestingSchedule",
        name: "vestingSchedule",
        type: "tuple",
      },
    ],
    name: "createVestingSchedule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
    ],
    name: "getLastVestingScheduleForHolder",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "initialized",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revoked",
            type: "bool",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "start",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "cliff",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint112",
            name: "amountTotal",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "released",
            type: "uint112",
          },
        ],
        internalType: "struct TokenVesting.VestingSchedule",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getVestingIdAtIndex",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "vestingScheduleId",
        type: "bytes32",
      },
    ],
    name: "getVestingSchedule",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "initialized",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revoked",
            type: "bool",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "start",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "cliff",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint112",
            name: "amountTotal",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "released",
            type: "uint112",
          },
        ],
        internalType: "struct TokenVesting.VestingSchedule",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getVestingScheduleByAddressAndIndex",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "initialized",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revoked",
            type: "bool",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "start",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "cliff",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint112",
            name: "amountTotal",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "released",
            type: "uint112",
          },
        ],
        internalType: "struct TokenVesting.VestingSchedule",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVestingSchedulesCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_beneficiary",
        type: "address",
      },
    ],
    name: "getVestingSchedulesCountByBeneficiary",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVestingSchedulesTotalAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWithdrawableAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "vestingScheduleId",
        type: "bytes32",
      },
      {
        internalType: "uint112",
        name: "amount",
        type: "uint112",
      },
    ],
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "vestingScheduleId",
        type: "bytes32",
      },
    ],
    name: "revoke",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161154638038061154683398101604081905261002f916100ac565b6100383361005c565b6001600160a01b03811661004b57600080fd5b6001600160a01b03166080526100dc565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100be57600080fd5b81516001600160a01b03811681146100d557600080fd5b9392505050565b60805161143a61010c6000396000818161014a0152818161033501528181610762015261092d015261143a6000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c80638af104da116100ad578063ea1bb3d511610071578063ea1bb3d514610287578063f2fde38b1461029a578063f51321d7146102ad578063f7c469f0146102c0578063f9079b37146102d357600080fd5b80638af104da146102295780638da5cb5b1461024857806390be10cc146102595780639ef346b414610261578063b75c7dc61461027457600080fd5b80635a7bb69a116100f45780635a7bb69a146101b2578063656b0039146101db578063715018a6146101ee5780637a656731146101f65780637e913dc61461020957600080fd5b8063130836171461013157806321df0da7146101485780632e1a7d4d1461018257806348deb471146101975780634a8d1b521461019f575b600080fd5b6001545b6040519081526020015b60405180910390f35b7f00000000000000000000000000000000000000000000000000000000000000005b6040516001600160a01b03909116815260200161013f565b610195610190366004610f28565b6102e6565b005b600354610135565b6101956101ad366004610f41565b6103ad565b6101356101c0366004610fcc565b6001600160a01b031660009081526004602052604090205490565b6101956101e9366004611005565b610661565b6101956107de565b610195610204366004611035565b6107f2565b61021c610217366004610fcc565b610804565b60405161013f919061104e565b610135610237366004611113565b6000919091526020526034600c2090565b6000546001600160a01b031661016a565b610135610909565b61021c61026f366004610f28565b6109a7565b610195610282366004610f28565b610a65565b610135610295366004610f28565b610b50565b6101956102a8366004610fcc565b610b83565b61021c6102bb366004611113565b610c01565b6101356102ce366004610fcc565b610c2a565b6101356102e1366004610f28565b610c54565b6102ee610c9e565b806102f7610909565b1015610316576040516328c5214b60e01b815260040160405180910390fd5b61035c61032b6000546001600160a01b031690565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169083610cf8565b6000546001600160a01b03166001600160a01b03167f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5826040516103a291815260200190565b60405180910390a250565b6103b5610c9e565b600354808260005b8181101561064b57368686838181106103d8576103d861113f565b610120029190910191506103f190506020820182611163565b6103fa57600080fd5b61040a6060820160408301611163565b1561041457600080fd5b61042661012082016101008301611180565b6001600160701b03161561043957600080fd5b600061044b6080830160608401610fcc565b90506001600160a01b03811661047457604051631559b7d760e21b815260040160405180910390fd5b6000610487610100840160e08501611180565b9050806001600160701b03166000036104b35760405163162908e360e11b815260040160405180910390fd5b6001600160701b038116959095019460006104d460a08501608086016111af565b905060006104e860e0860160c087016111af565b905081810163ffffffff8216158061050b57508263ffffffff168163ffffffff16105b1561052957604051637616640160e01b815260040160405180910390fd5b600061053b60c0880160a089016111af565b90508363ffffffff168163ffffffff16108061056257508163ffffffff168163ffffffff16115b1561058057604051630a15cca960e21b815260040160405180910390fd5b50505050600061058f83610c2a565b600081815260026020526040902090915084906105ac8282611200565b50506001805480820182557fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6018290556001600160a01b0384166000818152600460209081526040918290208054909401909355516001600160701b0385168152909183917f8024d7cac2dcc04081605bc13c328cb6801218710e6b11743fb34bfc1ca8c956910160405180910390a3505050508060010190506103bd565b5082821161065857600080fd5b50600355505050565b8161066b81610d76565b60008381526002602052604081208054909133916001600160a01b0363010000009091041690818314906106a76000546001600160a01b031690565b6001600160a01b0316846001600160a01b0316149050811580156106c9575080155b156106e757604051633d8486f960e01b815260040160405180910390fd5b60006106f286610dab565b9050876001600160701b0316816001600160701b0316106107135787610715565b805b6001870180546001600160701b03600160901b808304821685018216026001600160901b03909216919091179091556003805491831691829003905590985061078a906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016908690610cf8565b6040516001600160701b03891681526001600160a01b038516908a907fc788cec47a55665c26b248ba8c7bc93a60986eabe8b0e274454da94e16484dfe9060200160405180910390a3505050505050505050565b6107e6610c9e565b6107f06000610e8c565b565b8060016107ff82826103ad565b505050565b61080c610edc565b6001600160a01b038216600090815260046020526040812054908190036108465760405163e2aa49c960e01b815260040160405180910390fd5b60009283526000190160209081526034600c20835260028152604092839020835161012081018552815460ff808216151583526101008083048216151595840195909552620100008204161515958201959095526001600160a01b036301000000860416606082015263ffffffff600160b81b860481166080830152600160d81b909504851660a082015260019091015493841660c08201526001600160701b036401000000008504811660e0830152600160901b909404909316908301525090565b6003546040516370a0823160e01b8152306004820152600091906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906370a0823190602401602060405180830381865afa158015610974573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099891906113b4565b6109a291906113cd565b905090565b6109af610edc565b50600090815260026020908152604091829020825161012081018452815460ff808216151583526101008083048216151595840195909552620100008204161515948201949094526001600160a01b036301000000850416606082015263ffffffff600160b81b850481166080830152600160d81b909404841660a082015260019091015492831660c08201526001600160701b036401000000008404811660e0830152600160901b9093049092169082015290565b610a6d610c9e565b80610a7781610d76565b60008281526002602052604090208054610100900460ff16610aac57604051639414820d60e01b815260040160405180910390fd5b6000610ab782610dab565b90506001600160701b03811615610ad257610ad28482610661565b6001820154600380546001600160701b03600160901b8404811664010000000090940481169390930392831690819003909155835462ff000019166201000017845560405190815285907fabd2becf58f68514000454c0cae8ecd763cae21e835a711e321c248a0b80e2ad9060200160405180910390a25050505050565b600081610b5c81610d76565b6000838152600260205260409020610b7390610dab565b6001600160701b03169392505050565b610b8b610c9e565b6001600160a01b038116610bf55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b610bfe81610e8c565b50565b610c09610edc565b600083905260208290526034600c20610c21906109a7565b90505b92915050565b6001600160a01b038116600090815260046020908152604082205483835290526034600c20610c24565b6001546000908210610c7957604051634e23d03560e01b815260040160405180910390fd5b60018281548110610c8c57610c8c61113f565b90600052602060002001549050919050565b6000546001600160a01b031633146107f05760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610bec565b600060405163a9059cbb60e01b8152836004820152826024820152602060006044836000895af13d15601f3d1160016000511416171691505080610d705760405162461bcd60e51b815260206004820152600f60248201526e1514905394d1915497d19052531151608a1b6044820152606401610bec565b50505050565b6000818152600260205260409020805460ff16610d9257600080fd5b805462010000900460ff1615610da757600080fd5b5050565b80546000904290600160d81b900463ffffffff16811080610dd35750825462010000900460ff165b15610de15750600092915050565b6001830154835463ffffffff918216600160b81b909104821601168110610e27575050600101546001600160701b03600160901b82048116640100000000909204160390565b82546001840154600160b81b90910463ffffffff90811683039160009181169064010000000090046001600160701b0316830281610e6757610e676113ee565b6001909601546001600160701b03600160901b90910416950494909403949350505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e0810182905261010081019190915290565b600060208284031215610f3a57600080fd5b5035919050565b60008060208385031215610f5457600080fd5b823567ffffffffffffffff80821115610f6c57600080fd5b818501915085601f830112610f8057600080fd5b813581811115610f8f57600080fd5b86602061012083028501011115610fa557600080fd5b60209290920196919550909350505050565b6001600160a01b0381168114610bfe57600080fd5b600060208284031215610fde57600080fd5b8135610fe981610fb7565b9392505050565b6001600160701b0381168114610bfe57600080fd5b6000806040838503121561101857600080fd5b82359150602083013561102a81610ff0565b809150509250929050565b6000610120828403121561104857600080fd5b50919050565b600061012082019050825115158252602083015115156020830152604083015161107c604084018215159052565b50606083015161109760608401826001600160a01b03169052565b5060808301516110af608084018263ffffffff169052565b5060a08301516110c760a084018263ffffffff169052565b5060c08301516110df60c084018263ffffffff169052565b5060e08301516110fa60e08401826001600160701b03169052565b50610100928301516001600160701b0316919092015290565b6000806040838503121561112657600080fd5b823561113181610fb7565b946020939093013593505050565b634e487b7160e01b600052603260045260246000fd5b8015158114610bfe57600080fd5b60006020828403121561117557600080fd5b8135610fe981611155565b60006020828403121561119257600080fd5b8135610fe981610ff0565b63ffffffff81168114610bfe57600080fd5b6000602082840312156111c157600080fd5b8135610fe98161119d565b60008135610c2481611155565b60008135610c2481610fb7565b60008135610c248161119d565b60008135610c2481610ff0565b813561120b81611155565b815490151560ff1660ff1991909116178155602082013561122b81611155565b815461ff00191681151560081b61ff00161782555061126b61124f604084016111cc565b82805462ff0000191691151560101b62ff000016919091179055565b6112a461127a606084016111d9565b8280546301000000600160b81b03191660189290921b6301000000600160b81b0316919091179055565b6112d76112b3608084016111e6565b82805463ffffffff60b81b191660b89290921b63ffffffff60b81b16919091179055565b61130a6112e660a084016111e6565b82805463ffffffff60d81b191660d89290921b63ffffffff60d81b16919091179055565b6001810161133461131d60c085016111e6565b825463ffffffff191663ffffffff91909116178255565b61137961134360e085016111f3565b825471ffffffffffffffffffffffffffff00000000191660209190911b71ffffffffffffffffffffffffffff0000000016178255565b6107ff61138961010085016111f3565b82546001600160901b031660909190911b71ffffffffffffffffffffffffffffffffffff1916178255565b6000602082840312156113c657600080fd5b5051919050565b81810381811115610c2457634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fdfea264697066735822122073d2385e2ff4dcb9c02463beb2003116482e31d133a8f64dd8e22b30823a2f3c64736f6c63430008120033";

type TokenVestingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenVestingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenVesting__factory extends ContractFactory {
  constructor(...args: TokenVestingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TokenVesting> {
    return super.deploy(_token, overrides || {}) as Promise<TokenVesting>;
  }
  override getDeployTransaction(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_token, overrides || {});
  }
  override attach(address: string): TokenVesting {
    return super.attach(address) as TokenVesting;
  }
  override connect(signer: Signer): TokenVesting__factory {
    return super.connect(signer) as TokenVesting__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenVestingInterface {
    return new utils.Interface(_abi) as TokenVestingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenVesting {
    return new Contract(address, _abi, signerOrProvider) as TokenVesting;
  }
}
