// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract TransferAmount{

  address owner;

  constructor(address _owner){

    owner = _owner;

  }
  
   function send(address payable[] memory to, uint256[] memory amount) public payable ownerOnly{

    require(to.length == amount.length, "to must be same length as amount");
   
    for(uint256 i = 0; i<to.length; i++){

      to[i].transfer(amount[i]);
      
    }

  }

  modifier ownerOnly(){
    require(msg.sender == owner);
    _;
  }


}