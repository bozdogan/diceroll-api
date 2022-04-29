const assert = require("chai").assert;
const api = require("../api");


describe("api", () => {
  describe("#isDiceCodeValid", () => {
    it(`should return true for "2d10"`, () => {
      assert.isTrue(api.isDiceCodeValid("2d10"));
    });
    
    it(`should return true for "1d6"`, () => {
      assert.isTrue(api.isDiceCodeValid("1d6"));
    });
    
    it(`should return true for "4d3"`, () => {
      assert.isTrue(api.isDiceCodeValid("4d3"));
    });
    
    it(`should return true for "4d3-8"`, () => {
      assert.isTrue(api.isDiceCodeValid("4d3-8"));
    });
    
    it(`should return true for "1d6+4"`, () => {
      assert.isTrue(api.isDiceCodeValid("1d6+4"));
    });
    
    it(`should return true for "d6"`, () => {
      assert.isTrue(api.isDiceCodeValid("d6"));
    });


    it(`should return false for ""`, () => {
      assert.isFalse(api.isDiceCodeValid(""));     
    });
    
    it(`should return false for "hello"`, () => {   
      assert.isFalse(api.isDiceCodeValid("hello"));        
    });
    
    it(`should return false for "q=2d10"`, () => {  
      assert.isFalse(api.isDiceCodeValid("q=2d10"));       
    });
    
    it(`should return false for '"1d6"'`, () => {   
      assert.isFalse(api.isDiceCodeValid('"1d6""'));        
    });
    
    it(`should return false for "69d4:20"`, () => { 
      assert.isFalse(api.isDiceCodeValid("69d4:20"));      
    });
    
    it(`should return false for "34d500  "`, () => {
      assert.isFalse(api.isDiceCodeValid("34d500  "));     
    });
  });

  
  describe("#_splitDiceLiteral", () => {
    it(`should return [2, 10, 0] for "2d10"`, () => {
      assert.deepEqual(api._splitDiceLiteral("2d10"), [2, 10, 0]);
    });
    
    it(`should return [1, 4, 6] for "1d4+6"`, () => {
      assert.deepEqual(api._splitDiceLiteral("1d4+6"), [1, 4, 6]);
    });
    
    it(`should return [4, 3, -8] for "4d3-8"`, () => {
      assert.deepEqual(api._splitDiceLiteral("4d3-8"), [4, 3, -8]);
    });
    
    it(`should return [1, 6, 0] for "d6"`, () => {
      assert.deepEqual(api._splitDiceLiteral("d6"), [1, 6, 0]);
    });
  });

  
  const ROLL_TEST_CONSTANT = 20;
  
  describe("#_roll", () => {
    it(`should be in range [2, 20] for rolling "2d10"`, () => {
      // NOTE(bora): Cannot seed Math.random(), so I'll basically
      // run it a couple times to see if it breaks..
      for(let i = 0; i < ROLL_TEST_CONSTANT; ++i) {
        const { result } = api.roll("2d10");
        assert.isAtLeast(result, 2);
        assert.isAtMost(result, 20);
      }
    });

    it(`should be in range [1, 6] for rolling "1d6"`, () => {
      for(let i = 0; i < ROLL_TEST_CONSTANT; ++i) {
        const { result } = api.roll("1d6");
        assert.isAtLeast(result, 1);
        assert.isAtMost(result, 6);
      }
    });

    it(`should be in range [-1, 1] for rolling "d3-2"`, () => {
      for(let i = 0; i < ROLL_TEST_CONSTANT; ++i) {
        const { dice_code, result } = api.roll("d3-2");
        assert.isAtLeast(result, -1);
        assert.isAtMost(result, 1);
      }
    });

    it(`should be in range [-4, 4] for rolling "4d3-8"`, () => {
      for(let i = 0; i < ROLL_TEST_CONSTANT; ++i) {
        const { result } = api.roll("4d3-8");
        assert.isAtLeast(result, -4);
        assert.isAtMost(result, 4);
      }
    });
  });
});
