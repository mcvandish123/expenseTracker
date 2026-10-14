import {readFile, writeFile} from 'node:fs/promises';

const fileName = './expense.csv'
async function handleFile() {
  try {
    const response = await readFile(fileName, 'utf-8');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const parseData = JSON.parse(response);
    const contentData = await writeFile(fileName, JSON.stringify(parseData, null, 2));
    console.log(`csv file saved successfully!`);
  } catch (err) {
    console.error(`Problem: ${err}`);
  }
}