const { build } = require('esbuild');
const path = require('path');

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

        src.forEach(entry => {
          const name = path.basename(entry);
          if (file.cwd) {
            entry = path.join(file.cwd, entry);
          }

          build({
            entryPoints: [entry],
            outfile: path.join(dest, name),
            minify: false,
            bundle: true
          })
            .then(done)
            .catch(done);
        });
      });
    }
  );
};
