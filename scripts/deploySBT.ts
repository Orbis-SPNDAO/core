import { ethers } from "hardhat";

async function main() {
  const SpendSBT = await ethers.getContractFactory("SpendSBT");
  const spendSBT = await SpendSBT.deploy();

  await spendSBT.deployed();

  console.log(`Deployed SpendSBT to ${spendSBT.address}`);

  const AdminSBT = await ethers.getContractFactory("SpendAdmin");
  const adminSBT = await AdminSBT.deploy();

  await adminSBT.deployed();

  console.log(`Deployed AdminSBT to ${adminSBT.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
