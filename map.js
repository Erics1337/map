var map;
 
/* -------------------- Map Styling including alternate style ------------------- */
var colorScale = {'#6C001D': 2000, '#DB0006': 200, '#FD990A': 100, '#FECB6C': 70, '#FFFF0D': 60, '#FFFFB0': 50, '#C8FF60': 40, '#8AE407': 30, '#5F9D05': 20, '#3C6104': 10}
// var colorScale = {'#3C6104': 10, '#5F9D05': 20, '#8AE407': 30, '#C8FF60': 40, '#FFFFB0': 50, '#FFFF0D': 60, '#FECB6C': 70, '#FD990A': 100, '#DB0006': 200, '#6C001D': 2000}


// Primary map styling created with Google Maps
// Styling Wizard at https://mapstyle.withgoogle.com/
var style = [
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

/* -------------------  Define actual Google Maps object ------------------ */

function convertToNum(item){
  if (isNaN(item) || item == null){
    return 0;
  } else {
    return item;
  }
}


function initMap() {
  // Initialize map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    mapTypeControl: false,
    streetViewControl: false,
    styles: style
  });

  // Center map using geocoding
  var geocoder = new google.maps.Geocoder();
  var address = 'Colorado';
  geocodeAddress(geocoder, map, address);

  function geocodeAddress(geocoder, map, address) {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

/* -------------------------------- Load JSON and create color labels array------------------------------- */

  // Load GeoJSON that contains zip code boundaries and geographic information
  // NOTE: This uses cross-domain XHR, and may not work on older browsers.
  map.data.loadGeoJson('colorado_map_data.json')
  // map.data.loadGeoJson('https://raw.githubusercontent.com/nholmber/google-maps-statistics/master/map_data_reduced.json')

  //  Import data file 
  var ghgData;
  fetch("./ghgData.json")
    .then(response => {
      return response.json();
    })
    .then(function(data){
      ghgData = data;
    });



  // Colorize zip code areas based on average CO2e emissions 
  map.data.setStyle(function(feature) {
    for (item in ghgData) {
      if (ghgData[item].zip.toString() != feature.getProperty('GEOID10').substring(2)) {
        continue;
      } else {
        CO2ePerPop = (ghgData[item].GHG_transportation_total+
          ghgData[item].GHG_energy_electric_total+
          ghgData[item].GHG_energy_naturalGas_total+
          ghgData[item].GHG_cement_and_manufacturing +
          ghgData[item].GHG_waste) / ghgData[item].population2018;

        colorKeys = Object.keys(colorScale);
        colorValues = Object.values(colorScale);

        var color;
        var i = 0;
        while (i < colorValues.length){
          if (CO2ePerPop < colorValues[i]){
            color = colorKeys[i];
          }
          i++;
        }
      }
  }
    return {
      fillColor: color,
      fillOpacity: 0.7,
      strokeWeight: 1,
      strokeColor: color
    }
  });

  // When the user hovers, tempt them to click by outlining zip code area.
  // Call revertStyle() to remove all overrides. This will use the style rules
  // defined in the function passed to setStyle()
  map.data.addListener('mouseover', function(event) {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {strokeWeight: 4, strokeColor: 'gray'});
  });

  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
  });


