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
    const retail = Number(data.retail);
    Prod.create({
        name: data.description,
        description: data.regalCode,
        trade: trade,
        selling: retail,
        userId: 'admin',
        category: data.category
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
    let count = 0;
    fs.createReadStream('./regal_prices.csv')
      .pipe(csvParser({separator: ';'}))
      .on("data", (data)=> {
        if((Number(data.trade)-1) != -1){
            if(!isNaN(Number(data.trade)) && !isNaN(Number(data.retail))){
                count++;
                products.push(data);
                createProduct(res, data);    
            }
        }

        })
      .on("end", ()=>{
        console.log(count,' products read from cvs to db.');
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