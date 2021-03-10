
var test;
function checkData()
{
    alert(xmlhttp.readyState);
};

let test = d3.json("http://localhost:8000/small_data.csv")

function write(jsontitle,jsoncontent){
	var xhr = new XMLHttpRequest();
	xhr.open("GET",'../../add?title='+jsontitle+'&content='+JSON.stringify(jsoncontent), false);
	xhr.send();
}

load();






function getTimeSpent(nom){
	totalTime = 0;
	for(var i=0 ; i<n ; i++){
			if(test[i].hasOwnProperty('placeVisit')){
				if(test[i].placeVisit.location.name.includes(nom)){
					totalTime += (test[i].placeVisit.duration.endTimestampMs - test[i].placeVisit.duration.startTimestampMs);
				}
			}
			else	{
				if(test[i].activitySegment.activityType.includes(nom)){
					totalTime += (test[i].activitySegment.duration.endTimestampMs - test[i].activitySegment.duration.startTimestampMs);
				}
			}
	
	}
	return totalTime;
};

function totalDuration(){
	totalTime = 0;
	for(var i=0 ; i<n ; i++){
		if(test[i].hasOwnProperty('placeVisit')){
			totalTime += (test[i].placeVisit.duration.endTimestampMs - test[i].placeVisit.duration.startTimestampMs)
		}
		else 	{
			totalTime += (test[i].activitySegment.duration.endTimestampMs - test[i].activitySegment.duration.startTimestampMs)
		}
	}
	return totalTime;
}

var childvisits = [];


function childVisitsScan(name){
	var temp = test.filter(function(place){
		return (place.hasOwnProperty('placeVisit') && place.placeVisit.hasOwnProperty("childVisits"));
	});
	var l = temp.length;
	for (var i = 0 ; i <l ; i++){
		var object = {'placeVisit': {
			"location" : temp[i].placeVisit.childVisits[0].location
		}};
		var startParent = temp[i].placeVisit.duration.startTimestampMs;
		var endParent = temp[i].placeVisit.duration.endTimestampMs;
		var startChild = temp[i].placeVisit.childVisits[0].duration.startTimestampMs;
		var endChild = temp[i].placeVisit.childVisits[0].duration.endTimestampMs;
		if (startParent < startChild){
			temp[i].placeVisit.duration.endTimestampMs = startChild;
			object['placeVisit']['duration'] = {"startTimestampMs" : startChild, "endTimestampMs" : endChild};
		}
		else if (endChild < endParent){
			temp[i].placeVisit.duration.startTimestampMs = endChild;
			object['placeVisit']['duration'] = {"startTimestampMs" : startChild, "endTimestampMs" : endChild};
			console.log(object);
		}
		else{
			temp[i].location = object.location;
			continue;
		}
		childvisits.push(object);
		test.push(object);
	}
}

childVisitsScan();
console.log(childvisits);
n = test.length;




let listOfPlaces = test.filter(function(place){
	return place.hasOwnProperty('placeVisit');
})
.map(function(place){
	return place.placeVisit.location.name;
})
.filter(function(value, index, self){
	return self.indexOf(value) === index;
});


let listOfActivities = test.filter(function(place){
	return place.hasOwnProperty('activitySegment');
})
.map(function(place){
	return place.activitySegment.activityType;
})
.filter(function(value, index, self){
	return self.indexOf(value) === index;
});

console.log(listOfPlaces);
console.log(listOfActivities);



var	repartition_temps = [] ;
var	repartition_activites = [] ;


