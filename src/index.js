#!/usr/bin/env node

let fr = require("fs");
const {processArgs} = require('./../bin/processArgs');
const { addChild, getRelationship, loadInitialFamilyTree} = require('./../controller/personController');

const readFile = (fileName) => {
    return new Promise((resolve)=> {
        let dataStream = fr.createReadStream(fileName, { encoding: "utf-8"});
        let dataArr ;

        dataStream.on("data", data => {
            dataArr = data.split(/\n/);
        })

        dataStream.on("end", () => {
            resolve(dataArr);
        })
    })
}

function performActions(arrItems){
    for(actionItem of arrItems){
        let result = "";
        switch (actionItem[0]) {
            case 'ADD_CHILD':
                result = addChild(actionItem);
                console.log(result);
                break;
            case 'GET_RELATIONSHIP':
                result = getRelationship(actionItem);
                console.log(result);
                break;
            default:
                console.log("INVALID")
                break;
        }
    }
}

async function processFile(fileName) {
    let linesArr = [];

    // read each line in file into an array
    await readFile(fileName)
        .then( (data) => {
            linesArr = data;
        });  
    
    // convert array string item (line) into array items 
    const actionItems = linesArr.map((line) => {
        return line.split(" ");
    });

    // return the array items to perform actions on them
    return actionItems;
    
}

async function startProcessing() {
    const actionItems = await processFile(args[0]); 
    performActions(actionItems);
}

const args = process.argv.slice(2);

if (processArgs(args)){
    loadInitialFamilyTree();
    startProcessing();
}
