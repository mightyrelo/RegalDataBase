var express = require('express');
var router = express.Router();

var csvCtrl = require('../controllers/testCSV');

/* GET home page. */
router.get('/', csvCtrl.csvTester);

module.exports = router;
