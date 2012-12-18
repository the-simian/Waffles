var vm = {};


vm.ui = {};
vm.ui.widgets = {};


vm.sliderValue = ko.observable(0);

vm.sliderOppositeValue = ko.computed(function () {

    return 12 - vm.sliderValue();
});


var populateDiv = function (e,ui) {
    

    var $demoDiv = $('#waffle-basic-demo');

    var div1 = vm.sliderValue() ? '<div class="w-alpha w-' + vm.sliderValue() + '"><div class="brick"></div></div>' : "";
    
  
    var div2 = vm.sliderOppositeValue() ? '<div class="w-omega w-' + vm.sliderOppositeValue() + '"><div class="brick"></div></div>' : ""


    var $html = $(div1 + div2);
    

    if (($html).hasClass('w-12')) {

        $html.removeClass('w-alpha w-omega').addClass('w-alpha w-omega');

    }


    $demoDiv.html($html);






    var $brix = $demoDiv.find('.brick');

    $.each($brix, function() {
        $(this).attr('title', $(this).parent().attr('class'));
    });
    




    $demoDiv.tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function (position, feedback) {
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


vm.ui.widgets.waffleslider = ko.computed(function () {


    return {


        widget: "slider",
        options: {

            min: 0,
            max: 12,
            step: 1,
            slide: function (e, ui) {

                vm.sliderValue(ui.value);
                populateDiv(e, ui);
            },
            stop: populateDiv
        }

    };


});


$(document).ready(function () {

    ko.applyBindings(vm);
    populateDiv();
});