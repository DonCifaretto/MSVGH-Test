// JavaScript Document


	$(window).on('load', function() {
	
		"use strict";
						
		/*----------------------------------------------------*/
		/*	Preloader
		/*----------------------------------------------------*/
		
		var preloader = $('#loader-wrapper'),
			loader = preloader.find('.loader-inner');
			loader.fadeOut();
			preloader.delay(400).fadeOut('slow');
				
		$(window).stellar({});
		
	});


	$(document).ready(function() {
			
		"use strict";


		/*----------------------------------------------------*/
		/*	Animated Scroll To Anchor
		/*----------------------------------------------------*/
		
		$('.header a[href^="#"], .page a.btn[href^="#"], .page a.internal-link[href^="#"]').on('click', function (e) {
			
			e.preventDefault();

			var target = this.hash,
				$target = jQuery(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top - 60 // - 200px (nav-height)
			}, 'slow', 'easeInSine', function () {
				window.location.hash = '1' + target;
			});
			
		});


		/*----------------------------------------------------*/
		/*	Hero Slider
		/*----------------------------------------------------*/

		$('.slider').slider({
			full_width: false,
			interval:5000,
			transition:700,
			draggable: false,
		});
		
		
		/*----------------------------------------------------*/
		/*	ScrollUp
		/*----------------------------------------------------*/
		
		$.scrollUp = function (options) {

			// Defaults
			var defaults = {
				scrollName: 'scrollUp', // Element ID
				topDistance: 600, // Distance from top before showing element (px)
				topSpeed: 800, // Speed back to top (ms)
				animation: 'fade', // Fade, slide, none
				animationInSpeed: 200, // Animation in speed (ms)
				animationOutSpeed: 200, // Animation out speed (ms)
				scrollText: '', // Text for element
				scrollImg: false, // Set true to use image
				activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
			};

			var o = $.extend({}, defaults, options),
				scrollId = '#' + o.scrollName;

			// Create element
			$('<a/>', {
				id: o.scrollName,
				href: '#top',
				title: o.scrollText
			}).appendTo('body');
			
			// If not using an image display text
			if (!o.scrollImg) {
				$(scrollId).text(o.scrollText);
			}

			// Minium CSS to make the magic happen
			$(scrollId).css({'display':'none','position': 'fixed','z-index': '2147483647'});

			// Active point overlay
			if (o.activeOverlay) {
				$("body").append("<div id='"+ o.scrollName +"-active'></div>");
				$(scrollId+"-active").css({ 'position': 'absolute', 'top': o.topDistance+'px', 'width': '100%', 'border-top': '1px dotted '+o.activeOverlay, 'z-index': '2147483647' });
			}

			// Scroll function
			$(window).on('scroll', function(){	
				switch (o.animation) {
					case "fade":
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).fadeIn(o.animationInSpeed) : $(scrollId).fadeOut(o.animationOutSpeed) );
						break;
					case "slide":
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).slideDown(o.animationInSpeed) : $(scrollId).slideUp(o.animationOutSpeed) );
						break;
					default:
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).show(0) : $(scrollId).hide(0) );
				}
			});

			// To the top
			$(scrollId).on('click', function(event){
				$('html, body').animate({scrollTop:0}, o.topSpeed);
				event.preventDefault();
			});

		};
		
		$.scrollUp();


		/*----------------------------------------------------*/
		/*	Services Rotator
		/*----------------------------------------------------*/
	
		var owl = $('.services-holder');
			owl.owlCarousel({
				items: 4,
				loop:true,
				autoplay:true,
				navBy: 1,
				autoplayTimeout: 4500,
				autoplayHoverPause: false,
				smartSpeed: 1500,
				responsive:{
					0:{
						items:1
					},
					767:{
						items:1
					},
					768:{
						items:2
					},
					991:{
						items:3
					},
					1000:{
						items:4
					}
				}
		});


		/*----------------------------------------------------*/
		/*	Portfolio Grid
		/*----------------------------------------------------*/

		$('.grid-loaded').imagesLoaded(function () {

	        // filter items on button click
	        $('.gallery-filter').on('click', 'button', function () {
	            var filterValue = $(this).attr('data-filter');
	            $grid.isotope({
	              filter: filterValue
	            });
	        });

	        // change is-checked class on buttons
	        $('.gallery-filter button').on('click', function () {
	            $('.gallery-filter button').removeClass('is-checked');
	            $(this).addClass('is-checked');
	            var selector = $(this).attr('data-filter');
	            $grid.isotope({
	              filter: selector
	            });
	            return false;
	        });

	        // init Isotope
	        var $grid = $('.masonry-wrap').isotope({
	            itemSelector: '.gallery-item',
	            percentPosition: true,
	            transitionDuration: '0.7s',
	            masonry: {
	              // use outer width of grid-sizer for columnWidth
	              columnWidth: '.gallery-item',
	            }
	        });
	        
	    });


		/*----------------------------------------------------*/
		/*	Single Image Lightbox
		/*----------------------------------------------------*/
				
		$('.image-link').magnificPopup({
		  type: 'image'
		});	


		/*----------------------------------------------------*/
		/*	Video Link #1 Lightbox
		/*----------------------------------------------------*/
		
		$('.video-popup1').magnificPopup({
		    type: 'iframe',		  	  
				iframe: {
					patterns: {
						youtube: {			   
							index: 'youtube.com',
							src: 'https://www.youtube.com/embed/SZEflIVnhH8'				
								}
							}
						}		  		  
		});


		/*----------------------------------------------------*/
		/*	Video Link #2 Lightbox
		/*----------------------------------------------------*/
		
		$('.video-popup2').magnificPopup({
		    type: 'iframe',		  	  
				iframe: {
					patterns: {
						youtube: {			   
							index: 'youtube.com',
							src: 'https://www.youtube.com/embed/7e90gBu4pas'				
								}
							}
						}		  		  
		});


		/*----------------------------------------------------*/
		/*	Statistic Counter
		/*----------------------------------------------------*/
	
		$('.count-element').each(function () {
			$(this).appear(function() {
				$(this).prop('Counter',0).animate({
					Counter: $(this).text()
				}, {
					duration: 4000,
					easing: 'swing',
					step: function (now) {
						$(this).text(Math.ceil(now));
					}
				});
			},{accX: 0, accY: 0});
		});


		/*----------------------------------------------------*/
		/*	Testimonials Rotator
		/*----------------------------------------------------*/
	
		var owl = $('.reviews-holder');
			owl.owlCarousel({
				items: 3,
				loop:true,
				autoplay:true,
				navBy: 1,
				autoplayTimeout: 4500,
				autoplayHoverPause: false,
				smartSpeed: 1500,
				responsive:{
					0:{
						items:1
					},
					767:{
						items:1
					},
					768:{
						items:2
					},
					991:{
						items:3
					},
					1000:{
						items:3
					}
				}
		});


		$('#datetimepicker').datetimepicker();


		/*----------------------------------------------------*/
		/*	Appointment Form Validation
		/*----------------------------------------------------*/

		$(".appointment-form").validate({
			rules: {
				select: "required",
				name: "required",
				email: {
					required: true,
					email: true
				},
				phone:{
					required: true,
					digits: true,
				}
			},
			messages: {
				select: "This field is required",
				name: "Please enter your name",
				email: "We need your email address to contact you",
				phone: "Please enter a valid number",
			}
		});


		/*----------------------------------------------------*/
		/*	Hero Form Validation
		/*----------------------------------------------------*/

		$(".hero-form").validate({
			rules: {			
				name: "required",
				email: {
					required: true,
					email: true
				},
				phone:{
					required: true,
					digits: true,
				},
				date: "required",
				select: "required",
			},
			messages: {				
				name: "Please enter your name",
				email: "We need your email address to contact you",
				phone: "Please enter a valid number",
				date: "Please enter valid date",
				select: "This field is required",
			}
		});


		/*----------------------------------------------------*/
		/*	Contact Form Validation
		/*----------------------------------------------------*/
		
		$(".contact-form").validate({
			rules: {				
				name: "required",
				email: {
					required: true,
					email: true
				},
				phone:{
					required: true,
					digits: true,
				},
				select: "required",
				subject: "required",
				message: "required",
			},
			messages: {
				select: "This field is required",
				name: "Please enter your name",
				email: "Enter an email address",
				phone: "Please enter a valid number",
				subject: "Please enter a subject",
				message: "Please enter a message",
			}
		});


		/*----------------------------------------------------*/
		/*	Comment Form Validation
		/*----------------------------------------------------*/
		
		$(".comment-form").validate({
			rules: {				
				name: "required",
				email: {
					required: true,
					email: true
				},
				phone:{
					required: true,
					digits: true,
				},
				message: "required",
			},
			messages: {
				name: "Please enter your name",
				email: "We need your email address to contact you",
				message: "Please enter no more than (1) characters",
			}
		});


		/*----------------------------------------------------*/
		/*	Newsletter Subscribe Form
		/*----------------------------------------------------*/
	
		$('.newsletter-form').ajaxChimp({
        language: 'cm',
        url: 'http://dsathemes.us3.list-manage.com/subscribe/post?u=af1a6c0b23340d7b339c085b4&id=344a494a6e'
            //http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
		});

		$.ajaxChimp.translations.cm = {
			'submit': 'Submitting...',
			0: 'We have sent you a confirmation email',
			1: 'Please enter your email address',
			2: 'An email address must contain a single @',
			3: 'The domain portion of the email address is invalid (the portion after the @: )',
			4: 'The username portion of the email address is invalid (the portion before the @: )',
			5: 'This email address looks fake or invalid. Please enter a real email address'
		};	

