// RefundByLocation.sol
pragma solidity ^0.8.0;

contract RefundByLocation {
    address public creator;
    mapping(address => bool) public devices;

    constructor() {
        creator = msg.sender;
    }

    function addDevice(address _device) external {
        require(msg.sender == creator, "Only creator can add devices");
        devices[_device] = true;
    }

    function sendGPSReading(uint256 _longitude, uint256 _latitude, uint256 _timestamp) external {
        require(devices[msg.sender], "Only registered devices can send readings");
        // Add logic to handle GPS readings
    }
}
