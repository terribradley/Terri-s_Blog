/* jQuery Keep Ratio */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

!(function (t) {
  "use strict";var n = t.jQuery,
      i = t.requestAnimationFrame,
      e = { ratio: 4 / 3, calculate: "height" },
      r = function r(t, n, e) {
    var r;if ("height" === n.calculate) {
      var a = t.width();r = function () {
        t.height(Math.round(a / n.ratio));
      };
    } else {
      var u = t.height();r = function () {
        t.width(Math.round(u * n.ratio));
      };
    }return e ? r() : i(r), t;
  },
      a = function a(t, i, e) {
    return t.each(function () {
      r(n(this), i, e);
    });
  };n.fn.keepRatio = function (i) {
    i = n.extend({}, e, i);var r = n(this);return n(t).on("resize", function () {
      a(r, i);
    }), a(r, i, !0);
  };
})(window);

},{}]},{},[1]);

/* IsMobile */
var isMobile = {
   iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },    
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/* I am a food blog custom code */

var $counter = 0;

function closeMenu() {
	$("#slide-menu-bg").remove();
	$("#slide-menu").animate({left: '-' + $("#slide-menu").css("width")}, 300);
}

function checkInput(target, event) {

	// Executes search if searchbar is not empty or labelled
	$input = $(target).parent().find("input");
	
	if ( $input.val() == "Search" || $input.val() == "" ) { 
		event.preventDefault();
		$input.val('').focus();
	}
}

function iamacarousel(id) {
	if (id) {
		$counterNext = id;
	} else {
		$counterNext = ($counter < ($("#hero .feature").length-1) ) ? $counter + 1 : 0;
	}
	$("#hero .feature").css("position","absolute").css("top","0");
	$(".cycle-pager span").removeClass("cycle-pager-active");
	
	$("#hero .feature").eq($counterNext).hide().css("z-index","10").fadeIn().css("position","relative");
	$(".cycle-pager span").eq($counterNext).addClass("cycle-pager-active");
	$("#hero .feature").eq($counter).fadeOut().css("z-index","0");
	$counter = $counterNext;
}

function removeAds() {
	$("<iframe>").attr('src', '/top-cadillac.html').attr('scrolling', 'no').appendTo($( "#top-ad .ad-container" ));
	$("<iframe>").attr('src', '/bottom-cadillac.html').attr('scrolling', 'no').appendTo($( "#bottom-ad .ad-container" ));
	$(".ad-container").addClass("ad-loaded");
}

function roadblock() {
	$("#side-ad").remove();
}

function makeAds() {
	$("<iframe>").attr('src', '/top.html').attr('scrolling', 'no').appendTo($( "#top-ad .ad-container" ));
	$("<iframe>").attr('src', '/bottom.html').attr('scrolling', 'no').appendTo($( "#bottom-ad .ad-container" ));
	$(".ad-container").addClass("ad-loaded");
}

