var express    = require('express');
var path       = require('path');
var logger     = require('morgan');
var app        = express();
var port       = process.env.PORT || 4000

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/todos', require('./controllers/todos.js'));

app.get('/', function(req, res) {
  res.render('index');
});

// will not error when refreshing page
app.all('/*', function(req, res, next) {
  res.sendFile('/public/index.html', { root: __dirname });
});

app.listen(port, function() {
  console.log('=================================');
  console.log('APP IS LISTENING TO THE PORT 4000');
  console.log('=================================');

});
