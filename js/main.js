// validate - check with simple regex and that the course hasn't been added yet
var validate = function (text) {
	return validateRE(text) && noDups(text);
};
var validateRE = function (text) {
	return text.match(/^\s*([A-Za-z]+)\s+([A-Za-z0-9]+)\s*$/g);
};
var noDups = function (text) {
	var courseIdentifier = toJSON(text);
	var id = courseIdentifier.id;
	var subject = courseIdentifier.subject;
	
	for (var i = 0; i < courses.courses.length; i++) {
		if (subject == courses.courses[i]["subject"]
		&& id == courses.courses[i]["id"]) {
			return false;
		}
	}
	return true;
};


// toJSON - Converts text from "subject id" to JSON
var toJSON = function (text) {
	var subject = /^\s*([A-Za-z]+)\s+([A-Za-z0-9]+)\s*$/g.exec(text)[1];
	var id = /^\s*([A-Za-z]+)\s+([A-Za-z0-9]+)\s*$/g.exec(text)[2];

	return {"subject": subject, "id": id};
};


// hide/showNoClassText - Toggle default text for course input box
var hideNoClassText = function() {
	document.getElementById('empty-list').hidden='true';
};
var showNoClassText = function() {
	document.getElementById('empty-list').removeAttribute('hidden');
};


// rmCourseAt - Remove course item at index
var rmCourseAt = function(index) {
	// Make sure index is within bounds
	if (index >= courses.courses.length || index < 0) return false;
	
	// Remove from global array
	courses.courses.splice(index, 1);
	
	// Remove from display <==> refresh display entirely
	refreshCourses();
	
	// Display the noClassText if 0 classes added
	if (courses.courses.length < 1) {
		showNoClassText();
	}
	
	return true;
};


// refreshCourses - refresh display of courses
var refreshCourses = function() {
	var subject, id;
	$("#input-list")[0].innerHTML = $("#empty-list")[0].outerHTML;
	
	for (var i = 0; i < courses.courses.length; i++)
	{
		subject = courses.courses[i]["subject"];
		id = courses.courses[i]["id"];
		// Add to display
		$("#input-list").append('<li>' + subject.toUpperCase() + " " + id.toUpperCase() + '</li>');
	}
	
	if (courses.courses.length < 1) {
		showNoClassText();
	}
};

var courses = {
	"courses": []
};

$(document).ready(function() {

	// Add course, input and validate first
	$("#submit-course").click(function() {
		
		var text = $("#course-input").val();

		// Validate and input text
		if (validate(text)) {
			
			// Add to global courses list
			courses.courses.push(toJSON(text));
			
			// Refresh display
			refreshCourses();
			
			// Hide the default text in input list box
			hideNoClassText();
			
		}
		else {
			// TODO: needs to be some other form of notification?
			// TODO: Issue #2
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
	
	
	// Remove All Courses Button
	$("#remove-all").click(function() {
		console.log("remove-all function entered");
		courses.courses = [];
		refreshCourses();
	});
	

    // Have the #generate button send the data to the server
	$("#generate").click(function() {
		// Error bounds checking
		if (courses.courses.length < 1 || courses.courses.length > 4) return;
		// TODO: Issue #2
		
		var sendString = JSON.stringify(courses);

		alert("Sending to server: " + sendString);
        console.log(courses);
		//$.post(<URL>, sendString, <function?>);
	});
});
