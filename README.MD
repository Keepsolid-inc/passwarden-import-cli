### Dependencies
- NodeJS >= 12.0


####If you previously had an importer version installed, you need to remove the old link
- `npm unlink psw-import-cli` for linux 
- `npm remove -g psw-import-cli` for iOS

### Install _(from the root of the project)_
- `npm i`
- `npm run build`
- `npm link`


### Usage
The utility is launched by the command `psw-import-cli` in the terminal from any directory.  
The following options are required:
- `-r, --resource` - type import (choices: "Chrome", "Firefox", "LastPass", "1Password", "Dashlane", "Enpass")
- `-i, --import` - input file path
- `-o, --output` - output file name
- `-h, --help` - display help for command

###Example
`psw-import-cli -r Firefox -i ./../../firefox.csv -o outputFirefoxFile`
