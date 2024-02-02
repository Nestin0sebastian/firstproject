var express = require('express');
var router = express.Router();
const model = require('../model/schema');
const session = require('express-session');



 

/* GET home page. */

// Middleware to disable caching
function noCache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

//admin home page(data sending)
router.get('/', noCache, async function(req, res) {
  model.find({})
    .then((x) => {
      res.render('adminpage/index', { x });
    })
    .catch((y) => {
      console.log(y);
    });
});

//add user route get
router.get('/adduser',(req,res)=>{
  
  let errorMsg = ''
  if(req.session.errorMsg){
    errorMsg = req.session.errorMsg;
    req.session.errorMsg=''
  }
  res.render('adduser/sign',{errorMsg})
})


//adding user route post
router.post('/adduser',async(req,res)=>{
  try {
 const adduser = await model.findOne({email:req.body.email})
 
 if(adduser){

  req.session.errorMsg = "user already exist"
  return res.redirect('/admin/adduser')

 }

 await model.create  ({
  firstname : req.body.firstname,
  lastname: req.body.lastname,
  email : req.body.email,
  password:req.body.password
}).then(()=>{
  return res.status(200).redirect('/admin')
})


  } catch (error) {
    console.log(error)
    
  }

})



router.post('/deleteUser/:id',async(req,res )=>{
  try{
  const id = req.params.id;
  const userData = await model.findOne({_id:id})
  if(userData){
    model.deleteOne({_id:id})
    .then(()=>{
      return res.redirect('/admin')
})
  }else{

  }
}
catch(err){
  console.log(err)
}
})

router.get('/Edituser',async (req,res)=>{
  try {
    console.log(req.query.id);
    const user = await model.findOne({_id:req.query.id})
    console.log(user)
    if(user){

      
      res.render('error' ,{user})
    }else{
      res.redirect('/')
    }
    
  } catch (error) {
    console.log(error)
    
  }



  
})

router.post('/Edituser', async (req, res) => {
  try {
    
    const user = await model.findOne({ _id: req.query.id });

    if (user) {
      
       
      user.firstname = req.body.firstname; 
      user.lastname = req.body.lastname;
      user.email = req.body.email;

      
      await user.save();                                        

      
      res.redirect('/admin'); // Change '/success' to the appropriate success page URL
    } else {
           res.redirect('/error'); // Change '/error' to the appropriate error page URL
    }
  } catch (error) {
    console.log(error);
    // Handle any errors that occur during the update process
    res.redirect('/error'); // Redirect to an error page
  }
});














module.exports = router;