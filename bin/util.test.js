let util = require("./util");

describe("testing generateId function", () => {

    it("will call generateId and return string of length 5", () => {
        let res = util.generateID();
        expect(res.length).toEqual(5);
    });

});