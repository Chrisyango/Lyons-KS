/*-----------------------------------------------------------------------------------

	Theme Name: City of Lyons, KS
	Front-end Developer: Chris Yang
	Author Design: Samir Alley @samiralley | Tom Gooden @good3n
	Author URI: http://www.revize.com/
	Date: March 28, 2019

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
	// $("#nav > li:has(ul)").addClass('first-parent').children("a,span").append('<i class="fa fa-angle-down down-arrow">');

	// Menu Toggles
	$("#nav >li>ul,#flyout >li>ul").addClass('first-level');
	$("#nav  li ul ul").addClass('second-level');
	$("#nav >li:has(ul)").find("a:first").append('<i class="fa fa-angle-down toggle" tabindex="0">');
	$("#nav li li:has(ul)").find("a:first").append('<i class="fa fa-angle-down toggle2" tabindex="0">');

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
		flyoutwrap.prepend('<div id="flyout-toggle" class="hidden-lg hidden-md" tabindex="0"><i class="fa fa-bars"></i> Sub Menu</div>');
	}

	$("#flyout-toggle").on("click keypress", function(){
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

	// Tabs
	$('#tabs li a').on('click keypress', function(e) {
		e.preventDefault();
		$('#tabs li, #tabs-content .current').removeClass('current').removeClass('fadeInLeft');
		$(this).parent().addClass('current');
		$('#tabs-content > div').eq($(this).parent().index()).addClass('current');
		$('#tabs-content > div.current > a:first-of-type').focus();
	})

	// bxSlider
	if(typeof $.fn.bxSlider !== "undefined"){
		$('.bxslider').bxSlider({
			mode:'fade',
			auto:($('.bxslider').children().length < 2) ? false : true,
			pager: true
		});
	}

	// Owl Slider
	if(typeof $.fn.owlCarousel !== "undefined"){
		let quickLinkCount = $('.quick-link').length;
		const quickLinkItem = function(num) {
			return (quickLinkCount >= num ? num : quickLinkCount);
		}
		$("#quick-links-wrapper").owlCarousel({
			loop: quickLinkCount > 1 ? true : false,
			responsiveClass: true,
			nav: true,
			autoHeight: true,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			margin: 0,
			responsive: {
				0: {
					items: quickLinkItem(1),
				},
				600: {
					items: quickLinkItem(2),
				},
				1000: {
					items: quickLinkItem(3),
				}
			}
		});

		let newsLinkCount = $('.news-link').length;
		const newsLinkItem = function(num) {
			return (newsLinkCount >= num ? num : newsLinkCount);
		}
		$("#news-links").owlCarousel({
			loop: newsLinkCount > 1 ? true : false,
			responsiveClass: true,
			nav: true,
			autoHeight: true,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			margin: 75,
			responsive: {
				0: {
					items: newsLinkItem(1),
				},
				768: {
					items: newsLinkItem(2),
				},
				1200: {
					items: newsLinkItem(3),
				}
			}
		});

		let contentQuickLinkCount = $('.content-quick-link').length;
		const contentQuickLinkItem = function(num) {
			return (contentQuickLinkCount >= num ? num : contentQuickLinkCount);
		}
		$("#content-quick-links-wrapper").owlCarousel({
			loop: contentQuickLinkCount > 1 ? true : false,
			responsiveClass: true,
			nav: true,
			autoHeight: true,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			margin: 0,
			responsive: {
				0: {
					items: contentQuickLinkItem(1),
				},
				600: {
					items: contentQuickLinkItem(2),
				},
				850: {
					items: contentQuickLinkItem(3),
				},
				1200: {
					items: contentQuickLinkItem(5),
					nav: false,
					loop: false
				}
			}
		});
	}

	$window.ready(function(){

		// Side Bar
		$(".side-bar-content").find("span:first").append('<i class="fa fa-chevron-right toggle" tabindex="0">');
		$(".side-bar-header").on("click keypress",function(e) {
			if($("ul", $(this).parent()).length) {
				var $parent = $(this).parent();
				$(".side-bar-content>.active").slideUp("slow");
				$('i', '.side-bar-header.current').toggleClass('fa-chevron-right fa-chevron-down');
				$('.side-bar-content>.current').removeClass('current');
				$('.side-bar-content>.active').removeClass('active');
				$('.side-bar-content.opened').removeClass('opened');
				if($parent.find('.ward-list').is(":hidden")){
					$(this).addClass('current');
					$('i', this).toggleClass('fa-chevron-right fa-chevron-down');
					$parent.find('.ward-list').addClass('active').stop().slideToggle();
					$parent.addClass('opened');
				}
			}
		});

		// Mega Menu		
		$("#nav>li>ul").addClass('mega-menu clearfix');
		$('#nav>li>a').each(function(){
			var navText = $(this).text();
			$('<div><span>'+navText+'</span></div>').prependTo($(this).next());
		});
		$('#header-img').insertBefore('.mega-menu>div>span');
		$('#need-help').insertAfter('.mega-menu>div>span');

		// News info
		if(typeof $.fn.owlCarousel !== "undefined"){
			$('.news-link').hover(function() {
				$('.news-link-info > p', this).stop().slideToggle(200);
			});
		}

		// Instance the tour
		if($('#tour').length){
			var tour = new Tour({
				steps: [{
					element: "#logo",
					title: "Welcome to The City of Lyons",
					content: "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text"
				},
				{
					element: "#nav",
					title: "Navigation links",
					content: "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text"
				},
				{
					element: "#google-translate",
					title: "We speak many languages",
					content: "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text"
				},
				{
					element: "#search",
					title: "Find information in the way that works best for you ",
					content: "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text"
				},
				{
					element: "#quick-links",
					title: "Popular services",
					content: "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text"
				},
				{
					element: "#news",
					title: "Stay Informed",
					content: "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text"
				},
				{
					element: "#content-quick-links",
					title: "Useful Links",
					content: "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text"
				},
				{
					element: "#events",
					title: "What's Happening",
					content: "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text"
				},
				{
					element: "#alerts",
					title: "Sign-Up for Alerts",
					content: "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text"
				},
				{
					element: "footer",
					title: "Thanks again for visiting The City of Lyons.",
					content: "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text"
				}],
				storage: false
			});

			// Initialize the tour
			$('#tour-site').on('click keypress', function(e){
				tour.init();
				tour.start();
				if(tour.ended())tour.restart();
				e.preventDefault();
			});
		}

		// Fill sides script
		function fillSide(){
			var windowWidth = $('body').outerWidth();
			var pixelValue = (windowWidth - $('.container').width()) / 2;
			$('.fillLeft').css({
					'margin-left': -pixelValue
			});
			
			$('.fillRight').css({
					'margin-right': -pixelValue
			});
			$('.fillLeft.withPadding').css({
					'margin-left': -pixelValue,
					'padding-left': pixelValue
			});
			
			$('.fillRight.withPadding').css({
					'margin-right': -pixelValue,
					'padding-right': pixelValue
			});
		}
		fillSide();
		$window.resize(fillSide);

		// Translate
		$('#google_translate_element').on('DOMNodeInserted', function(event) {
			let translateText = $('.goog-te-menu-value span:first').text();
			if (translateText !== 'ENG ') {
				$('.goog-te-menu-value span:first').html('ENG <i class="fa fa-chevron-down"></i>');
				$('.goog-te-menu-frame.skiptranslate').load(function(){
					setTimeout(function(){
						$('.goog-te-menu-frame.skiptranslate').contents().find('.goog-te-menu2-item-selected .text').html('ENG <i class="fa fa-chevron-down"></i>');    
					}, 100);
				});
			}
		});

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
	}); // Ready

})(jQuery);
