import * as fs from "fs";
import * as path from "path";
const PreferencesDirectory = "hyperjs_preferences";
enum Platforms {
  Windows = "windows.js",
  Mac = "other.js"
}

interface IHyperJS {
  // TODO
  config: {
    shell: string;
  };
}

function writeHyperJS(name: string, data: IHyperJS) {
  const filepath = path.join(process.cwd(), PreferencesDirectory, name);
  fs.writeFile(
    filepath,
    `module.exports = ${JSON.stringify(data, null, 2)};`,
    err => {
      if (err) {
        throw err;
      }
    }
  );
}

function generatePreference(hyper: IHyperJS, platform: Platforms): IHyperJS {
  if (platform === Platforms.Windows) {
    hyper.config.shell = "C:\\Windows\\System32\\bash.exe";
  } else {
    hyper.config.shell = "";
  }
  return hyper;
}

import * as hyperjs from "./.hyper.js";

// Bash on Windows
writeHyperJS(Platforms.Windows, generatePreference(hyperjs, Platforms.Windows));
// Others
writeHyperJS(Platforms.Mac, generatePreference(hyperjs, Platforms.Mac));
