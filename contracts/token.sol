// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.5.0 < 0.9.0;


//import "hardhat/console.sol";

contract Token {
    string public name = "Hardhat Token";
    string public symbol = "HHT";
    uint256 public totalSupply = 10000;

    address public owner;

    mapping (address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        //console.log("**Sender balance is %s tokens**", balances[msg.sender]);
        //console.log("**sender is sending %s tokens to %s address**", amount, to);

        require(balances[msg.sender] >= amount,  "Insufficient balance");
        balances[msg.sender] -= amount; 
        balances[to] += amount;

    }

    function balanceOf(address account) external view returns(uint) {
        return balances[account];
    }
}
