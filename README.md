# fhs-weather

Weather Dashboard

Summary: this is a "weather dashboard' which allows a user to input city + state and see the current day weather and 5-day forecast for that city.  It also saves prior searches and shows that search history plus the weather information from the user's last search when the page is reloaded as specified in the instructions for the assignment. Functionally, the app is made up of several different components using the openweathermap.org api, they are:

(1) Upon loading the page for the first time user is presented with a blank weather dashboard with an input box for city + state and a search button to get things going.  If the user is reloading the page, then the recent search history and weather information for the most recent search will display.  Search history is saved in local storage as one uses the app.  The information and icons displayed come from openweather.org as specified in the instructions.  The current day weather information and icon is displayed in the large central block;  Recent search history on the left and five-day forecast on the bottom. 

(2) The user must enter full city and state name or the app won't render a new set of weather information, as that is how the api works.  I didn't have time to get to validation of user input, but that functionality wasn't part of the requirements although it is a good practice but likely beyond the scope of this assignment.  

(3) The app uses three ajax calls to get (a) current day weather, (b) forecast, and (c) UV Index.  These could be collapsed into two, but I did't realize that UVI was a requirement until after the other calls had been written and didn't have time to re-work those.  There are two major functions to getCurrentWeather and getForecast plus several rendering and consolidation functions to getIcons, buildIconURL's, getUVI, renderForecast, renderCities, clearFcst and LoadLastSearch to support page re-load.  

There app uses an index.html, style.css and script.js files - images come from openweathermap. The html page loads the header, has the bootstrap grid for the layout and calls for the prior search history to be loaded (if applicable).  It also loads moment.js, jquery and the script file. Current day information comes from moment.js.    

The renderForecast and renderCities functions should be re-factored so they are loops, rather than repetitive blocks, but I didn't have time to de-bug that and will do so with my TA later in the week as a learning exercise.  

Comments are in the code as well.  A screenshot is below:

![img](https://github.com/fhsal/fhs-weather/blob/master/dashboard_screenShot.jpg)
