var emailEror = document.getElementById('email-error');
var passwordEror = document.getElementById('password-error');
var submitErorr = document.getElementById('submit-error');

function validatEmail(){
var email = document.getElementById('contact-email').value;
 
if(email.length === 0){
   emailEror.innerHTML=' password should not be blank';
   document.form1.email.focus()
   return false;
}
if(!email.match(/^[A-Za-z0-9._-]+@[A-Za-z]+\.[a-z]{2,4}$/)){
   emailEror.innerHTML = ' invalid';
   return false;
}
emailEror.innerHTML= ' Valid'
return true;

}

function validatpass(){
   var pass= document.getElementById('password').value;
    
   if(pass.length === 0){
       passwordEror.innerHTML=' invalid password'
       document.form1.password.focus()
      return false;
   }
   if(!pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/)){
       passwordEror.innerHTML = ' invalid password'
      return false;
   }
   passwordEror.innerHTML= ' Valid'
   return true;
  
  }

  function validForm() {
   if (!validatEmail() || !validatpass()) {
     submitErorr.style.display = 'block';
     submitErorr.innerHTML = 'please enter your detials';
     setTimeout(function () {
       submitErorr.style.display = 'none';
     }, 3000);
     return false;
   }
  
   

   
   return true;
 }
   



