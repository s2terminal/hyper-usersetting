# hyperterminal-usersetting

## Usage

### Windows Subsystem for Linux (WSL, Bash on Windows)

```
PS > rm "C:\Users\$(Get-Content env:username)\.hyper.js"
PS > cmd /c mklink "C:\Users\$(Get-Content env:username)\.hyper.js" "$(pwd)\hyperterminal-usersetting\.hyper.js"
```
