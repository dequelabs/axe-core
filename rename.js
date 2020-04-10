const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { execSync } = require('child_process');

// get all checks
glob.sync('lib/checks/visibility/*.js').forEach(filePath => {

  const fileName = path.basename(filePath, '.js');

  console.log(fileName);
});