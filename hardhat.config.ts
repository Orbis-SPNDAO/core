require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("./tasks")
require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
const MUMBAI_ALCHEMY_URL = process.env.MUMBAI_ALCHEMY_URL
console.log({ MUMBAI_ALCHEMY_URL })
module.exports = {
    solidity: "0.8.17",
    networks: {
        mumbai: {
            url: MUMBAI_ALCHEMY_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}
