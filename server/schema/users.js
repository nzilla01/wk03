const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new  mongoose.Schema({
    firstName :{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    favouriteColor:{
        type: String,
        required: true
    },  
    role: {
        type: String,
        required: true
    },
    } )

    module.exports = mongoose.model('User', userSchema);