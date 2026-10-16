import {readFile, writeFile} from 'node:fs/promises';

const fileName = './readWriteFile/expense.json'
async function loadExpense() {
  try {
    const response = await readFile(fileName, 'utf-8');

    return JSON.parse(response);
  } catch {
    return [];
  }
}

async function saveExpense(expenseData) {
  try {
    return await writeFile(fileName, JSON.stringify(expenseData, null, 2));
    
  } catch(err) {
    console.error(`Failed to fetch ${err}`);
  }
}

export { loadExpense, saveExpense }