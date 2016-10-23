// Converts text from "subject id" to JSON
var toJSON = function (text, re) {
    if (re.test(text)) {
        var matches = re.exec(text);
    	return {"subject": matches[1], "id": matches[2]};
    }

    return {"subject": false, "id": false};
};

$(document).ready(function() {
    InputView.init();
});
