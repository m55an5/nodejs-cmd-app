let {processArgs} = require("./processArgs");

describe("testing processArgs function", () =>{
    
    let mockArr;
    
    it("will call processArgs with empty array", () => {
        mockArr = [];
        let res = processArgs(mockArr);
        expect(res).toEqual(false);
    });

    it("will call processArgs with array of 2 item", () => {
        mockArr = ["a","b"];
        let res = processArgs(mockArr);
        expect(res).toEqual(false);
    });

    it("will call processArgs with array of 1 item of incorrect path", () => {
        mockArr = ["a"];
        let res = processArgs(mockArr);
        expect(res).toEqual(false);
    });

    it("will call processArgs with array of 1 item of correct path", () => {
        mockArr = [process.cwd()+"/testing.txt"];
        let res = processArgs(mockArr);
        expect(res).toEqual(true);
    });


});