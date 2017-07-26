//JS JQuery and Gmap Section

	//Firebase section
var dbRef = new Firebase('https://local-transpose.firebaseio.com/');
var history_ref = dbRef.child('history_data');
var login_ref = dbRef.child('login_data');
var payment_ref = dbRef.child('payment_data');
var registration_ref = dbRef.child('registration');
var transport_ref = dbRef.child('transport_data');
var map;

/*
map.drawRoute({
  origin: [-12.044012922866312, -77.02470665341184],
  destination: [-12.090814532191756, -77.02271108990476],
  travelMode: 'driving',
  strokeColor: '#131540',
  strokeOpacity: 0.6,
  strokeWeight: 6
});



var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

var marker = null;

function autoUpdate() {
  navigator.geolocation.getCurrentPosition(function(position) {  
    var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                          position.coords.longitude);

    if (marker) {
      // Marker already created - Move it
      marker.setPosition(newPoint);
    }
    else {
      // Marker does not exist - Create it
      marker = new google.maps.Marker({
        position: newPoint,
        map: map
      });
    }

    // Center the map on the new position
    map.setCenter(newPoint);
  }); 

  // Call the autoUpdate() function every 5 seconds
  setTimeout(autoUpdate, 5000);
}

autoUpdate();




if (navigator.geolocation) { 
  navigator.geolocation.getCurrentPosition(function(position) {  

    var point = new google.maps.LatLng(position.coords.latitude, 
                                       position.coords.longitude);

    // Initialize the Google Maps API v3
    var map = new google.maps.Map(document.getElementById('map'), {
       zoom: 15,
      center: point,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Place a marker
    new google.maps.Marker({
      position: point,
      map: map
    });
  }); 
} 
else {
  alert('W3C Geolocation API is not available');
} 
*/
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	 watchID = navigator.geolocation.watchPosition(onSuccess, onError, { maximumAge: 10000, timeout: 2000, enableHighAccuracy: true});
	
}
function onSuccess(position)
{
	map.removeMarkers();
    map.addMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        title: 'Marker with InfoWindow',
		icon: "img/toto.jpg"
      });
    //var kilomiters = position.coords.speed * 3.6;
	//alert(position.coords.latitude);
	//alert(position.coords.longitude);
	//alert(position.coords.speed);
	//var miles = position.coords.speed * 2.23694;
	//$('.kiloval').html(kilomiters.toFixed(0));
	//$('.milesval').html(miles.toFixed(0));
    //alert(position.coords);
    //alert("inner");
	
	// store in firebase staart here
					var query = registration_ref.orderByChild('id').equalTo(localStorage.id);
					query.on('value', function(snapshot) {
						snapshot.forEach(function(weekSnapshot) 
						{
							console.log(weekSnapshot.val());
							weekSnapshot.ref().update({ lat:position.coords.latitude, lng: position.coords.longitude  });
						});
					});
	// store in firebase end here
	
}
function onSuccess1(position)
{
	map.removeMarkers(); //
    map.addMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        title: 'Marker with InfoWindow',
        infoWindow: {
          content: '<p>Your ch Location</p>'
        },
		icon: "img/toto.jpg"
      });
	  //Show Speed
	  localStorage.lat = position.coords.latitude; localStorage.lng = position.coords.longitude;
	  var kilomiters = position.coords.speed * 3.6;
	  var show_speed = (isNaN(kilomiters))?0:kilomiters;
	  $("#speed").html(show_speed+" Km/h");
	  
	 // store in firebase staart here
					var query = registration_ref.orderByChild('id').equalTo(localStorage.id);
					query.on('value', function(snapshot) {
						snapshot.forEach(function(weekSnapshot) 
						{
							console.log(weekSnapshot.val());
							weekSnapshot.ref().update({ lat:localStorage.lat, lng: localStorage.lng  });
						});
					});
	// store in firebase end here
			
}
function logout()
{
		localStorage.id = undefined;
        localStorage.email = undefined;
        localStorage.key = undefined;
		localStorage.removeItem("id");
		localStorage.removeItem("email");
		localStorage.removeItem("key");
		window.location.href="index.html";
}
function home_load()
{
	//$("body").hide();
	
	if(localStorage.lat == undefined)
	{
		if (navigator.geolocation) 
		{
			navigator.geolocation.getCurrentPosition(function(position) 
			{
				localStorage.lat = position.coords.latitude;
				localStorage.lng = position.coords.longitude;
			}); 
		}
	}
		//localStorage.id = lalue.id;
        //localStorage.email = lalue.email;
        //localStorage.key = snap.key();
		//alert(localStorage.id);
	if(localStorage.id != undefined)
	{
		window.location.href = "map.html";
	}
}
function onError(e)
{
    //alert(e);
    //alert("error");
	console.log("error: "+e.code+" - "+e.message);
	if(e.code == 1 || e.code == 2)
	{
		console.log("Please on your GPS");
	}
}


    function load_map(type)
	{
		//$("#map").css("height",window.innerHeight+" !important");
//alert(window.innerHeight);
      /*map.addMarker({
        lat: -12.042,
        lng: -77.028333,
        title: 'Marker with InfoWindow',
        infoWindow: {
          content: '<p>HTML Content</p>'
        }
      });*/
		if (navigator.geolocation) 
		{ 
          map = new GMaps(
			{
				el: '#map',
				lat: localStorage.lat,
				lng: localStorage.lng
			});
			navigator.geolocation.getCurrentPosition(function(position) 
			{  

			// var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			//alert(position.coords.latitude);
			//$("#result").html(position.coords.latitude+", "+position.coords.longitude);
			//alert("outer");
				map.addMarker(
				{
					lat: position.coords.latitude,
					lng: position.coords.longitude,
					title: 'Marker with InfoWindow',
					infoWindow: 
					{
						content: '<p>Your Location</p>'
					},
					icon: "img/toto.jpg"
				});
				localStorage.lat = position.coords.latitude; localStorage.lng = position.coords.longitude;
				
			if(localStorage.id != undefined)
			{
					var query = registration_ref.orderByChild('id').equalTo(localStorage.id);
					query.on('value', function(snapshot) {
						snapshot.forEach(function(weekSnapshot) 
						{
							console.log(weekSnapshot.val());
							weekSnapshot.ref().update({ lat:localStorage.lat, lng: localStorage.lng  });
						});
					});
			}
				
				
				if(type == "without_history")
				{
					navigator.geolocation.watchPosition(onSuccess, onError, 
					{ maximumAge: 10000, timeout: 2000, enableHighAccuracy: true});
				}
				else
				{
					navigator.geolocation.watchPosition(onSuccess1, onError, 
					{ maximumAge: 10000, timeout: 2000, enableHighAccuracy: true});
				}

				// Initialize the Google Maps API v3
   
    
			}); 
		}
    }

