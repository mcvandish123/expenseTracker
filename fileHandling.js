import {readFile, writeFile} from 'node:fs/promises';

const fileName = './expense.csv'
async function readFile() {
  try {
    const response = await fs.readFile(fileName, 'utf-8');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return JSON.parse(response);
  } catch (err) {
    console.error(`Problem: ${err}`);
    return [];
  }
}

async function writeFile() {
  const contentData = await writeFile(fileName, JSON.stringify(parseData, null, 2));
  console.log(`csv file saved successfully!`);
}

export { readFile, writeFile }