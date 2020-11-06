var mongoose = require('./mongo'); //importing connection config
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

//mongoose.Schema is a class - creating an object for it
var Blog = new Schema({
    blogId: Number,
    title: String,
    content: String,
    createdBy: String,
    createdOn: {type:Date, default: Date.now},
    updatedBy: String,
    updatedOn: {type:Date, default: Date.now},
});

Blog.plugin(autoIncrement.plugin, {model: 'Blog', field:'blogId', startAt:1})
//making the above schema as model
module.exports = mongoose.model('Blogs', Blog);