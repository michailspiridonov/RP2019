const fs = require('fs');
const pdf = require('pdf-parse');
const mysqlConnection = require("./connection");
const textExtract = require('./fileParser');

function getSimilarity(path, callback){
  var similarities = [];
  var dataBuffer = fs.readFileSync(path);
  pdf(dataBuffer).then(function (data) {
    var checkedText = data.text;
    extractTexts(result => {
      texts = result;
      let i;
      console.log("length of texts is: " + texts.length)
      texts.array.forEach(element, index => {
        
      });
    });
  });
  callback(similarities);
}


module.exports = getSimilarity;