const path = require('path');
const fs = require('fs');
const PreferencesDirectory = 'hyperjs_preferences';
enum Platforms {
  Windows = 'windows.js',
  Mac = 'other.js'
};

interface HyperJS {
  // TODO
  config: {
    shell: string;
  };
};

function writeHyperJS(name: string, data: HyperJS) {
  const filepath = path.join(process.cwd(), PreferencesDirectory, name);
  fs.writeFile(filepath, `module.exports = ${JSON.stringify(data,null,2)};`, function (err) {
    if (err) {
      throw err;
    }
  });
}

function generatePreference(hyperjs: HyperJS, platform: Platforms): HyperJS {
  if (platform == Platforms.Windows) {
    hyperjs.config.shell = 'C:\\Windows\\System32\\bash.exe';
  } else {
    hyperjs.config.shell = '';
  }
  return hyperjs;
}

import * as hyperjs from './.hyper.js';


const color = require('color');
const decretum = {
  background: '#646786',
  foreground: '#8abfcf'
};

const syntax = {
  backgroundColor: color(decretum.foreground).alpha(0).string(),
  borderColor: decretum.background,
};

const hjs = Object.assign(hyperjs, {"config": Object.assign(hyperjs.config, syntax)});

// Bash on Windows
writeHyperJS(Platforms.Windows, generatePreference(hjs, Platforms.Windows));
// Others
writeHyperJS(Platforms.Mac, generatePreference(hjs, Platforms.Mac));
