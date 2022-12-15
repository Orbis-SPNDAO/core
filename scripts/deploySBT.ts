import { ethers } from "hardhat";

async function main() {
  const PatternSBT = await ethers.getContractFactory("PatternSBT");
  const patternSBT = await PatternSBT.deploy();

  await patternSBT.deployed();

  console.log(`Deployed to ${patternSBT.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
