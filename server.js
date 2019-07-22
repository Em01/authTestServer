const express = require('express');
const app = express();
const mongoose = require('./db/mongoose');
const userRoutes = require('./routes/user-routes');
const bodyParser = require('body-parser');
const private = require('./routes/private')

app.use(bodyParser.json());
//parses json request into body - not using urlEncoded
// const bcrypt = require('bcrypt');
//
// let password = 'password';
//
// let salt = bcrypt.genSaltSync(12);
//
// let hashedPassword = bcrypt.hashSync(password, salt);
//
// console.log('my hashed password is equal to - ', hashedPassword);
//
// let compare = bcrypt.compareSync('myFakePassword', hashedPassword);
//
// console.log('comparing passwords', compare);

app.use('/user', userRoutes);
app.use('/private', private);

// app.use(app.router);
// routes.initialize(app);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server started on port:${PORT}`)
});
