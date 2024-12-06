const fs = require('fs');
const path = require('path');

const pathFile = path.resolve(__dirname, 'notes.txt');

fs.readFile(pathFile, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
