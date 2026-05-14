import fs from 'node:fs';
import chalk from 'chalk';
import execa from 'execa';
import createFile from './shared/create-file.mjs';
import directories from './rule-generator/directories.mjs';
import getAnswers from './rule-generator/get-answers.mjs';
import getFilesMetaData from './rule-generator/get-files-metadata.mjs';

const { CI } = process.env;

if (CI) {
  throw new Error('Cannot run Rule Generation CLI in CI.');
}

run();

async function run() {
  const axeExists = fs.existsSync(directories.axePath);
  if (!axeExists) {
    console.log(
      chalk.red.bold(
        `Axe does not exist. Triggering build using - 'npm run build'. Rule generation will continue after build.`
      )
    );
    await execa('npm run build', { shell: true });
  }

  console.log(chalk.hex('#0077c8')('Axe Rule Generator'));

  const answers = await getAnswers();

  const files = getFilesMetaData(answers);

  if (!files || !files.length) {
    console.log(chalk.red.bold(`No files to generate.`));
  }

  try {
    const result = await Promise.all(
      files.map(async meta => {
        const filePath = `${meta.dir}/${meta.name}`;
        const content = meta.content + '\n';
        await createFile(filePath, content);
        return filePath;
      })
    );
    console.log(
      chalk.green.bold(
        '\n' + 'Successfully generated RULE and respective files: '
      )
    );
    console.log(chalk.green.bold(''));
    console.log(chalk.green.bold(result.join('\r\n')));
  } catch (err) {
    console.log(
      chalk.green.bold(`Error generating RULE. Please try again.`, err)
    );
  }
}
