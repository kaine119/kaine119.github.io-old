var database = firebase.database();

function writeNewEvent(eventToWrite) {
	// body...
	

	// Generate key for new event
	var newEventKey = database.ref().child("tasks").push().key;
	console.log(newEventKey);

	database.ref("tasks/" + newEventKey).set(eventToWrite);
}

function getLatLng(address, callback){
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		"address": address,
		"region": "SG"
	}, function(results, status){
		if (results[0] != null) {
			var resultLatLng = results[0].geometry.location;
			
			callback(null, {lat: resultLatLng.lat(), lng: resultLatLng.lng()});
		}
		else {
			callback(true, {});
		}
	});
}

function onSubmit(){
	var address = document.getElementById('addr').value;
	var date = document.getElementById('dmy').value;
	var desc = document.getElementById("desc").value;
	var org = document.getElementById('oName').value;
	var roles = document.getElementById('ra').value;
	var skills = document.getElementById('skillreq').value;
	var startTime = document.getElementById('sti').value;
	var endTime = document.getElementById("eti").value;
	var timeToSubmit = startTime + " to " + endTime;
	var title = document.getElementById('eName').value;
	var url = document.getElementById('linkSite').value || "http://google.com"; 
	var tags = document.getElementById('tags').value;
	console.log(tags)

	console.log(address, date, desc, org, roles, skills, startTime, endTime, timeToSubmit, title, url);
	getLatLng(address, function(err, latlng){
		console.log(latlng);
		var eventToWrite = {
			"address": address,
			"date": date,
			"desc": desc,
			"lat": latlng.lat.toString(),
			"lng": latlng.lng.toString(),
			"org": org,
			"roles": roles,
			"skills": skills,
			"tags": [tags],
			"time": timeToSubmit,
			"title": title,
			"url": url
		};

		writeNewEvent(eventToWrite);

	});


}

document.getElementById("submitEvent").addEventListener('click', function(e){
	e.preventDefault();
	onSubmit();
})