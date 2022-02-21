const path = require('path').posix;
const glob = require('glob');
const fs = require('fs');

function toTitleCase(str) {
  return str.replace(/-\w/g, txt => {
    return txt.charAt(1).toUpperCase() + txt.substr(2).toLowerCase();
  });
}

module.exports = function(grunt) {
  grunt.registerMultiTask(
    'metadata-function-map',
    'Task to generate the metadata-function-map file',
    function() {
      const files = grunt.task.current.data.files;

      files.forEach(file => {
        const src = Array.isArray(file.src) ? file.src : [file.src];
        const map = {};
        let outFile =
          '// This file is automatically generated using build/tasks/metadata-function-map.js\n';

        src.forEach(globPath => {
          glob.sync(globPath).forEach(filePath => {
            const relativePath = path.relative(
              path.dirname(file.dest),
              filePath
            );
            const filename = path.basename(filePath, '.js');
            const functionName = toTitleCase(filename);

            outFile += `import ${functionName} from '${relativePath}';\n`;
            map[filename] = functionName;
          });
        });

        outFile += `\nconst metadataFunctionMap = {\n`;
        outFile += Object.keys(map)
          .sort()
          .map(key => `  '${key}': ${map[key]}`)
          .join(',\n');
        outFile += `\n};\n\nexport default metadataFunctionMap;`;

        fs.writeFileSync(file.dest, outFile, 'utf-8');
      });
    }
  );
};
