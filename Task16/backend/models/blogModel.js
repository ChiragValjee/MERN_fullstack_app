const mongoose = require('mongoose').default

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        required: true,
        type: String
    },

    description:{
        required: true,
        type: String
    }
})

module.exports=mongoose.model('blogPost', blogSchema)