const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not an email!"
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    unique: true
  }
});

User.pre('save', function(next) {
  let user = this;

  if(!user.isModified('password')) {
    return next();
  }
  //prevent brute forcing
  bcrypt.genSalt(12, (err, salt) => {
    if(err) {
      return Promise.reject(err);
    }
    //save users password before it saves
    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      user.password = hashedPassword;
      next();
      //next moves things on
    })
  })
})

module.exports = mongoose.model('User', User);
