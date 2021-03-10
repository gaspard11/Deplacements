let files_h = ["http://localhost:8000/Data/2019_JANUARY.json","http://localhost:8000/Data/2021_JANUARY.json"];






Promise.all(files_h.map(url => d3.json(url))).then(function(values) {
	var data_h_2019 = values[0];
	var data_h_2021 = values[1];
	var n = data_h_2021.length;
	let startTime = 1546873200000;
	let endTime = 1548025200000;
	let index = 0;
	let n_heures = (endTime-startTime)/3.6e+6
	
	console.log(n_heures);


	function placeOrActivity(index){
	var start;
	var end;
	var path;

	//Est-ce une activité ou un lieu ?
	

	if(data_h_2019[index].hasOwnProperty('placeVisit')){
		start = data_h_2019[index].placeVisit.duration.startTimestampMs;
		end = data_h_2019[index].placeVisit.duration.endTimestampMs;
		path = "placeVisit";
	}
	else{
		start = data_h_2019[index].activitySegment.duration.startTimestampMs;
		end = data_h_2019[index].activitySegment.duration.endTimestampMs;
		path = "activitySegment";
	};
	return [start, end, path];
	};



	

	var heatmap_data_2021 = [];
	var heatmap_data_2019 = [];

	for(var i=0 ; i < n_heures ; i ++){
		var startHour = startTime + i*3.6e+6;
		var endHour = startTime + (i+1)*3.6e+6;

		//Est-ce une activité ou un lieu ?

		var [start, end, path] = placeOrActivity(index);

		//Alternative 1 : L'heure est inclue en totalité

		if(start < startHour && end > endHour){
			if (path == "activitySegment"){
				var object = {"startHour": startHour, "endHour": endHour, "place": data_h_2019[index].activitySegment.activityType};
			}
			else{
				var object = {"startHour": startHour, "endHour": endHour, "place": data_h_2019[index].placeVisit.location.name};
			}
			heatmap_data_2019.push(object);
		}

		//Alternative 2 : L'heure est à cheval sur au moins 2 activités/lieux


		else if(start < startHour && end <= endHour){

			var temp_index = index + 1;
			var challengers = [end - startHour];

			var [start_temp, end_temp, path_temp] = placeOrActivity(temp_index);

			while(end_temp <= endHour){
				challengers.push(end_temp - start_temp);
				temp_index++;	
				[start_temp, end_temp, path_temp] = placeOrActivity(temp_index);
				
			}
			challengers.push(endHour - start_temp);


			var index_longest = challengers.indexOf(Math.max(...challengers));


			var path_l = placeOrActivity(index + index_longest)[2];


			if (path_l == "activitySegment"){
				var object = {"startHour": startHour, "endHour": endHour, "place": data_h_2019[index+ index_longest].activitySegment.activityType};
			}
			else{
				var object = {"startHour": startHour, "endHour": endHour, "place": data_h_2019[index+ index_longest].placeVisit.location.name};
			}


			/*Allouer l'heure au plus long des challengers*/
			heatmap_data_2019.push(object);
			index = temp_index;
		}
		else{
			console.log("dinguerie");
			console.log(startHour, endHour, start, end);
		}
		
	};
	

	let listOfActivities = data_h_2019.filter(function(place){
	return place.hasOwnProperty('activitySegment');
	})
	.map(function(place){
		return place.activitySegment.activityType;
	})
	.filter(function(value, index, self){
		return self.indexOf(value) === index;
	});




	for (var place in heatmap_data_2019){
		var placeName = heatmap_data_2019[place].place;

		if (placeName === "151 Rue du Faubourg Saint-Antoine" || placeName === "16 Rue de Cambrai"){
			heatmap_data_2019[place].place = "A la Maison"
			heatmap_data_2019[place].type = "Domicile"
		}
		else if (placeName === "Télécom Paris"){
			heatmap_data_2019[place].place = "Télécom Paris"
			heatmap_data_2019[place].type = "Etudes"
		}
		else if (placeName === "Rennes Driving School Groupe Permis75" || placeName === "Carrefour City" || placeName.includes("La Bicyclette") || placeName == "Centre Commercial Saint Lazare Paris" || placeName == "Boutique Orange Bastille - Paris 12" || placeName == "20 Rue Sainte-Isaure"){
			heatmap_data_2019[place].type = "Achats"
		}
		else if (placeName === "180 Avenue de Choisy"){
			heatmap_data_2019[place].type = "Travail"
		}
		
		else if (placeName === "Telecom bar'iTech" || placeName.includes("Cantine")){
			heatmap_data_2019[place].place = "Au bar / Resto"
			heatmap_data_2019[place].type = "Loisirs"
		}
		else if (placeName.includes("UGC")){
			heatmap_data_2019[place].place = "Au cinéma"
			heatmap_data_2019[place].type = "Loisirs"
		}
		else if (placeName.includes("Gymnasium") || placeName.includes("Gymnase")){
			heatmap_data_2019[place].place = "Au gymnase"
			heatmap_data_2019[place].type = "Loisirs"
		}
		else if (listOfActivities.includes(placeName)){
			heatmap_data_2019[place].type = "Deplacement";
		}
		else{
			heatmap_data_2019[place].place = "En Balade / Autres";
			heatmap_data_2019[place].type = "Loisirs";
		}
	};

	for (var j = 15 ; j>=0 ; j --){
		var object = {"place": "A la maison", "type": "Domicile", "startHour": 1610924400000 + j*3.6e+6, "endHour": 1610924400000 + (j+1)*3.6e+6 }
		heatmap_data_2019.unshift(object);
	}

	var blob = new Blob([JSON.stringify(heatmap_data_2019)], {type: "text/plain;charset=utf-8"});  
/*	saveAs(blob, "heatmap_data_2019.JSON");
*/	




});




