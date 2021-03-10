

var files = ["http://localhost:8000/Data/points_2019.geojson","http://localhost:8000/Data/points_2021.geojson"];


Promise.all(files.map(url => d3.json(url))).then(function(values) {
	var points_2019 = values[0];
	var points_2021 = values[1];

	var max_duration_2019 = Math.max(...points_2019.features.map(function(value){
		return value.properties.duration;
	}));
	var max_duration_2021 = Math.max(...points_2021.features.map(function(value){
		return value.properties.duration;
	}));

	var points_2019_deplacement = JSON.parse("{\"type\":\"FeatureCollection\",\"features\":"+JSON.stringify(points_2019.features.filter(function(value){
		return value.properties.type == "Déplacement";
	}))+"}");

	var points_2021_deplacement = JSON.parse("{\"type\":\"FeatureCollection\",\"features\":"+JSON.stringify(points_2021.features.filter(function(value){
		return value.properties.type == "Déplacement";
	}))+"}");

	var points_2019_fixe = JSON.parse("{\"type\":\"FeatureCollection\",\"features\":"+JSON.stringify(points_2019.features.filter(function(value){
		return !value.properties.hasOwnProperty("type");
	}))+"}");

	var points_2021_fixe = JSON.parse("{\"type\":\"FeatureCollection\",\"features\":"+JSON.stringify(points_2021.features.filter(function(value){
		return !value.properties.hasOwnProperty("type");
	}))+"}");

	console.log(points_2021_fixe);
	console.log(points_2021_deplacement);



	mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FzcGFyZGdhcyIsImEiOiJja20wa2k4dnAxazVjMnByemJyNWd2ZW54In0.7PQf6XmoPc9OapFtkFProQ';

	var map_2019 = new mapboxgl.Map({
		container: 'map_2019',
		style: 'mapbox://styles/mapbox/light-v10',
		center: [2.3488,48.8534], // starting position
		zoom: 11 // starting zoom
	});

	var map_2021 = new mapboxgl.Map({
		container: 'map_2021',
		style: 'mapbox://styles/mapbox/light-v10',
		center: [2.3488,48.8534], // starting position
		zoom: 9 // starting zoom
	});


	map_2019.on('load',function(){

		map_2019.addSource('points',{
			type: 'geojson',
			data: points_2019_fixe
		});

		map_2019.addLayer({
			id: 'heat_2019',
			type: 'heatmap',
			source: 'points',
			paint: {
				'heatmap-weight': {
	      			property: 'duration',
	      			type: 'exponential',
	      			stops: [
				        [1, 0],
				        [max_duration_2019, max_duration_2019/10000000]
				    ]
	      		},
	      		'heatmap-color': [
			        'interpolate',
			      	['linear'],
			      	['heatmap-density'],
			      	0, "rgba(0, 0, 255, 0)",
			      	0.1, '#00AFB9',
			      	0.3, '#FDFCDC',
			      	0.5, '#FED9B7',
			      	1, '#F07167'
	    		]
    		}
		},'waterway-label')
	});

	map_2021.on('load',function(){

		map_2021.addSource('points',{
			type: 'geojson',
			data: points_2021_fixe
		});

		map_2021.addLayer({
			id: 'heat_2021',
			type: 'heatmap',
			source: 'points',
			paint: {
				'heatmap-weight': {
	      			property: 'duration',
	      			type: 'exponential',
	      			stops: [
				        [1, 0],
				        [max_duration_2021, max_duration_2021/10000000]
				    ]
	      		},
	      		'heatmap-color': [
			        'interpolate',
			      	['linear'],
			      	['heatmap-density'],
			      	0, "rgba(0, 0, 255, 0)",
			      	0.1, '#00AFB9',
			      	0.3, '#FDFCDC',
			      	0.5, '#FED9B7',
			      	1, '#F07167'
	    		]
    		}
		},'waterway-label')
	})









});


