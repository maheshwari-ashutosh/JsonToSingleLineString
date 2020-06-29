const argv = require('yargs').argv;
const fs = require('fs');

const inputFile = argv.input;
if (!inputFile) {
  throw new Error('Please provide input file');
}

const inputText = fs.readFileSync(inputFile).toString();
const strArr = Array.from(inputText);

let outText = '';
let spaceIdx = 0;
strArr.forEach((char, idx) => {
  if (char === '\n') {
    outText += '\\n';
  } else if (char === '"') {
    outText += '\\"';
  } else if (char === ' ' && spaceIdx%2) {
    outText += '\\t';
  } else if (char === '\r' || char === ' ') {
  } else {
    outText += char;
  }
  if (char === ' ' && !spaceIdx%2) {
    spaceIdx++;
  } else {
    spaceIdx = 0;
  }
});

const outputFile = argv.output;
fs.writeFileSync(outputFile, outText);
