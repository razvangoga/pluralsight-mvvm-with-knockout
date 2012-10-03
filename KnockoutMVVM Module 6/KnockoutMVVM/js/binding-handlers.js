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

    ko.bindingHandlers.jqButton = {
        init: function (element, valueAccessor) {
            $(element).button();
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = valueAccessor();
            $(element).button("option", "disabled", value.enabled === false);
        }
    };


    ko.bindingHandlers.starRating = {
        init: function (element, valueAccessor) {
            $(element).addClass("starRating");
            for (var i = 0; i < 5; i++) {
                $("<span>").appendTo(element);
            }
            // Handle mouse events on the stars
            $("span", element).each(function (index) {
                $(this).hover(
                    function () {
                        $(this).prevAll().add(this).addClass("hoverChosen");
                    },
                    function () {
                        $(this).prevAll().add(this).removeClass("hoverChosen");
                    }).click(function () {
                        var ratingObservable = valueAccessor(); // Get the associated observable
                        ratingObservable(index + 1); // Write the new rating to it
                    });
            });
        },
        update: function (element, valueAccessor) {
            // Give the first x stars the "chosen" class, where x <= rating
            var ratingObservable = valueAccessor();
            $("span", element).each(function (index) {
                $(this).toggleClass("chosen", index < ratingObservable());
            });
        }
    };

})();