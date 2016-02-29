var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post'
    }
  ]
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this.password = this.encryptPassword(this.password);
    next();
  }
});

UserSchema.methods = {
  authenticate: function(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword: function(plainTextPassword) {
    if(!plainTextPassword) {
      return '';
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPassword, salt);
    }
  },
  toJson: function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  }
};

module.exports = mongoose.model('user', UserSchema);