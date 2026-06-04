const { build } = require('esbuild');
const path = require('path');
const assert = require('assert');

module.exports = function (grunt) {
  grunt.registerMultiTask(
    'esbuild',
    'Task to run the esbuild javascript bundler',
    function () {
      const done = this.async();
      const files = grunt.task.current.data.files;

      files.forEach(file => {
        const src = Array.isArray(file.src) ? file.src : [file.src];
        const dest = file.dest;
        const options = file.options || {};

        src.forEach(entry => {
          const name = path.basename(entry);
          if (file.cwd) {
            entry = path.join(file.cwd, entry);
          }

          build({
            entryPoints: [entry],
            outfile: path.join(dest, name),
            minify: false,
            bundle: true,
            ...options
          })
            .then(result => {
              if (options.metafile && file.validateImports) {
                const { max, maxSize } = file.validateImports;
                const { inputs } = result.metafile;
                const entries = Object.entries(inputs);

                assert(
                  entries.length <= max,
                  `${entry} imported too many files (max: ${max}): ${entries.length}`
                );
                for (const [key, value] of entries) {
                  assert(
                    value.bytes <= maxSize,
                    `${key} import size too large (max: ${maxSize}): ${value.bytes}`
                  );
                }
              }

              done(result);
            })
            .catch(e => {
              grunt.fail.fatal(e);
              done();
            });
        });
      });
    }
  );
};
