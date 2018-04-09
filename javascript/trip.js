var config = {
    apiKey: "AIzaSyBj0_c4X1vR7VUUaoBk3l9X7DGeGeyt3P8",
    authDomain: "latestfakenewz-e06a5.firebaseapp.com",
    databaseURL: "https://latestfakenewz-e06a5.firebaseio.com",
    projectId: "latestfakenewz-e06a5",
    storageBucket: "latestfakenewz-e06a5.appspot.com",
    messagingSenderId: "694378988953"
  };
  firebase.initializeApp(config);
  var database = firebase.database().ref();

$('#submit').on('click', function(){
    event.preventDefault();

    var latitude2 = $('#latitude2').val().trim();
    var longitude2 = $('#longitude2').val().trim();
    var finalArrive = $('#finalArrive').val().trim();
    var distance = $('#distance').val().trim();
    
    var trip = {
        latitude: latitude2,
        longitude: longitude2,
        distance: distance,
        finalArrive: finalArrive,
    }

    database.set(trip);
    console.log(trip.latitude)
    console.log(trip.longitude)
    console.log(trip.finalArrive)
}); 

    function initMap() {
        var latitude1; 
        var longitude1;
        var latitude2;
        var longitude2;
            // This is autocomplete for input from location and to location
        var from_location = document.getElementById('from_location');
        var to_location = document.getElementById('to_location');
        var fromautocomplete = new google.maps.places.Autocomplete(from_location);
        var toautocomplete = new google.maps.places.Autocomplete(to_location);
            // Get from lat and lang 
     google.maps.event.addListener(fromautocomplete, 'place_changed', function() {
        var place = fromautocomplete.getPlace();
        latitude1 = place.geometry.location.lat();
        longitude1 = place.geometry.location.lng();
        });
    // get to to lat and lang
     google.maps.event.addListener(toautocomplete, 'place_changed', function() {
        var place = toautocomplete.getPlace();
        latitude2 = place.geometry.location.lat();
        longitude2 = place.geometry.location.lng();
        
        console.log(latitude2)
        console.log(longitude2)
        
        var todayTime=Date.now();
            console.log(todayTime);
        var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
            origins: [from_location.value],
                destinations: [to_location.value],
                travelMode: google.maps.TravelMode.TRANSIT,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false
        }, 
                               
       function(response, status) {
            if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                var distance = response.rows[0].elements[0].distance.text;
                var duration = response.rows[0].elements[0].duration.value;
                          
                console.log(distance);
                            
                $('#distance').val(distance);
                $('#latitude2').val(latitude2);
                $('#longitude2').val(longitude2);
                            
                } else {
                    alert("Unable to find the distance via road.");
                }
                      durationM = duration * 1000;
                      arrivalTime = todayTime + durationM;

                      var d = new Date(arrivalTime);
                       d.toLocaleString('en-US',{month:"2-digit",day: "2-digit", year:"numeric", hour: "2-digit", minute: "2-digit"},);
                       console.log(d.toLocaleString('en-US',{month:"2-digit",day: "2-digit", year:"numeric", hour: "2-digit", minute: "2-digit"},))
                       var finalArrive = d.toLocaleString('en-US',{month:"2-digit",day: "2-digit", year:"numeric", hour: "2-digit", minute: "2-digit"},);
                       console.log(finalArrive);
                       $('#finalArrive').val(finalArrive); 
                    });
              
    var queryURL1 = "http://api.eventful.com/json/events/search?app_key=g6TsjTdbZ8MMtB3k&where=" + latitude2 + "," + longitude2 + "&within=1&sort_order=popularity&date=" + finalArrive + "00&page_size=10&page_number=1&format=json&callback=?";
    console.log("URL: " + queryURL1);
              
    $.ajax({
      url: queryURL1,
      method: "GET",
      async: false,
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    }).then(function(response) {
         console.log("Look here: " + queryURL1);
         console.log(response);

    for(var i = 0; i < 5; i++) {
    
            $("#well-section").append("<div><br><br>" + response.events.event[i].venue_name + "<br>" + response.events.event[i].title + "<br>" + response.events.event[i].start_time + "</div>");

            if (!response.events.event[i].image || response.events.event[i].image.medium.url === "http://d1marr3m5x4iac.cloudfront.net/store/skin/no_image/categories/128x128/other.jpg" && !response.events.event[i].venue_url) {
                console.log("HIDE")
            } else if (response.events.event[i].image && response.events.event[i].image.medium.url !== "http://d1marr3m5x4iac.cloudfront.net/store/skin/no_image/categories/128x128/other.jpg" && response.events.event[i].venue_url) {
                console.log("IMAGE: " + response.events.event[i].image.medium.url);
             
             function imgFunction() {
                var linkDiv = $("<div>");
                var image = $("<img>");
                
                var aHref = document.createElement("a");
                var venueURL = response.events.event[i].venue_url;
                aHref.setAttribute("href", venueURL);
                aHref.setAttribute('target', '_blank');

                var imgURL = response.events.event[i].image.medium.url;
                image.addClass("imageClass");
                image.attr("src", imgURL);
                linkDiv.append(image);
                $("#well-section").append(linkDiv);
                
                aHref.innerHTML = "Click here for venue and ticket info!"
                document.getElementById("well-section").appendChild(aHref);
            }
            imgFunction();

        } else if (!response.events.event[i].image || response.events.event[i].image.medium.url === "http://d1marr3m5x4iac.cloudfront.net/store/skin/no_image/categories/128x128/other.jpg" && response.events.event[i].venue_url) {
                function imgFunction2() {
                var linkDiv = $("<div>");
                
                var aHref = document.createElement("a");
                var venueURL = response.events.event[i].venue_url;
                aHref.setAttribute("href", venueURL);
                aHref.setAttribute('target', '_blank');

                aHref.innerHTML = "Click here for venue and ticket info!"
                document.getElementById("well-section").appendChild(aHref);
             }
            imgFunction2();
         } 
     }
    });
   }); 
  }; 
