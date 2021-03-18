

var files = ["http://localhost:8000/Data/points_2019_randoms.geojson","http://localhost:8000/Data/points_2021_randoms.geojson", "http://localhost:8000/Data/trajets_2019_randoms.JSON","http://localhost:8000/Data/trajets_2021_randoms.JSON"];


Promise.all(files.map(url => d3.json(url))).then(function(values) {
	/*Récupération des données + variables*/
	var points_2019 = values[0];
	var points_2021 = values[1];
	var trajet_2019 = values[2];
	var trajet_2021 = values[3];




	var [velo_2019,pieds_2019,voiture_2019,transport_2019] = trajet_2019;
	var [velo_2021,pieds_2021,voiture_2021,transport_2021] = trajet_2021;

	mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FzcGFyZGdhcyIsImEiOiJja20wa2k4dnAxazVjMnByemJyNWd2ZW54In0.7PQf6XmoPc9OapFtkFProQ';
	
	var toggleableLayerIds_2019 = ['heat_2019', 'velo_2019','pieds_2019','transport_2019','voiture_2019'];
	var toggleableLayerIds_2021 = ['heat_2021', 'velo_2021','pieds_2021','transport_2021'];

	var map_id_name = {'heat_2019': "Heatmap", 'velo_2019':"Vélo",'pieds_2019':"A pieds",'transport_2019':"Transports",'voiture_2019':"Voiture",'heat_2021': "Heatmap",'velo_2021':"Vélo",'pieds_2021':"A pieds",'transport_2021':"Transports"};
	var col = ['#3887be','#E0B4D6','#98C1CE','#4d8183','#B4A8C8'];




	/*Calcul des durées maximales (utilisées pour la heatmap)*/

	var max_duration_2019 = Math.max(...points_2019.features.map(function(value){
		return value.properties.duration;
	}));
	var max_duration_2021 = Math.max(...points_2021.features.map(function(value){
		return value.properties.duration;
	}));
	


	/*CARTE 2019*/


	

	var map_2019 = new mapboxgl.Map({
		container: 'map_2019',
		style: 'mapbox://styles/mapbox/light-v10',
		center: [2.3488,48.8534], // starting position
		zoom: 11 // starting zoom
	});

	


	map_2019.on('load',function(){

		map_2019.addSource('points_2019',{
			type: 'geojson',
			data: points_2019
		});


		map_2019.addSource('velo_2019',{
			type: 'geojson',
			data: velo_2019

		});
		map_2019.addSource('pieds_2019',{
			type: 'geojson',
			data: pieds_2019

		});
		map_2019.addSource('transport_2019',{
			type: 'geojson',
			data: transport_2019

		});
		map_2019.addSource('voiture_2019',{
			type: 'geojson',
			data: voiture_2019

		});

		map_2019.addLayer({
			id: 'heat_2019',
			type: 'heatmap',
			source: 'points_2019',
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
		},'waterway-label');

		toggleableLayerIds_2019.slice(1,5).forEach(function(id){
			map_2019.addLayer({
				'id': id,
				'type': 'line',
				'source': id,

				'layout': {
					'line-join': 'round',
					'line-cap': 'round',
					'visibility':'none'
				},
				'paint':{
					'line-color' : [
						'match',
						['get','name'],
						'WALKING',
						'#98C1CE',
						"CYCLING",
						'#E0B4D6',
						"IN_SUBWAY",
						'#4d8183',
						"IN_TRAM",
						'#4d8183',
						"IN_BUS",
						'#4d8183',
						"IN_TRAIN",
						'#4d8183',
						'#B4A8C8'

					],
					'line-width': 5,
					'line-opacity': 0.75
				}
			});
		});
	});



	map_2019.addControl(new mapboxgl.NavigationControl());

	for (var i = 0; i < toggleableLayerIds_2019.length; i++) {
		var id = toggleableLayerIds_2019[i];
 
		var link = document.createElement('a');
		link.href = '#';
		link.className = 'active';
		link.textContent = map_id_name[id];
		link.id = id;
		link.style.backgroundColor = col[toggleableLayerIds_2019.indexOf(id)];
 
		link.onclick = function (e) {
			var clickedLayer = this.id;
			e.preventDefault();
			e.stopPropagation();
	 
			var visibility = map_2019.getLayoutProperty(clickedLayer, 'visibility');
			 
			// toggle layer visibility by changing the layout object's visibility property
			if (visibility === 'visible') {
				map_2019.setLayoutProperty(clickedLayer, 'visibility', 'none');
				this.className = '';
			} else {
				this.className = 'active';
				map_2019.setLayoutProperty(clickedLayer, 'visibility', 'visible');
			}
		};
		 
		var layers = document.getElementById('menu_2019');
		layers.appendChild(link);
	};



	/*CARTE 2021*/

	var map_2021 = new mapboxgl.Map({
		container: 'map_2021',
		style: 'mapbox://styles/mapbox/light-v10',
		center: [2.3488,48.8534], // starting position
		zoom: 9 // starting zoom
	});


	map_2021.on('load',function(){

		map_2021.addSource('points_2021',{
			type: 'geojson',
			data: points_2021
		});


		map_2021.addSource('velo_2021',{
			type: 'geojson',
			data: velo_2021

		});
		map_2021.addSource('pieds_2021',{
			type: 'geojson',
			data: pieds_2021

		});
		map_2021.addSource('transport_2021',{
			type: 'geojson',
			data: transport_2021

		});
		map_2021.addSource('voiture_2021',{
			type: 'geojson',
			data: voiture_2021

		});

		map_2021.addLayer({
			id: 'heat_2021',
			type: 'heatmap',
			source: 'points_2021',
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
		},'waterway-label');

		toggleableLayerIds_2021.slice(1,4).forEach(function(id){
			map_2021.addLayer({
				'id': id,
				'type': 'line',
				'source': id,
				'layout': {
					'line-join': 'round',
					'line-cap': 'round',
					'visibility':'none'
				},
				'paint':{
					'line-color' : [
						'match',
						['get','name'],
						'WALKING',
						'#98C1CE',
						"CYCLING",
						'#E0B4D6',
						"IN_SUBWAY",
						'#4d8183',
						"IN_TRAM",
						'#4d8183',
						"IN_BUS",
						'#4d8183',
						"IN_TRAIN",
						'#4d8183',
						'#B4A8C8'

					],
					'line-width': 5,
					'line-opacity': 0.75
				}
			});
		});

	});

	map_2021.addControl(new mapboxgl.NavigationControl());
	map_2019.scrollZoom.disable();
	map_2021.scrollZoom.disable();

	for (var i = 0; i < toggleableLayerIds_2021.length; i++) {
		var id = toggleableLayerIds_2021[i];
 
		var link = document.createElement('a');
		link.href = '#';
		link.className = 'active';
		link.textContent = map_id_name[id];
		link.id=id;
		link.style.backgroundColor = col[toggleableLayerIds_2021.indexOf(id)];
 
		link.onclick = function (e) {
			var clickedLayer = this.id;
			e.preventDefault();
			e.stopPropagation();
	 
			var visibility = map_2021.getLayoutProperty(clickedLayer, 'visibility');
			 
			// toggle layer visibility by changing the layout object's visibility property
			if (visibility === 'visible') {
				map_2021.setLayoutProperty(clickedLayer, 'visibility', 'none');
				this.className = '';
			} else {
				this.className = 'active';
				map_2021.setLayoutProperty(clickedLayer, 'visibility', 'visible');
			}
		};
		 
		var layers = document.getElementById('menu_2021');
		layers.appendChild(link);
	}


});


