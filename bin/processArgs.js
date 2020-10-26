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
        usage();
        process.exit(1);
    }
    
    if (!fr.existsSync(args[0])) {
        console.log("\nError: File '" + args[0] + "' is invalid");
        usage();
        process.exit(1);
    }
}

module.exports = {
    processArgs
}
