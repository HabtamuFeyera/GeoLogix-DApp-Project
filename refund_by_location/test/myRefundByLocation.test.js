// test/RefundByLocation.test.js
const RefundByLocation = artifacts.require('RefundByLocation');

contract('RefundByLocation', (accounts) => {
    let refundByLocation;

    before(async () => {
        refundByLocation = await RefundByLocation.deployed();
    });

    it('should add a device', async () => {
        await refundByLocation.addDevice(accounts[1], { from: accounts[0] });
        const isDeviceAdded = await refundByLocation.devices(accounts[1]);
        assert.equal(isDeviceAdded, true, 'Device was not added successfully');
    });

    // Add more test cases for other functionalities
});
