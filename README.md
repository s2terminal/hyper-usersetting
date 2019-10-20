# hyper-usersetting

[Hyper™](https://hyper.is/)term preferences

## Usage
### Linux
```
$ mkdir ~/git; cd $_
$ git clone git@github.com:s2terminal/hyper-usersetting.git
$ rm "$HOME/.config/hyper/.hyper.js" &&  ln -s "$(pwd)/hyperjs_preferences/linux.js" "$HOME/.config/hyper/.hyper.js"
```

### Windows Subsystem for Linux (WSL, Bash on Windows)
Open PowerShell and run this.
```
PS > rm "C:\Users\$(Get-Content env:username)\AppData\Roaming\Hyper\.hyper.js"
PS > cmd /c mklink "C:\Users\$(Get-Content env:username)\AppData\Roaming\Hyper\.hyper.js" "$(pwd)\hyperjs_preferences\windows.js"
```

### Mac
```
$ rm "$HOME/.hyper.js"
$ ln -s "$(pwd)/hyperjs_preferences/other.js" "$HOME/.hyper.js"
```

## developing
```
$ npm install --save-dev
```

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
