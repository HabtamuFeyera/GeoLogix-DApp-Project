const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {
    const RefundByLocation = await ethers.getContractFactory("RefundByLocation");
    const refundByLocation = await RefundByLocation.deploy();

    await refundByLocation.deployed();

    console.log("RefundByLocation deployed to:", refundByLocation.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