/* ------------------------------- INFO PANEL ------------------------------ */

  // When the user selects a zip code area,
  // display info window with more detailed information
  var infowindow = new google.maps.InfoWindow();
  map.data.addListener('click', function(event) {
      createInfoWindow(map, event, infowindow);
  });

  function createInfoWindow(map, event){

    // Get properties from Data Layer to populate info window
    var zip = event.feature.getProperty('GEOID10').substring(2);

    var city = "Unknown";
    var county = "Unknown";
    var population = "Unknown";
    var transportation = "Unknown";
    var electricity = "Unknown";
    var naturalGas = "Unknown";
    var waste = "Unknown";
    var cementManufacturing = "Unknown";


    for (item in ghgData) {
      if (ghgData[item].zip.toString() != event.feature.getProperty('GEOID10').substring(2)) {
        continue;
      } else {
        city = ghgData[item].city;
        county = ghgData[item].county;
        population = ghgData[item].population2018;
        transportation = ghgData[item].GHG_transportation_total;
        electricity = ghgData[item].GHG_energy_electric_total;
        naturalGas = ghgData[item].GHG_energy_naturalGas_total;
        waste = ghgData[item].GHG_waste;
        cementManufacturing = ghgData[item].GHG_cement_and_manufacturing;

        CO2ePerPop = (ghgData[item].GHG_transportation_total+
          ghgData[item].GHG_energy_electric_total+
          ghgData[item].GHG_energy_naturalGas_total+
          ghgData[item].GHG_cement_and_manufacturing +
          ghgData[item].GHG_waste) / ghgData[item].population2018;
        break;
      }
  }

    // Create content for info window
    var contentString = '<div id="content"><div id="siteNotice"></div>'+
      '<h2 id="firstHeading" class="firstHeading">Zip code: ' + zip + '</h2>'+
      '<h3>City: ' + city + '</h3>'+
      '<h3>County: ' + county + '</h3>'+
      '<h3>Population: ' + population + '</h3>'+

      '<h3>Total CO2e Per Pop: ' + CO2ePerPop + '</h3>'+

      '<div id="bodyContent" style="font-size: 12pt;" >'+
      '</br>Transportation: ' + `<b>${transportation}</b> Metric Tons CO2e/ Year` +
      '</br>Electricity: '+ `<b>${electricity}</b> Metric Tons CO2e/ Year` +
      '</br>Natural Gas: '+ `<b>${naturalGas}</b> Metric Tons CO2e/ Year` +
      '</br>Waste: '+ `<b>${waste}</b> Metric Tons CO2e/ Year` +
      '</br>Cement and Manufacturing: '+ `<b>${cementManufacturing}</b> Metric Tons CO2e/ Year` +'</p>'+
      '</div>'+

      `<div id="piechart" style=""></div>` +
      '</div>';



    // Center info window on selected zip code area
    // Find center of zip code area by converting
    // the corresponding Polygon object to a
    // LatLngBounds object which has the getCenter function
    var bounds = new google.maps.LatLngBounds();
    var geometry = event.feature.getGeometry();

    geometry.forEachLatLng(function(point){
      bounds.extend({
        lat : point.lat(),
        lng : point.lng()
      });
    });
    var center = bounds.getCenter();

    // Create invisible marker for info window
    var marker = new google.maps.Marker({
      position: center,
      map: map,
      visible : false
    });
    // Create info window
    infowindow.setContent(contentString);
    infowindow.open(map, marker);


    // Draw Pie Chart
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Sector', 'Metric Tons CO2e/ Year'],
        ['Transportation', convertToNum(transportation)],
        ['Electricity', convertToNum(electricity)],
        ['Natural Gas', convertToNum(naturalGas)],
        ['Waste', convertToNum(waste)],
        ['Cement And Manufacturing', convertToNum(cementManufacturing)]
      ]);

      var options = {
        title: 'Economic Sector CO2e Contributions (MT/Y)'
      };
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    }
    
  }

/* --------------------------------- LEGEND --------------------------------- */

  // Create a color bar legend for the colored zip code areas.
  // By default, shows colors used for describing average CO2e emissions
  var legend = document.getElementById('legend');
  createLegend(legend, true)

  function createLegend(legend, useDensity){
    // Legend for CO2e Per Person
    if (useDensity) {
      var div = document.createElement('center');
      div.innerHTML = '<h3>Metric Tons<br/>CO2e Per<br/>Person</center></h3>'
      legend.appendChild(div);
      for (let key in colorScale) {
        var color = key;
        var label = `<= ${colorScale[key]}`;
        var div = document.createElement('div');
        div.innerHTML = '<div class="cbox" style="background-color: '+ color + '; padding: 5px; box-sizing: border-box; opacity: 0.8;"><center>'+ label +'</center>';
        legend.appendChild(div);
      };
    // Alternate Legend may go here
    } 
  }
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

};
