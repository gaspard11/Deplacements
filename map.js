let files_m = ["http://localhost:8000/Data/2019_JANUARY.json","http://localhost:8000/Data/2021_JANUARY.json"];






Promise.all(files_m.map(url => d3.json(url))).then(function(values) {
	var data_h_2019 = values[0];
	var data_h_2021 = values[1];

	var n_data_2019 = data_h_2019.length;
	var n_data_2021 = data_h_2021.length;

	var points_2019 = [];
	var points_2021 = [];

	data_h_2019.forEach(function(value){
		if(value.hasOwnProperty("placeVisit")){
			var object = {
				"type": "Feature",
				"properties": {
					"duration": value.placeVisit.duration.endTimestampMs - value.placeVisit.duration.startTimestampMs,
					"name": value.placeVisit.location.name
				},
				"geometry": {
					"type": "Point",
					"coordinates": [value.placeVisit.location.longitudeE7/1e+7,value.placeVisit.location.latitudeE7/1e+7 ]
				}
			};
			points_2019.push(object);
		}
		else{
			var array;
			if (value.activitySegment.hasOwnProperty("waypointPath")){
				array = value.activitySegment.waypointPath.waypoints;


				var baseDuration = (value.activitySegment.duration.endTimestampMs - value.activitySegment.duration.startTimestampMs)/array.length;

				array.forEach(function(point){
					var object = {
						"type": "Feature",
						"properties": {
							"duration": baseDuration,
							"name": value.activitySegment.activityType,
							"type": "Déplacement"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [point.lngE7/1e+7,point.latE7/1e+7 ]
						}
					};
					points_2019.push(object);
				})

			}
			else if(value.activitySegment.hasOwnProperty("transitPath")){
				array = value.activitySegment.transitPath.transitStops;

				var baseDuration = (value.activitySegment.duration.endTimestampMs - value.activitySegment.duration.startTimestampMs)/array.length;

				array.forEach(function(point){
					var object = {
						"type": "Feature",
						"properties": {
							"duration": baseDuration,
							"name": value.activitySegment.activityType,
							"type": "Déplacement"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [point.longitudeE7/1e+7,point.latitudeE7/1e+7 ]
						}
					};
					points_2019.push(object);
				})
			}
			else{
				array = value.activitySegment.simplifiedRawPath.points;
				var baseDuration = (value.activitySegment.duration.endTimestampMs - value.activitySegment.duration.startTimestampMs)/array.length;
				
				array.forEach(function(point){

					var object = {
						"type": "Feature",
						"properties": {
							"duration": baseDuration,
							"name": value.activitySegment.activityType,
							"type": "Déplacement"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [point.lngE7/1e+7,point.latE7/1e+7 ]
						}
					};
					points_2019.push(object);
				})
			}
			
		}

	})

	data_h_2021.forEach(function(value){
		if(value.hasOwnProperty("placeVisit")){
			var object = {
				"type": "Feature",
				"properties": {
					"duration": value.placeVisit.duration.endTimestampMs - value.placeVisit.duration.startTimestampMs,
					"name": value.placeVisit.location.name
				},
				"geometry": {
					"type": "Point",
					"coordinates": [value.placeVisit.location.longitudeE7/1e+7,value.placeVisit.location.latitudeE7/1e+7 ]
				}
			};
			points_2021.push(object);
		}
		else{
			var array;
			if (value.activitySegment.hasOwnProperty("waypointPath")){
				array = value.activitySegment.waypointPath.waypoints;


				var baseDuration = (value.activitySegment.duration.endTimestampMs - value.activitySegment.duration.startTimestampMs)/array.length;

				array.forEach(function(point){
					var object = {
						"type": "Feature",
						"properties": {
							"duration": baseDuration,
							"name": value.activitySegment.activityType,
							"type": "Déplacement"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [point.lngE7/1e+7,point.latE7/1e+7 ]
						}
					};
					points_2021.push(object);
				})

			}
			else if(value.activitySegment.hasOwnProperty("transitPath")){
				array = value.activitySegment.transitPath.transitStops;

				var baseDuration = (value.activitySegment.duration.endTimestampMs - value.activitySegment.duration.startTimestampMs)/array.length;

				array.forEach(function(point){
					var object = {
						"type": "Feature",
						"properties": {
							"duration": baseDuration,
							"name": value.activitySegment.activityType,
							"type": "Déplacement"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [point.longitudeE7/1e+7,point.latitudeE7/1e+7 ]
						}
					};
					points_2021.push(object);
				})
			}
			else if(value.activitySegment.hasOwnProperty("simplifiedRawPath")){
				array = value.activitySegment.simplifiedRawPath.points;
				var baseDuration = (value.activitySegment.duration.endTimestampMs - value.activitySegment.duration.startTimestampMs)/array.length;
				
				array.forEach(function(point){

					var object = {
						"type": "Feature",
						"properties": {
							"duration": baseDuration,
							"name": value.activitySegment.activityType,
							"type": "Déplacement"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [point.lngE7/1e+7,point.latE7/1e+7 ]
						}
					};
					points_2021.push(object);
				})
			}
			else{
				array = [value.activitySegment.startLocation,value.activitySegment.endLocation];
				console.log(array);
				var baseDuration = (value.activitySegment.duration.endTimestampMs - value.activitySegment.duration.startTimestampMs)/array.length;
				
				array.forEach(function(point){

					var object = {
						"type": "Feature",
						"properties": {
							"duration": baseDuration,
							"name": value.activitySegment.activityType,
							"type": "Déplacement"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [point.longitudeE7/1e+7,point.latitudeE7/1e+7 ]
						}
					};
					points_2021.push(object);
				})

			}
			
		}

	})

	console.log(points_2021);

	var blob = new Blob([JSON.stringify(points_2021)], {type: "text/plain;charset=utf-8"});  
	saveAs(blob, "points_2021.JSON");


});