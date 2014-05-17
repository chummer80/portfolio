function carousel3d (elementArray) {
	console.assert($.type(elementArray) === 'array', 'carousel3d(elementArray): elementArray must be an array. Value: ' + elementArray.toString());
	console.assert(elementArray.length > 1, 'carousel3d(elementArray): elementArray must have at least 2 elements. Value: ' + elementArray.length);
	
	/*************************
	* Private Member Functions
	**************************/ 
	
	var calcRadius = function() {
		return ( width / 2 ) / Math.tan( Math.PI / elementArray.length );
	};
	
	// update the carousel's rotation based on the current theta value
	var spinCarousel = function() {
		// offset the carousel on the Z axis to account for the depth of the panels
		var translateFn = 'translateZ(-' + radius + widthUnits + ')';
		var rotateFn = 'rotateY(' + theta.toString() + 'deg)';
		var tiltFn = 'rotateX(' + tilt.toString() + 'deg)';
		carouselObj.css({
			'-webkit-transform': translateFn + ' ' + tiltFn + ' ' + rotateFn,
			'-moz-transform': translateFn + ' ' + tiltFn + ' ' + rotateFn,
			'-o-transform': translateFn + ' ' + tiltFn + ' ' + rotateFn,
            transform: translateFn + ' ' + tiltFn + ' ' + rotateFn,
		});
	};
	
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
	// trigonometry is used to calculate how far from the center each panel has to be
	// in order to prevent them from colliding with each other.
	var radius = calcRadius();
	// the theta value tracks the current rotation of the carousel
	var theta = 0; 
	

	/*************************
	* Public Member Functions
	**************************/ 
	
	this.initialize = function() {
		// set CSS attributes for the container
		containerObj.css({
			'-webkit-perspective': '2000px',
			perspective: '2000px',
			width: width.toString() + widthUnits,
			height: height.toString() + heightUnits,
			'margin-left': 'auto',
			'margin-right': 'auto'
		});
		containerObj.addClass('carousel_container');
		
		carouselObj.css({
			// carousel will be the exact same size as the container
			width: '100%',
			height: '100%',
			'margin-left': 'auto',
			'margin-right': 'auto',
			// use 'preserve-3d' to make the panels all use the same 3d space context
			'-webkit-transform-style': 'preserve-3d',
			'-moz-transform-style': 'preserve-3d',
			'-o-transform-style': 'preserve-3d',
			'transform-style': 'preserve-3d',
			// use a 1 second transition when carousel is spun
			// '-webkit-transition': '-webkit-transform 1s',
			// '-moz-transition': '-moz-transform 1s',
			// '-o-transition': '-o-transform 1s',
            // transition: 'transform 1s'
		});
		carouselObj.addClass('carousel');
		
		spinCarousel();
		
		// create panels that will make up the carousel in a circular pattern
		var numElements = elementArray.length;
		translateFn = 'translateZ(' + radius + widthUnits + ')';
		var rotateFn = '';
		var newPanel = null;
		
		for (var i = 0; i < numElements; i++) {
			newPanel = $('<figure>');
			rotateFn = 'rotateY(' + (360/numElements * i).toString() + 'deg)';
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
			
			
			// add panel to the jquery collection for future reference
			carouselPanels.add(newPanel);
			
			// append the new panel object to the carousel object
			newPanel.appendTo(carouselObj);
		}
		
		carouselObj.appendTo(containerObj);
	};
	
	this.getJqueryObj = function () {
		return containerObj;
	};
	
	this.spinNext = function() {
		theta += ( 360 / elementArray.length );
		spinCarousel();
	};
	
	this.spinPrev = function() {
		theta -= ( 360 / elementArray.length );
		spinCarousel();
	};
	
	this.spinTo = function(panelNum) {
		theta = ( 360 / elementArray.length ) * (panelNum - 1) * -1;
		spinCarousel();
	};
	
	this.setWidth = function(desiredWidth, units) {
		width = desiredWidth;
		widthUnits = units;
		radius = calcRadius();
		spinCarousel();
	};
	
	this.setHeight = function(desiredHeight, units) {
		height = desiredHeight;
		heightUnits = units;
	};
	
	this.setTilt = function(tiltDegrees) {
		tilt = tiltDegrees;
	}
}