const fs = require('fs');
const csvParser = require('csv-parser');
const mongoose = require('mongoose');
require('../models/products');
const Prod = mongoose.model('Product');

const sendJSONResponse = (res, stat, content) => {
    res
      .status(stat)
      .json(content);
};

const createProduct = (res, data) => {
    Prod.create({
        name: data.name,
        description: data.description,
        trade: Number(data.trade),
        selling: Number(data.retail),
        userId: data.userId
    },(err, product)=>{
        if(err) {
            console.log(err);
            //sendJSONResponse(res, 400, err);
        } else {
            console.log(product);
           // sendJSONResponse(res, 201, product);
        }
    });
};


const csvTester = (req, res) => {
    const products = [];
    fs.createReadStream('./testData.csv')
      .pipe(csvParser({separator: ';'}))
      .on("data", (data)=> {
        products.push(data);
        createProduct(res, data);
        })
      .on("end", ()=>{
        console.log('read from file and wrote to db');
      });

    res.render('index', 
    { 
        title: 'Expression',
        products 
    });
};

module.exports = {
    csvTester
};