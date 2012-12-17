
$(document).ready(function () {

    var dialogueContent;


    $('.pug-head').on('mouseenter', function () {
        $(this).attr('src', "Image/pug_300_2.png");
        var $speechBubble = $('.dialog-bubble:first');
        dialogueContent = $speechBubble.html();
        var speechBubbleheight = $speechBubble.height();
        $speechBubble.html('<h2 class="ui-priority-primary">Ooohhhhhheeee heheh hueh hueh hueh huehhhhh..eeeheheheee!</h2>').height(speechBubbleheight);
    }).on('mouseleave', function () {

        $(this).attr('src', "Image/pug_300.png");
        $('.dialog-bubble').html(dialogueContent);
    });

    var $bricks = $('.brick');
    $.each($bricks, function () {
        $(this).attr('title', $(this).parent().attr('class'));
    });

    $(document).tooltip({
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
});