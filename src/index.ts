const path = require('path');
const fs = require('fs');

interface HyperJS {
  // TODO
  config: {
    shell: string;
  };
};

function writeHyperJS(name: string, data: HyperJS) {
  const filepath = path.join(process.cwd(), 'hyperjs_preferences', name);
  fs.writeFile(filepath, `module.export = ${JSON.stringify(data,null,2)};`, function (err) {
    if (err) {
      throw err;
    }
  });
}

function generatePreference(hyperjs: HyperJS, platform: string): HyperJS {
  if (platform == 'windows') {
    hyperjs.config.shell = 'C:\\Windows\\System32\\bash.exe';
  } else {
    hyperjs.config.shell = '';
  }
  return hyperjs;
}

import * as hyperjs from './.hyper.js';

// Bash on Windows
writeHyperJS('windows.js', generatePreference(hyperjs, 'windows'));
// Mac
writeHyperJS('other.js', generatePreference(hyperjs, 'mac'));