/*=============================================
  MSVGH ORGANIZATIONAL CHART IMAGE VIEWER
=============================================*/

$(document).ready(function () {

    var $thumbnail = $('.msvgh-org-chart');
    var $viewer = $('#msvgh-image-viewer');
    var $container = $('.msvgh-image-container');
    var $image = $('#msvgh-full-image');

    var scale = 1;
    var minScale = 1;
    var maxScale = 5;

    var posX = 0;
    var posY = 0;

    var isDragging = false;
    var startX = 0;
    var startY = 0;


    /* OPEN IMAGE VIEWER */
    $thumbnail.on('click', function () {

        var imageSource = $(this).attr('src');

        $image.attr('src', imageSource);

        $viewer.css('display', 'block');
        $('body').addClass('msvgh-viewer-open');

        scale = 1;

        $image.off('load').on('load', function () {
            resetImage();
        });

        if ($image[0].complete) {
            resetImage();
        }
    });


    /* UPDATE IMAGE */
    function updateImage() {

        $image.css(
            'transform',
            'translate(' + posX + 'px, ' + posY + 'px) scale(' + scale + ')'
        );
    }


    /* RESET IMAGE */
    function resetImage() {

        var containerWidth = $container.width();
        var containerHeight = $container.height();

        var imageWidth = $image[0].naturalWidth;
        var imageHeight = $image[0].naturalHeight;

        var widthRatio = containerWidth / imageWidth;
        var heightRatio = containerHeight / imageHeight;

        scale = Math.min(widthRatio, heightRatio);
        scale = Math.min(scale, 1);

        posX = (containerWidth - imageWidth * scale) / 2;
        posY = (containerHeight - imageHeight * scale) / 2;

        updateImage();
    }


    /* ZOOM WITH MOUSE WHEEL */
    $container.on('wheel', function (e) {

        e.preventDefault();

        var rect = $container[0].getBoundingClientRect();

        var mouseX = e.originalEvent.clientX - rect.left;
        var mouseY = e.originalEvent.clientY - rect.top;

        var oldScale = scale;

        if (e.originalEvent.deltaY < 0) {
            scale *= 1.15;
        } else {
            scale /= 1.15;
        }

        scale = Math.max(minScale, Math.min(maxScale, scale));

        /*
         * Keep the point underneath the cursor
         * in the same location while zooming.
         */
        posX = mouseX - (mouseX - posX) * (scale / oldScale);
        posY = mouseY - (mouseY - posY) * (scale / oldScale);

        updateImage();
    });


    /* START DRAGGING */
    $container.on('mousedown', function (e) {

        if (e.button !== 0) {
            return;
        }

        isDragging = true;

        startX = e.clientX - posX;
        startY = e.clientY - posY;

        $container.addClass('dragging');

        e.preventDefault();
    });


    /* MOVE IMAGE */
    $(document).on('mousemove', function (e) {

        if (!isDragging) {
            return;
        }

        posX = e.clientX - startX;
        posY = e.clientY - startY;

        updateImage();
    });


    /* STOP DRAGGING */
    $(document).on('mouseup', function () {

        if (!isDragging) {
            return;
        }

        isDragging = false;

        $container.removeClass('dragging');
    });


    /* RESET BUTTON */
    $('.msvgh-viewer-reset').on('click', function () {
        resetImage();
    });


    /* CLOSE BUTTON */
    $('.msvgh-viewer-close').on('click', function () {
        closeViewer();
    });


    /* CLICK BACKGROUND TO CLOSE */
    $viewer.on('click', function (e) {

        if (e.target === $viewer[0]) {
            closeViewer();
        }
    });


    /* ESC KEY */
    $(document).on('keydown', function (e) {

        if (e.key === 'Escape' && $viewer.is(':visible')) {
            closeViewer();
        }
    });


    /* CLOSE VIEWER */
    function closeViewer() {

        $viewer.css('display', 'none');

        $('body').removeClass('msvgh-viewer-open');

        $image.attr('src', '');

        isDragging = false;
    }

});

/*=============================================
  EMERGENCY CONTACT HEADER
=============================================*/

$(document).ready(function () {

    $('.headertopright').html(
        '<span class="emergency-contact">For emergencies, contact <strong>SMS/Viber: 09956398130 • Landline: 9480315</strong></span>'
    );

});

	});