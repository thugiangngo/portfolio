(function($){
    //Page defaults

    //(Private) Email Regex
    var    Reg_Email = /^\w+([\-\.]\w+)*@([a-z0-9]+(\-+[a-z0-9]+)?\.)+[a-z]{2,5}$/i;
    /******************************
     *  Page Setup
     *****************************/
    function pageSetup(){
        // Vertical Align
        var windowHeight = $(window).height(),
            contentHeight = $('html').height();

        // Content Positon
        if (windowHeight > contentHeight) {
            $Top = ((windowHeight - contentHeight) / 2);
            $('html').css('padding-top',$Top+"px");
        }

        var header=($('header').width());
        var withoutheader=($('html').width())-($('header').width());
        var firstblock=withoutheader/2;
        $('.first-block').css('width',firstblock+'px');
        var linewidth=940-($('.social-icons').width()+$('.copyright').width());
        $('#line').css('width',linewidth+'px');
        var lineleft=($('.copyright').width()+20);
        $('#line').css('left',lineleft+'px');

    }
    /******************************
     * Navigation
     *****************************/
    function Nav(){
		
        $("div[class*='menu'] a[href^='#']").bind("click", jump);

        if (location.hash){
			
			var h=location ;
			$('.active-menu').removeClass('active-menu');            
           		$("a[href~='"+h+"']").addClass('active-menu');

            		//to not give the page offset if page not opened in tablet or other
            		if($(window).width()> 768 ){
				var l=parseInt($('.first-block').css('width'), 10);
				$('.mainpart').scrollTo( location.hash , 800,{offset:{left:-l}} );
			}
			else{
				$('.mainpart').scrollTo( location.hash , 800);
			}

        }else{
			$('.active-menu').removeClass('active-menu'); 
			if ($('.mainpart').length)			
				$('.menu a[href*="home"]').addClass('active-menu');
			else
				$('.menu a[href="index.html"]').addClass('active-menu');
			if ($('.blog').length)
				$('.menu a[href="blog.html"]').addClass('active-menu');
		}



        // Close/Open Menu On Click
        $('.menu-button-minus').click(function(){
            var  $links=$('.menu');

            $(this).toggleClass('menu-button-plus');

            $links.animate({
                marginLeft: parseInt($links.css('marginLeft'),10) == 0 ?
                    $links.outerWidth()+12 : 0
            },{complete:function(){
                $('.menu>ul>li').hover(function(){
                    $(this).parents('.menu-area').css('overflow','visible');
                    $(this).children('ul').stop().fadeIn();
                },function(){
                    $(this).parents('.menu-area').css('overflow','hidden');
                    $(this).children('ul').stop().fadeOut().hide();});
            }});

            $('.header-titles').fadeToggle('slow');


        });



        //Mobile Menu
        $(document).click(
            function (e) {
                var $mobileNavBtn = $('.mobile-menu  > a'),
                    ta= e.target,
                    m=$mobileNavBtn.get(0),
                    c=$mobileNavBtn.hasClass('active');

                if ((ta != m) && c)
                    $mobileNavBtn.click();
            }
        );

        $('.mobile-menu > a').click(function (e) {
            var $this = $(this),
                $menu = $this.parent().find('> ul');

            if ($this.hasClass('active')) {
                $menu.slideUp('fast');
                $this.removeClass('active');
				$this.css('background-image','url(assets/img/mobile-button.png)');
            }
            else {
                $menu.slideDown('fast');
                $this.addClass('active');
				$this.css('background-image','url(assets/img/mobile-button-minus.png)');
            }

            e.preventDefault();
        });
    }
    /******************************
     *  Scroll Plugins
     *****************************/
    function Scroll(){

        //nice scroll parts
        $(".mainpart").niceScroll({autohidemode:true,hidecursordelay:10,cursorminheight:10,scrollspeed:40,cursorcolor:"#c0c7d5",mousescrollstep:50,cursorwidth:0,cursorborder:"0 solid #fff"});
		$(".blog").niceScroll({autohidemode:true});
    }
/*-----------------------------------------------------------------------------------*/
/*	magnific-popup
/*-----------------------------------------------------------------------------------*/

	function magnificpopup() { 
		$('.popup-with-form').magnificPopup({
			type: 'inline',
			fixedContentPos: false,
			fixedBgPos: true,
			overflowY:'auto',
			closeBtnInside: true,
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-slide-bottom',

			// When elemened is focused, some mobile browsers in some cases zoom in
			// It looks not nice, so we disable it:
			callbacks: {
				updateStatus: function( data ) {
					if( data.status === 'ready' ) {
						if ( $(".ajs-profession").length ) {
							if ( ! $(".ajs-profession .audiojs").length ) {
						
								audiojs.events.ready( function() {
									var audio = audiojs.create( $("audio"), { css: '' } );
								} );
							}
						}
						
					}
				}
			}
		});
	
		$('.popup-video').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			mainClass: 'my-mfp-slide-bottom',

			fixedContentPos: false
		});
	
	} 
	
    /******************************
     *  Portfolio
     *****************************/
    function Portfolio(){

        //Portfolio Hover image
        var $itemPicture=$('.item');
        if($itemPicture.length )
        {
            var $itemImage=$itemPicture.find('.item-image');

            $itemImage.hover(function () {
					fadeIn($(this).find('.frame-overlay'),0.9,400);
					//fadeIn($(this).find('.portfolio-meta'),0.9,300);
                },function() {
                    fadeOut($(this).find('.frame-overlay'),0,400);
					//fadeOut($(this).find('.portfolio-meta'),0,300);
                }
            )
        }

        // isotop
        var $container = $('.isotope');

        if ($container.length < 1)
            return;

        $container.isotope({
            // options
            itemSelector: '.item',
            layoutMode: 'masonry',
            animationEngine: 'best-available'
        });

        // filter items when filter link is clicked
        $('.subnavigation a').click(function (e) {
            e.preventDefault();

            var $this = $(this);

            if ($this.hasClass('.current'))
                return;

            var $optionSet = $this.parents('.subnavigation');

            $optionSet.find('.current').removeClass('current');
            $this.addClass('current');
            var selector = $(this).attr('data-filter');
            $container.isotope({ filter: selector });
        });
    }
    /******************************
     * Resume
     *****************************/
    function Resume(){
		 if($(window).width()>768){
            $(".experiences").after('<ul id="fooX" />').next().html($(".experiences").html());
            $(".experiences li:odd").remove();
            $("#fooX li:even").remove();

            $(".experiences").carouFredSel({
                auto:false,
                synchronise : "#fooX",
                circular:false,
                infinite:false,
                width:'100%',
                prev: '#resume-exp-prev',
                next: '#resume-exp-next',
                swipe: {
                    onMouse: true,
                    onTouch: true
                }

            });
            $("#fooX").carouFredSel({
                auto: false,
                circular:false,
                width:'100%',
                infinite:false
            });
        }
		
        //For Responsive View
        $(window).resize(function(){
            var Width=$(window).width();
            if((Width<=768)&&(Width>480)){
                if($('.hideme').css('opacity')==1)
                    $('.car').trigger('destroy',true);
                $(".experiences").trigger('destroy',true);
                $("#fooX").trigger('destroy',true);
				$(".portfolio").mCustomScrollbar("destroy");
            }
            else if(Width<=480){

                if($('.hideme').css('opacity')==1)
                    $('.car').trigger('destroy',true);
                $(".experiences").trigger('destroy',true);
                $("#fooX").trigger('destroy',true);
				$(".portfolio").mCustomScrollbar("destroy");

            }
            else{
                if($('.hideme').css('opacity')==1)
                    chart_carousel();

                $(".experiences").carouFredSel({
                    auto:false,
                    synchronise : "#fooX",
                    circular:false,
                    infinite:false,
                    width:'100%',
                    prev: '#resume-exp-prev',
                    next: '#resume-exp-next',
                    swipe: {
                        onMouse: true,
                        onTouch: true
                    }

                });
                $("#fooX").carouFredSel({
                    auto: false,
                    width:'100%',
                    circular:false,
                    infinite:false
                });

            }
        });
		
        //Scrolling mainpart to Appear element
        var flag=0;
        $('.mainpart').scroll( function(){

            /* Check the location of each desired element */
            $('#resume').each( function(i){
                var left_of_object = $(this).position().left + $(this).outerWidth()+600;
                var left_of_container= $('.mainpart').scrollLeft() + $('.mainpart').width();

                var top_of_object = $(this).position().top + $(this).outerHeight()+600;
                var top_of_container= $('.mainpart').scrollTop() + $('.mainpart').height();

                /* If the object is completely visible in the window, fade it it */
                if( ((left_of_container > left_of_object ) || (top_of_container > top_of_object)) && (flag === 0) ){
                    flag=1;
                    $('.hideme').animate({'opacity':'1'},'fast',function(){
                        init_chart();
						viewP();
                        if($(window).width()>768)
                            chart_carousel();
                    });

                }
            });
        });
    }
    /******************************
     * Easy Pie Chart Function
     *****************************/
    var init_chart=(function() {
        $('.chart').easyPieChart({
            scaleColor:false,
            barColor:'#ffb823',
            lineWidth:21,
            trackColor:'#2e2e2e',
            lineCap:'butt',
            animate:1000,
            size:130
        });
    });

    var chart_carousel=(function(){
        $('.car').carouFredSel({
            auto: false,
            circular:false,
            infinite:false,
			width:740,
            prev: '#prev2',
            next: '#next2',
            mousewheel:false,
            swipe: {
                onMouse: true,
                onTouch: true
            }
        });
    });
	var viewP=(function(){
		$('.chart span').css('visibility','visible');
		$('.chartbox p').css('visibility','visible');
	});	
    /******************************
     * Contact
     *****************************/
    //Map Init
    function map(){
        $("#map").gmap3({
            map:{
                options:{
                    zoom:ZoomLevel,
					center: new google.maps.LatLng(CITY_MAP_CENTER_LAT, CITY_MAP_CENTER_LNG),
                    draggable:true,
                    mapTypeControl:false,
                    navigationControl: false,
                    scrollwheel: false,
                    streetViewControl: false,
                    panControl:false,
                    zoomControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, "Gray"]
                    }
                }
            },
            styledmaptype:{
                id: "Gray",
                options:{
                    name: "Gray"
                },
                styles:[
                    {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [
                                { color : "#1d1d1d" }
                            ]
                        },{
                        featureType: "landscape",
                        stylers: [
                            {color: "#3e3e3e" },
                            {lightness: 7 }
                        ]
                    },{
                        featureType: "administrative.country",
                        elementType: "geometry.stroke",
                        stylers: [
                            { color: "#5f5f5f" },
                            { weight : 1 }
                        ]
                    },{
                        featureType: "landscape.natural.terrain",
                        stylers: [
                            { color : "#4f4f4f" }
                        ]
                    },{
                        featureType: "road",
                        stylers: [
                            { color: "#393939" }
                        ]
                    },{
                        featureType: "administrative.country",
                        elementType: "labels",
                        stylers: [
                            { visibility: "on" },
                            { weight: 0.4 },
                            { color: "#686868" }
                        ]
                    },{
                        eatureType: "administrative.locality",
                        elementType: "labels.text.fill",
                        stylers: [
                            { weigh: 2.4 },
                            { color: "#9b9b9b" }
                        ]
                    },{
                        featureType: "administrative.locality",
                        elementType: "labels.text",
                        stylers: [
                            { visibility: "on" },
                            { lightness: -80 }
                        ]
                    },{
                        featureType: "poi",
                        stylers: [
                            { visibility: "off" },
                            { color: "#d78080" }
                        ]
                    },{
                        featureType: "administrative.province",
                        elementType: "geometry",
                        stylers: [
                            { visibility: "on" },
                            { lightness: -80 }
                        ]
                    },{
                        featureType: "water",
                        elementType: "labels",
                        stylers: [
                            { color: "#adadad" },
                            { weight: 0.1 }
                        ]
                    },{
                        featureType: "administrative.province",
                        elementType: "labels.text.fill",
                        stylers: [
                            { color: "#3a3a3a" },
                            { weight: 4.8 },
                            { lightness: -69 }
                        ]
                    }

                ]
            },
            marker:{
            values:[{
                'latLng': [CITY_MAP_CENTER_LAT,CITY_MAP_CENTER_LNG]
            }],
                options:{
                'icon':new google.maps.MarkerImage("assets/img/marker.png")
            }
        }
        });

        $('#map').gmap3('get').setMapTypeId("Gray");//Display Gray Map On Load 

    }//end Map init

    /**** ****/
    function IE_Fix() {

        if (!$.browser.msie) return;

        /***** Add input defaults Fix for IE ******/

        $('[placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur();
    }

    /***** Comment & Contact Forms ******/

    function Forms() {


        var $respond = $('#respond'), $respondWrap = $('#respond-wrap'), $cancelCommentReply = $respond.find('#cancel-comment-reply-link'),
            $commentParent = $respond.find('input[name="comment_parent"]');

        $('.comment-reply-link').each(function () {
            var $this   = $(this),
                $parent = $this.parent().parent().next();

            $this.click(function () {
                var commId = $this.parents('.comment').find('.comment_id').html();

                $commentParent.val(commId);
                $respond.insertAfter($parent);
                $cancelCommentReply.show();

                return false;
            });
        });

        $cancelCommentReply.click(function (e) {
            $cancelCommentReply.hide();

            $respond.appendTo($respondWrap);
            $commentParent.val(0);

            e.preventDefault();
        });

        ContactForm('#respond');

    }//End Forms()


    function ContactForm(formContainerId) {

        var $Contact = $(formContainerId);

        if ($Contact.length < 1)
            return;

        var $Form = $Contact.find('form'),
            IsContactForm = $Form.hasClass('contact'),
            Action = $Form.attr('action'),
            $SubmitBtn = $Form.find('input[type="submit"]'),
            $submitWrap = $Form.find('.form-submit'),
            $Inputs = $Form.find('input[type="text"],textarea'),
            $Loader = $Form.find('.loader'),
            $AjaxError = $Form.find('.AjaxError'),
            $AjaxComplete = $Form.find('.AjaxSuccess'),
            ValidFields = [$Inputs.length];

        if ($submitWrap.length) {
            $btnWrap = $('<div class="btn send-button"><input name="submit" type="submit" id="submit" value="Post Comment"/></div>');
            $submitWrap.prepend($btnWrap);
            $SubmitBtn.val('');
            $btnWrap.prepend($SubmitBtn);
        }


        //Retry link
        $AjaxError.find('a').click(function (e) {
            $AjaxError.hide();
            $SubmitBtn.click();
            e.preventDefault();
        });

        //Handle form submission
        $SubmitBtn.click(function (e) {
            var IsValid = true;

            $Inputs.blur();

            //Check if all fields are valid
            $.each(ValidFields, function (i, v) {
                if (v == false) {
                    IsValid = false;
                    return false;
                }
            });

            if (!IsValid) {
                e.preventDefault();
                return;
            }

            //No need to continue the submission process
            if (!IsContactForm)
                return;

            var values = $Form.serialize();

            //Show progress bar
            $Loader.fadeIn('fast');
            //Prevent multi clicking
            $SubmitBtn.parent().fadeOut('fast');

            //Send post request
            $.ajax({
                type: "POST",
                url: Action,
                data: values,
                error: function (xhr, error) {
                    $Loader.hide();
                    $AjaxError.fadeIn('fast');
                },
                success: function (msg) {
                    $Loader.hide();
                    if (msg === 'OK')
                        $AjaxComplete.fadeIn('fast');
                    else
                        $AjaxError.fadeIn('fast');
                }
            });

            e.preventDefault();
        });

        //Handle Controls Lost Focus Event
        $Inputs.each(function (i) {
            var $me = $(this),
                type = $me.attr('name'),
                DefaultVal = $me.attr('placeholder'),
                $Error = $Contact.find('.' + type + 'Error');

            if (typeof DefaultVal == 'undefined')
                DefaultVal = '';

            //Control lost focus
            $me.blur(function () {
                var Value = $.trim($me.val()),
                    isValid = true;

                //Validate by type
                if (type == 'email') {
                    if (!Reg_Email.test(Value) || Value == DefaultVal) {
                        isValid = false;
                    }
                }
                else if (type == 'name' || type == 'surname') {
                    if (Value.length < 1 || Value.length > 50 || Value == DefaultVal) {
                        isValid = false;
                    }
                }
                else if (type == 'comment') {
                    if (Value.length < 1 || Value.length > 1000) {
                        isValid = false;
                    }
                }

                if (!isValid) {
                    $Error.fadeIn('fast');
                    ValidFields[i] = false;
                }
                else {
                    $Error.fadeOut('fast');
                    ValidFields[i] = true;
                }

            }); //$me.blur
        });

    }//End ContactForm
    /************************************
     * Useful Functions
     **********************************/
    var jump=function(e)
    {	
        if (e){
            e.preventDefault();
            var t = $(this).attr("href");
        }else{
            var t = location.hash;
        }

        if($(window).width()>768){
            var l=parseInt($('.first-block').css('width'), 10);
            $('.mainpart').scrollTo( $(t), 800,{offset:{left:-l}} );
        }else{
            $('.mainpart').scrollTo( $(t), 800);
        }

        $('.active-menu').removeClass('active-menu');
        $(this).addClass('active-menu');
    }
    // Function Of Image Hover
    function fadeIn($element, opacity, time){
        $element.css({opacity:0, display: 'block'}).stop(true,true).animate({opacity:opacity}, time);
    }
    function fadeOut($element, opacity, time){
        $element.stop(true,true).animate({opacity:opacity}, time);
    };

$(document).ready(function () {
        pageSetup();
        Nav();
        Scroll();
		if($('#resume').length)
			Resume();
		if ($('.popup-with-form').length)
			magnificpopup();
		if($('#map').length)
			map();
        IE_Fix();
		Forms();
		

});//End of $(document).ready

$(window).load(function(){
    Portfolio();
	if(($(window).width() >768))
		$('.portfolio').mCustomScrollbar({
			theme:"dark-thick"
		});
	
	$('.about-paragraph').mCustomScrollbar({theme:"dark-thick"	});	
	
	jQuery('.start_loader').fadeOut(850); //Hide Website Loader

	if ( jQuery(".ajs-profession").length ) {
		audiojs.events.ready( function() {
			var audio = audiojs.create( jQuery("audio"), { css: '' } );
		} );
	}
});
}) (jQuery);

//Dummy object
var addComment = {
    moveForm: function () { }
};
