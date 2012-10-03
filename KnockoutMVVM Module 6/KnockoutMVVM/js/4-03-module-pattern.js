﻿$(function () {
    var photoPath = "/images/";

    // function helper 
    my.formatCurrency = function (value) {
        return "$" + value.toFixed(2);
    };

    // for creating Product Models
    my.Product = function () {
        this.id = ko.observable();
        this.salePrice = ko.observable();
        this.photo = ko.observable();
        this.shortDescription = ko.observable();
        this.photoUrl = ko.computed(function () {
            return photoPath + this.photo();
        }, this);
    };

    // for creating LineItem objects
    my.LineItem = function () {
        var self = this;
        self.product = ko.observable();
        self.quantity = ko.observable(1); // default
        self.extendedPrice = ko.computed(function () {
            //PAPA: 'This" conflict
            //PAPA:  'this' wont work here, because 'this' is the DOM windows
            var x = this;
            return self.product() ? self.product().salePrice() * parseInt("0" + self.quantity(), 10) : 0;
        });
    };

    // The ViewModel
    my.vm = (function () {
        var products = ko.observableArray([]);
        var privateVal = 3;
        return {
            metadata: {
                pageTitle: "Knockout: Module Pattern",
                personal: {
                    link: "http://twitter.com/john_papa",
                    text: "@john_papa"
                }
            },
            products: products,
            lines: ko.observableArray([new my.LineItem()]),
            publicVal: 7,
            addLine: function () {
                //alert(this.publicVal + privateVal);
                //PAPA:  'this' will work here
                //my.vm.lines.push(new my.LineItem());
                var x = this;
                this.lines.push(new my.LineItem());
            },
            removeLine: function (line) {
                //PAPA: 'This" conflict
                //PAPA:  'this' won't work here, because 'this' is the LineItem
                my.vm.lines.remove(line);
                var x = this;
                //this.lines.remove(line);
            },
            loadProducts: function () {
                $.each(my.sampleData.data.Products, function (i, p) {
                    //PAPA: 'This" conflict
                    //PAPA:  'this' wont work here, because 'this' is the LineItem
                    my.vm.products.push(new my.Product()
    	                            .id(p.Id)
    	                            .salePrice(p.SalePrice)
    	                            .photo(p.Photo)
    	                            .shortDescription(p.Model.Name)
                            );
                });
            }
//            ,
//            // This won't work well, because of 'this' problems
//            grandTotal: ko.computed(function () {
//                var total = 0;
//                var x = this; // ends up being the DOM window or HTML document
//                $.each(this.lines(), function () {
//                    // "this" is part of the inner function, so its for a line item
//                    total += this.extendedPrice();
//                });
//                return total;
//                // Passing in the 'owner' as the VM will not work because it does not exist yet
//            }, my.vm)
        };
    })();

    // Computed observable function. 
    // We append it to the ViewModel here.
    my.vm.grandTotal = ko.computed(function () {
        var total = 0;
        $.each(this.lines(), function () {
            // "this" is part of the inner function
            total += this.extendedPrice();
        });
        return total;
    }, my.vm);

    my.vm.loadProducts();
    ko.applyBindings(my.vm);
});