/*
//Update Section
registration_ref.orderByChild("email").equalTo("surajitsadhukhan1@gmail.com").on("child_added", function(snap) //Condition (where)
	{
    var lalue = snap.val();
    var key = snap.key();
    var last_name = lalue.last_name;
    var id = lalue.id;
    var email = lalue.email;
    var password = lalue.password;
    registration_ref.child(key).update(
      {
            id: id,
						first_name: "Sa",
						last_name: last_name,
						email: email,
						password: password
      });
	});
*/





//Angular js section
$("#signup_tab").click(function()
{
	$(this).addClass("active");
	$("#login_tab").removeClass("active");
	$("#login").hide();
	$("#signup").show();
});
$("#login_tab").click(function()
{
	$(this).addClass("active");
	$("#signup_tab").removeClass("active");
	$("#login").show();
	$("#signup").hide();
});
//AngularJS Section
	angular.module("myauth", [])
  .controller("authform", function($scope) 
  {
            //$scope.helloTo = {};
            //$scope.helloTo.title = "AngularJS";
			$scope.login_sec = true;
			$scope.signup_sec = false;
			$scope.signup_tab = function()
			{
				swal("Alert","signup");
				$scope.login_sec = false;
				$scope.signup_sec = true;
			}
			$scope.login_tab = function()
			{
				swal("Alert","login");
				$scope.login_sec = true;
				$scope.signup_sec = false;
			}
      $scope.signup = function()
      {

        //Add data in database
              //alert($scope.reg_first_name);
			  
          //reg code
          //registration_ref.endAt().limit(1).on("child_added", function(snap1)
           //registration_ref.limitToLast(1).on("child_added", function(snap1)
		   var curr_child = 1;
		registration_ref.once('value', function(snapshot)
          {
			  var max_child = snapshot.numChildren();
	            //alert(snap1.key());
              //return false;
	            registration_ref.on("child_added", function(snap)  //all
	            //registration_ref.orderByChild("email").equalTo("surajitsadhukhan1@gmail.com").on("child_added", function(snap) //Condition (where)
	            {
		              //return false;
                  //alert("key"+snap.key());alert("val"+snap.key());
		              var lalue = snap.val();
		              var key = snap.key();
		              console.log("added", snap.key(), snap.val());
                  var lalue = snap.val();
                  var key = snap.key();
                  if(lalue.phone == $scope.reg_email)
                  {
                    swal("Alert","Already Registered");
                    return false;
                  }
		              if(max_child == curr_child)
		              {
			                //alert("last key");
                      registration_ref.push(
					            {
						            id: new Date().getTime()+Math.random().toString(16).slice(2)+new Date().getUTCMilliseconds(),
						            first_name: $scope.reg_first_name,
						            last_name: $scope.reg_last_name,
						            phone: $scope.reg_email,
						            password: $scope.reg_password
					            });
					            swal("Alert","Registration Successful");
					            $("#login_tab").click();
		              }
					curr_child++;
	            });
          });
      } 
      $scope.login = function()
      {
        //swal("Alert","Login");
        var email = $scope.log_email;
        var password = $scope.log_password;
        //return false;
        
		var curr_child = 1;
		registration_ref.once('value', function(snapshot) 
		{ 
			//alert (snapshot.numChildren());
			var max_child = snapshot.numChildren();
			registration_ref.on("child_added", function(snap)  //all
	            {
					
					//alert("snap"+snap.key());
		             
		              var lalue = snap.val();
		              var key = snap.key();
		              console.log("added", snap.key(), snap.val());
					var lalue = snap.val();
                  var key = snap.key();
				  
                  if(lalue.phone == email && lalue.password == password)
                  {
                    localStorage.id = lalue.id;
                    localStorage.phone = lalue.email;
                    localStorage.key = snap.key();
                    window.location.href="map.html";
                    return false;
                  }
				  //alert("max child"+max_child);alert("curr child"+curr_child);alert("key"+snap.key());
		              if(max_child == curr_child)
		              {
			                //alert("last key "+max_child+curr_child);
                      
					            swal("Alert","Invalid Credential");
					            //$("#login_tab").click();
		              } 
					  curr_child++;
	            });
		});
      }
    });


    
