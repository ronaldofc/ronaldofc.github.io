// A collections of functions for the weather site
//------------------------------------------------

'use strict';              

console.log('My javascript is being read.');        //Test if this file is running


/* GLOBAL VARIABLES
*********************************************************************************/
var currCond = "clear";          // weather (rain, snow, clouds, clear, fog) 
var todayDate = new Date();
var nowHour = todayDate.getHours();

console.log(`nowHour is: ${nowHour}`);

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var pageNav = $('#page-nav');
var statusContainer = $('#status');
var contentContainer = $('#main-content');

// local and session storage selectors
var locStore = window.localStorage;
var sessStore = window.sessionStorage;

//Get weather json data
var weatherURL = "/weather/js/idahoweather.json";

//Get location designation for local JSON execution
var cityName = document.getElementsByTagName("body")[0].getAttribute("data-city");
console.log(`Local data cityLoc is: ${cityName}`);




/* FUNCTIONS - Index:
*********************************************************************************
F000 - function()                          - DOMContentLoaded
F001 - buildModDate()                      - Build the modified Data function 
F002 - actualDate()                        - Build the actual date Customized
F003 - getActualYear()                     - To Get the actual Year
F004 - hamMenu()                           - To set the Hamburguer Menu for Small Screen
F005 - updateFeelsLikeTemp()               - To Update feels Like Temperature
F006 - buildWC()                           - To Calculate the Feels Like Temperature
F007 - timeIndicator()                     - Set the current time at the dial
F008 - fetchWeatherData(weatherURL)        - Load the Data from JSON to the variables
F009 - getHourly(URL)                      - Get Hourly Data
F010 - convertHour()                       - To Convert the time 24 to 12
F011 - changeSummaryImage(currCond)        - Change the Background Image
F012 - buildPage()                         - Build the Weather page

***/



//F000 - DOMContentLoaded
/*****************************************************************************/
document.addEventListener("DOMContentLoaded", function(){
    
    buildModDate();                  
    actualDate();                    
    hamMenu(); 
    //toggleMenu()                              
    timeIndicator();     
    fetchWeatherData(weatherURL);


    //checkPoint console
    console.log(" CheckPoint - DOMContentLeaded ... is running ok ");
})
/*****************************************************************************/




//F001 Build the modified Data function
function buildModDate(){
    document.getElementById("lastModif").innerHTML = document.lastModified;    
}


//F002 Build the actual date - Customized
function actualDate(){
    let now = new Date();
    let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monName = ["january", "Febuary", "March", "April", "Maio", "June", "July", "August", "September", "November","December"];
    let dateCustomized = dayName[now.getDay() ] + ", " + now.getDate() + " " + monName [now.getMonth() ] + " " + now.getFullYear ();
    document.getElementById("actualDate").innerHTML = dateCustomized;
}

//F003 To Get the actual Year
function getActualYear(){
    var today = new Date();
    var year = today.getFullYear();
    document.getElementById("footerYear").innerHTML = year;
}


//F004 To Set the hamburguer Menu for Small Screen
function hamMenu(){
    const hambutton = document.querySelector(".ham");
    hambutton.addEventListener("click", toggleMenu, false);
}

function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("responsive");
}



//F005 To Update feels Like Temperature
function updateFeelsLikeTemp(){
    let feelTemp = document.getElementById('feelTemp');
    feelTemp.innerHTML=buildWC(speed, temp);
}


//F006 To Calculate the Feels Like Temperature
function buildWC(speed, temp) {
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);  // Compute the windchill
    console.log("windchill = " + wc);   // Verification console output
    wc = Math.floor(wc);                // Round the answer down to integer
    wc = (wc > temp)?temp:wc;           // If chill is greater than temp, return the temp
    return  wc;
}


//F007 To Setup the Time indicador 
function timeIndicator() {
   
    var Hour = convertHour();

    console.log(`Hour is: ${Hour}`);
    
    //get the html elements
    const hourPositionTemp = document.getElementById("t"+Hour);
    const hourPositionPrec = document.getElementById("p"+Hour);
    const hourPositionCond = document.getElementById("c"+Hour);

	//set the class attribute for the backgropund image
    hourPositionTemp.classList.add("ball");
    hourPositionPrec.classList.add("ball");
    hourPositionCond.classList.add("ball");

    //checkPoint
    console.log(" CheckPoint - hour ball -> ok ");

}       

