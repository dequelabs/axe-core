const fs = require('fs');
const glob = require('glob');
const path = require('path');

// let files = glob.sync('checks/**/!(*-after|*-evaluate).js');

// // remove already converted files
// files.forEach(file => {
//   const evaluate = file.substr(0, file.length - 3) + '-evaluate.js';
//   if (glob.sync(evaluate).length === 0 && file !== 'checks/index.js') {
//     fs.renameSync(file, evaluate);
//   }
// });

// files = glob.sync('checks/**/*.json');

// files.forEach(file => {
//   const name = file.substr(0, file.length - 5) + '.js';
//   fs.renameSync(file, name);
// });
// // console.log('files:', files);

// files = glob.sync('checks/**/!(*-after|*-evaluate).js');

// files.forEach(file => {
//   if (file === 'checks/index.js') return;

//   contents = fs.readFileSync(file, 'utf-8').trim();
//   const name = path.basename(file, '.js');
//   const cammelCase = name.replace(/(-.)/g,function(x){return x[1].toUpperCase()});

//   if (!contents.includes(`import ${cammelCase}`)) {

//     let after = '';
//     if (contents.includes("after")) {
//       after = `\nimport ${cammelCase}After from './${name}-after';`;
//     }

//     contents = `import ${cammelCase}Evaluate from './${name}-evaluate';${after}\n\nconst ${cammelCase}Metadata = ${contents};\n\nexport default ${cammelCase}Metadata;`;
//   }

//   contents = contents.replace(/"id": "(.*)"/, `id: '$1'`);
//   contents = contents.replace(/"evaluate": ".*"/, `evaluate: ${cammelCase}Evaluate`);
//   contents = contents.replace(/"after": ".*"/, `after: ${cammelCase}After`);
//   contents = contents.replace(/"metadata": \{/, `metadata: {`);
//   contents = contents.replace(/"impact": "(.*)"/, `impact: '$1'`);
//   contents = contents.replace(/"messages": \{/, `message: {`);
//   fs.writeFileSync(file, contents);
// });

files = glob.sync('checks/**/!(*-after|*-evaluate).js');
let indexContents = fs.readFileSync('checks/index.js');

files.forEach(file => {
  contents = fs.readFileSync(file, 'utf-8').trim();
  const name = path.basename(file, '.js');
  const cammelCase = name.replace(/(-.)/g,function(x){return x[1].toUpperCase()});

  if (!indexContents.includes('export { default as ${cammelCase}Metadata }')) {
    indexContents = indexContents + `\nexport { default as ${cammelCase}Metadata } from './${file}.js';`;
  }
});

fs.writeFileSync('checks/index.js', indexContents);