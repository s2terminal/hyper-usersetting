const path = require('path');
const fs = require('fs');
const PreferencesDirectory = 'hyperjs_preferences';
enum Platforms {
  Windows = 'windows.js',
  Linux = 'linux.js',
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

// Font settings
hyperjs.config.fontFamily = "Myrica M,Ricty Diminished Discord,ＭＳ ゴシック,DejaVu Sans Mono,Noto Sans Mono,Osaka-Mono";
hyperjs.config.fontSize = 16;
hyperjs.config.lineHeight = 1;
hyperjs.config.letterSpacing = 0;
hyperjs.config.cursorBlink = true;
hyperjs.config.css = `
.hyper_main{
  background:linear-gradient(to bottom left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url(http://www.top4themes.com/data/out/123/6442400-sayaka-miki-wallpapers.png) no-repeat top right;
  background-color:#646786;
}`;
hyperjs.config.quickEdit = false;
hyperjs.config.macOptionSelectionMode = 'vertical';
hyperjs.config.webGLRenderer = true;
hyperjs.config.opacity = {
  focus: 0.9,
  blur: 0.5
};
hyperjs.plugins.push("hyper-opacity");

// Syntax Highlihgt
const color = require('color');
const foregroundColor = "#f3f4ef";
const backgroundColor = "#22242d";
const red = "#ff1654";
const green = "#06d6a0";
const yellow = "#ffe66d";
const blue = "#00abe7";
const magenta = "#ff60b5";
const cyan = "#7bdff2";
const white = "#f9f9f9";

const syntax = {
  // https://github.com/yxuko/hyper-altair/blob/master/index.js
  backgroundColor: color(backgroundColor).alpha(0).string(),
  foregroundColor,
  borderColor: "#211f30",
  cursorColor: "#b4b4ba",
  cursorAccentColor: backgroundColor,
  selectionColor: "rgba(78, 205, 196, 0.4)",
  colors: {
    black: backgroundColor,
    red,
    green,
    yellow,
    blue,
    magenta,
    cyan,
    white,
    lightBlack: "#7a7a7a",
    lightRed: red,
    lightGreen: green,
    lightYellow: yellow,
    lightBlue: blue,
    lightMagenta: magenta,
    lightCyan: cyan,
    lightWhite: foregroundColor
  }
};

const hjs = Object.assign(hyperjs, {"config": Object.assign(hyperjs.config, syntax)});

// Bash on Windows
writeHyperJS(Platforms.Windows, generatePreference(hjs, Platforms.Windows));
// Linux
writeHyperJS(Platforms.Linux, generatePreference(hjs, Platforms.Linux));
// Others
writeHyperJS(Platforms.Mac, generatePreference(hjs, Platforms.Mac));
