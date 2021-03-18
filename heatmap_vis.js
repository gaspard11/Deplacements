var files = ["http://localhost:8000/Data/heatmap_dataset_2021.JSON","http://localhost:8000/Data/heatmap_dataset_2019.JSON","http://localhost:8000/Data/colors_2019.JSON","http://localhost:8000/Data/colors_2021.JSON"];


Promise.all(files.map(url => d3.json(url))).then(function(values) {
  var hmgot = 0;
	let colors = ["#98C1CE","#4d8183","#C1DACF","#E0B4D6","#B4A8C8","#889CB9"];
  let types = [ "Domicile", "Travail", "Deplacement", "Etudes", "Achats", "Loisirs" ]
  var semaine = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim','Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
 


	var dataset_2021 = values[0];
	var dataset_2019 = values[1];
  var heat_moy_2019 = values[2];
  var heat_moy_2021 = values[3];



	var mapping = [];
	types.forEach(function(type){
		mapping[type] = types.indexOf(type);
	});


	var options_2021 = {
          series: dataset_2021.reverse(),
          chart: {
          type: 'heatmap',
        },
        title: {
          text: "Journées de 2021",
          align: 'top',
          style: {
            fontFamily: "BrandonTextW01-Bold",
            fontSize: '30px',
            color: '#30839C'
          }
        },
        legend:{
          fontSize: '15px',
          offsetY: -20,
          fontFamily: "BrandonText-Regular",
          markers:{
            width: 20,
            height: 20
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '15px',
              fontFamily: "BrandonText-Regular",
              align: 'left',
                formatter: function(value){
                return parseInt(value) + " h";
              },
            },
          },
        },
        xaxis: {
          tickAmount: 24,
          min:0,

          labels: {
            style: {
              fontSize: '15px',
              fontFamily: "BrandonText-Regular",
              align: 'left',
                formatter: function(value){
                return parseInt(value) + " h";
              },
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
          type: 'heatmap',
        },
        title: {
          text: "Journées de 2019",
          align: 'top',
          style: {
            fontFamily: "BrandonTextW01-Bold",
            fontSize: '30px',
            color: '#30839C'
          }
        },
        legend:{
          fontSize: '15px',
          offsetY: -20,
          fontFamily: "BrandonText-Regular",
          markers:{
            width: 20,
            height: 20
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '15px',
              fontFamily: "BrandonText-Regular",
              align: 'left',
                formatter: function(value){
                return parseInt(value) + " h";
              },
            },
          },
        },
        xaxis: {
          tickAmount: 24,
          min:0,

          labels: {
            style: {
              fontSize: '15px',
              fontFamily: "BrandonText-Regular",
              align: 'left',
                formatter: function(value){
                return parseInt(value) + " h";
              },
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





    
    

	


	


});