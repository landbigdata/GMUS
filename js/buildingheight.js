
var map;

initMap();
initInterface();

function initMap() {
 L.mapbox.accessToken = 'pk.eyJ1Ijoia2ltYWVyYSIsImEiOiJFRmx4Q2k0In0.1xgFS81ORguzsqeKGavBiA';
 var satellite = L.mapbox.tileLayer('mapbox.satellite')
 var streets = L.mapbox.tileLayer('mapbox.streets')
 var white = L.mapbox.tileLayer("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==");
 var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
});

  map = L.mapbox.map('map',null, { // 'mapbox.streets'
        minZoom: 6,
        maxZoom: 14,
        attribution: false,
        preferCanvas: true,
        zoomControl: true,
		layers: [dark]
  }).setView([51.08, 10.13], 7);   // latitude 40, longitude -75, zoom level 5

	var baseMaps = {
	"No Background": white,
    "Streets": streets,
	"Satellite": satellite,
    "Dark Matter": dark
	};
	
  L.control.layers(baseMaps, null, { position: 'topleft' }).addTo(map);

  L.easyButton('<img src="img/info_small.png" class="icon">', function(btn, map){
		disp = document.getElementById("infoText").style.visibility
		if(disp == "hidden") {
			document.getElementById("infoText").style.visibility = "visible"
		} else {
			document.getElementById("infoText").style.visibility = "hidden"
		}
	}, 'Site Information', {
  position: 'topleft'
  }).addTo(map);

  //tileLayer = L.tileLayer('data/tiles/{z}/{x}/{y}.png', {tms:true});
  tileLayer = L.tileLayer('https://ows.geo.hu-berlin.de/franz/data/tiles/height/{z}/{x}/{y}.png', {tms:true});
  map.addLayer(tileLayer)
  tileLayer.bringToFront();
  
  ar = new L.GeoJSON.AJAX("data/area.geojson", {onEachFeature: onEachCountry});
  ar.addTo(map);
  ar.on('data:loaded', function() {
    ar.bringToFront()

    ar.setStyle(regularStyle);
    //getFeatureByName(countries, "Burkina Faso", "SOVEREIGNT").setStyle(burkinaRegular);

    //var ctx = document.getElementById("chart_population");
    //createLineChartFromPolygon(ctx, getFeatureByName(countries, "Burkina Faso", "SOVEREIGNT"));
  }.bind(this));
}

function initInterface() {
  attribution = L.control.attribution({ position: 'bottomright' }).addTo(map);
  scale = L.control.scale({ position: 'bottomright' }).addTo(map);

  // Opacity Slider
  var slider = document.getElementById('slider');
  var sliderValue = document.getElementById('slider-value');

  slider.addEventListener('input', function(e) {
      tileLayer.setOpacity(parseInt(e.target.value, 10) / 100)
      sliderValue.textContent = e.target.value + '%';
  });

 var img = document.createElement("img");
 img.src = "img/legend.JPG";
 var src = document.getElementById("x");
 legend.appendChild(img);

 var closeButton = document.createElement('div');
 closeButton.className = 'cB';
 legend.appendChild(closeButton);
 closeButton.onclick = function() {
   document.getElementById("legend").style.visibility = 'hidden';
   document.getElementById("showLegend").style.visibility = 'visible';
   document.getElementById("exmpl").style.bottom = '40px';
   document.getElementById("showExamples").style.bottom = '40px';
 }

 document.getElementById("showLegend").onclick = function() {
   document.getElementById("legend").style.visibility = 'visible';
   document.getElementById("showLegend").style.visibility = 'hidden';
   document.getElementById("exmpl").style.bottom = '70px';
   document.getElementById("showExamples").style.bottom = '70px';
 }
 
  var closeExamples = document.createElement('div');
 closeExamples.className = 'cE';
 exmpl.appendChild(closeExamples);
 closeExamples.onclick = function() {
   document.getElementById("exmpl").style.visibility = 'hidden';
   document.getElementById("showExamples").style.visibility = 'visible';
 }

 document.getElementById("showExamples").onclick = function() {
   document.getElementById("exmpl").style.visibility = 'visible';
   document.getElementById("showExamples").style.visibility = 'hidden';
 }
}

function zoomTo(arg) {
	if(arg == 'ex1') {
		map.setView([50.1146, 8.6795], 12)
	}
	if(arg == 'ex2') {
		map.setView([52.5310, 13.3780], 12)
	}
	if(arg == 'ex3') {
		map.setView([48.2218, 16.3864], 12)
	}
	if(arg == 'ex4') {
		map.setView([50.9373, 6.9555], 12)
	}
	if(arg == 'ex5') {
		map.setView([51.4844, 6.8564], 12)
	}
	if(arg == 'ex6') {
		map.setView([47.2674, 11.4111], 12)
	}
	if(arg == 'ex7') {
		map.setView([51.8800, 7.8911], 12)
	}
	if(arg == 'ex8') {
		map.setView([53.5400, 10], 12)
	}
	if(arg == 'ex9') {
		map.setView([51.900, 7.75], 12)
	}
	if(arg == 'ex10') {
		map.setView([48.6700, 9.25], 12)
	}
}

function onEachCountry(feature, layer) {
  	layer.on({
  		mouseover: function(e) {
			layer.setStyle(hoverStyle)
  		},
  		mouseout: function(e) {
			layer.setStyle(regularStyle)
  		},
      click: function(e) {
	  }
  	});
  }
