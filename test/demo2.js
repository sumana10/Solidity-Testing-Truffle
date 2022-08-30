const Demo2 = artifacts.require("Demo2");

contract("ABC", ()=>{
  it("Should set the value of item variable in smart contract", async()=>{
    const demo = await Demo2.deployed();
    await demo.set("Great");
    const result = await demo.get();
    assert(result === "Great")
  })
})


