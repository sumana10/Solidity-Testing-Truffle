// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract demo{

  uint num;

  function set(uint _number) public{
    num = _number;
  }

  function get() public view returns (uint256){
    return num;
  }
  
}