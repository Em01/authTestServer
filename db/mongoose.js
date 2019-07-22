const mongoose = require('mongoose');
const { databasePassword, databaseUsername } = require('../config');
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${databaseUsername}:${databasePassword}@ds153556.mlab.com:53556/authrn`)
  .then(() => console.log('DB connected'))
  .catch(err => console.log(error));

  module.exports = mongoose;