$(function() {

	// UI Bindings
	$("#back-to-top").on("click",function(){				$("html, body").animate({ scrollTop: 0 }, 500) });
	$("#menu .dropdown").on("mouseenter",function(){		$(".dropdown-menu").fadeIn(200) });
	$("#menu .dropdown").on("mouseleave",function(){ 		$(".dropdown-menu").hide() });
	
	// Search
	$(".search").on("click",function(){ 					$(this).val('') });
	$(".search-form").on("click","button", function(e){		checkInput($(this), e) });
	$("#search").on("click","button", function(e){			checkInput($(this), e) });
	$(".search").focusout(function(){ 						if ($(this).val() == ''){ $(this).val($(this).data('current')) } });
	$("#search-button").on("click",function(){				$("#header-search-form").fadeIn(150); $("#search input").focus(); });
	$("#close-search").on("click",function(){				$("#header-search-form").fadeOut(150); });
	
	
	// Thumbnails
	$(".thumbnails a").each(function(){
		$(this).addClass("single-thumbnail").css( "background-image", "url(" + $(this).attr("data-thumb") + ")" );
	});
	
	$(".random-feed a").each(function(){
		$("<div>").addClass("random-thumbnail").css( "background-image", "url(" + $(this).attr("data-thumb") + ")" ).prependTo($(this));
	});
	
	$(".popular-post a").each(function(){
		$("<div>").addClass("side-thumbnail").css( "background-image", "url(" + $(this).attr("data-thumb") + ")" ).prependTo($(this));
	});
	
	// Select Menu Item
	if ( $("#title").length > 0 ) { 
		$("#menu a[data-page='" + $("#title").data('page') + "']").addClass("active") 
	}
	
	$("body").on("mouseenter", ".expandable", function() {
		
		page = $(this).attr("data-page")
		
		$("<div>")
			.html( $("#" + page + "-menu").html() )
			.addClass("expanded-menu")
			.appendTo($(this))
		
	});
	
	$("body").on("mouseleave", ".expandable", function() {
		
		$(this).find(".expanded-menu").remove();
		
	});
	
	$('.hero-image').keepRatio({ ratio: 16 / 9, calculate: 'height' });
	$("#hero span a").each(function(){
		$(this).css("margin-top", "-" + ($(this).height()/2 + 20) + "px")
	});
	
	$( '#menu-toggle' ).on( 'touchstart click', function(e) { 			if ( !$('body').hasClass( 'menu-visible' ) ) toggle.menu(e) });
	$( '#page' ).on( 'touchstart click', function(e) { 					if ( $('body').hasClass( 'menu-visible' ) ) toggle.menu(e) });
	$( '.single #header' ).on( 'touchstart click', function(e) {		if ( $('body').hasClass( 'menu-visible' ) ) toggle.menu(e) });
	
	$('.home .thumbnail .image img').keepRatio({ ratio: 3 / 2, calculate: 'height' });
	$('.random-thumbnail').keepRatio({ ratio: 3 / 2, calculate: 'height' });

});

var toggle = {
	
	menu: function(e) {
		e.preventDefault();
		
		 var $body = $( 'body' ),
		     $page = $( '#page' ),
		     $menu = $( '#slide-menu' ),
		
		     /* Cross browser support for CSS "transition end" event */
		     transitionEnd = 'transitionend webkitTransitionEnd otransitionend MSTransitionEnd';
		
		 /* When the toggle menu link is clicked, animation starts */
		 $body.addClass( 'animating' );
		
		 /***
		  * Determine the direction of the animation and
		  * add the correct direction class depending
		  * on whether the menu was already visible.
		  */
		 if ( $body.hasClass( 'menu-visible' ) ) {
		  $body.addClass( 'right' );
		 } else {
		  $body.addClass( 'left' );
		 }
		 
		 /***
		  * When the animation (technically a CSS transition)
		  * has finished, remove all animating classes and
		  * either add or remove the "menu-visible" class 
		  * depending whether it was visible or not previously.
		  */
		 $page.on( transitionEnd, function() {
		  $body
		   .removeClass( 'animating left right' )
		   .toggleClass( 'menu-visible' );
		
		  $page.off( transitionEnd );
		 } );
	},
	
}

