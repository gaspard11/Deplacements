let files_v = ["./Data/piechart_general_2019.JSON","./Data/piechart_general_2021.JSON","./Data/piechart_general_sansnuit_2019.JSON","./Data/piechart_general_sansnuit_2021.JSON","./Data/loisirs_2019.JSON","./Data/loisirs_2021.JSON","./Data/deplacements_2019.JSON","./Data/deplacements_2021.JSON","./Data/heatmap_dataset_2021.JSON","./Data/heatmap_dataset_2019.JSON","./Data/colors_2019.JSON","./Data/colors_2021.JSON"];





Promise.all(files_v.map(url => d3.json(url))).then(function(values) {
  var got = 0;
  console.log("k");
  var sums_2019 = values[0][1];
  console.log("k");
  var sums_2021 = values[1];
  console.log("k");
  var sums_2019_sans_nuit = values[2];
  console.log("k");
  var sums_2021_sans_nuit = values[3];
  console.log("k");
  var [loisirs_2019_labels, loisirs_2019_sums] = values[4];
  console.log("k");
  var [loisirs_2021_labels, loisirs_2021_sums] = values[5];
  console.log("k");
  var [deplacements_2019_labels, deplacements_2019_sums] = values[6];
  console.log("k");
  var [deplacements_2021_labels, deplacements_2021_sums] = values[7];
  console.log("k");
  var dataset_2021 = values[8];
  console.log("k");
  var dataset_2019 = values[9];
  console.log("k");
  var heat_moy_2019 = values[10];
  console.log("k");
  var heat_moy_2021 = values[11];
  console.log("k");
    

    function getTimePropre(ms){
      var hours = Math.floor(ms/3.6e6);
      var minutes = Math.floor((ms/3.6e6 - hours)*60)
      return (hours+'h'+minutes)
    };




    

  var ctx = document.getElementById("pie_2019");
  var ctx2 = document.getElementById("pie_2021");
  var ctx3 = document.getElementById("loisirs_2019");
  var ctx4 = document.getElementById("loisirs_2021");
  var ctx5 = document.getElementById("transports");
  var ctx6 = document.getElementById("transports_%");
  var ctx7 = document.getElementById("pie_sn_2019");
  var ctx8 = document.getElementById("pie_sn_2021");

  let colors = ["#98C1CE","#4d8183","#C1DACF","#E0B4D6","#B4A8C8","#889CB9"];
  let types = [ "Domicile", "Travail", "Deplacement", "Etudes", "Achats", "Loisirs" ]
  var semaine = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim','Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];

  var mapping = [];
  types.forEach(function(type){
    mapping[type] = types.indexOf(type);
  });
    
   var options1 = {
    type: 'doughnut',
    data: {
      labels: types,
      datasets: [{
        label: "Temps passe",
        data: sums_2019,
        backgroundColor: ["#30839C","#91BDBE","#C1DACF","#E0B4D6","#B4A8C8","#889CB9"]
      }]
    },
    options: {
      title:{
        display: true,
        text: "Type de lieux visités, Janvier 2019",
        fontSize: 30,
        fontFamily: "BrandonTextW01-Bold",
        fontColor: '#30839C',
        padding: 20
      },
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 20,
          boxWidth: 50,
          fontFamily: "BrandonText-Regular"
        }
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
              return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
            return percentage + "%";
          }
        }
      }
    }
  };

  var options2 =  {
    type: 'doughnut',
    data: {
      labels: types,
      datasets: [{
        label: "Temps passe",
        data: sums_2021,
        backgroundColor:  ["#30839C","#91BDBE","#C1DACF","#E0B4D6","#B4A8C8","#889CB9"]
      }]
    },
    options: {
      title:{
        display: true,
        text: "Type de lieux visités, Janvier 2021",
        fontSize: 30,
        fontFamily: "BrandonTextW01-Bold",
        fontColor: '#30839C',
        padding: 20
      },
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 20,
          boxWidth: 50,
          fontFamily: "BrandonText-Regular"
        }
        
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
              return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
            return percentage + "%";
          }
        }
      }
    }
  };

      var options7 =  {
    type: 'doughnut',
    data: {
      labels: types,
      datasets: [{
        label: "Temps passe",
        data: sums_2019_sans_nuit,
        backgroundColor: ["#30839C","#91BDBE","#C1DACF","#E0B4D6","#B4A8C8","#889CB9"]
      }]
    },
    options: {
      title:{
        display: true,
        text: "Type de lieux visités en journée, Janvier 2019",
        fontSize: 30,
        fontFamily: "BrandonTextW01-Bold",
        fontColor: '#30839C',
        padding: 20
      },
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 20,
          boxWidth: 50,
          fontFamily: "BrandonText-Regular"
        }
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
              return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
            return percentage + "%";
          }
        }
      }
    }
  };

  var options8 =  {
    type: 'doughnut',
    data: {
      labels: types,
      datasets: [{
        label: "Temps passe",
        data: sums_2021_sans_nuit,
        backgroundColor:  ["#30839C","#91BDBE","#C1DACF","#E0B4D6","#B4A8C8","#889CB9"]
      }]
    },
    options: {
      title:{
        display: true,
        text: "Type de lieux visités en journée, Janvier 2021",
        fontSize: 30,
        fontFamily: "BrandonTextW01-Bold",
        fontColor: '#30839C',
        padding: 20
      },
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 20,
          boxWidth: 50,
          fontFamily: "BrandonText-Regular"
        }
        
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
              return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
            return percentage + "%";
          }
        }
      }
    }
  };

  var options4 =  {
    type: 'doughnut',
    data: {
      labels: loisirs_2021_labels,
      datasets: [{
        label: "Temps passe",
        data: loisirs_2021_sums,
        backgroundColor: ["#B4A8C8","#889CB9"]
      }]
    },
    options: {
      title:{
        display: true,
        text: "Types de loisirs, Janvier 2021",
        fontSize: 30,
        fontFamily: "BrandonTextW01-Bold",
        fontColor: '#30839C',
        padding: 20
      },
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 20,
          boxWidth: 50,
          fontFamily: "BrandonText-Regular"
        }
        
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
              return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
            return percentage + "%";
          }
        }
      }
    }
  };


  var options5 = {
    type: 'doughnut',
    data: {
      labels: loisirs_2019_labels,
      datasets: [{
        label: "Temps passe",
        data: loisirs_2019_sums,
        backgroundColor: ["#30839C","#91BDBE","#C1DACF","#E0B4D6","#B4A8C8","#889CB9"]
      }]
    },
    options: {
      title:{
        display: true,
        text: "Types de loisirs, Janvier 2019",
        fontSize: 30,
        fontFamily: "BrandonTextW01-Bold",
        fontColor: '#30839C',
        padding: 20
      },
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 20,
          boxWidth: 50,
          fontFamily: "BrandonText-Regular"
        }
        
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
              return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
            return percentage + "%";
          }
        }
      }
    }
  };


  var options_tr = {
    series: [{  
      name : "Janvier 2019",
      data: deplacements_2019_sums.slice(0,5)
      }, {
      name : "Janvier 2021",
      data: deplacements_2021_sums.slice(0,5)
      }],
    chart: {
      type: 'bar',
      height: 430
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter : function(val){
        return getTimePropre(val);
      },
      offsetX: 50,
      style: {
        fontSize: '12px',
        colors: ["#000000"],
        fontFamily: "BrandonText-Regular",
      },
    },
    colors: ["#C1DACF","#E0B4D6"],
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    title: {
        text: "Modes de déplacements",
        align: 'top',
        style: {
          fontFamily: "BrandonTextW01-Bold",
          fontSize: '30px',
          color: '#30839C'
        }
      },
    xaxis: {
      categories: deplacements_2019_labels.slice(0,5),

      labels: {
          formatter : function(val){
            return getTimePropre(val);
          },
          style: {
            fontSize: '15px',
            fontFamily: "BrandonText-Regular",
            align: 'left',
            
          },
      },
    },
    yaxis : {
      labels : {
        style: {
            fontSize: '15px',
            fontFamily: "BrandonText-Regular",
            align: 'left',  
        },
      },
    },
    legend : {
      fontSize: '15px',
      fontFamily: "BrandonText-Regular",
    }
  };


  var options_f = {
        series: [{
        name: 'A pieds',
        data: [deplacements_2019_sums[0],deplacements_2021_sums[0]]
      }, {
        name: 'Métro',
        data: [deplacements_2019_sums[1],deplacements_2021_sums[1]]
      }, {
        name: 'Bus',
        data: [deplacements_2019_sums[2],deplacements_2021_sums[2]]
      }, {
        name: 'Taxi',
        data: [deplacements_2019_sums[3],deplacements_2021_sums[3]]
      }, {
        name: 'Vélo',
        data: [deplacements_2019_sums[4],deplacements_2021_sums[4]]
      }],
        chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%'
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        style: {
          fontSize: '12px',
          colors: ["#fff"],
          fontFamily: "BrandonText-Regular",
        },
      },
      colors : ["#98C1CE","#4d8183","#C1DACF","#B4A8C8","#E0B4D6"],
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: "Répartition des modes de déplacements",
        align: 'top',
        style: {
          fontFamily: "BrandonTextW01-Bold",
          fontSize: '30px',
          color: '#30839C'
        }
      },
     
      xaxis: {
        categories: [2019,2021],
        labels : {
          style: {
              fontSize: '15px',
              fontFamily: "BrandonText-Regular",
          },
        },
      },
      yaxis: {
        labels : {
          style: {
              fontSize: '15px',
              fontFamily: "BrandonText-Regular",
          },
        },
      },
      tooltip: {
        y: {
          formatter : function(val){
            return getTimePropre(val);
          }
        }
      },
      fill: {
        opacity: 1
      
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
        offsetY : -20,
        fontSize: '15px',
        fontFamily: "BrandonText-Regular",
        markers:{
          width: 20,
          height: 20,
          offsetY : 5
        },
      }
    };

    var bar_tr = new ApexCharts(ctx5, options_tr);
    var bar_tr_ = new ApexCharts(ctx6, options_f);

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

  var crx_2021 = document.getElementById("heatmap_2021");
  var crx_2019 = document.getElementById("heatmap_2019");
  var heatmap_chart_2021 = new ApexCharts(crx_2021, options_2021);
  var heatmap_chart_2019 = new ApexCharts(crx_2019, options_2019);

  
  


  document.addEventListener('scroll', () => {
    
    if (document.getElementById('p3bis').getBoundingClientRect().bottom < 100 && got == 0) {
      var pieChart2019 = new Chart(ctx, options1);
      var pieChart2021 = new Chart(ctx2, options2);
      got = 1;
    }
    if(document.getElementById('p4bis').getBoundingClientRect().bottom<100 && got == 1){
      var pieChart2019_sn = new Chart(ctx7, options7);
      var pieChart2021_sn  = new Chart(ctx8, options8);
      got =2;
      }
    if(document.getElementById('p5').getBoundingClientRect().bottom<100 && got == 2){
      var loisirs2019 = new Chart(ctx3, options5);
      var loisirs2021  = new Chart(ctx4, options4);
      got =3;
    }
    if(document.getElementById('p13').getBoundingClientRect().bottom<100 && got == 4){
      bar_tr.render();
      got =5;
    }
    if(document.getElementById('p14').getBoundingClientRect().bottom<100 && got == 5){
      bar_tr_.render();
      got =6;
    }
    if(document.getElementById('p10').getBoundingClientRect().bottom<500 && got == 3){
      heatmap_chart_2021.render();
      heatmap_chart_2019.render();
      got =4;
    }
      
    
  });
  for (var h = 0; h < 23 ; h++){
      var c1 = document.createElement("div");
      var c2 = document.createElement("div");
      c1.style.backgroundColor = heat_moy_2019[h];
      c2.style.backgroundColor = heat_moy_2021[h]
      document.getElementById("grid1").appendChild(c1);
      document.getElementById("grid2").appendChild(c2);
  };






    


    

        
    
    

});












