const {parse} = require('csv-parse')

const assert = require('assert');
const fs = require('fs')

const readFile = async(fileName) => {
    let csvData = [];

    return new Promise(function(resolve,reject){
        let response = [];
        let map = new Map();
        let set = new Set();
        fs.createReadStream(fileName)
            .pipe(parse())
            .on('data', (data) => {
                if(data != 'Metadata'){
                    csvData.push(data);
                }
            })
            .on('end', () => {
                csvData.forEach(element => {
                    let key = JSON.parse(element[0]);
                    const row = {
                        "fileName": key["filename"],
                        "genre" : key["genre"],
                        "director": key["director"]
                    }
                    response.push(row);
                });
                resolve(response);
            })
            .on('error', reject);
    })
}

module.exports = {
    readFile
}