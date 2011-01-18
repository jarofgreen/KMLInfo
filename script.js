

$(document).ready(function() {

	$.ajax({
	    type: "GET",
	    url: "data.kml",
	    dataType: "xml",
	    success: parseXml
	  });

});

function parseXml(xml) {
	var lastLat, lastLng = null;

	$(xml).find("Placemark").each(function(){
		var bits = $(this).find("Point").find("coordinates").text().split(",");
		var thisLat = parseFloat(bits[0]);
		var thisLng = parseFloat(bits[1]);
		$("#Debug").append(thisLat+" , "+thisLng + "<br>");

		if (lastLat && lastLng && thisLat && thisLng) {
			
		}

		lastLat = thisLat;
		lastLng = thisLng;
	});
}


