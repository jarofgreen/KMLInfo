

$(document).ready(function() {

	$.ajax({
	    type: "GET",
	    url: "data.kml",
	    dataType: "xml",
	    success: parseXml
	  });

});

var totalDist = 0.0;

function parseXml(xml) {
	var lastLat, lastLng = null;

	$(xml).find("Placemark").each(function(){
		var bits = $(this).find("Point").find("coordinates").text().split(",");
		var thisLat = parseFloat(bits[0]);
		var thisLng = parseFloat(bits[1]);
		$("#Debug").append(thisLat+" , "+thisLng + "<br>");

		if (lastLat && lastLng && thisLat && thisLng) {
			var p1 = new LatLon(thisLat, thisLng);
			var p2 = new LatLon(lastLat, lastLng);
			var dist = parseFloat(p1.distanceTo(p2));
			totalDist = totalDist + dist;
			$("#Debug").append(dist + "<br>");
		}

		lastLat = thisLat;
		lastLng = thisLng;
	});
	$("#Distance").append(totalDist + "<br>");

}


