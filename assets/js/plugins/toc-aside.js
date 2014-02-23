/**
 * created by orz@mad4a.me with pirated webstorm
 * generate an floating outline according to the `h2' tags
 */
 jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	}
 });
 
$(function() {
    var dict = {};
    $('h3').each(function (idx) {
        var title = $(this).text();
        var id = 'outline_' + idx;
        dict[title] = id;
/*        $(this).append('<a name="' + id + '"></a>'); */
	$(this).html('<a name="' + id + '"></a>'+$(this).html());
    });

    var outline_ul = $('<ul style="list-style-type: none"></ul>');
	outline_ul.append($('<li class="lable"></li>').html('<i class="icon-list-ul"></i>      TOC'));
	outline_menu = $('<li class="menu"></li>');
    $.each(dict, function (idx, val) {
        outline_menu.append($('<li></li>')
                             .html('<span><a href="#' + val + '">' + idx + '</a></span>'));
    });
	outline_ul.append(outline_menu);
    $('#main').append($('<nav id="h2outline"></nav>')
                         .css('position', 'absolute')
                         .css('width', '155px')
						 .css('top', $('article').offset().top)
                         .css('text-align', 'left')
                         .html(outline_ul));

    /**
     * |<------------------------------w------------------------------>|
     * |       -----------     -----------------     -----------       |
     * |<--l-->|   nav   |<-d->|               |<-d->| outline |<--x-->|
     * |       |<---n--->|     |<------c------>|     |<---a--->|       |
     * |       -----------     |               |     -----------       |
     * |<----------m---------->|               |                       |
     * |                       -----------------                       |
     * -----------------------------------------------------------------
     * (w - c) / 2 = d + a + x
     *   => x = (w - c) / 2 - (a + d), where
     *     w = $(window).width(),
     *     c = $('#container').width(),
     *     a = $('h2outline').width(),
     *
     * m = l + n + d
     *   => d = m - (l + n), where
     *     m = $('#container').position().left,
     *     l = $('#real_nav').position().left,
     *     n = $('#real_nav').width()
     */
    var main = $('#entry-content'),
        h2outline = $('#h2outline'),
        real_nav  = $('#dl-menu');

        
		
    $(window).resize(function () {
        var w = $(window).width(),
            c = 800,
            a = h2outline.width();
			d = 10; // #real_nav has left margin of -184.8px
        h2outline.css('right',
                      (w - c) / 2 - (a + d));
    });

    $(window).resize();
	
});

$(window).load(function(){
	menuPosition=224;
	menuPosition_t=$('article').offset().top;
	if(menuPosition_t){
		menuPosition=menuPosition_t;
	}else {
		menuPosition=224;
	}
	FloatMenu();
});

function FloatMenu(){
	var toplest=25
	var animationSpeed=1500;
	var animationEasing='easeOutQuint';
	var scrollAmount=$(document).scrollTop();
	var newPosition=toplest+scrollAmount;
	if($(window).height()<$('#h2outline').height()+$('#h2outline .menu').height()){
		$('#h2outline').stop().animate({top: newPosition}, animationSpeed, animationEasing);
	} else {
		if($(document).scrollTop()<menuPosition){
			$('#h2outline').stop().animate({top: menuPosition}, animationSpeed, animationEasing);
		} else{
			$('#h2outline').stop().animate({top: newPosition}, animationSpeed, animationEasing);
		}

	}
}

$(window).scroll(function(){ 
	FloatMenu();
});
$(document).ready(function(){
	var fadeSpeed=500;
	$("#h2outline").hover(function(){
		$('#h2outline .lable').fadeTo(fadeSpeed, 1);
		$("#h2outline .menu").fadeIn(fadeSpeed);
	},function(){
		$('#h2outline .lable').fadeTo(fadeSpeed, 0.75);
		$("#h2outline .menu").fadeOut(fadeSpeed);
	});
});


