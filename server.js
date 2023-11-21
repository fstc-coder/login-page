const express = require('express');
const cookie = require('cookie-parser');
const nocache = require('nocache');
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const {v4: uuidv4} = require("uuid");
const {restart} = require('nodemon')
const router = require('./router');

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine','ejs');
app.use(cookie())

//load static assests
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assests',express.static(path.join(__dirname, 'public/assests')));

app.use(session({
  secret: 'keyboard Cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path    : '/',
    httpOnly: false,
    maxAge  : 24*60*60*1000
  }
}));


// middleware for preventing caching
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '-1');
  next();
});

app.use('/route',router);

// home route
app.get('/',nocache(),(req,res)=>{
 
  if(req.session.user /*req.cookies.email && req.cookies.password*/){
    
    res.redirect('/route/dashboard')
  }else{
    res.render('base',{title: "Login System"});
  }
  
})

app.listen(port, ()=> {console.log("listening to the server on http://localhost:3001")})