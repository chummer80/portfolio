$(document).ready(function() {
	
	var DEBUG = true;
	
	
	/******************
	* Utility Functions
	*******************/ 
	
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
			name: "Hot || Cold",
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

	
	/**************************
	* DOM Object Event Handlers
	***************************/ 
	
	$('#button_prev').click(function() {
		carousel.spinPrev();	
	});
	$('#button_next').click(function() {
		carousel.spinNext();	
	});
	
	/******************
	* TEST CODE
	*******************/ 
	
	
	var carousel = new Carousel3d(projectInfoArray.length);
	carousel.setTilt(-8);
	carousel.setWidth(37, 'rem');
	carousel.setHeight(22, 'rem');
	carousel.setPanelWidthPercent(80);
	
	// build the carousel container and panels
	carousel.initialize();
	
	// Display the info for each project on a different panel
	for (var i = 0; i < projectInfoArray.length; i++) {
		var panelObj = carousel.getPanelObj(i + 1);
		panelObj.css({
			'background-image': 'url("' + projectInfoArray[i].image + '")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'-webkit-background-size': 'contain',
			'-moz-background-size': 'contain',
			'-o-background-size': 'contain',
			'background-size': 'contain',
		});
	}
	
	// make carousel visible by inserting it into the DOM.
	// Place it after the title, with 1 spacer div in between.
	carousel.getJqueryObj().insertAfter($('#title_div + div.flex_spacer'));
	
	carousel.setAnimCompleteCB(function() {
		debug("Front panel is: " + carousel.getFrontPanelNum());
	});
	
	window.setInterval(carousel.spinNext, 1000);
});