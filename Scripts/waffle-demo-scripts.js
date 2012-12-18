
$(document).ready(function () {

    var dialogueContent;


    $('.pug-head:first').on('mouseenter', function () {
        $(this).attr('src', "Image/w-face-oh.jpg");
        var $speechBubble = $('.dialog-bubble:first');
        dialogueContent = $speechBubble.html();
        var speechBubbleheight = $speechBubble.height();
        $speechBubble.html('<h2 class="ui-priority-primary">Ooohhhhhheeee heheh hueh hueh hueh huehhhhh..eeeheheheee!</h2>').height(speechBubbleheight);
    }).on('mouseleave', function () {

        $(this).attr('src', "Image/w-face-eh.jpg");
        $('.dialog-bubble:first').html(dialogueContent);
    });

    var $bricks = $('.brick');
    $.each($bricks, function () {
        $(this).attr('title', $(this).parent().attr('class'));
    });


    $('#media-query').on('click', function () {
        

        if ($(this).hasClass('w-alpha')) {
            $(this).addClass('w-omega').removeClass('w-alpha');
        } else {
            $(this).removeClass('w-omega').addClass('w-alpha');
        }

    });


    
});

$(document).ready(function () {
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