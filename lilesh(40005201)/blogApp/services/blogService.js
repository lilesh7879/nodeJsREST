//Connect to model
const Blog = require('../models/blog');
//service methods

//create Blog
exports.createBlog = (req, callback) => {
    console.log(req.body);

    //construct query
    let blogDao = new Blog(req.body);
    //exec query
    blogDao.save((err,savedBlog) => {
        if(!err){
            callback(err, savedBlog);
            console.log(`contact Created succesfully with BlogId ${savedBlog.blogId}`);
        }
    });
    
}

//Get Blogs
exports.getBlogs = (callback) => {

    let blogs = Blog.find((err, blogList) => {
        if(!err){
            console.log(`fetched blog List`);
        }
        callback(err,  blogList);
    });
}

//Get blogById
exports.getBlogById = (_blogId, callback) => {

    let blog = Blog.findOne({blogId: _blogId},(err, blog) => {
        if(blog){
            console.log(`fetched blog with blogId: ${blog.blogId} loaded successfully`);
            callback(err, blog);
        }
        else{
            console.log(blog);
            callback(err, blog);
        }
        
    });
}

//Update blog
exports.updateBlog = (_blogId, blogData, callback) => {
    
    Blog.updateOne( { blogId: _blogId }, blogData ,(err,status)=> {
        let msg= "some Error Occured";
        if(!err){
            console.log(status);
            if(status.n = 1 && status.ok == 1){
                msg="updated successfully";
            }
            callback(err,msg);
        }
        else{
            console.log(err, msg);
        }
        
    })
}

//delete blogs
exports.deleteBlog = (_blogId, callback) => {

    Blog.deleteOne({blogId: _blogId},(err,status) =>{
        let msg= "some error occured";
        if(!err){
            console.log(status); 
            if(status.n = 1 && status.ok == 1){
                msg="DELETED successfully";
            } 
            callback(err,msg);
        }
        else{
            console.log(err, msg);
        }
        
    })    
}



