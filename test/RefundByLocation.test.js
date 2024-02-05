const { expect } = require("chai");
const { ethers } = require("ethers");

describe("RefundByLocation", function () {
    it("Should deploy and mint initial tokens", async function () {
        const GeoToken = await ethers.getContractFactory("GeoToken");
        const geoToken = await GeoToken.deploy();

        await geoToken.deployed();

        // Minting logic goes here, and you can add assertions to check the minted supply

        expect(await geoToken.totalSupply()).to.equal(/* expected total supply */);
    });

    it("Should deploy RefundByLocation contract", async function () {
        const RefundByLocation = await ethers.getContractFactory("RefundByLocation");
        const refundByLocation = await RefundByLocation.deploy();

        await refundByLocation.deployed();

        // Contract deployment assertions 
        expect(await refundByLocation.owner()).to.equal(/* expected owner address */);
    });

   
});
