var InputView = {
    inputRegex: /^\s*([A-Za-z]+)\s+([A-Za-z0-9]+)\s*$/,

    courses: {
        "courses": []
    },

    // Converts text from "subject id" to JSON
    toJSON: function (text, re) {
        if (re.test(text)) {
            var matches = re.exec(text);
        	return {"subject": matches[1], "id": matches[2]};
        }

        return {"subject": false, "id": false};
    },

    // Initializes the Input View. Gives buttons functionality.
    init: function() {
    	// Add course, input and validate first
    	$("#submit-course").click(function() {
    		var text = $("#course-input").val();
            var courseIdentifier = InputView.toJSON(text, InputView.inputRegex);
            var id = courseIdentifier.id;
            var subject = courseIdentifier.subject;

    		// Validate and input text
    		if (subject !== false && id !== false) {
                var empty_list = $("#empty-list");

                if (empty_list !== undefined) {
                    Renderer.fadeRemove(empty_list);
                }
        			$("#input-list").append('<li>' + subject + " " + id + '</li>');

    			InputView.courses.courses.push(courseIdentifier);
                $('#course-input').val("");
    		}
    		else {
    			// TODO: #issue-2
    		}
    	});

        // Let the submit-course button work with the enter key too
        $('#course-input').keypress(function(key){
            if(key.which == 13){ // Enter key pressed
                $('#submit-course').click(); // Treat it as a click
            }
        });

        // Have the #generate button send the data to the server
    	$("#generate").click(function() {
    		var sendString = JSON.stringify(InputView.courses);

    		alert("Sending to server: " + sendString);
    		//$.post(<URL>, sendString, <function?>);
    	});
    }
};
