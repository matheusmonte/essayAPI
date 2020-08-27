var express = require('express');
var Constants = require('constants');
const db = require("../data/database.js");
var router = express.Router();


const File = require('../models/file');

router.get('/',function(req, res, next) {
    let sql = "select * from files"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});


router.get("/:id", (req, res, next) => {
    var sql = "select * from files where authorId = ? or downloadedBy = ?"
    var params = [req.params.id, req.params.id]
    db.all(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

router.put('/status', function (req, res){
    let sql ='UPDATE files SET status=$status where fileId = $fileId'
    let params = {
        $fileId :req.body.fileId,
        $status :req.body.status
    }

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": params,
            "id" : this.lastID
        })
    });
});

router.put('/downloaded', function (req, res){
    let sql ='UPDATE files SET downloadedBy=$userId where fileId = $fileId'
    let params = {
        $fileId :req.body.fileId,
        $userId :req.body.userId
    }

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": params,
            "id" : this.lastID
        })
    });
});

router.put('/uploaded', function (req, res){
    let sql ='UPDATE files SET physicalLocation=$physicalLocation where fileId = $fileId'
    let params = {
        $fileId :req.body.fileId,
        $physicalLocation :req.body.physicalLocation
    }

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": params,
            "id" : this.lastID
        })
    });
});

router.post('/register',function(req, res, next) {

    let fileList = new File(req.body.title, req.body.authorId, req.body.physicalLocation, 'PENDING'   ).getInstance();

    let sql ='INSERT INTO files (fileId, title, authorId, physicalLocation, status, dataCreated) VALUES ($fileId, $title,$authorId,$physicalLocation,$status,$dataCreated)'
    let params = {
        $fileId : fileList.fileId,
        $title : fileList.title ,
        $authorId : fileList.authorId ,
        $physicalLocation : fileList.physicalLocation ,
        $status : 'PENDING' ,
        $dataCreated : fileList.dataCreated
    }

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": fileList,
            "id" : this.lastID
        })
    });
});


router.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.sampleFile;
    let filePath = `${Constants.FILE_PATH}${req.files.foo.name}`
    sampleFile.mv(filePath, function(err) {
        if (err)
            return res.status(500).send(err);

        res.send(filePath);
    });
});

module.exports = router;