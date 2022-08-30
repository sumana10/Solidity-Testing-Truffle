const TransferAmount = artifacts.require("TransferAmount");

contract("TransferAmount", (accounts)=>{
  let transferAmount = null;

  before(async()=>{
    transferAmount = await TransferAmount.deployed();
  })

  it("Should transfer amount", async()=>{
    const recipients = [accounts[1],accounts[2],accounts[3]];
    const amounts = [10, 20, 30];

    const initialBalances = await Promise.all(
      recipients.map((recipient)=>{
        return web3.eth.getBalance(recipient);
      })
    )
    console.log(initialBalances);

    await transferAmount.send(recipients, amounts,{
      from: accounts[0],
      value: 90
    })

    const finalBalances = await Promise.all(
      recipients.map((recipient)=>{
        return web3.eth.getBalance(recipient);
      })
    )
    console.log(finalBalances);

    recipients.forEach((_item, i)=>{
      const finalBalance = web3.utils.toBN(finalBalances[i]);
      const initialBalance = web3.utils.toBN(initialBalances[i]);

      assert(finalBalance.sub(initialBalance).toNumber() === amounts[i])

    })
  })

  it("should not transfer amount if array length is not the same", async () => { 

    const recipients = [accounts[1], accounts[2], accounts[3]]; 
    const amounts = [10, 20]; 
    try { 
      
      await transferAmount.send(recipients, amounts, { from: accounts[0], value: 10, });

    } catch (e) { 
    // console.error(e); 
    assert(e.message.includes("to must be same length as amount")); 
    return; 

   } 
    assert(false);
   
  })
  it("should not transfer amount if caller is not the owner", async () => { const recipients = [accounts[1], accounts[2], accounts[3]]; const amounts = [10, 20, 30]; try { await transferAmount.send(recipients, amounts, { from: accounts[4], value: 10, }); } catch (e) {  console.error(e); assert( e.message.includes("VM Exception while processing transaction: revert") ); return; } assert(false); }); 
})