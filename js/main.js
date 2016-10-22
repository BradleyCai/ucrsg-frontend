var validate = function (text) {
	return text.match(/^\s*([A-Za-z]+)\s+([A-Za-z0-9]+)\s*$/g);
};

// Converts text from "subject id" to JSON
var toJSON = function (text) {
	var subject = /^\s*([A-Za-z]+)\s+([A-Za-z0-9]+)\s*$/g.exec(text)[1];
	var id = /^\s*([A-Za-z]+)\s+([A-Za-z0-9]+)\s*$/g.exec(text)[2];

	return {"subject": subject, "id": id};
};

$(document).ready(function() {
	var courses = {
        "courses": []
    };

	// Add course, input and validate first
	$("#submit-course").click(function() {
		var text = $("#course-input").val();
        var courseIdentifier = toJSON(text);
        var id = courseIdentifier.id;
        var subject = courseIdentifier.subject;

        console.log(courseIdentifier.id);

		// Validate and input text
		if (subject !== null && id !== null) {
            var empty_list = $("#empty-list");

            if (empty_list === undefined) {
                empty_list.remove();
            }
    			$("#input-list").append('<li>' + subject + " " + id + '</li>');

			courses.courses.push(courseIdentifier);
		}
		else {
			// TODO: needs to be some other form of notification?
			alert("Input text invalid.");
		}
        console.log("hello");
	});

    $('#course-input').keypress(function(key){
        if(key.which == 13){ // Enter key pressed
            $('#submit-course').click(); // Treat it as a click
            $('#course-input').val("");
        }
    });

    // Have the #generate button send the data to the server
	$("#generate").click(function() {
		var sendString = JSON.stringify(courses);

		alert("Sending to server: " + sendString);
        console.log(courses);
		//$.post(<URL>, sendString, <function?>);
	});
});
