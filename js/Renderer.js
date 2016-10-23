var Renderer = {
    // Fade out "element" for specified "time" (in ms)
    fadeRemove: function(element, time) {
        // Default value for time is 200
        if (time === undefined) time = 400;

        element.fadeOut(time, function() {
            element.remove();
        });
    }
};
