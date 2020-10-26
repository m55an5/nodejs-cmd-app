#!/usr/bin/env node

let fr = require("fs");
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
                // console.log(`Invalid command "${actionItem[0]}"`+
                            // ` in ${actionItem.join(" ")}`);
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

function usage() {
    const usageText = `
  This app reads inputs from text file and actions on them to produce family tree.

  usage:
    node . <PATH>

    Only accepts one argument

    <PATH>:      path to the text file
  `

  console.log(usageText);
}

if ( args.length < 1 || args.length > 1){
    usage();
    process.exit(1);
}

if (!fr.existsSync(args[0])) {
    console.log("\nError: File '" + args[0] + "' is invalid");
    usage();
    process.exit(1);
}

loadInitialFamilyTree();
startProcessing();



