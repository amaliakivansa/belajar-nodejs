const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'article.txt');

const readableStream = fs.createReadStream(pathFile, {
  highWaterMark: 10,
});

readableStream.on('readable', () => {
  try {
    process.stdout.write(`[${readableStream.read()}]`);
  } catch (error) {
    console.error(error);
  }
});

readableStream.on('end', () => {
  console.log('Done');
});
