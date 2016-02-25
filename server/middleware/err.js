module.exports = function() {
  return function(err, req, res, next) {
    console.log(err.message.red);
    res.status(err.status || 500).send('Something broke!');
  }
};