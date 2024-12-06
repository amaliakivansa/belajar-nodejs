const fs = require('fs');
const path = require('path');

const pathFile = path.resolve(__dirname, 'input.txt');

const readableStream = fs.createReadStream(pathFile, {
  highWaterMark: 10,
});

const writeableStream = fs.createWriteStream(
  path.join(__dirname, 'output.txt')
);

let readData = '';

readableStream.on('readable', () => {
  let chunk;
  while ((chunk = readableStream.read()) !== null) {
    readData += `${chunk}\n`;
  }
});

readableStream.on('end', () => {
  writeableStream.write(readData);
  writeableStream.end();
});

writeableStream.on('finish', () => {
  console.log('File Written Successfully');
});
