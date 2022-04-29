const assert = require("chai").assert;
const api = require("../api");

const validCodes = ["2d10", "1d6", "4d3", "4d3-8", "1d6+4"]
const invalidCodes = []

describe("api", () => {
  describe("#isDiceCodeValid", () => {

    for(const code of validCodes) {
      it(`should return true with value '${code}'`, () => {
        assert.isTrue(api.isDiceCodeValid(code));
      });
    }

    // it("should return true with value '2d10'", () => {
    //   assert.isTrue(api.isDiceCodeValid("2d10"));
    // });
    // it("should return true with value '1d6'", () => {
    //   assert.isTrue(api.isDiceCodeValid("1d6"));
    // });
    // it("should return true with value '4d3'", () => {
    //   assert.isTrue(api.isDiceCodeValid("4d3"));
    // });
    // it("should return true with value '4d3-8'", () => {
    //   assert.isTrue(api.isDiceCodeValid("4d3-8"));
    // });
    // it("should return true with value '1d6+4'", () => {
    //   assert.isTrue(api.isDiceCodeValid("1d6+4"));
    // });
  });
});
