const Darray = artifacts.require("Darray");

contract("Darray", ()=>{
  //Hooks available in mocha: before after beforeEach afterEach

  // before(()=>{
  //   console.log("before all the test suits");
  // })
  // beforeEach(()=>{
  //   console.log("beforeEach all the test suits");
  // })
  // after(()=>{
  //   console.log("after all the test suits");
  // })
  // afterEach(()=>{
  //   console.log("afterEach all the test suits");
  // })

  let darray = null;

  before(async()=>{

    darray = await Darray.deployed();

  })
  
  it("Should insert an element into an array", async()=>{

    // let darray = await Darray.deployed();

    await darray.insert(10);

    const element = await darray.arr(0);

    assert(element.toNumber() === 10);

  })
  it("Should get an element from arr", async()=>{

    // let darray = await Darray.deployed();

    await darray.insert(20);

    const element = await darray.arr(1);

    assert(element.toNumber() === 20);

  })
  it("Should return length of arr", async()=>{

    // let darray = await Darray.deployed();


    const length = await darray.length();

    assert(length.toNumber() === 2);

  })
  it("Should return all the element of array", async()=>{

    const arr = await darray.getAll();

    const elements = arr.map((element) => element.toNumber());

    console.log(elements);

    assert.deepEqual(elements, [10, 20]);

  })
})