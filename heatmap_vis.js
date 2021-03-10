var files = ["http://localhost:8000/Data/heatmap_data_2021.JSON","http://localhost:8000/Data/heatmap_data_2019.JSON"];


Promise.all(files.map(url => d3.json(url))).then(function(values) {
	let colors = ["#ffbe0b","#fb5607","#ff006e","#8338ec","#3a86ff","#91f5ad"];

	var heatmap_2021 = values[0];
	var heatmap_2019 = values[1];
	

	var types = heatmap_2021.map(function(place){
      return place.type;
    })
    .filter(function(value, index, self){
      return self.indexOf(value) === index;
    });


	var mapping = [];
	types.forEach(function(type){
		mapping[type] = types.indexOf(type);
	});



	var dataset_2021 = [];
	var dataset_2019 = [];

	for(var jour = 0 ; jour < 14 ; jour ++){

		var values_2021 = heatmap_2021.slice(jour*24, (jour+1)*24).map(function(event){
			return mapping[event.type];
		});

		var values_2019 = heatmap_2019.slice(jour*24, (jour+1)*24).map(function(event){
			return mapping[event.type];
		});

		var object_2021 = {
			"name": "Jour " + parseInt(jour+1),
			data : values_2021
		};

		var object_2019 = {
			"name": "Jour " + parseInt(jour+1),
			data : values_2019
		};

		dataset_2021.push(object_2021);
		dataset_2019.push(object_2019);

	};


	var options_2021 = {
          series: dataset_2021.reverse(),
          chart: {
          height: 350,
          type: 'heatmap',
        },
        xaxis: {
          tickAmount: 24,
          min:0,

          label: {
            style: {
              fontSize: '12px',
            },

          },
          labels: {
            align: 'left',
            formatter: function(value){

              return parseInt(value) + " h";
            },
          },
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            radius: 0,
            useFillColorAsStroke: false,
            colorScale: {
              ranges: [{
                  from: 0,
                  to: 0,
                  name: 'Domicile',
                  color: colors[0]
                },
                {
                  from: 1,
                  to: 1,
                  name: 'Travail',
                  color: colors[1]
                },
                {
                  from: 2,
                  to: 2,
                  name: 'Deplacement',
                  color: colors[2]
                },
                {
                  from: 3,
                  to: 3,
                  name: 'Etudes',
                  color: colors[3]
                },
                {
                  from: 4,
                  to: 4,
                  name: 'Achats',
                  color: colors[4]
                },
                {
                  from: 5,
                  to: 5,
                  name: 'Loisirs',
                  color: colors[5]
                }

              ]
            }
          }
        },
        dataLabels: {
          enabled: false
        },


        

    };

    var options_2019 = {
          series: dataset_2019.reverse(),
          chart: {
          height: 350,
          type: 'heatmap',
        },
        xaxis: {
          tickAmount: 24,
          min:0,

          label: {
            style: {
              fontSize: '12px',
            },

          },
          labels: {
            align: 'left',
            formatter: function(value){

              return parseInt(value) + " h";
            },
          },
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            radius: 0,
            useFillColorAsStroke: false,
            colorScale: {
              ranges: [{
                  from: 0,
                  to: 0,
                  name: 'Domicile',
                  color: colors[0]
                },
                {
                  from: 1,
                  to: 1,
                  name: 'Travail',
                  color: colors[1]
                },
                {
                  from: 2,
                  to: 2,
                  name: 'Deplacement',
                  color: colors[2]
                },
                {
                  from: 3,
                  to: 3,
                  name: 'Etudes',
                  color: colors[3]
                },
                {
                  from: 4,
                  to: 4,
                  name: 'Achats',
                  color: colors[4]
                },
                {
                  from: 5,
                  to: 5,
                  name: 'Loisirs',
                  color: colors[5]
                }

              ]
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        
        stroke:{
        	width: 1	
        },

    };

	


	var crx_2021 = document.getElementById("heatmap_2021");
	var crx_2019 = document.getElementById("heatmap_2019");
	var heatmap_chart_2021 = new ApexCharts(crx_2021, options_2021);
	var heatmap_chart_2019 = new ApexCharts(crx_2019, options_2019);
	heatmap_chart_2021.render();
	heatmap_chart_2019.render();


});