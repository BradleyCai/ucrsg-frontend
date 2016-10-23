/** Views are snippets of HTML. For example the first screen with the input text
  * box and the buttons and card are all part of the "InputView".
  *
  * This "Viewer" is in charge of maintaining and dealing with the views. It holds
  * a view object and a couple functions to manipulate it's data
  *
  */
var Viewer = {
    // Takes a name for the key, an element for the value,
    addView: function(name, element) {
        Viewer.views[name] = element;
    },

    addIndexView: function(name, element, index) {
        if (Viewer.views[name] === undefined) {
            Viewer.views[name] = [];
        }
        Viewer.views[name][index] = element;
    },

    // Will set a view to display
    showView: function(name, init, location) {
        // If the inputs are bad return false
        if (name === undefined) {
            return false;
        }

        // Load HTML element
        var ele = Viewer.views[name];

        // If it doesn't yet exist in the document, create it. Otherwise unhide
        if ($(ele).length) {
            // Default location is after the last element of the container
            location = typeof location !== 'undefined' ? location : $("#container");

            // Create div element, put the contents of the view in, and append
            // it to the HTML
            var view = document.createElement("div");
            view = $(view);
            view.hide(400);
            view.id = name;
            view.html(element);
            location.append(view);
            view.show(400);

            // Callback
            if (typeof(init) === "function")
                init();
        }
        else {
            ele.show(400);
        }
    },

    showIndexView: function(name, index, init, location) {
        // If the inputs are bad return false
        if (index === undefined && name === undefined) {
            return false;
        }

        // Load HTML element
        var ele = Viewer.views[name][index];

        // If it doesn't yet exist in the document, create it. Otherwise unhide
        if ($(ele).length) {
            // Default location is after the last element of the container
            location = typeof location !== 'undefined' ? location : $("#container");

            // Create div element and put the contents in
            var view = document.createElement("div");
            view = $(view);
            view.hide(400);
            view.id = name;
            view.html(element);
            location.append(view);
            view.show(400);

            // Callback
            if (typeof(init) === "function")
                init();
        }
        else {
            ele.show(400);
        }
    },

    // Will remove a certain view. Default is to have it fade away
    hideView: function(name) {
        var ele;
        if (typeof index === undefined) {
            ele = Viewer.views[name];
        }
        else {
            ele = Viewer.views[name][index];
        }
        ele.hide(400);
    },

    getView: function(name) {
        return Viewer.views[name];
    },

    getIndexView: function(name, index) {
        return Viewer.views[name][index];
    },

    deleteView: function(name) {
        delete Viewer.views[name];
    },

    deleteIndexView: function(name, index) {
        delete Viewer.views[name][index];
    },

    // Object of views. Contains the jQuery HTML objects of each view. Views
    // can also be stored in an array to make iteration easier
    views: {}
};
