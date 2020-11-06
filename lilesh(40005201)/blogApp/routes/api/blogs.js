var express = require('express');
var router = express.Router();
var ejs = require('ejs');


//connecting to service
const blogService = require('../../services/blogService');
const { render } = require('../../app');

/** Get Blog Listings */
router.get('/', function (req, res, next) {
    blogService.getBlogs(function (err, data) {
        if (!err) {
            if (data) {
            blogData = data;
            res.render('index', { data: blogData });
            }
            else{
                render('error');
            }
        }
        else {
            console.log(err);
            res.json({ status: 'Some Error Occured' });
        }
    });
});


/* GET contact/1 listing. */
router.get('/:id', function (req, res, next) {

    if (req.query._method != 'DELETE') {
      
        blogService.getBlogById(req.params.id, function (err, data) {
            if (!err) {
                //handle invalid id error
                if (data) {
                    res.render('blog', { data: data });
                }
                else {
                    res.render('error');
                }
            }
            else {
                console.log(err);
                res.json({ status: 'Some Error Occured' });
            }
        });
    }
    else {
        if (req.query._method == 'DELETE') {
            req.method = 'DELETE';
            req.url = req.path;
            next();
        }
    }
});

router.post("/:id", (req, res, next) => {
    // dealing with req body
    if (req.query._method == "PUT") {
        req.method = "PUT";
        req.url = req.path;
        next();
    }
});


router.post('/', function (req, res, next) { //dealing with req body
    let blogData;
    blogService.createBlog(req, function (err, data) {
        if (!err) {
            blogData = data;
            res.redirect('blogs');
        }
        else {
            console.log(err);
            res.json({ status: 'Some Error Occured' });
        }
    });
});

/* put blogs/id */
router.put('/:id', function (req, res, next) {
    blogService.updateBlog(req.params.id, req.body, function (err, data) {
        if (!err) {
            console.log(data);
            res.redirect('/');
        }
        else {
            console.log(err);
            res.json({ status: 'Some Error Occured' });
        }
    });
});

/* delete blogs/id */
router.delete('/:id', function (req, res, next) {
    blogService.deleteBlog(req.params.id, function (err, data) {
        if (!err) {
            console.log(data);
            res.redirect('/');
        }
        else {
            console.log(err);
            res.json({ status: 'Some Error Occured' });
        }
    });
});



module.exports = router;