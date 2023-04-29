const Blog = require('../models/blogModel')
const mongoose = require('mongoose').default

//get all blogs
async function getBlogs(req,res){

    const blog = await Blog.find({})
    if(!blog){
        return res.status(404).json({error: 'Could not implement the function to get all blogs'})
    }else {
         res.status(200).json(blog)
    }

}

//delete all blogs
async function deleteAllBlogs(req, res){
    const contentType = req.headers["content-type"]
    if(!contentType || !contentType.includes("application/json")){
        res.status(415).send({error: "Unsupported content type"})
    }
    const blog = await Blog.deleteMany({})
    if(!blog){
        return res.status(404).json({error: 'Could not implement the function to delete all blogs'})
    }else{
         res.status(200).json(blog)
    }
}

//create a blog

async function createBlog(req, res){
    const contentType = req.headers["content-type"]
    if(!contentType || !contentType.includes("application/json")){
        res.status(415).send({error: "Unsupported content type"})
    }
    const {title, description} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push(title)
    }

    if (!description){
        emptyFields.push(description)
    }

    if(emptyFields > 0){
        return res.status(404).json({error: 'Please fill out the empty fields', emptyFields})
    }

    const blog = await Blog.create({title, description})
    if(!blog){
         res.status(404).json({error: 'Could not complete the function to create a new blog'})
    } else {
         res.status(200).json(blog)
    }
}

//update a blog
async function editBlog(req, res){
    const contentType = req.headers["content-type"]
    if(!contentType || !contentType.includes("application/json")){
        res.status(415).send({error: "Unsupported content type"})
    }
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such blog was found to update'})
    }
    const blog = await Blog.findOneAndUpdate({_id:id}, {
            ...req.body
        })
    if(!blog){
        res.status(404)

    }
    res.status(200).json(blog)
}


//     const blog = await Blog.findOneAndUpdate({_id:id}, {
//         ...req.body
//     })
//     if(!blog){
//         return res.status(404).json({error: 'No such blog was found to edit'})
//     }
//     return res.status(200).json({blog})
//
// }

//delete a single blog
async function deleteBlog(req, res){
    const contentType = req.headers["content-type"]
    if(!contentType || !contentType.includes("application/json")){
        res.status(415).send({error: "Unsupported content type"})
    }
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such blog found to delete'})
    }

    const blog = await Blog.findOneAndDelete({_id:id})
    if(!blog){
        return res.status(404).json({error: 'No such blog was found to delete'})
    }
    res.status(200).json(blog)


}

module.exports = {
    getBlogs,
    deleteAllBlogs,
    createBlog,
    editBlog,
    deleteBlog
}