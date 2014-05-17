$(document).ready(function() {

	var carousel = new carousel3d([1,2,3,4,5,6,7,8,9], 25, 25, 'rem');
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