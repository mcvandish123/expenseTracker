#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { loadExpense, saveExpense } from './readWriteFile/fileHandling.js'

const events = new Date().toISOString();

function addExpenses(expenseData, argv) {
   const data = {
    id: 0,
    description: argv.description,
    amount: argv.amount,
    date: events
   }

   const dataId = expenseData.length > 0 ? Math.max(...expenseData.map(expense => expense.id)) + 1 : 1;
   data.id = dataId;
   expenseData.push(data);
   saveExpense(expenseData);
}

function listExpenses() {
  
}

function deleteExpenses() {

}

function summaryExpenses() {
  
}
 
async function parseChecking() {
  const expenseData = await loadExpense();

  const argv = yargs(hideBin(process.argv))
  .command('add', 'adding of both options', (yargs) => {
    return yargs.option('description', {
      alias: 'd',
      demandOption: true,
      describe: 'description of the expenses',
      type: 'string'
    })
    .option('amount', {
      alias: 'a',
      demandOption: 'true',
      describe: 'amount of the expenses',
      type: 'number'
    });
  }, ((argv) => {

    addExpenses(expenseData, argv);
    console.log(`${argv.description} ${argv.amount}`)
  }))

  .command('list', 'list of all the commands', () => {}, 
  ((argv) => {
    listExpenses();
    console.log('Lists of all expenses:')}))

  .command('delete', 'deletes a specific expense', (yargs) => {
    return yargs.option('id', {
      alias: 'i',
      describe: 'shows an ID of a certain expense',
      demandOption: 'true',
      type: 'number'
    })
  }, ((argv) => {
    deleteExpenses();
    console.log(`deleted an ID: ${argv.id}`)}))

  .command('summary', 'summary of all expenses', (yargs) => {
    return yargs.option('month', {
      alias: 'm',
      describe: 'summary of each month expenses',
      type: 'number'
    });
  },
  ((argv) => {
    summaryExpenses();
    if (!argv.month) {
      console.log('Lists of all expenses');
    } else {
      console.log(`expenses for the month of ${argv.month}: `)
    }
  }))
  .help()
  .argv;

}

parseChecking();



/**
function expenseTracking() {

  switch() {
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
}   */
