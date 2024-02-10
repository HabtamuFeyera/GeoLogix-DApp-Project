// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RefundByLocation {
    address public creator;
    uint256 public timeLimit;
    uint256 public gpsRange;
    
    enum State { Pending, Compliant, NonCompliant }
    mapping(address => State) public deviceStates;
    
    event DeviceAdded(address indexed device);
    event ComplianceStateChanged(address indexed device, State state);

    modifier onlyCreator() {
        require(msg.sender == creator, "Only creator can call this function.");
        _;
    }
    
    constructor(uint256 _timeLimit, uint256 _gpsRange) {
        creator = msg.sender;
        timeLimit = _timeLimit;
        gpsRange = _gpsRange;
    }

    function addDevice(address _device) external onlyCreator {
        require(deviceStates[_device] == State.Pending, "Device already added or not in pending state.");
        deviceStates[_device] = State.Compliant; // Assume compliant initially
        emit DeviceAdded(_device);
    }

    function updateCompliance(address _device, uint256 _timestamp, uint256 _latitude, uint256 _longitude) external {
        require(deviceStates[_device] == State.Compliant, "Device not in compliant state.");
        // Logic to check GPS coordinates and timestamp against specified parameters
        // If compliant, transfer refund to device, else mark as non-compliant
        if (/* logic to check compliance */) {
            // Transfer refund
        } else {
            deviceStates[_device] = State.NonCompliant;
        }
        emit ComplianceStateChanged(_device, deviceStates[_device]);
    }
}
