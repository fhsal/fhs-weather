

    // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var todayWeather
    var queryURL;
    var fcstURL;
    var fcstResponse;
    var currenDayResponse;
    var cityState = localStorage.cityState;

 // getting current day information from moment.js

    var fullDay = moment().format('MMMM Do YYYY');

    console.log(fullDay);

    document.getElementById("subTitle").innerHTML= "weather & forecast, " + fullDay

    
    // getting current day of the week using array for possible day names 
    
    var d = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday", "Monday", "Tuesday",
                 "Wednesday", "Thursday"];
    var today = days[d.getDay()]; 
    var dayIndex=d.getDay();

  // array to hold searched cities, which will be saved to local storage

    var cityArray = ["", "", "", "", ""];


// setting up listener to the input box and search button

    $(document).ready(function () {

      $("#executeSearch").on("click", function () {
          console.log($('#searchCity').val());
          cityState = $('#searchCity').val();
          queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
                      "q=" + cityState + "&units=imperial&appid=" + APIKey;
          console.log(queryURL);
          getCurrentWeather();
          getForecast();
          // getIcons();
          // buildIconURL();
          // renderFcst();
          renderCities();

      });
    });

// update recent city list and save to local storage

    function renderCities() {
      $('#city1').append('<br><br>'); 
      $('#city1').text(cityArray[0]);
      $('#city2').text(cityArray[1]);
      $('#city3').text(cityArray[2]);
      $('#city4').text(cityArray[3]);
      $('#city5').text(cityArray[4]);
      localStorage.CityArray = cityArray;
    } 
    
renderCities();

console.log(queryURL);


// function which calls openweathermap api for current day weather and renders current weather information 

function getCurrentWeather() {
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // defining variables parsed in response
        currenDayResponse = response;       
        var tempF = response.main.temp;
        currentCity = response.name;
        currentWind =response.wind.speed;
        currentHumidity=response.main.humidity;
        currentTemp = tempF;
        currentWeather = currenDayResponse.weather[0].main;
        currentWeatherDesc = currenDayResponse.weather[0].description;
        curentLat = response.coord.lat;
        currentLon = response.coord.lon;
        feelsLike = response.main.feels_like;
        tempMax = response.main.temp_max;
        tempMin = response.main.temp_min;
        windSpeed = response.wind.speed;

      // get weather icon for current day
      icon0 = currenDayResponse.weather[0].icon;
      icon0URL = "<img src='http://openweathermap.org/img/wn/" + icon0  + "@2x.png' style='float:right; height:250px;width:250px; margin-right:100px'</img>";

      // Load the main weather block with current information and icon

        $('#weatherBody').html( '<h2>'+ today +"'s weather in " + currentCity + "</h2>");  
        $('#weatherBody').append('<br>'); 
        $('#weatherBody').append(icon0URL); 
        $(weatherBody.append("Current Weather: " + currentWeatherDesc));
        $('#weatherBody').append('<br><br>'); 
        $(weatherBody.append("Current Temperature: " + currentTemp));
        $('#weatherBody').append('<br><br>'); 
        $(weatherBody.append("feels like: " + feelsLike));
        $('#weatherBody').append('<br><br>'); 
        $(weatherBody.append("Current Humidity: " + currentHumidity));
        $('#weatherBody').append('<br><br>'); 
        $(weatherBody.append("High Temperature: " + tempMax));
        $('#weatherBody').append('<br><br>'); 
        $(weatherBody.append("Low Temperature: " + tempMin));
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
        $('#weatherBody').append('<br><br>'); 
        $(weatherBody.append("Wind speed: " + windSpeed));

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);

        // update city search history

        cityArray.unshift(currentCity);
        localStorage.cityState = cityState;

        getForecast();

      });
  }


// function which calls openweathermap api for five day forecast

  function getForecast() {

    fcstURL2 = "https://api.openweathermap.org/data/2.5/forecast/daily?" +
    "q=" + currentCity + "&cnt=5&units=imperial&appid=" + APIKey;

    $.ajax({
      url: fcstURL2,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(fcstURL);

        // Log the resulting object
        console.log(response);
        fcstResponse = response;

        clearFcst();
        getIcons();
        buildIconURL();
        renderFcst();

      });


  }

