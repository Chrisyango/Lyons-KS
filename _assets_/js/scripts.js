/*-----------------------------------------------------------------------------------

	Theme Name: SiteName
	Author Design: Samir Alley @samiralley | Tom Gooden @good3n
	Author URI: http://www.revize.com/
	Date: MONTH DAY, 2015

-----------------------------------------------------------------------------------*/

(function($) {

	'use strict';

	var $window = $(window),
		$body = $('body');

	/*!
	 * IE10 viewport hack for Surface/desktop Windows 8 bug
	 * Copyright 2014-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */

	// See the Getting Started docs for more information:
	// http://getbootstrap.com/getting-started/#support-ie10-width
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement('style');
		msViewportStyle.appendChild(
			document.createTextNode(
			  '@-ms-viewport{width:auto!important}'
			)
		); document.querySelector('head').appendChild(msViewportStyle);
	}

	/*
	* E-Notify Auto submit
	*/
	$.urlParam=function(n){var e=new RegExp("[?&]"+n+"=([^]*)").exec(window.location.href);return null==e?null:e[1]||0};
	var $enotify = $('iframe[src*="/revize/plugins/notify/notify.jsp"]');
	if( $enotify.length > 0 ){
		var emailStr = $.urlParam("email");
		if( emailStr != null ){
			$enotify.attr("src", $enotify.attr("src") + "&email=" + emailStr);
		}
	}

	// RZ Class
	if(typeof RZ !== "undefined"){
	 if(RZ.login){
	  $body.addClass("user-logged-in");
	 } else{
		 $body.addClass("user-not-logged-in");
	 }
	}

	// Search Toggle
	$('#search-toggle').on('click',function(e){
		$('#search').stop().slideToggle(200);
		$(this).toggleClass('fa-search fa-close');
	});

	// Navigation Toggle
	$("#nav-toggle").on("click", function(){
		$("#nav").stop().slideToggle();
		$(this).toggleClass("active");
	});
	
	// Keyboard Navigation: Nav, flyout
	var isClick = false;
	$("#nav li a, #flyout  li a, a, button, .toggle, .toggle2").on('focusin', function(e) {
		console.log(isClick);
		if( isClick === false ) {
			$(".focused").removeClass("focused");
			$(e.currentTarget).parents("#nav li, #flyout li").addClass("focused");
			$(".opened:not(.focused) ul:visible,.opened2:not(.focused) ul:visible").slideUp().parent().removeClass("opened opened2");
		} else {
			$(".focused").removeClass("focused");
			isClick = false;
		}
	});

	// prevent focused class changes on click - This way arrows wont pop when clicking nav links
	$("#nav a,#flyout a").on('mousedown',function(){
		isClick = true;
	});

	// Menu Arrows
	$("#nav > li:has(ul)").addClass('first-parent').children("a,span").append('<i class="fa fa-angle-down down-arrow">');

	// Menu Toggles
	$("#nav >li>ul,#flyout >li>ul").addClass('first-level');
	$("#nav  li ul ul").addClass('second-level');
	$("#nav >li:has(ul)").find("a:first").append('<i class="fa fa-angle-down toggle" tabindex="0">');
	$("#nav li li:has(ul)").find("a:first").append('<i class="fa fa-angle-down toggle2" tabindex="0">');
	$("#flyout >li:has(ul)").find("a:first").append('<i class="fa fa-angle-down toggle" tabindex="0">');

	function addNavClass() {
		if ($window.width() < 992) {
			$("body").addClass('mobile');
			$("body").removeClass('desktop');

		} else{
			$("body").addClass('mobile');
			$("body").removeClass('desktop');
		}
	}
	addNavClass();
	$window.resize(addNavClass);

	$(".toggle").on("click keypress",function(e) {
			e.preventDefault();
	  var $parent = $(this).parent();
	  var $parentLi = $parent.parent();
	  $parentLi.toggleClass('opened');
	  if($parent.addClass('active').next('.first-level').is(":visible")){
		$parent.next('.first-level').slideUp();
	  } else {
		$(".first-level").slideUp("slow");
		$parent.removeClass('active').next('.first-level').slideToggle();
	  }
	});

	$(".toggle2").on("click keypress",function(e) {
			e.preventDefault();
	  var $parent = $(this).parent();
	  var $parentLi = $parent.parent();
	  $parentLi.toggleClass('opened2');
	  if($parent.next('.second-level').is(":visible")){
		$parent.next('.second-level').slideUp();
	  } else {
		$(".second-level").slideUp("slow");
		$parent.next('.second-level').slideToggle();
	  }
	});

	//colapse nav if left
	$(".desktop *").focus(function(e){
		var $opened = $(".opened");
		var $opened2 = $(".opened2");
		if( $opened.length > 0 || $opened2.length > 0 ) {
			if( $(".opened :focus").length < 1 ){
				$opened.children("ul").slideUp();
				$opened.removeClass("opened");
				$(".opened2").removeClass("opened2");
			}
			if( $(".opened2 :focus").length < 1 ){
				$opened2.children("ul").slideUp();
				$opened2.removeClass("opened2");
			}
		}
	});
	// Flyout
	var flyout = $('#flyout'),
		flyoutwrap = $('#flyout-wrap');

	if (flyout.text().length){
		flyoutwrap.prepend('<div id="flyout-toggle" class="hidden-lg hidden-md"><i class="fa fa-bars"></i> Sub Menu</div>');
	}

	$("#flyout-toggle").on("click", function(){
		flyout.stop().slideToggle();
		$(this).toggleClass("active");
	});

	$("#flyout ul").addClass('flyout-children');

	var flyoutChildren = $('.flyout-children');
	
	// start calendar resize handler
	function resizeIframe(height) {
		var iFrameID = document.getElementById('calendar');
		if(iFrameID) {
				// here you can set the height, I delete it first, then I set it again
				iFrameID.height = "";
				iFrameID.height = height;
		}
		console.log("height to: " + height);
	}
	var eventMethod = window.addEventListener
	? "addEventListener"
	: "attachEvent";
	var eventHandler = window[eventMethod];
	var messageEvent = eventMethod === "attachEvent"
		? "onmessage"
		: "message";
	eventHandler(messageEvent, function (e) {

		if( e.data && e.data[0] === "setCalHeight" )
		{
			if(typeof resizeIframe === 'function'){
				resizeIframe(e.data[1]);
			}

		}

	});
	// end calendar resize handler

	// revizeWeather
	if( typeof $.fn.revizeWeather !== "undefined" ){
		$.fn.revizeWeather({
			zip: '48326',
			city_name: '',
			unit: 'f',
			success: function(weather) {
				var date = new Date();
				date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
				var html = '<span>'+date+'</span> <span class="forecast">'+weather.temp+'&deg; '+weather.forecast+'</span>';
				html += '<i class="'+weather.icon+'"></i>';

				$("#weather").html(html);
			},
			error: function(error) {
				// better to just hide the secion if there is an error
				$('.weather').hide();
				console.log(error);
			}
		});
	}

	// Mega Footer Toggle
	$('.header-toggle').on('click keydown', function(e) {
		if (e.keyCode === 13 || e.type === 'click') {
			var inner = $(this).next('.inner-toggle');
			if (inner.is(':hidden')) {
				inner.slideDown('200');
			} else {
				inner.slideUp('200');
			}
		}
	});

	// Tabs
	$('#tabs li a').on('click keypress', function(e) {
		$('#tabs li, #tabs-content .current').removeClass('current').removeClass('fadeInLeft');
		$(this).parent().addClass('current');

		var currentTab = $(this).attr('href');
		
		e.preventDefault();
		$(currentTab).addClass('current animated fadeInLeft');
		$(currentTab).find('h2').focus();
	})

	// Twitter Feed
	if(typeof $.fn.tweet !== "undefined"){
		$("#twitterfeed").tweet({
			modpath: '_assets_/plugins/twitter/',
			username: "RevizeSoftware",
			join_text: "auto",
			avatar_size: 0,
			count: 1,
			auto_join_text_default: "",
			auto_join_text_ed: "",
			auto_join_text_ing: "",
			auto_join_text_reply: "",
			auto_join_text_url: "",
			loading_text: "Loading Tweet..."
		});
	}

	// Instafeed Feed
	if(typeof(window.Instafeed) === "function"){
		var userFeed = new Instafeed({
			get: 'user',
			resolution:'standard_resolution',
			limit:9,
			userId: 223202806,
			accessToken: '303202123.f7e9b72.27c687fbd9c24ecbb29dc92951cdf724'
		});
		userFeed.run();
	}

	// Sticky
	if(typeof $.fn.sticky !== "undefined"){
		$("#sticky").sticky({
			topSpacing:0
		});
	}


	// bxSlider
	if(typeof $.fn.bxSlider !== "undefined"){
		$('.bxslider').bxSlider({
			mode:'fade',
			auto:($('.bxslider').children().length < 2) ? false : true,
			pager: false
		});
	}

	// Owl Slider
	if(typeof $.fn.owlCarousel !== "undefined"){
		let departmentsLinkCount = $('.departments-link').length;
		const departmentsItem = function(num) {
			return (departmentsLinkCount >= num ? num : departmentsLinkCount);
		}
		$("#departments-links").owlCarousel({
			loop: departmentsLinkCount > 1 ? true : false,
			responsiveClass: true,
			nav: true,
			autoHeight: true,
			navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
			margin: 0,
			responsive: {
				0: {
					items: departmentsItem(2),
				},
				500: {
					items: departmentsItem(3),
				},
				800: {
					items: departmentsItem(5),
				},
				1100: {
					items: departmentsItem(7),
				},
				1400: {
					items: departmentsItem(9),
					loop: false,
					nav: false
				}
			}
		});
	}

	// Preloader
	$window.load(function() {

		setTimeout(function(){
			$body.addClass('loaded');
			 $('#loader-wrapper').fadeOut();
		}, 600);

	});

	$window.ready(function(){

		if ( typeof $.fn.sociafeed !== "undefined"){
			$('.social-feed-container').socialfeed({
				// Facebook
				facebook:{
					accounts: ['@facebook'],
					limit: 2,
					access_token: 'YOUR_FACEBOOK_ACCESS_TOKEN'
				},

				// Twitter
				twitter:{
					accounts: ['@spacex'],
					limit: 2,
					consumer_key: 'YOUR_CONSUMER_KEY',
					consumer_secret: 'YOUR_CONSUMER_SECRET_KEY',
					tweet_mode: 'compatibility'
				},

				// Instagram
				instagram:{
					accounts: ['&facebook'],
					limit: 2,
					access_token: 'YOUR_INSTAGRAM_ACCESS_TOKEN'
				},

				// General settings
				length:45,
				show_media:true,
				media_min_width: 300,
				update_period: 5000,
				template: "_assets_/templates/template.html",
				callback: function() {
					console.log("All posts collected!");
				}
			});
		}

		// matchHeight
		if(typeof $.fn.matchHeight !== "undefined"){
			$('.equal').matchHeight({
				//defaults
				byRow: true,
				property: 'height', // height or min-height
				target: null,
				remove: false
			});
		}

		// Animations http://www.oxygenna.com/tutorials/scroll-animations-using-waypoints-js-animate-css
		function onScrollInit( items, trigger ) {
			items.each( function() {
				var osElement = $(this),
					osAnimationClass = osElement.data('os-animation'),
					osAnimationDelay = osElement.data('os-animation-delay');

				osElement.css({
					'-moz-animation-delay':     osAnimationDelay,
					'animation-delay':          osAnimationDelay,
					'-webkit-animation-delay':  osAnimationDelay
				});

				var osTrigger = ( trigger ) ? trigger : osElement;

				if(typeof $.fn.waypoint !== "undefined"){
					osTrigger.waypoint(function() {
						osElement.addClass('animated').addClass(osAnimationClass);
					},{
						triggerOnce: true,
						offset: '100%'
					});
				}
			});
		}
		onScrollInit($('.os-animation'));

		//#Smooth Scrolling
		$('a[href*=#]:not([href=#],[href*="#collapse"])').on('click keypress', function() {
			if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					if (target.selector === "#main") {
						setTimeout(function() {
							// Setting 'tabindex' to -1 takes an element out of normal 
							// tab flow but allows it to be focused via javascript
							$(target.selector).attr('tabindex', -1).on('blur focusout', function () {

								// when focus leaves this element, 
								// remove the tabindex attribute
								$(this).removeAttr('tabindex');

							}).focus(); // focus on the content container
						}, 1000);
					}
					return false;
				}
			}
		});

		/*global jQuery */
		/*!
		* FlexVerticalCenter.js 1.0
		*
		* Copyright 2011, Paul Sprangers http://paulsprangers.com
		* Released under the WTFPL license
		* http://sam.zoy.org/wtfpl/
		*
		* Date: Fri Oct 28 19:12:00 2011 +0100
		*/
		$.fn.flexVerticalCenter = function( options ) {
			var settings = $.extend({
				cssAttribute:   'margin-top', // the attribute to apply the calculated value to
				verticalOffset: 0,            // the number of pixels to offset the vertical alignment by
				parentSelector: null,         // a selector representing the parent to vertically center this element within
				debounceTimeout: 25,          // a default debounce timeout in milliseconds
				deferTilWindowLoad: false     // if true, nothing will take effect until the $(window).load event
			}, options || {});

			return this.each(function(){
				var $this   = $(this); // store the object
				var debounce;

				// recalculate the distance to the top of the element to keep it centered
				var resizer = function () {

					var parentHeight = (settings.parentSelector && $this.parents(settings.parentSelector).length) ?
						$this.parents(settings.parentSelector).first().height() : $this.parent().height();

					$this.css(
						settings.cssAttribute, ( ( ( parentHeight - $this.height() ) / 2 ) + parseInt(settings.verticalOffset) )
					);
				};

				// Call on resize. Opera debounces their resize by default.
				$(window).resize(function () {
					clearTimeout(debounce);
					debounce = setTimeout(resizer, settings.debounceTimeout);
				});

				if (!settings.deferTilWindowLoad) {
					// call it once, immediately.
					resizer();
				}

				// Call again to set after window (frames, images, etc) loads.
				$(window).load(function () {
					resizer();
				});

			});

		};
		$('.v-align').flexVerticalCenter();


		// Remove matchHeight on document center pages
		if($('#RZdocument_center').length){
			$('.aside,.entry').matchHeight({remove:true});

			if(window.matchMedia("(min-width: 992px)").matches){
				setInterval(function(){
					if($('.post').outerHeight() + 300 > $('.entry').outerHeight()){
						$('.aside').css('height',$('.entry').outerHeight() + 'px');
					}
				}, 200);
			}
		}


	}); // Ready

})(jQuery);
