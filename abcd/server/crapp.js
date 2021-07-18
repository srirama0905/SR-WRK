const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require("cors");

require('dotenv').config();
var authrouter = require('./routes/_auth.route');  
/*Revamp code */
var UserRoute = require('./routes/User.route');
//New Release for Ganga
var UserRegRoute = require('./routes/UserRegistration.route');
//New Release for Ganga
var ReferenceDataRoute = require('./routes/ReferenceData.route');


var app = express();


app.use(
   cookieParser(),
  bodyParser.urlencoded({
    extended: true,
  })  
);
//app.use(cors({credentials: true, origin: "http://kcdc.crapp.com:3000"}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json());
app.listen(8000, function() {
    console.log('App running on port 8000');
  
});

//app.use('/catalog', catalogRouter); 
app.use('/auth', authrouter); 
app.use('/user', UserRoute);
app.use('/userreg', UserRegRoute); 
app.use('/ref', ReferenceDataRoute); 

