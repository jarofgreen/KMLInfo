

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
	var lastPoint = null;
	var point;

	$(xml).find("Placemark").each(function(){
		var bits = $(this).find("Point").find("coordinates").text().split(",");
		var thisLat = parseFloat(bits[0]);
		var thisLng = parseFloat(bits[1]);
		$("#Debug").append(thisLat+" , "+thisLng + "<br>");

		point = new LatLon(thisLat, thisLng);

		if (lastPoint) {			
			var dist = parseFloat(lastPoint.distanceTo(point));
			totalDist = totalDist + dist;
			$("#Debug").append(dist + "<br>");
		}

		lastPoint = point;
	});
	$("#Distance").append(totalDist + "<br>");

}