//F008 Load the Data from JSON to the variables
function fetchWeatherData(weatherURL)
{
    fetch(weatherURL)
    .then(function(response) {
    if(response.ok){
       return response.json();
    }
    throw new ERROR('Network response was not OK.');
    })
    .then(function(data){

        console.log(data);          // Check the data object that was retrieved - full object
        let p = data[cityName];     // only info one city
  
        // *************   Get the location information   ****************
        let locName = p.properties.relativeLocation.properties.city;                // Get City Name
        let locState = p.properties.relativeLocation.properties.state;              // Get State Name
        let fullName = locName+', '+locState;                                       // Put them together
        console.log(`fullName is: ${fullName}`);                                    // Checkpoint


        // **********  Get the longitude and latitude information  **********
        let locLongitude = p.properties.relativeLocation.geometry.coordinates[0];   // Get Longitude
        let locLatitude  = p.properties.relativeLocation.geometry.coordinates[1];   // Get Latitude
        let latLong    = locLatitude+", "+locLongitude;                           // Put Them together
        console.log(`Coordinates are: ${latLong}`);                                 // Checkpoint


        // ***  Create a JSON object containing the full name, latitude and longitude   ***
        const locationData = JSON.stringify({fullName,latLong});                     // Create JSON
        console.log(`JSON Object = ${locationData}`);                                // Checkpoint
    
    
        // *************  Store it into local storage  **************************
        locStore.setItem("locationID", locationData);                                 // Store Local Storage


        // **********  Get the current conditions information  ******************
        // As the data is extracted from the JSON
        let temperature = p.properties.relativeLocation.properties.temperature;
        let windSpeed   = p.properties.relativeLocation.properties.windSpeed;
        let windGust    = p.properties.relativeLocation.properties.windGust;
        let highTemp    = p.properties.relativeLocation.properties.highTemp;
        let lowTemp     = p.properties.relativeLocation.properties.lowTemp;
        
        
        // ***********   store it into session storage    ***********************
        sessStore.setItem("fullName",fullName);
        sessStore.setItem("latLong",latLong);
        sessStore.setItem("temperature",temperature);
        sessStore.setItem("windSpeed",windSpeed);
        sessStore.setItem("windGust",windGust);
        sessStore.setItem("highTemp",highTemp);
        sessStore.setItem("lowTemp",lowTemp);
        

      // Get the hourly data using another function - should include the forecast temp, condition icons and wind speeds. The data will be stored into session storage.
        let hourlyURL = p.properties.forecastHourly;
        getHourly(hourlyURL);

    })
    .catch(function(error){
    console.log('There was a fetch problem: ', error.message);
    statusContainer.innerHTML = 'Sorry, the data could not be processed.';
    })
}



//F009 Get Hourly Data
function getHourly(URL) {
    fetch(URL)
     .then(function (response) {
      if (response.ok) {
       return response.json();
      }
      throw new ERROR('Response not OK.');
     })
     .then(function (data) {
      console.log('Data from getHourly function:');
      console.log(data); // Let's see what we got back
   
      // Store 12 hours of data to session storage  
      var hourData = [];      

      for (let i = 0, x = 11; i <= x; i++) {
       if (nowHour < 24) {
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
        nowHour++;
       } else {
        nowHour = nowHour - 12;
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
        nowHour = 1;
       }
      }
   
      // Get the shortForecast value from the first hour (the current hour)
      // This will be the condition keyword for setting the background image
      sessStore.setItem('shortForecast', data.properties.periods[0].shortForecast);
   
      // Call the buildPage function
      buildPage();  

    })

    .catch(error => console.log('There was a getHourly error: ', error))
}

// F010 To Convert the time 24 to 12
function convertHour() {
    let newHour = 0;
    if (nowHour > 12 ) { newHour = ((nowHour - 12)); } else if ((newHour = 0)) { newHour = 12; } else{ newHour = nowHour; }
    console.log("checkpoint newHour -->",newHour);
    return newHour;
  }


//F011 Change the Background Image
function changeSummaryImage(currCond) {
    
    // Get the container
    let curCondContainer = document.getElementById("information");
    console.log("Checkpoint curCondContainer --> ",curCondContainer);   //checkpoint

    // Deal with capitalization
    currCond = currCond.toLowerCase();
    console.log(currCond);

    // Determine the image class
    switch (currCond) {
        case "cloud":
        // If the container only has a class to set the image then
        // use the next line to clear it before setting the new one:
        curCondContainer.removeAttribute("class");
        // If the container uses a class to style the element in
        // addition to setting the image, then use the next line
        // to clear the old weather keyword before setting the new one:
        curCondContainer.classList.remove("clear","fog","snow","rain","cloud");
        curCondContainer.setAttribute("class", "cloud");
        break;
        
        case "fog":
        curCondContainer.classList.remove("clear","fog","snow","rain","cloud");
        curCondContainer.setAttribute("class", "fog");
        break;
        
        case "snow":
        curCondContainer.classList.remove("clear","fog","snow","rain","cloud");
        curCondContainer.setAttribute("class", "snow");
        break;
        
        case "rain":
        curCondContainer.classList.remove("clear","fog","snow","rain","cloud");
        curCondContainer.setAttribute("class", "rain");
        break;
        
        default:
        curCondContainer.classList.remove("clear","fog","snow","rain","cloud");
        curCondContainer.setAttribute("class", "clear");
        break;
    }
}


