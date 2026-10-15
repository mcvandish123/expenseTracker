#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

function parseArgs() {
  const argv = yargs(hideBin(process.argv))
    .option('description', {
      alias: 'd',
      demandOption: true,
      describe: 'description of the expenses',
      type: 'string'
    })
    .option('amount', {
      alias: 'a',
      demandOption: true,
      describe: 'amount of the expenses',
      type: 'int'
    })
    .help()
    .argv;
    
    const valueArgv = argv;

    return valueArgv;
}

function expenseTracking() {

  switch(parseArgs()) {
    case "add":
      console.log('added new changes')
      break;

    case "list":
      break;
    
    case "summary:":
      break;
    
    case "delete":
      break;
    
    default:
      console.log('Please try again');
      break;

  }
}

expenseTracking();