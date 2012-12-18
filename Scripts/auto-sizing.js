var vm = {};


vm.ui = {};
vm.ui.widgets = {};

vm.sliderValue1 = ko.observable(0);

vm.sliderValue2 = ko.observable(0);

vm.sliderValue2 = ko.observable(0);

vm.sliderValuePortion = ko.observable(0);


var changePortion = function() {
}


vm.ui.widgets.waffleslider_Portion = ko.computed(function () {


    return {


        widget: "slider",
        options: {

            min: 0,
            max: 12,
            step: 1,
            slide: function (e, ui) {

                vm.sliderValuePortion(ui.value);
            },
            stop: changePortion
        }

    };


});



vm.ui.widgets.waffleslider_1 = ko.computed(function () {


    return {


        widget: "slider",
        options: {

            min: 0,
            max: 12,
            step: 1,
            slide: function (e, ui) {

                vm.sliderValue1(ui.value);
                
            },
            stop: populateDiv
        }

    };


});

vm.ui.widgets.waffleslider_2 = ko.computed(function () {


    return {


        widget: "slider",
        options: {

            min: 0,
            max: 12,
            step: 1,
            slide: function (e, ui) {

                vm.sliderValue1(ui.value);

            },
            stop: populateDiv
        }

    };


});

vm.ui.widgets.waffleslider_3 = ko.computed(function () {


    return {


        widget: "slider",
        options: {

            min: 0,
            max: 12,
            step: 1,
            slide: function (e, ui) {

                vm.sliderValue1(ui.value);

            },
            stop: populateDiv
        }

    };


});