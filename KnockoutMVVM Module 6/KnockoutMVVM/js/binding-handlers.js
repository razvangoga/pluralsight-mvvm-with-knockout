/// <reference path="../scripts/knockout-2.1.0.debug.js" />
/// <reference path="../scripts/jquery-1.8.2-vsdoc.js" />

(function () {

    //------------------------------------------------------
    // See these and more custom binding
    // handlers at http://learn.knockoutjs.com
    //------------------------------------------------------

    ko.bindingHandlers.fadeVisible = {
        init: function (element, valueAccessor) {
            var shouldDisplay = valueAccessor();
            $(element).toggle(shouldDisplay);
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var shouldDisplay = valueAccessor();
            var allBindings = allBindingsAccessor();
            var duration = allBindings.fadeDuration || 500;

            shouldDisplay ? $(element).fadeIn(duration) : $(element).fadeOut(duration);
        }
    };
})();