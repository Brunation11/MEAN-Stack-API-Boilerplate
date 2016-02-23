var bodyParser = require('body-parser');
var _ = require('lodash');
var express = require('express');
var app = express();

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

var lions = [];
var id = 0;

app.get('/lions', function(req, res) {
  req.json(lions);
});

app.get('/lions/:id', function(req, res) {
  var lion = _.find(lions, {id: req.params.id});
  res.json(lion||{});
});

app.post('/lions', function(req, res) {
  var lion = req.body;
  id++;
  lion.id = id+'';
  lions.push(lion);
});

app.put('/lions/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }
  var lion = _.findIndex('lions', {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

app.delete('/lions/:id', function(req, res) {
  var lion = _.remove(lions, function(x) {
    return x.id == req.params.id;
  })
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});