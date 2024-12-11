"use strict";

import validator from "https://cdn.skypack.dev/validator";

const inputs = document.querySelectorAll(".input");
const formFirstname = document.querySelector(".form-firstname");
const formLastname = document.querySelector(".form-lastname");
const formEmail = document.querySelector(".form-email");

const formQuery = document.querySelectorAll(".form-query");
const form = document.querySelector(".form-container");
const formBtn = document.querySelector(".form-btn-submit");
const formMessage = document.querySelector(".form-message");
const queryBox = document.querySelector(".query-box");

const btnContact = document.querySelector(".form-checkbox");
const errormessage = document.querySelector(".error-message");

const formCheckbox = document.querySelector(".form-checkbox");

let queryAnswer;
let queryType;
let error = false;
let radioClicked = false;
let contactedByTeam = false;
let formChecked = false;
let data = {};

/*

form.addEventListener("click", handleform);
form.addEventListener("input", handleform);


CODE REFACTURING WITH ONE DETAIL NOT WORKING, SO I DID NOT USE IT

function handleform(e) {
  const click = e.target;

  if (e.type === "click") {
    contactedByTeam = !contactedByTeam;

    formChecked = !formChecked;

    if (formChecked) {
      formCheckbox
        .closest(".checkbox-container")
        .nextElementSibling.classList.add("hidden");
    }

    if (!formChecked) {
      formCheckbox
        .closest(".checkbox-container")
        .nextElementSibling.classList.remove("hidden");
    }
  }

  if (e.type === "input") {
    if (formMessage.value.length > 0) {
      formMessage.style.borderColor = "#ccc";
      formMessage
        .closest(".message")
        .nextElementSibling.classList.add("hidden");
    }
  }
}
*/

btnContact.addEventListener("click", function () {
  contactedByTeam = !contactedByTeam;
});

formCheckbox.addEventListener("click", function () {
  formChecked = !formChecked;

  if (formChecked) {
    formCheckbox.closest;
  }
});

formCheckbox.addEventListener("click", function () {
  if (formChecked) {
    formCheckbox
      .closest(".checkbox-container")
      .nextElementSibling.classList.add("hidden");
  }

  if (!formChecked) {
    formCheckbox
      .closest(".checkbox-container")
      .nextElementSibling.classList.remove("hidden");
  }
});

formMessage.addEventListener("input", function () {
  if (formMessage.value.length > 0) {
    formMessage.style.borderColor = "#ccc";
    formMessage.closest(".message").nextElementSibling.classList.add("hidden");
  }
});

//Radio Button functionality

formQuery.forEach((radio) => {
  radio.addEventListener("click", function (e) {
    let parent = radio.closest(".query-answer");
    let value = parent.querySelector(".form-query-label").textContent;
    let queryvalue = radio.getAttribute("name");
    queryAnswer = value.trim();
    queryType = queryvalue;
    radioClicked = true;
    queryBox.style.borderColor = "#ccc";

    if (radioClicked === true) {
      queryBox.nextElementSibling.classList.add("hidden");
    }
  });
});

//Input fields reactivity to text inputs

inputs.forEach((el) => {
  el.addEventListener("input", function () {
    if (el.value.length > 0) {
      const sibling = el.nextElementSibling;
      sibling.classList.add("hidden");
      el.style.borderColor = "#ccc";
    }
  });
});

//Submit Button functionality

formBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (formMessage.value.length === 0) {
    formMessage.style.borderColor = "red";
    formMessage
      .closest(".message")
      .nextElementSibling.classList.remove("hidden");
    formMessage.closest(".message").nextElementSibling.textContent =
      "This field is required";
  }

  if (formChecked === false) {
    formCheckbox
      .closest(".checkbox-container")
      .nextElementSibling.classList.remove("hidden");
    formCheckbox.closest(".checkbox-container").nextElementSibling.textContent =
      "Accept this condition to continue";
  }

  inputs.forEach((el) => {
    let sibling = el.nextElementSibling;
    let inputName = el.getAttribute("name");

    if (radioClicked === false) {
      queryBox.style.borderColor = "red";
      const sibling = queryBox.nextElementSibling;
      sibling.classList.remove("hidden");
      sibling.textContent = `Select your question form.`;
      error = true;
    }

    if (el.value.length === 0) {
      el.style.borderColor = "red";
      sibling.classList.remove("hidden");
      sibling.textContent = `${inputName} needs a value`;
      error = true;
    } else if (el === formEmail && !validator.isEmail(formEmail.value)) {
      el.style.borderColor = "red";
      sibling.classList.remove("hidden");
      sibling.textContent = `Email is not valid Email`;
    } else {
      data[inputName] = el.value;
      data[queryType] = queryAnswer;
      data["Message"] = formMessage.value;
      data["Contacted by Team"] = contactedByTeam;
      el.style.borderColor = "#ccc";
      sibling.classList.add("hidden");
      error = false;
    }

    console.log(data);
  });
});
