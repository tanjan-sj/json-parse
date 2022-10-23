const express = require('express');
const router = express.Router();
const {readFile, saveFileToJson} = require("../service/csvService")

const inputPath = "./newDataset.csv";

router.get('/test', async function (req, res, next) {
    try{
        const responseBody = await readFile(inputPath);
        const json = JSON.stringify(responseBody);

        await saveFileToJson(json);
        res.status(200).json({"msg": "successfully saved file"});

    }catch(error){
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

module.exports = router;
