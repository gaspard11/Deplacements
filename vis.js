let files_v = ["http://localhost:8000/Data/repartition_temps.json","http://localhost:8000/Data/repartition_activites.json","http://localhost:8000/Data/repartition_temps_2019.json","http://localhost:8000/Data/repartition_activites_2019.json"];


var data_2021 = [];
var data2_2021 = [];
var data_2019 = [];
var data2_2019 =[];

Promise.all(files_v.map(url => d3.json(url))).then(function(values) {
    data_2021 = values[0];
    data2_2021 = values[1];
    data_2019 = values[2];
    data2_2019 = values[3];

    for (var n in data2_2021){
      var temp = data2_2021[n];
      temp["type"] = "Déplacement";
      temp["place"] = temp["activity"];
      data_2021.push(data2_2021[n]);
    };

    for (var n in data2_2019){
      var temp = data2_2019[n];
      temp["type"] = "Déplacement";
      temp["place"] = temp["activity"];
      data_2019.push(data2_2019[n]);
    };

    

    var types = data_2021.map(function(place){
      return place.type;
    })
    .filter(function(value, index, self){
      return self.indexOf(value) === index;
    });

    var sums_2021 = [];
    var sums_2019 = [];

    types.forEach(function(type){
      var type_all_2021 = data_2021.filter(function(place){
        return place.type == type;
      })
      .map(function(place){
        return place.timeSpent;
      });
      var type_all_2019 = data_2019.filter(function(place){
        return place.type == type;
      })
      .map(function(place){
        return place.timeSpent;
      });

      sums_2021.push(type_all_2021.reduce((a,b) => a+b, 0));
      sums_2019.push(type_all_2019.reduce((a,b) => a+b, 0));

    });

    var loisirs_2021_labels = data_2021.filter(function(place){
      return place.type == "Loisirs";
    })
    .map(function(place){
      return place.place;
    })
    .filter(function(value, index, self){
      return self.indexOf(value) === index;
    });

    var loisirs_2019_labels = data_2019.filter(function(place){
      return place.type == "Loisirs";
    })
    .map(function(place){
      return place.place;
    })
    .filter(function(value, index, self){
      return self.indexOf(value) === index;
    });

    var loisirs_2021_sums = [];
    var loisirs_2019_sums = [];


    loisirs_2019_labels.forEach(function(loisir){
      var loisirs_all_2019 = data_2019.filter(function(place){
        return place.place == loisir;
      })
      .map(function(place){
        return place.timeSpent;
      });
      loisirs_2019_sums.push(loisirs_all_2019.reduce((a,b) => a+b, 0));
    });



    loisirs_2021_labels.forEach(function(loisir){
      var loisirs_all_2021 = data_2021.filter(function(place){
        return place.place == loisir;
      })
      .map(function(place){
        return place.timeSpent;
      });
      loisirs_2021_sums.push(loisirs_all_2021.reduce((a,b) => a+b, 0));
    });


    

    var ctx = document.getElementById("pie_2019");
    var ctx2 = document.getElementById("pie_2021");
    var ctx3 = document.getElementById("loisirs_2019");
    var ctx4 = document.getElementById("loisirs_2021");
    
    var pieChart2019 = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: types,
        datasets: [{
          label: "Temps passe",
          data: sums_2019,
          backgroundColor: ["#5aa9e6","#7fc8f8","#BFD6AB","#ffe45e","#ff6392","#985f99"]
        }]
      },
      options: {
        title:{
          display: true,
          text: "Type de lieux visités, Janvier 2019"
        },
        legend: {
          position: 'bottom'
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
    });

    var pieChart2021 = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: types,
        datasets: [{
          label: "Temps passe",
          data: sums_2021,
          backgroundColor: ["#5aa9e6","#7fc8f8","#BFD6AB","#ffe45e","#ff6392","#985f99"]
        }]
      },
      options: {
        title:{
          display: true,
          text: "Type de lieux visités, Janvier 2021"
        },
        legend: {
          position: 'bottom'
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
    });

    var loisirs2021 = new Chart(ctx4, {
      type: 'doughnut',
      data: {
        labels: loisirs_2021_labels,
        datasets: [{
          label: "Temps passe",
          data: loisirs_2021_sums,
          backgroundColor: ["#DEF4C6","#73E2A7"]
        }]
      },
      options: {
        title:{
          display: true,
          text: "Type de loisirs, Janvier 2021"
        },
        legend: {
          position: 'bottom'
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
    });


    var loisirs2019 = new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: loisirs_2019_labels,
        datasets: [{
          label: "Temps passe",
          data: loisirs_2019_sums,
          backgroundColor: ["#DEF4C6","#73E2A7","#EB9486","#B1CF5F","#1C7C54"]
        }]
      },
      options: {
        title:{
          display: true,
          text: "Type de loisirs, Janvier 2019"
        },
        legend: {
          position: 'bottom'
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
    });




});












