/******************************************************************************
Carousel3d class

A carousel3d object contains a div containing a 3D carousel that can be 
inserted anywhere into the DOM of a web page. jQuery is required. 

Constructor:
------------
Carousel3d(number numPanels)
	numPanels is the desired number of panels on the carousel. The minimum
	value is 2 (which will create a card-flip effect, rather than a circular 
	carousel).

Public Methods:
---------------
initialize(function panelSetupCB)
	returns: N/A
	Creates all DOM elements needed for the carousel, sets required CSS 
	properties,	and attaches them all together in the correct hierarchy. All
	settings (e.g. width, height) should be set before initialize() is called.
	panelSetupCB is an optional callback that will be executed once for each
	panel that is created. It will be called as panelSetupCB(panelNum, panelObj)
	where panelNum is 1-based panel number, and panelObj is a jQuery object
	containing just the panel that was just created.

setWidth(number desiredWidth, string units)
	returns: N/A
	Width value and units should be consistent with what is supported by CSS.
	This will determine the width of the front-most face of the carousel.
	Carousel radius is automatically calculated to ensure that the sides of 
	carousel will not overlap or collide. If width is not set, the default will
	be '20 rem'.

setHeight(number desiredHeight, string units)
	returns: N/A
	Height value and units should be consistent with what is supported by CSS.
	This will determine the height of the front-most face of the carousel.
	The height of each carousel panel will use this height value as well.
	If height is not set, the default will be '20 rem'.
	
setTilt(number tiltDegrees)
	returns: N/A
	Rotates the carousel around the X axis.  This allows panels in the back
	to be partially visible even though they are behind the front panels.
	If tilt is not set, the default will be 0 degrees.
	
setPanelWidthPercent(number desiredWidthPercent)
	returns: N/A
	Set the width of each panel, relative to the width of the carousel face on
	which it resides. For example, 100% will have the panel edges perfectly
	touching each other. 80% will leave spaces between the panels. 150% will 
	make the panels	appear to overlap. If panel width is not set, the default 
	will be 100%.

setAnimCompleteCB(function callbackFn)
	returns: N/A
	Allows a callback function to be defined. The callback will be executed
	after every time the carousel spin animation completes.
	
getFrontPanelNum()
	returns: number
	Panels are numbered starting at 1. The identifying number that indicates 
	which panel is currently is at the front of the carousel (i.e. closest to
	the viewport) will be returned. Immediately after the panels are initially
	created (via the initialize() method), the panel number 1 is in front.
	
getJqueryObj()
	returns: jQuery
	This returns the jQuery object that has the carousel container. This
	container can be inserted into the DOM to make the carousel visible.
	
getPanelObj(number panelNum)
	returns: jQuery
	Panel numbers start at 1 in the order that they were created. The requested
	panel DOM element is returned in the form of a jQuery object.
	
getFrontPanelObj()
	returns: jQuery
	This is equivalent to getPanelObj(getFrontPanelNum()). A jQuery obj that
	contains the carousel's front-most panel will be returned.
	
spinNext()
	returns: N/A
	Spins all carousel panels to the left by one panel length. The animation
	takes 1 second to complete. After completion, the callback defined by 
	setAnimCompleteCB() will execute. 
	
spinPrev()
	returns: N/A
	Spins all carousel panels to the right by one panel length. The animation
	takes 1 second to complete. After completion, the callback defined by 
	setAnimCompleteCB() will execute.

*******************************************************************************/


