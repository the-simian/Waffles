var vm = {};


vm.ui = {};
vm.data = {};
vm.$el = {};
vm.ui.widgets = {};

vm.sliderValue1 = ko.observable(1);

vm.sliderValue2 = ko.observable(1);

vm.sliderValue3 = ko.observable(1);

vm.sliderPorportionValue = ko.observable(0);
vm.sliderPorportionOppositeValue = ko.computed(function () {


    return 12 - vm.sliderPorportionValue();
});

vm.data.allClasses = 'w-1 w-2 w-3 w-4 w-5 w-6 w-7 w-8 w-9 w-10 w-11 w-12';




var changePortion = function () {

    

    var w1 = vm.sliderPorportionValue() ? 'w-' + vm.sliderPorportionValue() : '';

    var w2 = vm.sliderPorportionOppositeValue() ? 'w-' +  vm.sliderPorportionOppositeValue() : '';

    var w1_pair = "w-pair-" + w2;

    vm.$el.$por1.removeClass(vm.data.allClasses).show();
    vm.$el.$por2.removeClass(vm.data.allClasses).show();


    injectAutos(vm.$el.$porAuto1, vm.sliderValue2());
    injectAutos(vm.$el.$porAuto2, vm.sliderValue3());

    if (!w1) {
        vm.$el.$por2.hide();
        vm.$el.$porAuto2.empty();
    }
    
    if (!w2) {
        vm.$el.$por1.hide();
        vm.$el.$porAuto1.empty();
    }

 

    vm.$el.$por1.addClass(w1 + ' ' + w1_pair + ' w-alpha' );
    vm.$el.$por2.addClass(w2 + ' w-omega');


    applyTooltip();

};


var injectAutos = function ($target, amount) {

    

    var autos = '';
    
    for (var i = 0; i < amount; i++) {

        autos += '<div class="w-auto w-v-1"><div class="brick"><span class="demo-brick-helper-text">'+amount+'</span></div></div>';
    }


    $target.html($(autos));
};


var applyTooltip = function(demoDiv) {


    var $demodivs = demoDiv || $('#porportionInject');

    var $brix = $demodivs.find('.brick');
    $.each($brix, function() {
        $(this).attr('title', $(this).parent().attr('class'));
    });

    $demodivs.tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function(position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });

};


var fillBasic = function() {

    injectAutos($('#basicAutoDemo'), vm.sliderValue1());

    applyTooltip($('#basicAutoDemo'));
};

vm.ui.widgets.waffleslider_Portion = ko.computed(function () {


    return {


        widget: "slider",
        options: {

            min: 0,
            max: 12,
            step: 1,
            slide: function (e, ui) {

                vm.sliderPorportionValue(ui.value);
                changePortion(e, ui);
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
                fillBasic();
            },
            stop: fillBasic
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

                vm.sliderValue2(ui.value);

            },
            stop: changePortion
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

                vm.sliderValue3(ui.value);

            },
            stop: changePortion
        }

    };


});


$(document).ready(function () {

    ko.applyBindings(vm);


    var $wafflePorportion = $('#porportionInject');

    vm.$el.$por1 = $wafflePorportion.find('.por-side-1');
    vm.$el.$por2 = $wafflePorportion.find('.por-side-2');

    vm.$el.$porAuto1 = $wafflePorportion.find('.auto-target-1');
    vm.$el.$porAuto2 = $wafflePorportion.find('.auto-target-2');

    changePortion();
    injectAutos(vm.$el.$porAuto1, vm.sliderValue2());
    injectAutos(vm.$el.$porAuto2, vm.sliderValue3());

    fillBasic();

    applyTooltip();
});