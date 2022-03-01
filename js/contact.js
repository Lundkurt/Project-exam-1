const form = document.querySelector("#contact");
const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const validContainer = document.querySelector(".validate");

const formState = {
  nameInput: {
    isValid: false,
  },
  emailInput: {
    isValid: false,
  },
  subjectInput: {
    isValid: false,
  },
  messageInput: {
    isValid: false,
  },
};

let submitted = false;
function inputValidation(event) {
  event.preventDefault();

  if (submitted) {
    if (checkLength(name.value, 5)) {
      nameError.style.display = "none";
      formState.nameInput.isValid = true;
    } else {
      nameError.style.display = "block";
    }
    if (validateEmail(email.value)) {
      emailError.style.display = "none";
      formState.emailInput.isValid = true;
    } else {
      emailError.style.display = "block";
    }
    if (checkLength(subject.value, 15)) {
        subjectError.style.display = "none";
        formState.subjectInput.isValid = true;
      } else {
       subjectError.style.display = "block";
      }
    if (checkLength(message.value, 25)) {
      messageError.style.display = "none";
      formState.messageInput.isValid = true;
    } else {
      messageError.style.display = "block";
    }
  }
}

console.log(submitted);

function submitHandler(event) {
  event.preventDefault();
  submitted = true;
  console.log(formState);

  if (
    !formState.nameInput.isValid ||
    !formState.emailInput.isValid ||
    !formState.subjectInput.isValid ||
    !formState.messageInput.isValid
  ) {
    validContainer.innerHTML = validateMessage(
      "Some fields are not correct, please try again",
      "error"
    );
    
  }
  validContainer.innerHTML = validateMessage("Message sent!", "success");
}

form.addEventListener("change", inputValidation);
form.addEventListener("submit", inputValidation);
form.addEventListener("submit", submitHandler);