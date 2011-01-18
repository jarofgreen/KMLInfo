

$(document).ready(function() {

	$.ajax({
	    type: "GET",
	    url: "data.kml",
	    dataType: "xml",
	    success: parseXml
	  });

});

function parseXml(xml) {
	$(xml).find("Placemark").each(function(){
		var pm = $(this);
		var p = pm.find("Point");
		var c = p.find("coordinates");
		var bits = c.text().split(",");
		$("#Debug").append(bits[0]+" , "+bits[1] + "<br />");
	});
}


