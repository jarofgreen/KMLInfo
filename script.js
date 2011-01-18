

var map;

var markers;

$(document).ready(function() {

	$.ajax({
	    type: "GET",
	    url: "data.kml",
	    dataType: "xml",
	    success: parseXml
	  });

	var options = {
		projection: new OpenLayers.Projection("EPSG:900913"),
		displayProjection: new OpenLayers.Projection("EPSG:4326"),
	   };

	map = new OpenLayers.Map("Map",options);
	map.addLayer(new OpenLayers.Layer.OSM());

	markers = new OpenLayers.Layer.Markers( "Markers" );
	map.addLayer(markers);

});

var totalDist = 0.0;

function parseXml(xml) {
	var lastPoint = null;
	var point;
	var olPoint;

	var size = new OpenLayers.Size(21,25);
	var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
	var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png',size,offset);

	var latLngProjection = new OpenLayers.Projection("EPSG:4326");

	$(xml).find("Placemark").each(function(){
		var bits = $(this).find("Point").find("coordinates").text().split(",");
		var thisLat = parseFloat(bits[0]);
		var thisLng = parseFloat(bits[1]);
		$("#Debug").append(thisLat+" , "+thisLng + "<br>");

		point = new LatLon(thisLat, thisLng);

		olPoint = new OpenLayers.LonLat(thisLat,thisLng).transform(latLngProjection,map.getProjectionObject());
		markers.addMarker(new OpenLayers.Marker(olPoint,icon.clone()))

		if (lastPoint) {			
			var dist = parseFloat(lastPoint.distanceTo(point));
			totalDist = totalDist + dist;
			$("#Debug").append(dist + "<br>");
		}

		lastPoint = point;
	});
	$("#Distance").append(totalDist + "<br>");

	map.setCenter(olPoint,12);
	

}


