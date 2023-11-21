const express = require("express");
const nocache = require("nocache");
//const nocache = require("nocache");

const router = express.Router();

const credential = {
  email:"sakkilogin@gmail.com",
  password: "admin123"
}   

// Middleware for checking authentication status
/*const isAuthenticated = (req,res,next)=>{
  if(req.session.user){
    return next();
  }
  res.redirect('/');
}*/
// login user

router.post('/login',(req,res)=>{
  if(req.body.email == credential.email && req.body.password == credential.password){
    req.session.user = req.body.email;
    //res.cookie("email",req.body.email);
    //res.cookie("password",req.body.password);
    
   

     res.redirect('/route/dashboard');
    //res.end("Login Successful...!")
  }else  {
   //res.send("invalid username")
   res.render('base',{title: "Express" ,invlaidEmail: "Invalid email or password"});
  }

});

//route for dashbord
router.get('/dashboard',nocache(),(req,res)=>{
  /*const email = req.cookies.email;
  const password = req.cookies.password;
  if(email && password){

    res.render('dashboard')
  }else{
    res.redirect('/')
  }*/
  if(req.session.user){
    res.render('dashboard',{user: req.session.user});
  }else{
    res.redirect('/');
  }

})

//route for logout 
router.get('/logout',(req,res)=>{

  //res.clearCookie("password");
  //res.clearCookie("email");
  //res.redirect("/route/dashboard");
  req.session.destroy(function (err){
    if(err){
      console.log(err);
      res.send("Error");
    }else{
      //res.render('base',{title: "Login system" ,logout: "logut out successfully..."});
      res.redirect("/route/dashboard");
      console.log("logout successfully")
    }
  })
  
  

})
module.exports = router;