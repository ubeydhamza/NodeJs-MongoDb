const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blohSchema = new Schema({
    title: {
        type:String,
        require: true,
        trim:true
    },
    short: {
        type:String,
        require: true,
        trim:true
    },
    long: {
        type:String,
        require: true,
        trim:true
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId, ref:'category'
    },
    writes:[{
        type:String,
        require: true
    },
    {
        type:String,
    }]
}, {timestamps: true})

const Blog = mongoose.model('Blog',blohSchema)
module.exports= Blog