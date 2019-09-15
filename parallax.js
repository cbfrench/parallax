var positions = [];

$(document).ready(function(){
    $(".parallax").each(function(index){
        positions.push(document.body.getElementsByClassName("parallax")[index].getBoundingClientRect());
        $(this).prepend("<img src='" + $(this).data("parallax-image") + "' class='parallax-image'/>");
    });
});

$(window).load(function(){
    $(".parallax").each(function(index){
        var posY = 0;
        var screenY = parseInt($(window).scrollTop());
        var windowWidth = $(window).width();
        var pos = document.body.getElementsByClassName("parallax")[index].getBoundingClientRect();
        var true_y = pos.top + screenY;
        var $img = $(this).find(".parallax-image");
        var speed = parseInt($(this).data("parallax-speed"));
        var previousHeight = pos.height;

        if(pos.height > $img.height()){
            pos = positions[index];
        }

        /* default CSS */
        $(this).css("position", "relative");
        $(this).css("overflow", "hidden");
        $img.css("position", "absolute");
        $img.css("top", 0);
        $img.css("min-width", "100%");
        $img.css("height", "auto");
        $img.css("z-index", -100);
        /* end default css */

        if((isNaN(speed) && speed != 0) || (speed >= 10)){
            speed = 5;
        }
        if(speed != 0){
            if($img.width() > pos.width * 2){
                $img.css("max-height", pos.height * 2);
            }
            else{
                $img.css("min-height", pos.height * 2);
            }
            $img.css("left", -$img.width() / 2 + windowWidth/2);
        }

        $(window).scroll(function(){
            screenY = parseInt($(window).scrollTop());
        });

        $(window).resize(function(){
            pos = document.body.getElementsByClassName("parallax")[index].getBoundingClientRect();
            if(previousHeight != pos.height){
                true_y = pos.top + screenY;
                $img.css("min-height", pos.height * 1.5);
            }
            windowWidth = $(window).width();
            $img.css("left", -$img.width() / 2 + windowWidth/2);
            previousHeight = pos.height;
        });

        setInterval(slide, 1);

        function slide(){
            if(speed <= 0 || speed >= 10){
                return;
            }
            posY = lerp(posY, screenY - true_y, 0.025) * (speed * 3 + 65) / 100 - 16;
            $img.css("transform", "translateY(" + (posY) + "px)");
        }

        function lerp(a, b, c){
            return (1-c) * a + c * b;
        }
    });
});