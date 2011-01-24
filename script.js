

var map;

var markers;
var latLngProjection;

var markerIcon;


var animationInterval = 1000;

$(document).ready(function() {

	var options = {
		projection: new OpenLayers.Projection("EPSG:900913"),
		displayProjection: new OpenLayers.Projection("EPSG:4326"),
	   };

	map = new OpenLayers.Map("Map",options);
	map.addLayer(new OpenLayers.Layer.OSM());
	map.zoomToMaxExtent();

	markers = new OpenLayers.Layer.Markers( "Markers" );
	map.addLayer(markers);

	latLngProjection = new OpenLayers.Projection("EPSG:4326");

	var size = new OpenLayers.Size(21,25);
	var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
	markerIcon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png',size,offset);

});

function go() {
	$.ajax({
	    type: "GET",
	    url: $('#FileURL').val(),
	    dataType: "xml",
	    success: parseXml
	  });

	$('#LoadDataForm').remove();
}

var totalDistKM = 0.0;
var dataPoints = new Array();
var dataPosition = 0;

function parseXml(xml) {

	$(xml).find("Placemark").each(function(){
		var bits = $(this).find("Point").find("coordinates").text().split(",");
		var thisLat = parseFloat(bits[0]);
		var thisLng = parseFloat(bits[1]);
		$("#Debug").append(thisLat+" , "+thisLng + "<br>");

		dataPoints.push([thisLat,thisLng]);

	});

	var olPoint = new OpenLayers.LonLat(dataPoints[0][0],dataPoints[1][1]).transform(latLngProjection,map.getProjectionObject());
	map.setCenter(olPoint,12);

	setTimeout("showNextPoint()",animationInterval);
}

function showNextPoint() {

	if (dataPosition >= dataPoints.length) {
		return;
	}

	var thisLat = dataPoints[dataPosition][0];
	var thisLng = dataPoints[dataPosition][1];

	var olPoint = new OpenLayers.LonLat(thisLat,thisLng).transform(latLngProjection,map.getProjectionObject());
	map.panTo(olPoint);

	markers.addMarker(new OpenLayers.Marker(olPoint,markerIcon.clone()))

	if (dataPosition > 0) {
		var thisPoint = new LatLon(thisLat, thisLng);
		var lastLat = dataPoints[dataPosition-1][0];
		var lastLng = dataPoints[dataPosition-1][1];
		var lastPoint = new LatLon(lastLat, lastLng);
		totalDistKM += parseFloat(lastPoint.distanceTo(thisPoint));
		$("#DistanceKM").html(totalDistKM.toPrecisionFixed(3));
		$("#DistanceMiles").html((totalDistKM * 0.621371192).toPrecisionFixed(3));

	}

	dataPosition += 1;
	setTimeout("showNextPoint()",animationInterval);

}

