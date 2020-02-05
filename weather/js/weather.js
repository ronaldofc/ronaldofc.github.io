//Hamburguer Menu
const hambutton = document.querySelector(".ham");
hambutton.addEventListener("click", toggleMenu, false);
function toggleMenu() {
  document.querySelector(".navigation").classList.toggle("responsive");
}


//JS to get the actual date
var now = new Date();
dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
monName = ["january", "Febuary", "March", "April", "Maio", "June", "July", "August", "September", "November","December"];
dateTest = dayName[now.getDay() ] + ", " + now.getDate() + " " + monName [now.getMonth() ] + " " + now.getFullYear ();
document.getElementById("test").innerHTML = dateTest;


//JS Last file modifier
document.getElementById("lastModif").innerHTML = document.lastModified;


//Js to get the actual Year
var today = new Date();
var year = today.getFullYear();
document.getElementById("footerYear").innerHTML = year;