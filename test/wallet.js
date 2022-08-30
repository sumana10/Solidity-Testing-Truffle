const Wallet = artifacts.require("Wallet");

contract("Wallet", (accounts)=>{
  let wallet = null;
  before(async()=>{
    wallet =  await Wallet.deployed();
  })

  it("Should set account[0] as owner", async()=>{
    const owner = await wallet.owner();

    assert(owner == accounts[0])
  })

  it("Should deposit to wallet", async()=>{
    await wallet.deposit({from:accounts[0], value:100});
    //deposit 100 ether to contract
    const balance = await web3.eth.getBalance(wallet.address);
    //calling contract balance
    assert(parseInt(balance) === 100)
  })
  it("Should return balance of wallet", async()=>{

    const balance =  await wallet.balanceOf();

    assert(parseInt(balance) === 100);
    
  })
  it("Should transfer ether to another address", async()=>{

    const receiver_beforeTransfer =  await web3.eth.getBalance(accounts[1]);
    console.log(receiver_beforeTransfer);

    await wallet.send(accounts[1], 10, {from:accounts[0]});

    const receiver_afterTransfer =  await web3.eth.getBalance(accounts[1]);
    console.log(receiver_afterTransfer);//string

    const finalBalance = web3.utils.toBN(receiver_afterTransfer);
    const initialBalance = web3.utils.toBN(receiver_beforeTransfer);

    assert(finalBalance.sub(initialBalance).toNumber() == 10);
  })

  it("should NOT transfer ether if tx not sent from the owner", async()=>{

    try{

      await wallet.send(accounts[1], 10, {from: accounts[0]})

    }catch(error){

      assert(false, "Only owner should send the tx")

    }
  })

})