const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
    }
});

mongoose.model('Product',productSchema);