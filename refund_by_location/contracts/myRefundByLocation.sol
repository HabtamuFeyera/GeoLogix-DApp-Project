// contracts/RefundByLocation.sol
pragma solidity 0.8.15;

contract refunderContract{
    // Variables

    address public owner;
    bool private status;
    address[] public employees;

    constructor() {
        owner = msg.sender;
    }

    struct contract_spec{
        //address emp_add;
        int256 center_lat;
        int256 center_lon;
        int256 radius;
        uint8 budget;
        bool status;
     
    }
  
    mapping(address => contract_spec) public contractInfo;


    //Functions

    function kill() public {
      if(msg.sender == owner) selfdestruct(payable(owner));
    }

    function check_existance(address employee) private view returns(bool){
        for(uint256 i = 0; i < employees.length; i++){
            if(employees[i] == employee) return true;
        }
        return false;
    }

    function sqrt(int256 input) private pure returns (int256 output) {
        int256 interim = (input + 1) / 2;
        output = input;
        while (interim < output) {
            output = interim;
            interim = (input / output * 2) / 2;
        }
    }


    function add_employee(address id, int256 lat, int256 lon, int256 rad, uint8 fund) public {
        require(!check_existance(id));
        contractInfo[id].center_lat = lat;
        contractInfo[id].center_lon = lon;
        contractInfo[id].budget = fund;
        contractInfo[id].radius = rad;
        contractInfo[id].status = false;
        employees.push(id);

    }
    function calculate_radius(int256 lat, int256 lon, address adr) private view returns(int256) {
        int256 radius = 0;
        int256 x = lat - contractInfo[adr].center_lat;
        int256 y = lon - contractInfo[adr].center_lon;
        radius = sqrt(x**2 + y**2);
        return radius;
    }

    function check_position(int256 lat, int256 lon) public {
        int256 new_radius = calculate_radius(lat, lon, msg.sender);
        if(new_radius < contractInfo[msg.sender].radius){
            contractInfo[msg.sender].status = true;
        }else{
            contractInfo[msg.sender].status = false;
        }
    }

    function pay(address payable _to) public payable {
        require(check_existance(_to));
        require(contractInfo[_to].status == true);
        bool sent = _to.send(contractInfo[_to].budget);
        require(sent, "Failed to send Ether");
        contractInfo[_to].status=false;
    }
}