var express = require('express');
var router = express.Router();
const model = require('../model/schema')
const bcrypt = require('bcrypt')



/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.setHeader('Cache-Control', 'no-store');

  if(req.session.user){
   return res.redirect('/') 
  }
  else{
    let errorMessage =''
    if(req.session.errorMessage){
      errorMessage=req.session.errorMessage;
    }


    
    res.render('login/log',{errorMessage})
  }
});


router.post('/login',async (req,res)=>{
  try {
    
    const loguser = await model.findOne({email:req.body.email})
    console.log(loguser);
    if(loguser){
      const passwordMatch =  bcrypt.compare(req.body.password,loguser.password )
      if(passwordMatch){

        //admin page redirect
         if((loguser.isAdmin)){

          req.session.user = loguser.email;
          req.session.isadmin = true
          res.redirect('/admin')

         }else{
          
          req.session.user = loguser.email;
          return res.redirect('/')

         }

       
      }else
      {
        req.session.errorMessage = 'Invaild Password'
        res.redirect('/login');
      }
    }else{
     req.session.errorMessage = 'Invaild Email'
     res.redirect('/login')
    }
} 
  catch (error) {
    console.log(error)
    req.session.error = error;
    res.redirect('/login')
  }
})

//adminpage



//sign up page
router.get('/signup', function(req, res, next) {
  res.setHeader('Cache-Control', 'no-store');

  if(req.session.user){
    return res.redirect('/')
   }
  res.render('signup/sign');
});


router.post('/signup',async(req,res)=>{
try {

  const user = await model.findOne({email:req.body.email})
  if(user){ 
    return res.redirect('/login')
  }
 const hashedPassword  =await bcrypt.hash(req.body.password,6)
  await model.create  ({
    firstname : req.body.firstname,
    lastname: req.body.lastname,
    email : req.body.email,
    password:hashedPassword
  }).then(()=>{
    return res.status(200).redirect('/login')
  })
  
} catch (error) {
  console.log(error)
}
})


router.get('/', function(req, res, next) {              
if(!req.session.user){
  res.redirect('/login')                                                           
}
let admin = false
  if(req.session.isadmin){
    admin=true;
  }
  res.render('homepage/index',{admin});
});




router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/login')

})








module.exports = router;
