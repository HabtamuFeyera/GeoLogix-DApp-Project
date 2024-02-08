// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.6.0;

contract RefunderContract {
    // Variables
    address public owner; // Contract owner address
    mapping(address => bool) private employees; // Mapping to track employees
    mapping(address => ContractSpec) public contractInfo; // Mapping to store contract information for employees

    // Struct to store contract information
    struct ContractSpec {
        int256 center_lat; // Latitude of the contract center
        int256 center_lon; // Longitude of the contract center
        int256 radius; // Radius of the contract
        uint8 budget; // Budget allocated to the contract
        bool status; // Current status of the contract
    }

    // Constructor to set the contract owner
    constructor() public {
        owner = msg.sender;
    }

    // Modifier to restrict access to only the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    // Function to add an employee and their contract information
    function addEmployee(address id, int256 lat, int256 lon, int256 rad, uint8 fund) public onlyOwner {
        require(!employees[id], "Employee already exists");
        contractInfo[id] = ContractSpec(lat, lon, rad, fund, false);
        employees[id] = true;
    }

    // Function to check if an employee is within the specified radius
    function checkPosition(int256 lat, int256 lon) public {
        require(employees[msg.sender], "Caller is not an employee");
        int256 newRadius = calculateRadius(lat, lon, msg.sender);
        contractInfo[msg.sender].status = (newRadius < contractInfo[msg.sender].radius);
    }

    // Function to pay an employee if they are within the contract radius
    function pay(address payable _to) public payable {
        require(employees[_to], "Recipient is not an employee");
        require(contractInfo[_to].status, "Employee is not within radius");
        require(msg.value == contractInfo[_to].budget, "Incorrect payment amount");
        (bool sent, ) = _to.call.value(msg.value)("");
        require(sent, "Failed to send Ether");
        contractInfo[_to].status = false;
    }

    // Function to destruct the contract, accessible only by the owner
    function kill() public onlyOwner {
        selfdestruct(msg.sender);
    }

    // Function to calculate the distance between two points
    function calculateRadius(int256 lat, int256 lon, address adr) private view returns (int256) {
        int256 x = lat - contractInfo[adr].center_lat;
        int256 y = lon - contractInfo[adr].center_lon;
        return sqrt(x * x + y * y);
    }

    // Function to calculate the square root
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
