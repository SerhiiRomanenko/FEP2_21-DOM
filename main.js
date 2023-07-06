const $form = document.querySelector("#form");
const $submitButton = document.querySelector(".submit");
const $nameInput = document.getElementById("name");
const $surnameInput = document.getElementById("surname");
const $gender = $form.elements["gender"];
const $city = $form.elements["city"];
const $address = $form.elements["address"];
const $languages = $form.elements["languages"];

function haveErrorName(input) {
  let errorTag = input.parentNode.querySelector("small");
  if (validateName(input)) {
    errorTag.classList.add("disable");
    return (input.style.border = "1px solid black");
  } else {
    errorTag.classList.remove("disable");
    return (input.style.border = "1px solid red");
  }
}

function haveErrorTextarea(textarea) {
  let errorTag = textarea.parentNode.querySelector("small");
  if (validateTextarea(textarea.value)) {
    errorTag.classList.add("disable");
    return (textarea.style.border = "1px solid black");
  } else {
    errorTag.classList.remove("disable");
    return (textarea.style.border = "1px solid red");
  }
}

function haveErrorRadio(elems) {
  let genderTitle = elems[0].parentNode.querySelector("p");
  let flag = false;
  for (let elem of elems) {
    if (elem.checked) {
      flag = true;
      break;
    }
  }
  flag === true
    ? (genderTitle.style.color = "black")
    : (genderTitle.style.color = "red");
}

function haveErrorSelect(select) {
  let flag = false;
  let errorTag = document.querySelector(".city__error");
  for (let elem of select) {
    if (elem.selected && elem.value !== "") {
      flag = true;
      break;
    }
  }
  if (flag === true) {
    errorTag.classList.add("disable");
    return (errorTag.style.color = "black");
  } else {
    errorTag.classList.remove("disable");
    return (errorTag.style.color = "red");
  }
}

function haveErrorCheckbox(checkboxes) {
  let genderTitle = checkboxes[0].parentNode.querySelector("small");
  if (validateCheckbox($languages).length >= 1) {
    genderTitle.classList.add("disable");
    genderTitle.style.color = "black";
  } else {
    genderTitle.classList.remove("disable");
    genderTitle.style.color = "red";
  }
}

function validateName(input) {
  let resName = input.value.trim();
  if (
    resName.length > 1 &&
    !resName.includes(" ") &&
    !/[0-9\\!@#$%^&*()-+:;_"'`|=]/.test(resName)
  ) {
    return resName;
  } else {
    return false;
  }
}

function validateSurname(input) {
  let resName = input.value.trim();
  if (
    resName.length > 1 &&
    !resName.includes(" ") &&
    !/[0-9\\!@#$%^&*()-+:;_"'`|=]/.test(resName)
  ) {
    return resName;
  } else {
    return false;
  }
}

function validateTextarea(text) {
  let resName = text.trim();
  if (resName.length > 6 && !/[0-9\\!@#$%^&*()-+:;_"'`|=]/.test(resName)) {
    return resName;
  } else {
    return false;
  }
}

function validateRadio(elems) {
  for (let elem of elems) {
    if (elem.checked) {
      return elem.value;
    }
  }
  return false;
}

function validateSelect(select) {
  for (let elem of select) {
    if (elem.selected && elem.value !== "") {
      return elem.value;
    }
  }
  return false;
}

function validateCheckbox(checkboxes) {
  let BoxWithChecked = "";
  for (let elem of checkboxes) {
    if (elem.checked) {
      BoxWithChecked += elem.id + " ";
    }
  }
  if (BoxWithChecked.length === 0) {
    return false;
  } else {
    return BoxWithChecked;
  }
}

$submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  haveErrorName($nameInput);
  haveErrorName($surnameInput);
  haveErrorRadio($gender);
  haveErrorSelect($city.children);
  haveErrorTextarea($address);
  haveErrorCheckbox($languages);
  if (
    validateName($nameInput) &&
    validateSurname($surnameInput) &&
    validateRadio($gender) &&
    validateSelect($city.children) &&
    validateTextarea($address.value) &&
    validateCheckbox($languages)
  ) {
    let generalInfo = document.createElement("div");
    generalInfo.classList.add("generalInfo");
    generalInfo.innerHTML = `Імя: ${validateName($nameInput)}<br>
Прізвище: ${validateSurname($surnameInput)}<br>
Стать: ${validateRadio($gender)}<br>
Місто: ${validateSelect($city.children)}<br>
Адреса: ${validateTextarea($address.value)}<br>
Мови, якими володієте: ${validateCheckbox($languages)}`;

    document.body.append(generalInfo);
    $form.style.display = "none";
  }
});
