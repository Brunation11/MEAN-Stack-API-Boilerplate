var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post'
    }
  ]
});

module.exports = mongoose.model('user', UserSchema);