//F012  Build the Weather page
function buildPage() {
    
        // Set the title with the location name at the first
        let pageTitle = document.querySelector('#page-title');                        // Gets the title element so it can be worked with
        let fullNameNode = document.createTextNode(sessStore.getItem('fullName'));    // Create a text node containing the full name 
        console.log(" CheckPoint fullNameNode -->",fullNameNode);  
        pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);                // inserts the fullName value before any other content that might exist

         // Get the h1 to display the city location
        let contentHeading = document.querySelector('#location');
        contentHeading.innerHTML = sessStore.getItem('fullName');                      // The h1 in the main element should now say "Preston, Idaho"
        
        // Get the coordinates container for the location
        let latLon = document.querySelector('#gps');   
        
        // The latitude and longitude should match what was stored in session storage.
        latLon.innerHTML = ( "GPS: " + sessStore.getItem('latLong') );

        // Get the condition keyword and set Background picture
        changeSummaryImage(sessStore.getItem('shortForecast'));


        // **********  Set the current conditions information  **********
        // Set the temperature information
        let highTemp = $('#temp-high');
        let loTemp = $('#temp-low');
        let currentTemp = $('#temp-actual');
        let feelTemp = $('#feels-like');
        highTemp.innerHTML = sessStore.getItem('highTemp') + "°F";
        loTemp.innerHTML = sessStore.getItem('lowTemp') + "°F";
        currentTemp.innerHTML = sessStore.getItem('temperature') + "°F";
        // Set the wind information
        let speed = $('#wind-std');
        let gust = $('#wind-gusts');
        speed.innerHTML = (sessStore.getItem('windSpeed') + " mph");
        gust.innerHTML =  "Gusts: "+ (sessStore.getItem('windGust') + " mph");
        // Calculate feel like temp
        let fslike = buildWC(sessStore.getItem('windSpeed'), sessStore.getItem('temperature')) + "°F";
        feelTemp.innerHTML = ("Feels Like: " + fslike);



        // ********** Hourly Temperature Component  **********
        // Get the hourly data from storage as an array
        let currentData = [];

        let todayDate = new Date();
        var currentHour = todayDate.getHours();

        let tempHour = currentHour;
        // Adjust counter based on current time
        for (let i = 0, x = 12; i < x; i++) {
            if (tempHour <= 23) {
                currentData[i] = sessStore.getItem('hour' + tempHour).split(",");
                tempHour++;
            } else {
                tempHour = tempHour - 12;
                currentData[i] = sessStore.getItem('hour' + tempHour).split(",");
                console.log(`CurrentData[i][0] is: ${currentData[i][0]}`);
                tempHour = 1;
            }
        }
        console.log(currentData);

        // Loop through array inserting data
        // Start with the outer container that matchs the current time
        tempHour = currentHour;
        for (let i = 0, x = 12; i < x; i++) {
            if (tempHour >= 13) {
                tempHour = tempHour - 12;
            }
            console.log(`Start container is: #mt-${tempHour}`);
            $('#mt-' + tempHour).innerHTML = currentData[i][0];
            tempHour++;
        }


        // ********** Hourly Wind Component  **********
        // Get the hourly data from storage
        let windArray = [];
        let windHour = currentHour;
        // Adjust counter based on current time
        for (let i = 0, x = 12; i < x; i++) {
        if (windHour <= 23) {
        windArray[i] = currentData[i][1].split(" ");
        console.log(`windArray[i] is: ${windArray[i]}`);
        windHour++;
        } else {
        windHour = windHour - 12;
        windArray[i] = currentData[i][1].split(" ");
        windHour = 1;
        }
        }
        console.log(windArray);

        // Insert Wind data
        // Start with the outer container that matchs the time indicator
        windHour = currentHour;
        for (let i = 0, x = 12; i < x; i++) {
        if (windHour >= 13) {
        windHour = windHour - 12;
        }
        console.log(`Start container is: #mw-${tempHour}`);
        $('#mw-' + windHour).innerHTML = windArray[i][0];
        windHour++;
        }

        // **********  Condition Component Icons  **********
        let conditionHour = currentHour;
        // Adjust counter based on current time
        for (let i = 0, x = 12; i < x; i++) {
        if (conditionHour >= 13) {
        conditionHour = conditionHour - 12;
        }
        $('#mc-' + conditionHour).innerHTML = '<img src="' + currentData[i][2] + '" alt="hourly weather condition image">';
        conditionHour++;
        }

        // Change the status of the containers
        contentContainer.setAttribute('class', ''); // removes the hide class from main
        statusContainer.setAttribute('class', 'hide'); // hides the status container

}
