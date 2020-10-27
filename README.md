# nodejs-cmd-app

Assumption: 

1. If the text file contains: <b>NO_FUNCTION</b> Luna Lola Female then the INVALID will be written to the console
2. If the text file container: GET_RELATIONSHIP Minerva <b>incorrect_relation</b> then RELATION_NOT_FOUND will be written to the console


## Clone Git Repository or Download Code ( inside folder where you want the code ) 
https://github.com/m55an5/nodejs-cmd-app

## Move to the root folder
cd nodejs-cmd-app/


# Docker 

if you have docker, you can use the following steps to install and run the app in a docker container and pass your text file

<b>Build the Image</b>

docker image build -t family-tree-cli-image .

<b>Run the containe and attached your volume to pass in the text file</b>

docker container run --name family_tree_machine --rm -v /USER/PATH/TO/TEXTFILE.txt:/attached_file.txt family-tree-cli-image

<b>Note:</b> replace /USER/PATH/TO/TEXTFILE.txt with your text file path on your machine


# No Docker Install ( to install dev dependencies in this case )
npm install

## Run Tests
npm test

## Run App
node . <PATH_TO_TXT_FILE>


<b>if on Unix system can also do the following to run the app</b>

npm link

family-tree-cli <PATH_TO_TXT_FILE>
 




