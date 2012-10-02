/// <reference path="knockout-2.1.0.debug.js" />
/// <reference path="jquery-1.8.2-vsdoc.js" />

$(function () {
    var viewModel = {
        firstName: ko.observable("john");
    };
    ko.applyBindings(viewModel);
});