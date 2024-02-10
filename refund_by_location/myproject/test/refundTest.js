var Refund = artifacts.require("Refund.sol");

contract("Refund", function(accounts) {
  var refundInstance;

  it("initializes with employers", function() {
    return Refund.deployed().then(function(instance) {
      refundInstance = instance;
      return refundInstance.initializeEmployers([accounts[4], accounts[5], accounts[6]]);
    }).then(function() {
      return refundInstance.employers(accounts[4]);
    }).then(function(employer) {
      assert.equal(employer.id, 1, "Employer ID is incorrect");
      assert.equal(employer.name, "Employer", "Employer name is incorrect");
      assert.equal(employer.public_address, accounts[4], "Employer address is incorrect");
    });
  });

  it("creates contracts between employee and employer", function() {
    return Refund.deployed().then(function(instance) {
      refundInstance = instance;
      return refundInstance.createContractData(
        [878474, 3067564],
        [4882834, 325644664],
        30,
        "First Contract employee",
        accounts[3],
        accounts[4]
      );
    }).then(function() {
      return refundInstance.createContractData(
        [878474, 3067564],
        [4882834, 325644664],
        30,
        "Second Contract employee",
        accounts[3],
        accounts[4]
      );
    }).then(function() {
      // Retrieve the contract count directly from the contract variable
      return refundInstance.contractCount();
    }).then(function(count) {
      assert.equal(count, 2, "Contract count is incorrect");
      // Retrieve contract data directly from the contract variable
      return refundInstance.contracts(accounts[3]);
    }).then(function(contract) {
      assert.equal(contract.id, 2, "Contract ID is incorrect");
      assert.equal(contract.duration, 30, "Contract duration is incorrect");
      assert.equal(contract.employee.name, "First Contract employee", "Employee name is incorrect");
      assert.equal(contract.employer.name, "Employer", "Employer name is incorrect");
    });
  });
});
