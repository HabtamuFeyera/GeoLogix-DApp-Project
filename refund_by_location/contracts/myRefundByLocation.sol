// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.6.0;

contract RefunderContract {
    // Variables
    address public owner;
    mapping(address => bool) private employees;
    mapping(address => ContractSpec) public contractInfo;

    struct ContractSpec {
        int256 center_lat;
        int256 center_lon;
        int256 radius;
        uint8 budget;
        bool status;
    }

    // Constructor
    constructor() public {
        owner = msg.sender;
    }

    // Functions

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    function addEmployee(address id, int256 lat, int256 lon, int256 rad, uint8 fund) public onlyOwner {
        require(!employees[id], "Employee already exists");
        contractInfo[id] = ContractSpec(lat, lon, rad, fund, false);
        employees[id] = true;
    }

    function checkPosition(int256 lat, int256 lon) public {
        require(employees[msg.sender], "Caller is not an employee");
        int256 newRadius = calculateRadius(lat, lon, msg.sender);
        contractInfo[msg.sender].status = (newRadius < contractInfo[msg.sender].radius);
    }

    function pay(address payable _to) public payable {
        require(employees[_to], "Recipient is not an employee");
        require(contractInfo[_to].status, "Employee is not within radius");
        require(msg.value == contractInfo[_to].budget, "Incorrect payment amount");
        (bool sent, ) = _to.call.value(msg.value)("");
        require(sent, "Failed to send Ether");
        contractInfo[_to].status = false;
    }

    function kill() public onlyOwner {
        selfdestruct(msg.sender);
    }

    function calculateRadius(int256 lat, int256 lon, address adr) private view returns (int256) {
        int256 x = lat - contractInfo[adr].center_lat;
        int256 y = lon - contractInfo[adr].center_lon;
        return sqrt(x * x + y * y);
    }

    function sqrt(int256 input) private pure returns (int256) {
        int256 output = input;
        if (input > 0) {
            int256 interim = (input + 1) / 2;
            while (interim < output) {
                output = interim;
                interim = (input / output * 2 + output) / 2;
            }
        }
        return output;
    }
}
