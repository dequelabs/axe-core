const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { execSync } = require('child_process');

// get all checks
glob.sync('lib/checks/**/*.json').forEach(metadataPath => {
  const metadataName = path.basename(metadataPath, '.json');
  const metadataDir = path.dirname(metadataPath);
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

  const evaluatePath = path.join(metadataDir, metadata.evaluate);
  const evaluateName = path.basename(metadata.evaluate, '.js');

  // console.log({
  //   metadataPath,
  //   metadataName,
  //   metadataDir,
  //   evaluatePath,
  //   evaluateName
  // });

  // rename
  if (!metadata.evaluate.endsWith('evaluate.js')) {
    const rename = evaluateName + '-evaluate.js';
    const renamePath = path.join(metadataDir, rename);

    metadata.evaluate = rename;
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, '\t'));

    if (!fs.existsSync(renamePath)) {
    // console.log(`git mv ${evaluatePath} ${renamePath}`);
      execSync(`git mv ${evaluatePath} ${renamePath}`);
    }
  }

  if (metadata.after && !metadata.after.endsWith('after.js')) {
    const afterPath = path.join(metadataDir, metadata.after);
    const afterName = path.basename(metadata.after, '.js');

    const rename = afterName + '-after.js';
    const renamePath = path.join(metadataDir, rename);

    metadata.after = rename;
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, '\t'));

    if (!fs.existsSync(renamePath)) {
    // console.log(`git mv ${afterPath} ${renamePath}`);
      execSync(`git mv ${afterPath} ${renamePath}`);
    }
  }
});