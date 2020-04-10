const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { execSync } = require('child_process');

// get all checks
glob.sync('lib/checks/visibility/*.js').forEach(filePath => {
  const fileName = path.basename(filePath, '.js');
  const fileDir = path.dirname(filePath);

  // rename
  execSync(`git mv ${filePath} ${fileDir}/${fileName}-evaluate.js`);
});