//Image 'repairing'
function widthToScalar()
{
    return $(window).innerWidth() / 1000 * 0.4;
}
var $parallax = $('.parallax').parallax({
        scalarX: widthToScalar(),
        scalarY: 0,
        limitX: 1,
    });
$(window).on('resize', function() {
        $parallax = $('.parallax').parallax();
        $parallax.parallax('scalar', widthToScalar(), 0);
    });
//Modal Forms

$('.modalCall').on('click', function(event) {
	event.preventDefault();
	$('.form_hidden').bPopup();
});
/*
//div resize
var $blockHeight =  0.8539325843;
var $screenHeight = window.innerHeight*(1-0.0817160368);
$(document).ready(function() {
    $('.resizable').css('height', ($screenHeight - $blockHeight) + 'px');
     $('.container_firstscreen').css('margin-top', $screenHeight-($blockHeight*$screenHeight) + 'px');
});
$(window).resize(function() {
    $('.resizable').css('height', ($screenHeight - $blockHeight) + 'px');
         $('.container_firstscreen').css('margin-top', $blockHeight + 'px');
});
*/
