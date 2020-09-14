
// identifying the city, state
    // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var todayWeather
    // var cityState = prompt("enter City and State");
    var queryURL

    var fullDay = moment().format('MMMM Do YYYY');

    console.log(fullDay);

    document.getElementById("subTitle").innerHTML= "weather & forecast, " + fullDay

    
    // getting current day of the week 
    
    var d = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday", "Monday", "Tuesday",
                 "Wednesday", "Thursday"];
    var today = days[d.getDay()]; 
    var dayIndex=d.getDay();




    // document.getElementById("demo").innerHTML = days[d.getDay()];

    var cityArray = ["city+1", "city+2", "city+3", "city+4", "city+5"];



// function to make ajax call to retrieve current day weather

// function getCurrentWeather() {

  
        // Here we run our AJAX call to the OpenWeatherMap API for current weather 


// }

    $(document).ready(function () {

      $("#executeSearch").on("click", function () {
          // confirm($('#searchCity').val());
          console.log($('#searchCity').val());
          cityState = $('#searchCity').val();
          queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
                      "q=" + cityState + "&units=imperial&appid=" + APIKey;
          console.log(queryURL);
          getCurrentWeather();
          renderCities();
          //DO SEARCH
          //RENDER RESULT
      });
    });

// update recent city list and save to local storage

    function renderCities() {
      // cityArray.unshift(currentCity);
      $('#city1').text(cityArray[0]);
      $('#city2').text(cityArray[1]);
      $('#city3').text(cityArray[2]);
      $('#city4').text(cityArray[3]);
      $('#city5').text(cityArray[4]);
      localStorage.CityArray = cityArray;
    } 
    
renderCities();

// method to insert new cities at front of cityArray

// cityArray = "";

// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// document.getElementById("demo").innerHTML = fruits;

// function myFunction() {
//   fruits.unshift("Lemon", "Pineapple");
//   document.getElementById("demo").innerHTML = fruits;
// }


// queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
// "q=" + cityState + "&units=imperial&appid=" + APIKey;

console.log(queryURL);


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
        currenDayResponse = response;

        // Transfer content to HTML
        // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humidity").text("Humidity: " + response.main.humidity);
        
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


        // Load the main weather block with current information and icon

        $('#weatherBody').html( '<h2>'+ today +"'s Weather in " + currentCity + "</h2>");  
        $('#weatherBody').append('<br>'); 
        $('#weatherBody').append('<img src="./images/sunnyBig.jpg" style="float:right; height:200px;width:200px; margin-right:100px"</img> <br>'); 
        // will change above to be different icons based upon current conditions shortly
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
      
        // $("weatherBody").text("Current Weather: " + currentWeatherDesc);
        // $("weatherBody").text("Current Temperature: " +currentTemp);
        // $("weatherBody").text("Current Humidity: " +currentHumidity);
        // $("weatherBody").text("Current Wind: " +currentWind);

        // $('weatherBody').append("<p">currentTemp,"</p>");

        // add temp content to html
        // $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
        cityArray.unshift(currentCity);

      });
  }

// Forecast block updates

$('#fcstDay1').append(days[dayIndex+1]);
$('#fcstDay1').append('<img src="./images/sunnySmall.jpg" style="float:right;"</img>'); 
$('#fcstDay1').append(currentWeather);
$('#fcstDay1'.append(tempMax));



// getCurrentWeather();



// var dayOne 

// .then(function(response){

// dayOne=response.dayOne;
// dayTwo=response.dayTwo
// etc. 

// $(".forecast").append("<div>" + dayOne + "</div>")

// // to clear

// $(".forecast").text("");