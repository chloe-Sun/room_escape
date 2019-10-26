function getYear(year) {
	if(year) {
		return year.match(/[\d]{4}/); 
	}
}

function iterateRecords(data) {

	console.log(data);
	
	for (i = 0; i < data.result.records.length; i++) {
		var recordTitle = data.result.records[i]["Title"];
		var recordYear = getYear(data.result.records[i]["Temporal"]);
		var recordDescription = data.result.records[i]["Description"];
		var recordCreator = data.result.records[i]["Creator"];
		
		if (i < 3) {
			$(".container1 >.row >.col-md-4:nth-child"+"("+(i+1)+")").append(
				
					$('<h4>').text(recordTitle),
					$('<h5>').text("Year: "+recordYear),
					$('<h5>').text("Author: "+recordCreator),
					$('<p>').text("Description: " + recordDescription)
				)
				
		} else if (i < 6 && i >= 3) {
			$(".container2 >.row >.col-md-4:nth-child"+"("+(i%3+1)+")").append(
					$('<h4>').text(recordTitle),
					$('<h5>').text("Year:"+recordYear),
					$('<h5>').text("Author: "+recordCreator),
					$('<p>').text("Description: " + recordDescription)
				)
			
		} else {
			$(".container3 >.row >.col-md-4:nth-child"+"("+(i%6+1)+")").append(
				$('<h4>').text(recordTitle),
				$('<h5>').text("Year: "+recordYear),
				$('<h5>').text("Author: "+recordCreator),
				$('<p>').text("Description: " + recordDescription)
			)
		}
	};
}

$(document).ready(function() {

	var data = {
		resource_id: '1275335e-72c8-4848-ae39-94275defe86d',
		limit: 9
	}

	$.ajax({
		url: "https://data.qld.gov.au/api/3/action/datastore_search",
		data: data,
		dataType: "jsonp", 
		cache: true,
		success: function(data) {
			iterateRecords(data);
		}
		
	});

});