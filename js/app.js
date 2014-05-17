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
	
	var projectInfo = [
		{
			name: "Baxter's Resume",
			description: "Looking for a new best friend? Look no further! "
				+ "Baxter the corgi pup is ready to fulfill all doggy duties. "
				+ "For more information on his qualifications, check out his CSS styled resume.",
			image: '',
			link: 'http://chummer80.github.io/html-resume/css_resume.html'		
		},
		{
			name: "WaxTracks Home Page",
			description: "WaxTracks is a fictional record store specializing in vintage vinyl. "
				+ "Created with HTML and CSS, this eye-catching home page provides information about "
				+ "the business as well as a gateway to the online store.",
			image: '',
			link: 'http://chummer80.github.io/business-landing-page/'		
		},
		{
			name: "Street Fighter",
			description: "Get ready to rumble! This interactive web page lets you control Ryu. "
				+ "Built on JavaScript and jQuery, this is an example of a dynamic event-driven web app.",
			image: '',
			link: 'http://chummer80.github.io/jquery-streetfighter/'		
		},
		{
			name: "Hot || Cold",
			description: "Do you want to play a game? How quickly can you guess the secret number? "
				+ "Don't worry, you'll get some hints along the way. "
				+ "The game rules and logic are implemented using JavaScript.",
			image: '',
			link: 'http://chummer80.github.io/hot-or-cold/'		
		},
		{
			name: "Shopping List",
			description: "This handy app will keep a list of things you need to buy. "
				+ "Items can be crossed off, removed from the list, or sorted alphabetically. "
				+ "Want to save the list? No worries, the contents of the list will be remembered "
				+ "even if you leave the page and come back! This app uses JavaScript/jQuery as well as HTML5's local storage feature.",
			image: '',
			link: 'http://chummer80.github.io/shopping-list/'		
		},
		{
			name: "NBA Quiz",
			description: "Think you know a lot about NBA basketball? Test your skills by answering "
				+ "these trivia questions. Animations were done with CSS and jQueryUI.",
			image: '',
			link: 'http://chummer80.github.io/quiz-app/'
		},
		{
			name: "Stack Overflow Reputation Builder",
			description: "This app uses jQuery's AJAX methods to query Stack Overlow's API and then "
				+ "populate the page with the results. There are two possible search types, both using a "
				+ "keyword as a filter: 1) Most recent questions and 2) Highest-scoring answerer.",
			image: '',
			link: 'http://chummer80.github.io/stackerAJAX/'
		},
		{
			name: "ZIP Zap",
			description: "Learn about any ZIP code in the United States using ZIP Zap! "
				+ "The city, state, time zone, weather and map of that ZIP code are just a click away. "
				+ "Even a 3D view of the area can be seen with the help of the Google Earth plugin. "
				+ "jQuery was used to communicate with Weather Underground's RESTful web API. "
				+ "The Google Maps and Google Earth JavaScript APIs were used to insert maps into the DOM.",
			image: '',
			link: 'http://chummer80.github.io/zipzap/'
		},
	];

	
	/******************
	* TEST CODE
	*******************/ 
	
	
	var carousel = new carousel3d(projectInfo);
	carousel.setTilt(-8);
	carousel.setWidth(27, 'rem');
	carousel.setHeight(18, 'rem');
	carousel.initialize();
	carousel.getJqueryObj().appendTo($('body'));
	
	function spin() {
		carousel.spinNext();
	}
	
	window.setInterval(spin, 1000);
});