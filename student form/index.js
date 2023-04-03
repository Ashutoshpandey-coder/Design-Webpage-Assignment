/* onclick feature on Enroll student button */
document.getElementById("enrollbtn").addEventListener("click", addStudent);
document.getElementById("clearbtn").addEventListener("click", clearFields);
update();

/* function to add a new student into the list */
function addStudent() {
  Name = document.getElementById("name").value;
  Email = document.getElementById("email").value;
  Websited = document.getElementById("website").value;
  ImageLink = document.getElementById("imagelink").value;

  var selectedGender = document.getElementsByName("gender");
  for (i = 0; i < selectedGender.length; i++) {
    if (selectedGender[i].checked)
      if (selectedGender[i].value == "option1") gender = "Male";
      else gender = "Female";
  }
  /* Check if fields are empty or not */
  checkEmptyFields(Name, Email, Websited, ImageLink);
  /* if fields are correct */
  if (emptyFields) {
    /* check if at least one checkbox is checked or not */
    getCheckBoxValue();
    if (boxIsChecked) {
      /* If itemsjson is null create a new array and push our element
      else get all the elements first and then push our new element
      and finally populate the updated list */
      if (localStorage.getItem("itemsJson") == null) {
        itemJsonArray = [];
        itemJsonArray.push([Name, Email, Websited, ImageLink, gender, result]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
      } else {
        itemJsonArrayStr = localStorage.getItem("itemsJson");
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([Name, Email, Websited, ImageLink, gender, result]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
      }
      update();
    }
  }
}

/* Function to populate the data , First get the list of data and then fit it into the rows */
function update() {
  /* If itemsjson is null , create a new array else get the elements from array */
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }
  let tableBody = document.getElementById("tablebody");
  let str = "";
  itemJsonArray.forEach((element) => {
    str += `
            <tr>
                  <td>
                    <p class="desc-row">${element[0]}</p>
                    <p class="desc-row">${element[4]}</p>
                    <p class="desc-row">${element[1]}</p>
                    <a href="${element[2]}" target="_blank">${element[2]}</a>
                    <p>${element[5]}</p>
                  </td>
                  <td>
                    <img src="${element[3]}" width="120px" height="120px">
                  </td>
            </tr>
            `;
  });
  /* setting the innerHtml of tablebody */
  tableBody.innerHTML = str;
}

/* Function to get the value from checkboxes */
var result = "";
var boxIsChecked = true;
function getCheckBoxValue() {
  var lang1 = document.getElementById("java");
  var lang2 = document.getElementById("html");
  var lang3 = document.getElementById("css");
  if (lang1.checked == true) {
    result += "JAVA";
  }
  if (lang2.checked == true) {
    result = result + " HTML";
  }
  if (lang3.checked == true) {
    result = result + " CSS";
  }
  if (result == "") {
    alert("Check at least one skill!");
    boxIsChecked = false;
  }
}

/* Function to validate the fields entered by user  */
var emptyFields = false;
function checkEmptyFields(name, email, web, image) {
  if (name == "") alert("Name field is required!");
  else if (email == "") alert("Email field is required!");
  else if (web == "") alert("Website link is required!");
  else if (image == "") alert("Image Url is required!");
  else if (!email.includes("@")) alert("Email id must contain @ !");
  else emptyFields = true;
}

/* clear fields when pressed on clear button */
function clearFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("website").value = "";
  document.getElementById("imagelink").value = "";
  document.getElementById("java").checked = false;
  document.getElementById("html").checked = false;
  document.getElementById("css").checked = false;
}
