const sdk = require("@defillama/sdk");

const sdlToken = "0xA95C5ebB86E0dE73B4fB8c47A45B792CFeA28C23";
const sdlStakingPool = "0xAEF186611EC96427d161107fFE14bba8aA1C2284";
const linkToken = "0x514910771af9ca656af840dff83e8264ecf986ca";
const linkStakingPool = "0xb8b295df2cd735b15BE5Eb419517Aa626fc43cD5";

async function tvl(timestamp, ethBlock, chainBlocks) {
  const stakedLINK = await sdk.api.abi.call({
    block: ethBlock,
    target: linkStakingPool,
    abi: {
      inputs: [],
      name: "totalStaked",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  });

  return {
    [linkToken]: stakedLINK.output,
  };
}

async function staking(timestamp, ethBlock, chainBlocks) {
  const stakedSDL = await sdk.api.abi.call({
    block: ethBlock,
    target: sdlStakingPool,
    abi: {
      inputs: [],
      name: "totalStaked",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  });

  return {
    [sdlToken]: stakedSDL.output,
  };
}

module.exports = {
  timetravel: true,
  misrepresentedTokens: false,
  methodology:
    "Queries LINK and SDL staking pools for the total amount of tokens staked",
  start: 1670337984,
  ethereum: {
    tvl,
    staking,
  },
};
