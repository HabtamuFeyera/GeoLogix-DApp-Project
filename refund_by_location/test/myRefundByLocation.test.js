const RefunderContract = artifacts.require("RefunderContract");

contract("RefunderContract", (accounts) => {
  let refunderContract;

  beforeEach(async () => {
    refunderContract = await RefunderContract.new({ from: accounts[0] });
  });

  it("should add employee", async () => {
    const employeeAddress = accounts[1];
    await refunderContract.addEmployee(
      employeeAddress,
      123,
      456,
      100,
      50,
      { from: accounts[0] }
    );
    const contractInfo = await refunderContract.contractInfo(employeeAddress);
    assert.isTrue(contractInfo.center_lat !== 0, "Employee was not added");
  });

  it("should check employee position", async () => {
    const employeeAddress = accounts[1];
    await refunderContract.addEmployee(
      employeeAddress,
      123,
      456,
      100,
      50,
      { from: accounts[0] }
    );
    await refunderContract.checkPosition(120, 450, { from: employeeAddress });
    const contractInfo = await refunderContract.contractInfo(employeeAddress);
    assert.isTrue(contractInfo.status, "Employee status not updated");
  });

  it("should pay employee", async () => {
    const employeeAddress = accounts[1];
    await refunderContract.addEmployee(
      employeeAddress,
      123,
      456,
      100,
      50,
      { from: accounts[0] }
    );
    await refunderContract.checkPosition(120, 450, { from: employeeAddress });
    await refunderContract.pay(employeeAddress, { from: accounts[0], value: 50 });
    const contractInfo = await refunderContract.contractInfo(employeeAddress);
    assert.isFalse(contractInfo.status, "Employee not paid");
  });
});
