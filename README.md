# hyper-usersetting

[Hyper™](https://hyper.is/)term preferences

## Usage

### Windows Subsystem for Linux (WSL, Bash on Windows)
Open PowerShell and run this.
```
PS > rm "C:\Users\$(Get-Content env:username)\.hyper.js"
PS > cmd /c mklink "C:\Users\$(Get-Content env:username)\.hyper.js" "$(pwd)\hyperjs_preferences\windows.js"
```

## developing
build
```
$ npm run build
```
generate hyper preference files
```
$ npm run generate
```

## License
MIT.
