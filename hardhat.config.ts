import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY!
const MUMBAI_ALCHEMY_URL = process.env.MUMBAI_ALCHEMY_URL
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
        url: MUMBAI_ALCHEMY_URL,
        accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};

export default config;