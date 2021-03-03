/* form validation*/

const exclamation = document.getElementsByClassName("error");
const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const date = document.getElementById("Date");
const formError = document.getElementsByClassName("form_error");
const input = document.getElementsByTagName("input");
const thanks = document.getElementsByClassName("checkmark");
const content = document.getElementById("content");
const spinner = document.getElementById("spinner");
const animated = document.getElementById("animated");
const notFound = document.getElementById("notFound");
const maxdate = document.getElementById("datePickerId");

maxdate.max = new Date().toISOString().split("T")[0];

thanks[0].style.display = "none";
notFound.style.display = "none";


/* validation*/

function convertDate(dateString) {
  var p = dateString.split(/\D/g);
  return [p[2], p[1], p[0]].join("-");
}

async function formValidation(event) {
  let err = 0;
  /*for loop for all input fields except submit input, so it is 3*/
  for (i = 0; i < 3; i++) {
    /*clear the form*/
    input[i].classList.remove("error");
    formError[i].style.display = "none";

    /*validation of other fields*/
    if (input.type != "submit" && input[i].value == "") {
      formError[i].style.display = "block";
      input[i].classList.add("error");
      event.preventDefault();
      err++;
    }
  }
  if (err == 0) {
    event.preventDefault();
    form.style.display = "none";
    spinner.removeAttribute("hidden");
    const url = "https://ip4.seeip.org/json";
    try {
      const fetchIp = await fetch(url);
      const res = await fetchIp.json();
      console.log(res["ip"]);
      spinner.setAttribute("hidden", "");
      thanks[0].style.display = "block";
      content.innerHTML = `Thanks for registering 
          <b style="color:black">${input[0].value} ${input[1].value}</b> 
          born on <b style="color:black">${convertDate(input[2].value)}</b> 
          from an IP Address: <b style="color:black"> ${res["ip"]}</b>`;
    } catch (err) {
      console.log("error occur", err);
      spinner.style.display = "none";
      animated.style.display = "none";
      thanks[0].style.display = "block";
      content.style.display = "none";
      notFound.style.display = "block";
    }
  }
}

/*event listener on button, call the formValidation function*/
form.addEventListener("submit", formValidation, false);
