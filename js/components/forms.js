function checkLength(value, len) {
    if (value.trim().length > len) {
      return true;
    } else {
      return false;
    }
  }
  
  function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const emailValidates = regEx.test(email);
    return emailValidates;
  }