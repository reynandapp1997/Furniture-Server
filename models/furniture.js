const mongoose = require('mongoose');
const shortid = require('shortid');

const furniture = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: shortid.generate
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    model_id: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    cat_id: {
        type: Number,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    item_code: {
        type: String
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Furniture', furniture);