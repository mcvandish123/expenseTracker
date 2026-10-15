import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
/**
yargs()
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    })
  }, function (argv) {
    console.log('hello', argv.name, 'welcome to yargs!')
  })
  .help()
  .parse(hideBin(process.argv))  

const argv = yargs(hideBin(process.argv))
  .option('name', {
    alias: 'n',
    demandOption: true,
    describe: 'this is a name',
    type: 'string'
  })
  .argv
console.log(`Hello ${argv.name}!`);  **/

yargs(hideBin(process.argv))
  .command('add <task>', 'Add a new task', (yargs) => {
    return yargs.positional('task', {
      describe: 'Task description',
      type: 'string'
    });
  }, (argv) => {
    console.log(`Adding new task: ${argv.task}`);
  })
  .command('list', 'List all tasks', () => {
    console.log('Listing tasks...');
    // Code to list tasks here
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .argv;
