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
    //gets user input
    var duration = $('#duration').val().trim();
    console.log(duration)
    //creates local holder for train times
    var tripInfo = {
        time: duration,
    };
    database.set(tripInfo);

    console.log(tripInfo.time)
});