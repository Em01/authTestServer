const jwt = require('jsonwebtoken');
const User = require('../db/models/user-model');
const { secret } = require('../config')

module.exports = (req, res, next) => {
  let token = req.header('x-auth')

  try {
    let payload = jwt.verify(token, secret);
    User.findById(payload._id)
    .then(user => {
      if (!user) {
        return res.status(401).send();
      }
      req._id = payload._id;
      next();
    }).catch(err => {
      if(err) {
        return res.status(401).send(err);
      }
      return res.status(401).send(err);
    })
  } catch(err) {
    res.status(401).send(err);
  }
}
