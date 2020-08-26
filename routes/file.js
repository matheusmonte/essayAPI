var express = require('express');
var router = express.Router();
const File = require('../models/file');

router.get('/',function(req, res, next) {
    let fileList = [new File('redacaoIgor', '1021', '', 'C://data/enem/redacao/redacaoIgor1231064500.doc')];
    res.status(200).send(fileList);
});

router.post('/',function(req, res, next) {
    let fileList = [new File('redacaoIgor', '1021', '', 'C://data/enem/redacao/redacaoIgor1231064500.doc')];
    res.status(200).send(fileList);
});

module.exports = router;