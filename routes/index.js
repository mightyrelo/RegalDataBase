var express = require('express');
var router = express.Router();

var csvCtrl = require('../controllers/testCSV2');

/* GET home page. */
router.get('/', csvCtrl.csvTester2);

module.exports = router;
