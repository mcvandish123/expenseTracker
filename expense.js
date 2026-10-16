#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { loadExpense, saveExpense } from './readWriteFile/fileHandling.js'

const events = new Date().toISOString;

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
   console.log(`Expense added successfully (ID: ${data.id}})`)
}

function listExpenses(expenseData) {
  console.log('LISTS OF ALL EXPENSES:')
  console.log('ID:'.padEnd(5) + 'Description'.padEnd(30) + 'Amount')
  expenseData.map(({id, description, amount}) => {
    console.log(String(id).padEnd(5) + description.padEnd(30) + amount);
  });
}

function deleteExpenses(expenseData, argv) {
  const idArgv = argv.id;
  const expenseId = expenseData.findIndex(expense => expense.id === Number(idArgv));

  if (expenseId !== -1) {
    expenseData.splice(expenseId, 1);
    saveExpense(expenseData);
    console.log(`deleted ID: ${idArgv}`);
  } else {
    console.log('must be a positive number');
  }
}

function summaryExpenses(expenseData) {
  const summary = Object.values(expenseData).reduce((acc, expense) => acc + expense.amount, 0);

  console.log(`Total expenses: $${summary}`);
}

function summaryExpenseMonth(expenseData, argv) {
  const monthExpenses = expenseData.filter(
    expense => new Date(expense.date).getMonth() + 1 === argv.month 
  );
  const totalExpenses = monthExpenses.reduce((acc, month) => acc + month.amount, 0);
  console.log(`Total expenses for ${argv.month}: $${totalExpenses}`);
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
  }))

  .command('list', 'list of all the commands', () => {}, 
    () => {listExpenses(expenseData);})

  .command('delete', 'deletes a specific expense', (yargs) => {
    return yargs.option('id', {
      alias: 'i',
      describe: 'shows an ID of a certain expense',
      demandOption: 'true',
      type: 'number'
    })
  }, ((argv) => {
    deleteExpenses(expenseData, argv);}))

  .command('summary', 'summary of all expenses', (yargs) => {
    return yargs.option('month', {
      alias: 'm',
      describe: 'summary of each month expenses',
      type: 'number'
    });
  },
  ((argv) => {
    if (!argv.month) {
      summaryExpenses(expenseData);
    } else {
      summaryExpenseMonth(expenseData, argv)
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
