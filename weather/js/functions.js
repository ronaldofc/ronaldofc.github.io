// A collections of functions for the weather site
//------------------------------------------------

'use strict';              

console.log('My javascript is being read.');        //Test if this file is running



/* GLOBAL VARIABLES
*********************************************************************************/
var currCond = "clear";          // weather (rain, snow, clouds, clear, fog) 
var actualHour = "08";             // Time Indicator
var temp = 31;
var speed = 5;


/* FUNCTIONS - Index:
*********************************************************************************
F000 - function()               - DOMContentLoaded
F001 - buildModDate()           - Build the modified Data function 
F002 - actualDate()             - Build the actual date Customized
F003 - getActualYear()          - To Get the actual Year
F004 - hamMenu()                - To set the Hamburguer Menu for Small Screen
F005 - updateFeelsLikeTemp()    - To Update feels Like Temperature
F006 - buildWC()                - To Calculate the Feels Like Temperature
F007 - timeIndicator()          - Set the current time at the dial
F008 - changeSummaryImage(...)  - To Change the background image

***/



//F000 - DOMContentLoaded
/*****************************************************************************/
document.addEventListener("DOMContentLoaded", function(){
    
    buildModDate();                  
    actualDate();                    
    hamMenu();                       
    updateFeelsLikeTemp();           
    timeIndicator(actualHour);     
    changeSummaryImage(currCond);  

    //checkPoint console
    console.log(" CheckPoint - DOMContentLeaded ... is running ok ");
})
/*****************************************************************************/



//F001 Build the modified Data function
function buildModDate(){
    document.getElementById("lastModif").innerHTML = document.lastModified;    
};


//F002 Build the actual date - Customized
function actualDate(){
    let now = new Date();
    let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monName = ["january", "Febuary", "March", "April", "Maio", "June", "July", "August", "September", "November","December"];
    let dateCustomized = dayName[now.getDay() ] + ", " + now.getDate() + " " + monName [now.getMonth() ] + " " + now.getFullYear ();
    document.getElementById("actualDate").innerHTML = dateCustomized;
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
    console.log("windchill = " + wc);   // Verification console output
    wc = Math.floor(wc);                // Round the answer down to integer
    wc = (wc > temp)?temp:wc;           // If chill is greater than temp, return the temp
    return  wc;
};


//F007 Time indicador 
function timeIndicator(actualHour) {
   
    //TODO - Change hours class to ID 
    //     - Retirar numero zero das horas
    //     - utilizar mesmo modelo func() changeSummaryImage 

    
    
    //get the html elements
    const hourPositionTemp = document.getElementById("t"+actualHour);
    const hourPositionPrec = document.getElementById("p"+actualHour);
    const hourPositionCond = document.getElementById("c"+actualHour);

	//set the class attribute for the backgropund image
    hourPositionTemp.setAttribute("class", "hour number-"+actualHour+" ball" );
    hourPositionPrec.setAttribute("class", "hour number-"+actualHour+" ball" );
    hourPositionCond.setAttribute("class", "hour number-"+actualHour+" ball" );


    //<div id="p10" class="hour number-10">10</div>

    //checkPoint
    console.log(" CheckPoint - hour ball -> ok ");

};       

 //F008 Change the Background Image
function changeSummaryImage(currCond)
{
	//get the html elements
	const backgroundImage = document.getElementById("information");

	//set the class attribute for the backgropund image
	backgroundImage.setAttribute("class", currCond);

    //send info to console
    console.log("condition = " + currCond);
    console.groupEnd();

    //checkPoint
    console.log(" CheckPoint - changeSummaryImage ... is running ok ");
}
