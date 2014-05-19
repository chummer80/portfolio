$(document).ready(function() {
	
	/******************
	* Debug Helpers
	*******************/ 
	var DEBUG = true;

	var debug = function debug(message) {
		if (DEBUG) {
			console.log(message);
		}
	};
	
	/******************
	* Project Info
	*******************/ 
	
	var projectInfoArray = [
		{
			name: "Baxter's Resume",
			description: "Looking for a new best friend? Look no further! "
				+ "Baxter the corgi pup is ready to fulfill all doggy duties. "
				+ "For more information on his qualifications, check out his CSS styled resume.",
			image: 'images/resume_thumb.jpg',
			link: 'http://chummer80.github.io/html-resume/css_resume.html'		
		},
		{
			name: "WaxTracks Home Page",
			description: "WaxTracks is a fictional record store specializing in vintage vinyl. "
				+ "Created with HTML and CSS, this eye-catching home page provides information about "
				+ "the business as well as a gateway to the online store.",
			image: 'images/waxtracks_thumb.png',
			link: 'http://chummer80.github.io/business-landing-page/'		
		},
		{
			name: "Street Fighter",
			description: "Get ready to rumble! This interactive web page lets you control Ryu. "
				+ "Built on JavaScript and jQuery, this is an example of a dynamic event-driven web app.",
			image: 'images/streetfighter_thumb.png',
			link: 'http://chummer80.github.io/jquery-streetfighter/'		
		},
		{
			name: "Hot or Cold",
			description: "Do you want to play a game? How quickly can you guess the secret number? "
				+ "Don't worry, you'll get some hints along the way. "
				+ "The game rules and logic are implemented using JavaScript.",
			image: 'images/hotcold_thumb.png',
			link: 'http://chummer80.github.io/hot-or-cold/'		
		},
		{
			name: "Listomania",
			description: "This handy app can be used as a to-do list, a shopping list, or any other type of "
				+ "list you can imagine. Items can be crossed off, removed from the list, or sorted alphabetically. "
				+ "Want to save the list? No worries, the contents of the list will automatically be remembered "
				+ "even if you leave the page and come back! This app uses JavaScript/jQuery as well "
				+ "as HTML5's local storage feature.",
			image: 'images/listomania_thumb.png',
			link: 'http://chummer80.github.io/shopping-list/'		
		},
		{
			name: "NBA Quiz",
			description: "Think you know a lot about NBA basketball? Test your skills by answering "
				+ "these trivia questions. Animations were done with CSS and jQueryUI.",
			image: 'images/nbaquiz_thumb.png',
			link: 'http://chummer80.github.io/quiz-app/'
		},
		{
			name: "Stack Overflow Reputation Builder",
			description: "This app uses jQuery's AJAX methods to query Stack Overlow's API and then "
				+ "populate the page with the results. There are two possible search types, both using a "
				+ "keyword as a filter: 1) Most recent questions and 2) Highest-scoring answerer.",
			image: 'images/stackoverflow_thumb.png',
			link: 'http://chummer80.github.io/stackerAJAX/'
		},
		{
			name: "ZIP Zap",
			description: "Learn about any ZIP code in the United States using ZIP Zap! "
				+ "The city, state, time zone, weather and map of that ZIP code are just a click away. "
				+ "Even a 3D view of the area can be seen with the help of the Google Earth plugin. "
				+ "jQuery was used to communicate with Weather Underground's RESTful web API, and "
				+ "the Google Maps / Google Earth JavaScript APIs were used to insert maps into the DOM.",
			image: 'images/zipzap_thumb.png',
			link: 'http://chummer80.github.io/zipzap/'
		},
	];

	/******************
	* Utility Functions
	*******************/ 
	
	var setProjectName = function(name) {
		$('#project_name').text(name);
	};
	
	// Code to execute after every time the carousel stops animating
	var carouselAnimCompleteCB = function() {
		var frontPanelNum = carousel.getFrontPanelNum();
		debug("Front panel is: " + frontPanelNum);
		
		// display project name
		var projectIndex = frontPanelNum - 1;
		var projectName = projectInfoArray[projectIndex].name;
		setProjectName(projectName);
		
		// enable hyperlink for this panel only.
		var frontPanelObj = carousel.getFrontPanelObj();
		frontPanelObj.find('a').show();
	};
	
	// Customize each panel with different project info
	var carouselPanelSetupCB = function(panelNum, panelObj) {
		panelObj.css({
			'background-image': 'url("' + projectInfoArray[panelNum-1].image + '")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'-webkit-background-size': 'contain',
			'-moz-background-size': 'contain',
			'-o-background-size': 'contain',
			'background-size': 'contain',
		});
		
		// create a link on the panel that will take the user to the project.
		var projectLink = $('<a>').attr({
			href: projectInfoArray[panelNum-1].link,
			target: '_blank'
		});
			
		// The purpose of this div is to make the link clicking area bigger.
		$('<div>').css({
			width: '100%',
			height: '100%'
		}).appendTo(projectLink);
		
		// Set up mouse events to make the front panel glow when hovered over.
		panelObj.mouseenter(carouselPanelToggleGlow)
		panelObj.mouseleave(carouselPanelToggleGlow);
		
		projectLink.appendTo(panelObj);
		// the link is disabled by default
		projectLink.hide();
	};
	
	var prepareForSpin = function() {
		setProjectName("");
		var frontPanelObj = carousel.getFrontPanelObj();
		frontPanelObj.find('a').hide();
	};
	
	var carouselPanelToggleGlow = function() {
		if ($(this).is(carousel.getFrontPanelObj())) {
			// stop all animations on this panel so that a new
			// animation can begin immediately
			$(this).stop(true, true).toggleClass('glowing', 400);
		}
	};
	
	/**************************
	* DOM Object Event Handlers
	***************************/ 
	
	$('#arrow_button_left').click(function() {
		prepareForSpin();
		carousel.spinNext();
	});
	
	$('#arrow_button_right').click(function() {
		prepareForSpin();
		carousel.spinPrev();
	});
	

	
	/******************
	* START
	*******************/ 
	
	// Create and initialize the carousel
	var carousel = new Carousel3d(projectInfoArray.length);
	carousel.setTilt(-8);
	carousel.setWidth(37, 'rem');
	carousel.setHeight(22, 'rem');
	carousel.setPanelWidthPercent(80);
	
	// build the carousel container and panels
	carousel.initialize(carouselPanelSetupCB);
	
	// make carousel visible by inserting it into the DOM.
	// Place it after the title, with 1 spacer div in between.
	carousel.getJqueryObj().insertAfter($('#title_div + div.flex_spacer'));
	
	carousel.setAnimCompleteCB(carouselAnimCompleteCB);
	
	// window.setInterval(carousel.spinNext, 1000);
});