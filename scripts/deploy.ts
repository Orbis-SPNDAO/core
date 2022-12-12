const { ethers } = require("hardhat");

const deploy = async () => {
  try {
    const contractFactorySBT = await ethers.getContractFactory(
      "SpendSBT"
    );
    const sbtContract = await contractFactorySBT.deploy();
    await sbtContract.deployed();

    console.log("SBT Contract deployed to:", sbtContract.address);

    const contractFactoryAdmin = await ethers.getContractFactory(
      "SpendAdmin"
    );
    const adminContract = await contractFactoryAdmin.deploy();
    await adminContract.deployed();

    console.log("Admin Contract deployed to:", adminContract.address);


    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
  
deploy();