$(document).ready(function() {
    "use strict";

    /******************
     * CONSTANTS
     *******************/
    var DEBUG = true;

    var COLORS = {
        WHITE: {
            r: 255,
            g: 255,
            b: 255
        },
        GOLD: {
            r: 255,
            g: 215,
            b: 0
        },
        RED: {
            r: 200,
            g: 0,
            b: 0
        },
        SILVER: {
            r: 192,
            g: 192,
            b: 192
        }
    };

    /******************
     * VARS
     *******************/

    var arrowData = {
        left: {},
        right: {}
    };


    /******************
     * Project Info
     *******************/

    var projectInfoArray = [{
        name: "ZIP Zap",
        description: "Learn about any ZIP code in the United States using ZIP Zap! " + "The city, state, time zone, weather and map of that ZIP code are just a click away. " + "Even a 3D view of the area can be seen with the help of the Google Earth plugin. " + "The APIs used to get this content were Weather Underground's web API and the Google " + "Maps / Google Earth JavaScript APIs. (JavaScript, jQuery, AJAX)",
        image: 'images/zipzap_thumb.png',
        link: 'http://chummer80.github.io/zipzap/'
    }, {
        name: "Listomania",
        description: "This handy app can be used as a to-do list, a shopping list, or any other " + "type of list you can imagine. Items can be crossed off, removed from the list, or " + "sorted alphabetically. Want to save the list? Don't worry, the contents of the list " + "persist between page visits. (JavaScript, jQuery, HTML5)",
        image: 'images/listomania_thumb.png',
        link: 'http://chummer80.github.io/shopping-list/'
    }, {
        name: "Baxter's Resume",
        description: "Looking for a new best friend? Look no further! " + "Baxter the corgi pup is ready to fulfill all doggy duties. " + "For more information on his qualifications, check out his resume. " + "(HTML, CSS)",
        image: 'images/resume_thumb.jpg',
        link: 'http://chummer80.github.io/html-resume/css_resume.html'
    }, {
        name: "WaxTracks Home Page",
        description: "WaxTracks is a fictional record store specializing in vintage vinyl. " + "This eye-catching home page provides information about the business as well " + "as a gateway to the online store. (HTML, CSS)",
        image: 'images/waxtracks_thumb.png',
        link: 'http://chummer80.github.io/business-landing-page/'
    }, {
        name: "Street Fighter",
        description: "Get ready to rumble! This interactive web page lets you control Ryu. " + "This is an example of a dynamic event-driven web app. (JavaScript, jQuery)",
        image: 'images/streetfighter_thumb.png',
        link: 'http://chummer80.github.io/jquery-streetfighter/'
    }, {
        name: "Hot or Cold",
        description: "Do you want to play a game? How quickly can you guess the secret number? " + "Don't worry, you'll get some hints along the way. (JavaScript)",
        image: 'images/hotcold_thumb.png',
        link: 'http://chummer80.github.io/hot-or-cold/'
    }, {
        name: "Stack Overflow Reputation Builder",
        description: "This app sends requests to Stack Overlow's web API and then " + "fills the page with the results. There are two possible search types, both using a " + "keyword as a filter: 1) Most recent questions and 2) Highest-scoring answerers. " + "(jQuery, AJAX)",
        image: 'images/stackoverflow_thumb.png',
        link: 'http://chummer80.github.io/stackerAJAX/'
    }, {
        name: "NBA Quiz",
        description: "Think you know a lot about NBA basketball? Test your skills by answering " + "these trivia questions. (JavaScript, jQuery, HTML5)",
        image: 'images/nbaquiz_thumb.png',
        link: 'http://chummer80.github.io/quiz-app/'
    }, ];



    /******************
     * Utility Functions
     *******************/

    var debug = function debug(message) {
        if (DEBUG) {
            console.log(message);
        }
    };

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
        // var $frontPanelObj = carousel.getFrontPanelObj();
        // $frontPanelObj.find('a').show();

        // set up the project info dialog now so it will be ready to show later.
        setupProjectDialog(projectInfoArray[projectIndex]);

        // change arrow colors back to original state
        // for (var side in arrowData) {
        // var arrowColor = COLORS.WHITE;
        // if (arrowData[side].mouseHover) {
        // arrowColor = COLORS.GOLD;
        // }
        // changeCanvasColor(arrowData[side], arrowColor);
        // }
    };

    // Customize each panel with different project info
    var carouselPanelSetupCB = function(panelNum, panelObj) {
        panelObj.css({
            'background-image': 'url("' + projectInfoArray[panelNum - 1].image + '")',
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            '-webkit-background-size': 'contain',
            '-moz-background-size': 'contain',
            '-o-background-size': 'contain',
            'background-size': 'contain',
        });

        // create a link on the panel that will take the user to the project.
        var $projectLink = $('<a>').attr({
            href: projectInfoArray[panelNum - 1].link,
            target: '_blank'
        });

        // The purpose of this div is to make the link clicking area bigger.
        $('<div>').css({
            width: '100%',
            height: '100%'
        }).appendTo($projectLink);

        // Set up mouse events to make the front panel glow when hovered over.
        panelObj.mouseenter(carouselPanelToggleGlow);
        panelObj.mouseleave(carouselPanelToggleGlow);

        $projectLink.appendTo(panelObj);
        // the link is disabled by default
        $projectLink.hide();

        // Set up events so that clicking this panel opens a modal dialog
        panelObj.click(function() {
            if ($(this).is(carousel.getFrontPanelObj())) {
                showModalDialog(true);
            }
        });
    };

    var prepareForSpin = function() {
        setProjectName("");
        var $frontPanelObj = carousel.getFrontPanelObj();
        $frontPanelObj.find('a').hide();
    };

    var carouselPanelToggleGlow = function() {
        var $panelObj = $(this);
        if ($panelObj.is(carousel.getFrontPanelObj())) {
            // stop all animations on this panel so that a new
            // animation can begin immediately
            $panelObj.stop(true, true).toggleClass('glowing', 400);
        }
    };

    var setupProjectDialog = function(projectInfo) {
        var $dialogObj = $('#project_info_dialog');

        var $projectImage = $dialogObj.find('#dialog_project_pic');
        $projectImage.attr({
            src: projectInfo.image,
            alt: projectInfo.name + " image"
        });

        var $projectName = $dialogObj.find('#dialog_project_name');
        $projectName.text(projectInfo.name);

        var $projectDesc = $dialogObj.find('#dialog_project_description');
        $projectDesc.text(projectInfo.description);

        // Store the URL of the project on this button for later use. When
        // the user clicks the button, that URL will open in a new window.
        var $projectButton = $dialogObj.find('#dialog_open_project_button');
        $projectButton.data('projectlink', projectInfo.link);
    };

    var showModalDialog = function(show) {
        if (show) {
            $('#project_info_dialog').fadeIn();
            $('#dim_page_layer').fadeIn();
        } else if (!show) {
            $('#project_info_dialog').fadeOut();
            $('#dim_page_layer').fadeOut();
        }
    };

    var changeCanvasColor = function(arrowData, color) {
        var currentPixels = arrowData.context.getImageData(0, 0, arrowData.canvas.width, arrowData.canvas.height);

        // loop through all the pixels and change the color of each one
        for (var i = 0, l = currentPixels.data.length; i < l; i += 4) {
            // first check if this pixel's alpha is transparent or not. 
            // ignore it if it's transparent
            if (currentPixels.data[i + 3] > 0) {
                // original pixels were white. change pixel data in this structure.
                currentPixels.data[i] = arrowData.originalPixels.data[i] / 255 * color.r;
                currentPixels.data[i + 1] = arrowData.originalPixels.data[i + 1] / 255 * color.g;
                currentPixels.data[i + 2] = arrowData.originalPixels.data[i + 2] / 255 * color.b;
            }
        }
        // put new pixel data into the canvas.
        arrowData.context.putImageData(currentPixels, 0, 0);
    };

    var isMouseOverArrow = function(mouseX, mouseY, side) {
        var pixel = arrowData[side].context.getImageData(mouseX, mouseY, 1, 1).data;

        // check alpha value. if alpha is more than zero, mouse is over the arrow.
        if (pixel[3] > 0) {
            return true;
        } else {
            return false;
        }
    };

    var updateHoverState = function(side) {
        var arrowColor = COLORS.WHITE;
        if (arrowData[side].mouseHover) {
            arrowColor = COLORS.GOLD;
        }
        changeCanvasColor(arrowData[side], arrowColor);
    };

    /**************************
     * DOM Object Event Handlers
     ***************************/


    $('.arrow_button')
        .mousemove(function(eventData) {
            var side = $(this).data('side');
            var offset = $(this).offset();
            // get the mouse position within the canvas element
            var mouseX = eventData.pageX - offset.left;
            var mouseY = eventData.pageY - offset.top;
            var oldHoverState = arrowData[side].mouseHover;
            arrowData[side].mouseHover = isMouseOverArrow(mouseX, mouseY, side) ? true : false;
            if (oldHoverState !== arrowData[side].mouseHover) {
                debug("mousemove: " + side + " hover state changed: " + arrowData[side].mouseHover);
                arrowData[side].mouseDown = false;
                updateHoverState(side);
            }
        })
    // When moving mouse off the canvas quickly, mousemove sometimes doesn't fire.
    // That's why the mouseleave event handler is needed.
    .mouseleave(function() {
        var side = $(this).data('side');
        var oldHoverState = arrowData[side].mouseHover;
        arrowData[side].mouseHover = false;
        if (oldHoverState === true) {
            debug("mouseleave: " + side + " hover state changed: " + arrowData[side].mouseHover);
            arrowData[side].mouseDown = false;
            updateHoverState(side);
        }
    })
        .mousedown(function() {
            var side = $(this).data('side');
            // only register click if hovering over the arrow image
            if (arrowData[side].mouseHover) {
                arrowData[side].mouseDown = true;
                changeCanvasColor(arrowData[side], COLORS.SILVER);
            }
        })
        .mouseup(function() {
            var side = $(this).data('side');
            // Only handle the case where the mouse down and up events both happened
            // while hovering over the arrow. Other cases are handled by mousemove
            if (arrowData[side].mouseHover && arrowData[side].mouseDown) {
                arrowData[side].mouseDown = false;
                changeCanvasColor(arrowData[side], COLORS.GOLD);
                prepareForSpin();
                if (side === 'left') {
                    carousel.spinNext();
                } else {
                    carousel.spinPrev();
                }
            }
        });

    $('#dialog_back_button').click(function() {
        // close dialog, remove dimming layer
        showModalDialog(false);
    });

    $('#dialog_open_project_button').click(function() {
        var projectURL = $(this).data('projectlink');
        window.open(projectURL);
    });

    /******************
     * START
     *******************/

    // Create and initialize the carousel
    var carousel = new Carousel3d(projectInfoArray.length);
    carousel.setTilt(-8);
    carousel.setWidth(33, 'rem');
    carousel.setHeight(22, 'rem');
    carousel.setPanelWidthPercent(80);
    carousel.setAnimCompleteCB(carouselAnimCompleteCB);

    // build the carousel container and panels
    carousel.initialize(carouselPanelSetupCB);

    // make carousel visible by inserting it into the DOM.
    // Place it after the title, with 1 spacer div in between.
    carousel.getJqueryObj().insertAfter($('#title_div + div.flex_spacer'));

    // wait for images to laod before building arrow buttons
    $(window).load(function() {
        // put arrow button images on the canvases
        var controlDivHeight = $('#carousel_controls').innerHeight();
        for (var side in arrowData) {
            var img = $('#arrow_button_' + side + '_image').get(0);

            // scale canvas and image to fit height of the controls container
            var scale = controlDivHeight / img.height;
            arrowData[side].canvas = $('#arrow_button_' + side).get(0);
            arrowData[side].canvas.width = img.width * scale;
            arrowData[side].canvas.height = img.height * scale;
            arrowData[side].context = arrowData[side].canvas.getContext('2d');

            // draw image on canvas
            arrowData[side].context.drawImage(img, 0, 0, arrowData[side].canvas.width, arrowData[side].canvas.height);

            // store original pixel data so color can be changed later
            arrowData[side].originalPixels = arrowData[side].context.getImageData(0, 0, arrowData[side].canvas.width, arrowData[side].canvas.height);
        }
    });
});