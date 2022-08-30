// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Demo2{

  string public item;

  function set(string memory _item) public{
    item = _item;
  }

  function get() public view returns(string memory){
    return item;
  }

}

