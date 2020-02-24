// A collections of functions for the weather site
//------------------------------------------------

'use strict';              

console.log('My javascript is being read.');        //Test if this file is running



/* GLOBAL VARIABLES
*********************************************************************************/
var currCond = "RAIN";          // Current condition of the weather
var actualHour = 6;             // Time Indicator
var temp = 31;
var speed = 5;


/* FUNCTIONS - Index:
*********************************************************************************
F000 - function()               - DOMContentLoaded
F001 - buildModDate()           - Build the modified Data function 
F002 - function actualDate()    - Build the actual date Customized
F003 - getActualYear()          - To Get the actual Year
F004 - hamMenu()                - To set the Hamburguer Menu for Small Screen
F005 - updateFeelsLikeTemp()    - To Update feels Like Temperature
F006 - buildWC()                - To Calculate the Feels Like Temperature

***/



//F000 - DOMContentLoaded
document.addEventListener("DOMContentLoaded", function(){
    
    buildModDate();                  // Call the modified Data 
    hamMenu();                       // Call Hamburguer Menu 
    updateFeelsLikeTemp();           // Call Update feels Like Temperature
    
    //checkPoint
    console.log(" CheckPoint - DOMContentLeaded main function() ");

    timeIndicator(actualHour);       // Call Time Indicator
    backGrdImage(currCond);          // Call Backgound Image

})


//F001 Build the modified Data function
function buildModDate(){
    document.getElementById("lastModif").innerHTML = document.lastModified;    
};


//F002 Build the actual date - Customized
function actualDate(){
    var now = new Date();
    dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    monName = ["january", "Febuary", "March", "April", "Maio", "June", "July", "August", "September", "November","December"];
    dateTest = dayName[now.getDay() ] + ", " + now.getDate() + " " + monName [now.getMonth() ] + " " + now.getFullYear ();
    document.getElementById("test").innerHTML = dateTest;
};


//F003 To Get the actual Year
function getActualYear(){
    var today = new Date();
    var year = today.getFullYear();
    document.getElementById("footerYear").innerHTML = year;
};


//F004 To Set the hamburguer Menu for Small Screen
function hamMenu(){
    const hambutton = document.querySelector(".ham");
    hambutton.addEventListener("click", hambutton);
};

//F005 To Update feels Like Temperature
function updateFeelsLikeTemp(){
    let feelTemp = document.getElementById('feelTemp');
    feelTemp.innerHTML=buildWC(speed, temp);
};


//F006 To Calculate the Feels Like Temperature
function buildWC(speed, temp) {
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);  // Compute the windchill
    console.log(wc);                // Verification console output
    wc = Math.floor(wc);            // Round the answer down to integer
    wc = (wc > temp)?temp:wc;       // If chill is greater than temp, return the temp
    return  wc;
};


//F007 Time indicador 
function timeIndicator(actualHour) {
   
   //TODO - buid the function

};       


//F008 Set the BackGroundImage
function backGrdImage(currCond) {

   //TODO - buid the function


};

