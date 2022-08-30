const Conditional = artifacts.require("Conditional");

contract("Conditional", ()=>{

  it("Should check whether a is greater than b", async()=>{

    const conditional = await Conditional.deployed();
    try{

      const result = await conditional.check(5, 4);
      assert( result.toNumber() === 5);

    }
    catch(e){

      assert(false, "a should be greater than b");
      
    }
  })
})