// Forecast block updates
// really should make this in a loop, rather than hard coding 

var icon0;
var icon1;
var icon2;
var icon3;
var icon4;
var icon5;
var icon1URL;
var icon2URL;
var icon3URL;
var icon4URL;
var icon5URL;



// function to get icons

function getIcons() {

  // icon0 = currenDayResponse.weather[0].icon;
  icon1 = fcstResponse.list[0].weather[0].icon;
  icon2 = fcstResponse.list[1].weather[0].icon;
  icon3 = fcstResponse.list[2].weather[0].icon;
  icon4 = fcstResponse.list[3].weather[0].icon;
  icon5 = fcstResponse.list[4].weather[0].icon;
}


// function to get build icon URL's

function buildIconURL() {

  icon0URL = "<img src='http://openweathermap.org/img/wn/" + icon0  + "@2x.png' style='float:right; height:200px;width:200px; margin-right:100px'</img>";
  icon1URL = "<img src='http://openweathermap.org/img/wn/" + icon1  + "@2x.png' style='float:right; height:30px;width:30px;'</img>";
  icon2URL = "<img src='http://openweathermap.org/img/wn/" + icon2  + "@2x.png' style='float:right; height:30px;width:30px;'</img>";
  icon3URL = "<img src='http://openweathermap.org/img/wn/" + icon3  + "@2x.png' style='float:right; height:30px;width:30px;'</img>";
  icon4URL = "<img src='http://openweathermap.org/img/wn/" + icon4  + "@2x.png' style='float:right; height:30px;width:30px;'</img>";
  icon5URL = "<img src='http://openweathermap.org/img/wn/" + icon5  + "@2x.png' style='float:right; height:30px;width:30px;'</img>";

}

function clearFcst () {
  $("#fcstDay1").empty();
  $("#fcstDay2").empty();
  $("#fcstDay3").empty();
  $("#fcstDay4").empty();
  $("#fcstDay5").empty();

}



function renderFcst(){

  $("#fcstDay1").append(days[dayIndex]);
  $('#fcstDay1').append(icon1URL); 
  $('#fcstDay1').append('<br><br>');
  $('#fcstDay1').append(fcstResponse.list[0].weather[0].main);
  $('#fcstDay1').append('<br>');
  $('#fcstDay1').append(fcstResponse.list[0].temp.max);

  $("#fcstDay2").append(days[dayIndex+1]);
  $('#fcstDay2').append(icon2URL); 
  $('#fcstDay2').append('<br><br>');
  $('#fcstDay2').append(fcstResponse.list[1].weather[0].main);
  $('#fcstDay2').append('<br>');
  $('#fcstDay2').append(fcstResponse.list[1].temp.max);

  $("#fcstDay3").append(days[dayIndex+2]);
  $('#fcstDay3').append(icon3URL); 
  $('#fcstDay3').append('<br><br>');
  $('#fcstDay3').append(fcstResponse.list[2].weather[0].main);
  $('#fcstDay3').append('<br>');
  $('#fcstDay3').append(fcstResponse.list[2].temp.max);

  $("#fcstDay4").append(days[dayIndex+3]);
  $('#fcstDay4').append(icon4URL); 
  $('#fcstDay4').append('<br><br>');
  $('#fcstDay4').append(fcstResponse.list[3].weather[0].main);
  $('#fcstDay4').append('<br>');
  $('#fcstDay4').append(fcstResponse.list[3].temp.max);

  $("#fcstDay5").append(days[dayIndex+4]);
  $('#fcstDay5').append(icon5URL); 
  $('#fcstDay5').append('<br><br>');
  $('#fcstDay5').append(fcstResponse.list[4].weather[0].main);
  $('#fcstDay5').append('<br>');
  $('#fcstDay5').append(fcstResponse.list[4].temp.max);

}


function loadLastSearch(){
  queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
             "q=" + cityState + "&units=imperial&appid=" + APIKey;
            //  $('#city1').append(currentCity);
             getCurrentWeather();
  // using saved currentCity from local storage   
            fcstURL2 = "https://api.openweathermap.org/data/2.5/forecast/daily?" +
            "q=" + currentCity + "&cnt=5&units=imperial&appid=" + APIKey;
            getForecast();

  // getIcons();
  // buildIconURL();
  // renderFcst();

      }





