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
                if(data[1] != 'Metadata' && data[0] != 'Playtime'){
                    csvData.push(data);
                }
            })
            .on('end', () => {
                csvData.forEach(element => {
                    // console.log("playtime: ", element[0]);
                    // console.log("element: ", element[1]);
                    if(element[1]){
                        let metadata = JSON.parse(element[1]);

                        const row = {
                            "playtime": element[0],
                            "fileName": metadata["filename"],
                            "cast": metadata["cast"],
                            "genre" : metadata["genre"],
                            "director": metadata["director"]
                        }
                        response.push(row);
                    }
                });
                resolve(response);
            })
            .on('error', reject);
    })
}

const saveFileToJson = async(json) => {
    fs.writeFile('./processedCSV.json', json, 'utf8', function (err) {
        if (err) {
            return err;
        }
    });
}

module.exports = {
    readFile,
    saveFileToJson
}