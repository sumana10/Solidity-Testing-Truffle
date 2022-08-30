// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Wallet{
  address payable public owner;

  constructor(address payable _owner){
    owner = _owner;
  }

  function deposit() public payable{}

  function balanceOf() public view returns(uint256){
    return address(this).balance;
  }

//to is receiver
//owner is contract owner who can send
  function send(address payable to, uint256 amount) public{

    if(msg.sender == owner){
      to.transfer(amount);
      return;
    }
    revert("sender is not allowed");

  }
}