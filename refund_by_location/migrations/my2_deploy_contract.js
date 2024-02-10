const RefunderContract = artifacts.require("RefunderContract");

module.exports = function(deployer) {
  deployer.deploy(RefunderContract);
};
