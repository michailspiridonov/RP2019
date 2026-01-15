const fs = require('fs');
const pdf = require('pdf-parse');
const extractKeywords = require('./keywordExtractor');

function parsePdf(path, callback) {
  try{
    let dataBuffer = fs.readFileSync(path);
    pdf(dataBuffer).then(function (data) {
      // PDF text
      let info = [];
      
      dataExtraction(data.text, result => {
        info = result;
        info[2] = path;
      extractKeywords(data.text, result => {
        info[7] = result;
      });
    });
    info[8] = data.text;
    callback(info);
  });
  }catch (err) {
  }
}

function dataExtraction(text, callback) {
  let lines = text.split('\n');
  let info = [];
  let i;
  try {
  for (i = 0; i < lines.length; i++) {
    if (lines[i].includes('Autor') && !info[0]) {
      info[0] = lines[i].split(':')[1].trim();
    }
    if (lines[i].includes('Téma') && !info[1]) {
      info[1] = lines[i].split(':')[1].trim();
    }
    if (lines[i].includes('Třída') && !info[3]) {
      info[3] = lines[i].split('.')[1].trim();
    }
    if (lines[i].includes('Školní rok') && !info[4]) {
      info[4] = lines[i].split(':')[1].split('/')[0].trim();
    }
    if (lines[i].includes('Předmět') && !info[5]) {
      info[5] = lines[i].split(':')[1].trim();
    }
    if (lines[i].includes('Vedoucí práce') && !info[6]) {
      info[6] = lines[i].split(':')[1].trim();
    }
  }
  } catch (err) {
    console.log(err);
  }
  callback(info);
}

module.exports = parsePdf;