function Carousel3d (numPanels) {
	console.assert(numPanels > 1, 
		"carousel3d(numPanels): carousel must have at least 2 elements. Value: " + numPanels);
	
	/*************************
	* Private Member Variables
	**************************/ 
	
	// This container is just provides a 3D space for the carousel to exist
	var containerObj = $('<div>');
	// an object that contains the carousel panels
	var carouselObj = $('<div>');
	// a jQuery collection of the <figure> elements that make up the carousel
	var carouselPanels = $();
	
	var width = 20;
	var widthUnits = 'rem';
	var height = 20;
	var heightUnits = 'rem';
	var tilt = 0;
	var panelWidthPercent = 100;
	// trigonometry is used to calculate how far from the center each panel has to be
	// in order to prevent them from colliding with each other.
	var radius = calcRadius();
	// the theta value tracks the current rotation of the carousel
	var theta = 0; 
	// keep track of which panel is in front
	var frontPanelNum = 1;
	var animCompleteCB = null;
	var animCount = 0;
	
	/****************
	* Private Methods
	*****************/ 
	
	function calcRadius() {
		return ( width / 2 ) / Math.tan( Math.PI / numPanels );
	};
	
	// update the carousel's rotation to the current theta value
	function spinCarousel() {
		// offset the carousel on the Z axis to account for the depth of the panels
		var translateFn = 'translateZ(-' + radius + widthUnits + ')';
		var tiltFn = 'rotateX(' + tilt + 'deg)';

		// Instead of using CSS transitions, use jQuery's animate() method with a
		// step function to animate the carousel rotation.
		animCount++;
		carouselObj.animate({theta: theta}, {
			step: function(now, fx) {
				var transformFn = translateFn + ' ' + tiltFn + ' ' + 'rotateY(' + now + 'deg)';
				$(this).css({
					'-webkit-transform': transformFn,
					'-moz-transform': transformFn,
					'-o-transform': transformFn,
					transform: transformFn,
				});
			},
			complete: function() {
				animCount--;
				if (animCount === 0) {
					animCompleteCB();
				}
			}
		}, 1000);
	};


	/***************
	* Public Methods
	****************/ 
	
	this.initialize = function(panelSetupCB) {
		// set CSS attributes for the container
		containerObj.css({
			'-webkit-perspective': '2000px',
			perspective: '2000px',
			width: width + widthUnits,
			height: height + heightUnits,
			'margin-left': 'auto',
			'margin-right': 'auto'
		});
		containerObj.addClass('carousel_container');
		
		carouselObj.css({
			// carousel width is what dictates the width of the panel. 
			// A value less than 100% creates spaces between the panels.
			width: panelWidthPercent + '%',
			// carousel will be the exact same height as the container
			height: '100%',
			'margin-left': 'auto',
			'margin-right': 'auto',
			// use 'preserve-3d' to make the panels all use the same 3d space context
			'-webkit-transform-style': 'preserve-3d',
			'-moz-transform-style': 'preserve-3d',
			'-o-transform-style': 'preserve-3d',
			'transform-style': 'preserve-3d',
			// set a theta css property to be used for animation in spinCarousel()
			theta: theta
		});
		carouselObj.addClass('carousel');
		
		spinCarousel();
		
		// create panels that will make up the carousel in a circular pattern
		var numElements = numPanels;
		translateFn = 'translateZ(' + radius + widthUnits + ')';
		var rotateFn = '';
		var newPanel = null;
		
		for (var i = 0; i < numElements; i++) {
			newPanel = $('<figure>');
			rotateFn = 'rotateY(' + (360/numElements * i) + 'deg)';
			newPanel.css({
				position: 'absolute',
				width: '100%',
				height: '100%',
				
				// put panels 1 radius length away from the center of the carousel,
				// at rotation values that will space the panels evenly apart in a circular pattern
				'-webkit-transform': rotateFn + ' ' + translateFn,
				'-moz-transform': rotateFn + ' ' + translateFn,
				'-o-transform': rotateFn + ' ' + translateFn,
				transform: rotateFn + ' ' + translateFn,
			});
			newPanel.addClass('carousel_panel');
			
			// check if a valid callback was provided. If it was, execute the setup
			// callback to customize the panel.
			if ($.type(panelSetupCB) === 'function') {
				panelSetupCB(i + 1, newPanel);
			}
			
			// append the new panel object to the carousel object
			newPanel.appendTo(carouselObj);
		}
		
		carouselPanels = carouselObj.children();
		
		carouselObj.appendTo(containerObj);
	};
	
	this.setWidth = function(desiredWidth, units) {
		width = desiredWidth;
		widthUnits = units;
		radius = calcRadius();
		
		// update the carousel display with the new width and radius
		spinCarousel();
	};
	
	this.setHeight = function(desiredHeight, units) {
		height = desiredHeight;
		heightUnits = units;
	};
	
	this.setTilt = function(tiltDegrees) {
		tilt = tiltDegrees;
	}
	
	this.setPanelWidthPercent = function(desiredWidthPercent) {
		// carousel width is what dictates the width of the panel. 
		// A value less than 100% creates spaces between the panels.
		panelWidthPercent = desiredWidthPercent;
		carouselObj.css('width', panelWidthPercent + '%');
	}
	
	this.setAnimCompleteCB = function(callbackFn) {
		animCompleteCB = callbackFn;
	}
	
	this.getFrontPanelNum = function() {
		return frontPanelNum;
	}
	
	this.getJqueryObj = function() {
		return containerObj;
	};
	
	this.getPanelObj = function(panelNum) {
		if (panelNum < 1) {
			panelNum = 1;
		}
		if (panelNum > numPanels) {
			panelNum = numPanels;
		}
		
		var panelIndex = panelNum - 1;
		
		return carouselPanels.eq(panelIndex);
	};
	
	this.getFrontPanelObj = function() {
		return this.getPanelObj(frontPanelNum);
	};
	
	this.spinNext = function() {
		theta -= ( 360 / numPanels );
		frontPanelNum = (frontPanelNum < numPanels) ? (frontPanelNum + 1) : 1;
		spinCarousel();
	};
	
	this.spinPrev = function() {
		theta += ( 360 / numPanels );
		frontPanelNum = (frontPanelNum > 1) ? (frontPanelNum - 1) : numPanels;
		spinCarousel();
	};
/* 	
	this.spinTo = function(panelNum) {
		theta = ( 360 / numPanels ) * (panelNum - 1) * -1;
		spinCarousel();
	}; */

}
