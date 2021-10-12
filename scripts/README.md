# Train the Trainer Scripts
This directory contains scripts used in the class by the trainer

## Main.js
This script will take a repository as a template and create a copy in the target organization for each user in the input file.
Input is a JSON array of github user names.
Sample usage:
```
echo '["selkins13","chocrates"]' | node  main.js --token <Personal Access Token> --org <Target Org> --template <templateOrg/TemplateRepo> --file /dev/stdinv
```
