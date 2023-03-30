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
    const trade = Number(data.trade);
    const retail = trade*0.3 + trade;
    console.log(trade);
    Prod.create({
        name: data.name,
        description: data.description,
        trade: trade,
        selling: retail,
        userId: 'admin'
    },(err, product)=>{
        if(err) {
            console.log(err);
            sendJSONResponse(res, 400, err);
        } else {
            //console.log(product);
            //sendJSONResponse(res, 201, product);
        }
    });
};


const csvTester2 = (req, res) => {
    const products = [];
    fs.createReadStream('./sample.csv')
      .pipe(csvParser({separator: ';'}))
      .on("data", (data)=> {
        if((Number(data.trade)-1) != -1){
            products.push(data);
            createProduct(res, data);
        }

        })
      .on("end", ()=>{
        console.log(products);
      });
      res.render('index', 
      { 
          title: 'Expression',
          products
      });
};

module.exports = {
    csvTester2
};