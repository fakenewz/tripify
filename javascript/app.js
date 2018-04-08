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
//button for adding trains
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