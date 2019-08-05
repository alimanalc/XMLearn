const mongoose = require('mongoose');
const Schema = mongoose.Schema;



let attributeSchema = new Schema({
    name: { type: String, required: true },
    value: { type: String },
    type: { type: String, required: true }
});

let requestSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    attributes: [attributeSchema]
});

let userSchema = new Schema({
    // _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    requests: [requestSchema]
});

module.exports = mongoose.model('User', userSchema, 'usuarios');