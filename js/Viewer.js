/** Views are snippets of HTML. For example the first screen with the input text
  * box and the buttons and card are all part of the "InputView".
  *
  * This "Viewer" is in charge of maintaining and dealing with the views. It holds
  * a view object and a couple functions to manipulate it's data
  *
  */
var Viewer = {
    // Will add a view
    addView: function(name, element, index) {
        if (index === undefined) {
            Viewer.views.name = element;
        }
        else {
            Viewer.views.name[index] = element;
        }
    },

    // Will set a view to display
    showView: function(name, index) {
        var ele;
        if (index === undefined) {
            ele = Viewer.views.name;
        }
        else {
            ele = Viewer.views.name[index];
        }
        ele.show(400);
    },

    // Will remove a certain view. Default is to have it fade away
    removeView: function(name) {
        var ele;
        if (index === undefined) {
            ele = Viewer.views.name;
        }
        else {
            ele = Viewer.views.name[index];
        }
        ele.hide(400);
    },

    getview: function(name, index) {
        if (index === undefined) {
            return Viewer.views.name;
        }
        else {
            return Viewer.views.name[index];
        }
    },

    // Object of views. Contains the jQuery HTML objects of each view. Views
    // can also be stored in an array to make iteration easier
    views: {}
};
