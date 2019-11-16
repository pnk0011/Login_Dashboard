var express = require('express');
var app = express();
 app.use(express.static('app')); // app will be the same folder name
 app.get('/', function (req, res,next) {
  res.redirect('/'); 
 });
app.listen(8080, 'localhost');
console.log("MyProject Server is Listening on port 8080"); pnkja ingh is my name the wu<HTMLAllCollection
