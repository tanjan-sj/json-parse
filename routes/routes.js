const express = require('express');
const router = express.Router();
const {readFile} = require("../service/csvService")
const {parse} = require('csv-parse')

const assert = require('assert');
const fs = require('fs')
const parser = parse({
    delimiter: ','
});

const inputPath = "/Users/sumayajannat/Documents/petProjects/json-parse/test.csv";

router.get('/test', async function (req, res, next) {
    let responseBody = {};

    try{
        responseBody = await readFile(inputPath);
        console.log("responseBody: ", responseBody);
        res.status(200).json(responseBody);
    }catch(error){
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

module.exports = router;