var format = {

	single: function() {
		format.page();
		format.video();
		format.images();
		format.recipes();
		format.sticker();
		format.headnotes();
	},

	page: function() {
		$("#header").insertBefore("#page");
		$("blockquote").each(function(i) {
			$("#recipe-sidebar").clone().removeAttr("id").addClass("recipe-sidebar").appendTo($(this));
			// make ad
//			var adId = "sidead" + i;
//			$(this).find(".ad").attr("id",adId);
//			if (typeof htmlAdWH != 'undefined' && $("#remove-ads").length < 1) htmlAdWH('93466702', 'RR', 'RR', 'fileless', adId);
		});
		$("#recipe-sidebar").remove();
	},
	
	video: function() {
		
		$(".wp-video").removeAttr("style");
		$("video").removeAttr("height width controls");
		$(".wp-video").css({"max-width":"100%"});
		$("video").css({"width":"100%"});
		
		(isMobile.any() == null) ? $("video").attr("autoplay",true) : $("video").attr("controls", true);
		
	},
	
	images: function() {
	
		$("p img").each(function() {
			if ( $(this).attr("width") == '2880') $(this).parent().addClass("retina-hero")
			if ( $(this).attr("width") == '1450') $(this).closest("p").addClass("retina-image");
			if ( $(this).attr("width") == '724' || $(this).attr("width") == '725') $(this).closest("p").addClass("regular-image");
			if ( $(this).attr("width") == '700') $(this).addClass("twoup");
			if ( $(this).attr("height") == '905') $(this).addClass("tall");
			if ( $(this).attr("height") == '725') $(this).addClass("square");
		});
		
		if ( $("#main-image img").attr("height") == '482') { $("#main-image").addClass("small") } else
		if ( $("#main-image img").attr("width") == '725') { $("#main-image").addClass("sm") } else
		if ( $("#main-image img").attr("width") == '960') { $("#main-image").addClass("medium") }//	 else
//		{ $("#main-image").addClass("square") }
		
		$("p").each(function() {
			if ($(this).find("img").length == 2 && $(this).find("a").length == 0) { $(this).addClass("twoup-container no-links") } else 	
			if ($(this).find("img").length == 2) { $(this).addClass("twoup-container") }	
		});
		
		$(".retina-image img").css({ width: "100%" }).keepRatio({ ratio: 3 / 2, calculate: 'height' });
		$(".regular-image img:not(.tall)").keepRatio({ ratio: 3 / 2, calculate: 'height' });
		
		$(".tall").keepRatio({ ratio: 4 / 5, calculate: 'height' });
		$("img.twoup").keepRatio({ ratio: 3 / 4, calculate: 'height' });
		
		$('.retina-hero img').keepRatio({ ratio: 3 / 2, calculate: 'height' });
		$('.square').keepRatio({ ratio: 1 / 1, calculate: 'height' });
		
		if ( !$("#main-image").hasClass("square") ) {
			$('#main-image').keepRatio({ ratio: 3 / 2, calculate: 'height' });
		}
	},
	
	recipes: function() {
	
		$(".main-photo").prependTo("blockquote");
	
		$tagger = $("<p>").addClass("recipe-tags").html("<h4>See More</h4>");
		
		$("#tags a").each(function(){
			
			$(this).appendTo($tagger);
			
		});
		
		$tagger.appendTo("blockquote");
		 
		$("blockquote").each(function(){
		
			$recipeID = "recipe-" + $(this).index();
			
			$(this).attr("id", $recipeID);
			
			$ingredients = $("<div>").addClass("ingredients-list").insertAfter("#" + $recipeID + " p:first");
		
			if ( $(this).find("ul").length > 1 ) {
			
				if ( $("#" + $recipeID + " ul:first").prev("h4") ) $("#" + $recipeID + " ul:first").prev("h4").appendTo($ingredients);
			
				$("#" + $recipeID + " ul:first").nextUntil("#" + $recipeID + " ul:last").andSelf().add("#" + $recipeID + " ul:last").appendTo($ingredients);
			
			} else {
			
				$("#" + $recipeID + "  ul").appendTo($ingredients);
			
			}
		
		});
		
		$("blockquote p:first-of-type").find("br").remove()
	},
	
	sticker: function() {
		$(".post-container h6").wrap("<div class='fadebar sticker'></div>");
	},
	
	headnotes: function() {
		$("#headnotes").prependTo(".recipe-body");
	}
	
}

var bindBehavior = {
	
	window: function() {
	
		( $(window).scrollTop() > 50 ) ? $("#header").addClass("sticky") : $("#header").removeClass("sticky") ;
	
	},
	
	pin: function() {
		$("body").on("click",".pinme",function() { PinUtils.pinAny(); });
	},
	
	jump: function() {
		$(".jump").on("click",function(){ $("html, body").animate({ scrollTop: ($("blockquote").offset().top - 100) }, 500) });
	}
	
}