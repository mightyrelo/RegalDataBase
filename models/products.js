const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    retail: {
        type: Number,
    },
    trade: {
        type: Number,
        required: true
    },
    selling: {
        type: Number,
        required: true
    },
    inStock: Number,
    userId: String,
    createdOn: {
        type: Date,
        'default': Date.now()
    },
    regalCode: {
        type: String
    },
    category: {
        type: String
    }
});

mongoose.model('Product',productSchema);