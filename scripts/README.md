# Train the Trainer Scripts
This directory contains scripts used in the class by the trainer

## Main.js

This script will take a repository as a template and create a copy in the target organization for each user in the input file.

1. Run `npm -i`
2. Create `dev/stdinv.json` in `/scripts`
3. JSON file is an array of github user names.
4. Run the following command in `/scripts`:

```
node  main.js --token <Personal Access Token> --org <Target Org> --template <templateOrg/TemplateRepo> --file dev/stdinv.json
```
