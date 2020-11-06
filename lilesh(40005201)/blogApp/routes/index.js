var express = require('express');
var router = express.Router();

//connecting to blogService
const blogService = require('../services/blogService');

/* GET home page. */
router.get('/', function (req, res, next) {
    blogService.getBlogs(function (err, data) {
        if (!err) {
            blogData = data;
            res.render('index', { data: blogData })
        }
        else {
            console.log(err);
            res.json({ status: 'Some Error Occured' });
        }
    });
});

//get method for fetching blog on write page
router.get('/write', function (req, res, next) {
    blogService.getBlogs(function (err, data) {
        if (!err) {
            blogData = data;
            res.render('writeBlog', { data: blogData });
        }
        else {
            console.log(err);
            res.json({ status: 'Some Error Occured' });
        }
    });
});

//get method for fetching blog by ID on the edit page
router.get('/:id', function (req, res, next) {
    blogService.getBlogById(req.params.id, function (err, data) {
        if (!err) {
            res.render('editBlog', { data: data });
        }
        else {
            console.log(err);
            res.json({ status: 'Some Error Occured' });
        }
    });
});

module.exports = router;
