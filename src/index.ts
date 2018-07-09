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


// refs. https://github.com/klauscfhq/hyper-pokemon/blob/master/index.js
const color = require('color');
let [primary, secondary, tertiary, unibody] = ['#eade8c', '#8abfcf', '#d6d7d9', '#53586c'];
const background    = true ? unibody : primary;
const selection     = color(primary).alpha(0.3).string();
const transparent   = color(secondary).alpha(0).string();
const header        = color(background).isDark()  ? '#FAFAFA' : '#010101';
const activeTab     = color(secondary).isDark()   ? '#FAFAFA' : '#383A42';
const tab           = color(activeTab).darken(0.1);

const syntax = {
  backgroundColor: transparent,
  borderColor: background,
  cursorColor: secondary,
  foregroundColor: secondary,
  selectionColor: selection,
  colors: {
    black: tertiary,
    red: secondary,
    green: tertiary,
    yellow: secondary,
    blue: secondary,
    magenta: secondary,
    cyan: secondary,
    white: secondary,
    lightBlack: tertiary,
    lightRed: secondary,
    lightGreen: secondary,
    lightYellow: secondary,
    lightBlue: secondary,
    lightMagenta: secondary,
    lightCyan: secondary,
    lightWhite: secondary
  }
};
const hjs = Object.assign(hyperjs, {"config": Object.assign(hyperjs.config, syntax)});

// Bash on Windows
writeHyperJS(Platforms.Windows, generatePreference(hjs, Platforms.Windows));
// Others
writeHyperJS(Platforms.Mac, generatePreference(hjs, Platforms.Mac));
