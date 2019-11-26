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
// // console.log('files:', files);

// files = glob.sync('rules/*.json');

// files.forEach(file => {
//   const name = file.substr(0, file.length - 5) + '.js';
//   fs.renameSync(file, name);
// });

// files = glob.sync('rules/!(*-after|*-evaluate|*-matches).js');

// files.forEach(file => {
//   if (file === 'rules/index.js') return;

//   contents = fs.readFileSync(file, 'utf-8').trim();
//   const name = path.basename(file, '.js');
//   const cammelCase = name.replace(/(-.)/g,function(x){return x[1].toUpperCase()});


//   let matches = '';
//   let matchedName = '';
//   let machedCammelCase = '';
//   if (!contents.includes(`import ${cammelCase}`)) {

//     if (contents.includes("matches")) {
//       matchedName = path.basename(contents.match(/"matches": "(.*?)"/)[1], '.js');
//       machedCammelCase = matchedName.replace(/(-.)/g,function(x){return x[1].toUpperCase()});

//       matches = `import ${machedCammelCase} from './${matchedName}';\n\n`;
//     }

//     contents = `${matches}const ${cammelCase}Metadata = ${contents};\n\nexport default ${cammelCase}Metadata;`;
//   }

//   contents = contents.replace(/"matches": "(.*?)"/, `matches: ${machedCammelCase}`);
//   contents = contents.replace(/"(.*?)":/g, '$1:');
//   contents = contents.replace(/"/g, "'");
//   fs.writeFileSync(file, contents);
});

files = glob.sync('rules/!(*-after|*-evaluate|*-matches).js');
let indexContents = fs.readFileSync('rules/index.js');

files.forEach(file => {
  contents = fs.readFileSync(file, 'utf-8').trim();
  const name = path.basename(file, '.js');
  const cammelCase = name.replace(/(-.)/g,function(x){return x[1].toUpperCase()});

  if (!indexContents.includes('export { default as ${cammelCase}Metadata }')) {
    indexContents = indexContents + `\nexport { default as ${cammelCase}Metadata } from './${file}';`;
  }
});

fs.writeFileSync('rules/index.js', indexContents);