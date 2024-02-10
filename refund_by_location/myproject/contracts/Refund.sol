pragma solidity >=0.5.16 <0.6.0;

pragma experimental ABIEncoderV2;

contract Refund {
    // Model a Candidate

    event CompletedEvent (
        address employeeaddress
    );

    event FailedEvent (
        address employeeaddress
    );

    // Employee data
    struct Employee {
        uint id;
        string name;
        address public_address;
    }

    // Employer data
    struct Employer {
        uint id;
        string name;
        address public_address;
    }

    // Contract data with boundary points, durations, completion checkers
    struct ContractData {
        uint id;
        uint minimum_point_long;
        uint minimum_point_lat;
        uint maximum_point_long;
        uint maximum_point_lat;
        uint starting_time;
        uint duration;
        uint gathered_location_count;
        bool contract_truth;
        bool completed;
        Employee employee;
        Employer employer;
    }
    
    // Contracts that have been recorded 
    mapping(address => ContractData) public contracts;
    
    uint public contractCount;

    // Employees that have been recorded
    mapping(address => Employee) public employees;
    uint public employeeCount;
    mapping(uint => address) public employeeMapping;
 
    // Employers that have been recorded
    mapping(address => Employer) public employers;
    uint public employerCount;

    function initializeEmployers(address[] memory addresses) public {
        for (uint i = 0; i < addresses.length; i++) {
            addEmployer("Employer", addresses[i]);
        }
    }

    function initializeEmployees(address[] memory addresses) public {
        for (uint i = 0; i < addresses.length; i++) {
            addEmployee("Employee", addresses[i]);
        }
    }

    function addEmployer(string memory _name, address userAddress) private {
        employerCount++;
        employers[userAddress] = Employer(employerCount, _name, userAddress);
    }

    function addEmployee(string memory _name, address userAddress) private {
        employeeCount++;
        employees[userAddress] = Employee(employeeCount, _name, userAddress);
        employeeMapping[employeeCount] = userAddress;
    }

    function createContractData(
        uint[2] memory minimumPoints,
        uint[2] memory maximumPoints,
        uint duration,
        string memory employeeName,
        address employeeAddress,
        address employerAddress
    ) public {
        if (employees[employeeAddress].id == 0) {
            addEmployee(employeeName, employeeAddress);
        }

        contractCount++;
        contracts[employeeAddress] = ContractData(
            contractCount,
            minimumPoints[0],
            minimumPoints[1],
            maximumPoints[0],
            maximumPoints[1],
            block.timestamp,
            duration,
            0,
            true,
            false,
            employees[employeeAddress],
            employers[employerAddress]
        );
    }

    function getLocation(uint longitude, uint latitude) public returns (bool) {
        ContractData storage foundContract = contracts[msg.sender];
        
        require(foundContract.id > 0, "Contract not found");
        require(!foundContract.completed, "Contract already completed");

        uint duration = (block.timestamp - foundContract.starting_time) / 60;
        require(duration < foundContract.duration, "Contract duration exceeded");

        foundContract.gathered_location_count++;

        if (!(foundContract.minimum_point_long <= longitude && foundContract.maximum_point_long >= longitude && foundContract.minimum_point_lat <= latitude && foundContract.maximum_point_lat >= latitude)) {
            foundContract.contract_truth = false;
        }

        if (duration >= foundContract.duration) {
            checkCompletion(foundContract);
        }

        return true;
    }

    function checkCompletion(ContractData storage foundContract) private {
        uint minimumCheck = foundContract.duration * 3 / 4;
        if (foundContract.contract_truth && minimumCheck <= foundContract.gathered_location_count) {
            foundContract.completed = true;
            emit CompletedEvent(foundContract.employee.public_address);
        } else {
            foundContract.completed = false;
            emit FailedEvent(foundContract.employee.public_address);
        }
    }

    // Function to get contract count
    function getContractCount() public view returns (uint) {
        return contractCount;
    }

    // Function to get contract details by index
    function getContractDetails(uint index) public view returns (uint[12] memory) {
        require(index > 0 && index <= contractCount, "Invalid index");
        ContractData storage contractData = contracts[employeeMapping[index]];
        uint[12] memory data;
        data[0] = contractData.id;
        data[1] = contractData.minimum_point_long;
        data[2] = contractData.minimum_point_lat;
        data[3] = contractData.maximum_point_long;
        data[4] = contractData.maximum_point_lat;
        data[5] = contractData.starting_time;
        data[6] = contractData.duration;
        data[7] = contractData.gathered_location_count;
        data[8] = contractData.contract_truth ? 1 : 0; // Convert bool to uint
        data[9] = contractData.completed ? 1 : 0; // Convert bool to uint
        data[10] = contractData.employee.id;
        data[11] = contractData.employer.id;
        return data;
    }
}
