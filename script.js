  
  
// get times from moment and set variable for local storage

  var savedSchedule;
  var fullDay = moment().format('MMMM Do YYYY'); 
  var currentHour = moment().format('H');

  console.log(fullDay);
  // alert("hello - Friday");

// updates current day in header 

document.getElementById("navbar-subtitle").innerHTML=fullDay;


// array for hours and content in calendar

var calArray = [ 
  { hour: 9,
    event: "free"},
  { hour: 10,
    event: "free"},
  { hour: 11,
    event: "free"},
  { hour: 12,
  event: "free"},  
  { hour: 13,
    event: "free"},  
  { hour: 14,
    event: "free"},         
  { hour: 15,
    event: "free"},
  { hour: 16,
    event: "free"},
  { hour: 17,
    event: "free"},
]


// function to color the calendar rows based upon time-of-day

function colorCalendar(){
  for (var i = 0 ; i < calArray.length; i++ ) {
      var hour = "cal-" + calArray[i].hour;
      var adjHour = i+9;
      console.log(hour);
      console.log("current hour = " + currentHour);
      console.log("index = " + adjHour);
      if (adjHour<currentHour){
          document.getElementById(hour).setAttribute ("style" ,
          "background-color:grey");
      }

      else if (adjHour==currentHour){
        document.getElementById(hour).setAttribute ("style" ,
        "background-color: steelblue");
        console.log("else");
        console.log(currentHour);
        console.log(adjHour);
  }
  }
}


// function to refresh the calendar from calArray

function refreshCalendar(){
for (var i = 0 ; i < calArray.length; i++ ) {
    var hour = "#cal-" + calArray[i].hour;
    if (calArray[i].event !="free"){
      $(hour).val(calArray[i].event);
    }
}
}

// on click of save icon on right, update the calArray, 
// save the entry to local storage and refresh row color
// based upon time-of-day

$(".saveBox").on("click", function(){
   alert("saved")
   var dataHour = $(this).attr("data-hour");
   var i = dataHour-9;
   var hour = "#cal-" + dataHour; 
   console.log(hour);
   calArray[i].event=$(hour).val()
   console.log(calArray[i].event);

   saveSchedule();
   colorCalendar();
}
)

// save the schedule to local storage

function saveSchedule(){
localStorage.schedule =  JSON.stringify(calArray);
}


// get the saved schedule from local storage 

function getSavedSchedule() {

 calArray = JSON.parse(localStorage.schedule);

}

// retreive schedule from local storage and update the calendar on reload 

getSavedSchedule();
refreshCalendar();
colorCalendar();