/*for (var place in listOfPlaces){
	var placeName = listOfPlaces[place];
	var object = { "place" : [placeName][0], "timeSpent" : getTimeSpent(placeName), "type" : "defaut"};
	if (placeName === "151 Rue du Faubourg Saint-Antoine" || placeName === "16 Rue de Cambrai"){
		object.place = "A la Maison"
		object.type = "Domicile"
	}
	else if (placeName === "Télécom Paris"){
		object.place = "Télécom Paris"
		object.type = "Etudes"
	}
	else if (placeName === "Rennes Driving School Groupe Permis75" || placeName === "Carrefour City" || placeName.includes("La Bicyclette") || placeName == "Centre Commercial Saint Lazare Paris" || placeName == "Boutique Orange Bastille - Paris 12" || placeName == "20 Rue Sainte-Isaure"){
		object.type = "Achats"
	}
	else if (placeName === "180 Avenue de Choisy"){
		object.type = "Travail"
	}
	
	else if (placeName === "Telecom bar'iTech" || placeName.includes("Cantine")){
		object.place = "Au bar / Au resto"
		object.type = "Loisirs"
	}
	else if (placeName.includes("UGC")){
		object.place = "Au Cinéma"
		object.type = "Loisirs"
	}
	else if (placeName.includes("Gymnasium") || placeName.includes("Gymnase")){
		object.place = "Au Gymnase"
		object.type = "Loisirs"
	}
	else if (placeName.includes("Place d'Italie")){
		object.place = "En Balade";
		object.type = "Loisirs";
	}
	else{
		object.type = "Loisirs"
	}
	repartition_temps.push(object);
};



var loisirsTime = repartition_temps.filter(function(place){
	return place.type == "Loisirs";
})
.map(function(place){
	return place.timeSpent;
})
.reduce((a, b) => a + b, 0);

var achatsTime = repartition_temps.filter(function(place){
	return place.type == "Achats";
})
.map(function(place){
	return place.timeSpent;
})
.reduce((a, b) => a + b, 0);




var transportTime = 0;
for (var activity in listOfActivities){
	var activityName = listOfActivities[activity];
	if (activityName ==="IN_TRAIN" || activityName ==="IN_BUS" || activityName ==="IN_SUBWAY" || activityName ==="IN_TRAM"){
		transportTime += getTimeSpent(activityName);
	};

	var object = { "activity" : [activityName][0], "timeSpent" : getTimeSpent(activityName)};
	repartition_activites.push(object);
}

repartition_activites.push( {"activity" : "Transports", "timeSpent" : transportTime} );

*/

/*
console.log(repartition_temps);
console.log(repartition_activites);*/

for (var place in listOfPlaces){
	var placeName = listOfPlaces[place];
	console.log(placeName);
	var object = { "place" : [placeName][0], "timeSpent" : getTimeSpent(placeName), "type" : "defaut"};
	if (placeName === "151 Rue du Faubourg Saint-Antoine"){
		object.place = "A la Maison"
		object.type = "Domicile"
	}
	else if (placeName === "IMT"){
		object.place = "Télécom Paris"
		object.type = "Etudes"
	}
	else if (placeName === "Monoprix" || placeName === "Sandqvist" || placeName == "Suitsupply" || placeName == "Franprix" || placeName == "Halles de Paris" || placeName == "Le marché couvert Beauvau"){
		object.type = "Achats"
	}
	else if (placeName === "2.4.7. Films"){
		object.type = "Travail"
	}
	
	else if (placeName === "24 Avenue Simon Bolivar"){
		object.place = "Chez un ami"
		object.type = "Loisirs"
	}
	else if (placeName === "Résidence étudiante Jean d'Ormesson"){
		object.place = "Chez un ami"
		object.type = "Loisirs"
	}
	else{
		object.place = "En Balade";
		object.type = "Loisirs";
	}
	repartition_temps.push(object);
};

var loisirsTime = repartition_temps.filter(function(place){
	return place.type == "Loisirs";
})
.map(function(place){
	return place.timeSpent;
})
.reduce((a, b) => a + b, 0);

var achatsTime = repartition_temps.filter(function(place){
	return place.type == "Achats";
})
.map(function(place){
	return place.timeSpent;
})
.reduce((a, b) => a + b, 0);




var transportTime = 0;
for (var activity in listOfActivities){
	var activityName = listOfActivities[activity];
	if (activityName ==="IN_TRAIN" || activityName ==="IN_BUS" || activityName ==="IN_SUBWAY"){
		transportTime += getTimeSpent(activityName);
	}
	var object = { "activity" : [activityName][0], "timeSpent" : getTimeSpent(activityName)};
	repartition_activites.push(object);
}

repartition_activites.push( {"activity" : "Transports", "timeSpent" : transportTime} );




console.log(repartition_temps);
console.log(repartition_activites);



write("repartition_activites", repartition_activites);
write("repartition_temps", repartition_temps);

