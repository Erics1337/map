var map;

/* -------------------- Map Styling including alternate style ------------------- */
var colorScale = {'#bc0000': 16000, '#cd3308': 8000, '#de5014': 4000, '#ef691f': 2000, '#ff812b': 0}

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
// // Alternative map styling
// var altStyle = [
//   {
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#f5f5f5"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#616161"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#f5f5f5"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.land_parcel",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.land_parcel",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#bdbdbd"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.neighborhood",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#eeeeee"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "labels.text",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#757575"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#e5e5e5"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#9e9e9e"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#ffffff"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "road.arterial",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "road.arterial",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#757575"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#dadada"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "labels",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#616161"
//       }
//     ]
//   },
//   {
//     "featureType": "road.local",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "road.local",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#9e9e9e"
//       }
//     ]
//   },
//   {
//     "featureType": "transit",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "transit.line",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#e5e5e5"
//       }
//     ]
//   },
//   {
//     "featureType": "transit.station",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#eeeeee"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#c9c9c9"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "labels.text",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#9e9e9e"
//       }
//     ]
//   }
// ];

// // Create button for switching between visualizations
// function switchVisualization(switchControlDiv, map){
//   // Set CSS for the control border.
//   var controlUI = document.createElement('div');
//   controlUI.style.backgroundColor = '#fff';
//   controlUI.style.border = '2px solid #fff';
//   controlUI.style.borderRadius = '3px';
//   controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
//   controlUI.style.cursor = 'pointer';
//   controlUI.style.marginBottom = '22px';
//   controlUI.style.textAlign = 'center';
//   controlUI.title = 'Click to switch between visualization styles';
//   switchControlDiv.appendChild(controlUI);

//   // Set CSS for the control interior.
//   var controlText = document.createElement('div');
//   controlText.style.color = 'rgb(25,25,25)';
//   controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
//   controlText.style.fontSize = '16px';
//   controlText.style.lineHeight = '38px';
//   controlText.style.paddingLeft = '5px';
//   controlText.style.paddingRight = '5px';
//   controlText.innerHTML = 'Change visualization';
//   controlUI.appendChild(controlText);

//   // Setup the click event listener. Button click switches
//   // between two visualization schemes, which represent
//   // different demographic data
//   google.maps.event.addDomListener(controlUI, 'click', function() {
//   	// Trigger events that update Polygon colors and legend
//     google.maps.event.trigger(map.data, 'setcolor')
//     google.maps.event.trigger(map.data, 'updatelegend')
//   });
// }

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
  fetch("./regionWkeys.json")
    .then(response => {
      return response.json();
    })
    .then(function(data){
      ghgData = data;
    });



  // Colorize zip code areas based on relative median income
  // or population density (changeable via dedicated button)
  map.data.setStyle(function(feature) {
    var color;
    for (item in ghgData) {
      if (ghgData[item].zip_id.toString() != feature.getProperty('GEOID10').substring(2)) {
        continue;
      } else {
        CO2ePerPop = (ghgData[item].CO2e_transportation_kgPerYear+
          ghgData[item].CO2e_electricity_total_metricTonsPerYear+
          ghgData[item].CO2e_naturalGas_total_metricTonsPerYear+
          ghgData[item].CO2e_waste_MetricTonsPerYear) / ghgData[item].population2018;

        colorKeys = Object.keys(colorScale);
        colorValues = Object.values(colorScale);

        if (CO2ePerPop > colorValues[0]) {
          color = colorKeys[0];
        } 
        else if (CO2ePerPop > colorValues[1]){
          color = colorKeys[1];
        }
        else if (CO2ePerPop > colorValues[2]){
          color = colorKeys[2];
        }
        else if (CO2ePerPop > colorValues[3]){
          color = colorKeys[3];
        }
        else if (CO2ePerPop > colorValues[4]){
          color = colorKeys[4];
        }
        break;
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

    for (item in ghgData) {
      if (ghgData[item].zip_id.toString() != event.feature.getProperty('GEOID10').substring(2)) {
        continue;
      } else {
        city = ghgData[item].city;
        county = ghgData[item].county;
        population = ghgData[item].population2018;
        transportation = ghgData[item].CO2e_transportation_kgPerYear;
        electricity = ghgData[item].CO2e_electricity_total_metricTonsPerYear;
        naturalGas = ghgData[item].CO2e_naturalGas_total_metricTonsPerYear;
        waste = ghgData[item].CO2e_waste_MetricTonsPerYear;

        CO2ePerPop = (ghgData[item].CO2e_transportation_kgPerYear+
          ghgData[item].CO2e_electricity_total_metricTonsPerYear+
          ghgData[item].CO2e_naturalGas_total_metricTonsPerYear+
          ghgData[item].CO2e_waste_MetricTonsPerYear) / ghgData[item].population2018;

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
      '</br>Waste: '+ `<b>${waste}</b> Metric Tons CO2e/ Year` +'</p>'+
      '</div>'+

      `<div id="piechart" style="width: 100%; height: 30%; position: relative; right: 3vw; bottom: 2vh;"></div>` +
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
        ['Waste', convertToNum(waste)]
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
  // By default, shows colors used for describing relative median income.
  // Button click toggles changes data to population density.
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
        var label = `> ${colorScale[key]}`;
        var div = document.createElement('div');
        div.innerHTML = '<div class="cbox" style="background-color: '+ color + '; padding: 5px; box-sizing: border-box; opacity: 0.8;"><center>'+ label +'</center>';
        legend.appendChild(div);
      };
    // Alternate Legend may go here
    } 
  }
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);


};
