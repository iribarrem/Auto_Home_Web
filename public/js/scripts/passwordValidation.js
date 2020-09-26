$(() => {
  var password = document.getElementById("password")
  var confirm_password = document.getElementById("confirmPassword");
  var edit_password = document.getElementById("edit_password")
  var edit_confirmPassword = document.getElementById("edit_confirmPassword");

  password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;
  edit_password.onchange = validateEditPassword;
  edit_confirmPassword.onkeyup = validateEditPassword;

  function validateEditPassword(){
    if(edit_password.value != edit_confirmPassword.value) {
      edit_confirmPassword.setCustomValidity("Senhas são diferentes");
    } 
    else {
      edit_confirmPassword.setCustomValidity('');
    }
  }

  function validatePassword(){
    if(password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Senhas são diferentes");
    } 
    else {
      confirm_password.setCustomValidity('');
    }
  }
});

