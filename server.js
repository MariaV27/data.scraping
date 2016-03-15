var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var handlebars = require('handlebars');


var PORT = process.env.PORT || 1990;
var app = express();


//database configuration
mongoose.connect('mongodb://localhost/TheEconomistDB');
var DB = mongoose.connection;

DB.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
DB.once('open', function() {
  console.log('Mongoose connection was a success.');
});

//moongose schemas
var Note = require('./models/notes.js')
var econData = require('./models/econData.js')

//scraping data and putting into databse
app.get('/', function(req, res) {
  request('https://http://www.economist.com', function (error, response, html) {
    var $ = cheerio.load(html);
    var result = [];
    $(".title").each(function(i, element){

//scraping data

var title = $(this).text();
var link = $(this).children('a').attr('href');

  if (title && link) {
var neweconData = new econData({title:title, link:link});

//mongoose saving data
neweconData.save(function(err, doc) {
  if (err) {
    console.log(err)   
  } else {
    console.log(doc)
  }
  })
};







//listen
app.listen(PORT, function(){
  console.log('Listening on port' , PORT);
});