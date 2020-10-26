let fr = require("fs");

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

function processArgs(args) {
    if ( args.length < 1 || args.length > 1){
        process.env.NODE_ENV !== 'test' ? usage() : null;
        return false;
    }
    
    if (!fr.existsSync(args[0])) {
        process.env.NODE_ENV !== 'test' 
                ? console.log("\nError: File '" + args[0] + "' is invalid")
                : null;
        process.env.NODE_ENV !== 'test' ? usage() : null;
        return false;
    }
    return true;
}

module.exports = {
    processArgs
}
