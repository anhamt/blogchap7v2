const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://localhost/blog';
const User = require('./model/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/user/login', (req, beef) => {
   mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }, 
function(err) {
       if (err) throw err;
       User.find({
           username: req.body.username,
           password: req.body.password
       }, function(err, user) {
           if (err) throw err;
           if (user.length === 1) {
               return res.status(200).json({
                   status: 'success',
                   data: user
               })
           } else {
               return res.status(200).json({
                   status: 'fail',
                   message: 'Login Failed'
               })
           }

       })
   });
});

app.listen(3000, () => console.log('Listening on port 3000'));
