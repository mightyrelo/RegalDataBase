const fs = require('fs');
const csvParser = require('csv-parser');

const csvTester = (req, res) => {
    console.log('hello');
    const result = [];
    const elements = [];
    fs.createReadStream('./testData.csv')
      .pipe(csvParser({separator: ';'}))
      .on("data", (data)=> {
        //elements = data.split(";");
        result.push(data);
        })
      .on("end", ()=>{
        console.log(result);
      });

    res.render('index', 
    { 
        title: 'Express' 
    });
};

module.exports = {
    csvTester
};