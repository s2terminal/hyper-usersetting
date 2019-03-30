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
  foregroundColor: "#eee",
  // https://github.com/equinusocio/hyper-material-theme/blob/master/index.js#L38
  colors: {
    black: '#000000',
    red: '#E54B4B',
    green: '#9ECE58',
    yellow: '#FAED70',
    blue: '#396FE2',
    magenta: '#BB80B3',
    cyan: '#2DDAFD',
    white: '#d0d0d0',
    lightBlack: 'rgba(255, 255, 255, 0.2)',
    lightRed: '#FF5370',
    lightGreen: '#C3E88D',
    lightYellow: '#FFCB6B',
    lightBlue: '#82AAFF',
    lightMagenta: '#C792EA',
    lightCyan: '#89DDFF',
    lightWhite: '#ffffff'
  }
};

const hjs = Object.assign(hyperjs, {"config": Object.assign(hyperjs.config, syntax)});

// Bash on Windows
writeHyperJS(Platforms.Windows, generatePreference(hjs, Platforms.Windows));
// Others
writeHyperJS(Platforms.Mac, generatePreference(hjs, Platforms.Mac));
