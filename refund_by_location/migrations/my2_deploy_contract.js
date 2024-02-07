var RefunderContract = artifacts.require("./myRefundByLocation.sol");

module.exports = function(deployer) {
  deployer.deploy(RefunderContract);
};
