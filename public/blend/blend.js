const slidesJson = "/blend/slides.json";
let slidesArray = [];

const carouselItemElement = '<div class="carousel-item"></div>';

$.getJSON(slidesJson, function(jsonData) {
  let i = 0;
  $.each(jsonData, function (key, object) {
    slidesArray[i] = object;

    $("#carousel-color .carousel-inner").prepend(carouselItemElement).children().first()
    .css("background-color", slidesArray[i].rgba);

    $("#carousel-image .carousel-inner").append(carouselItemElement).children().last()
    .css("background-size", slidesArray[i].backgroundSize)
    .css("background-position", slidesArray[i].backgroundPosition)
    .css("background-image", "url(" + slidesArray[i].urlLink + ")")
    .css("opacity", slidesArray[i].opacity)
    // Trick webkit etc. to preload carousel images
    .addClass("active");

    i++;
  });
  // Set active slide and init active color slide
  $("#carousel-color .carousel-item").first().addClass("active");
});

function isEndCycle(slides) {
  // Returns true if the activeSlide is the last slide

  if (slides.activeSlide == slides.length - 1) {
    return true;
  } else {
    return false;
  }
}

function isAutoMode() {
  if ($("#auto-blend").hasClass("active")) {
    return true;
  } else {
    return false;
  }
}

function clearAllIntervals(slides) {
  // Make sure there are no interval timers
  $.each(slides.automodes, function (index, automode) {
    window.clearInterval(automode);
  });
  slides.automodes = [];
}

function setBlendMode() {
  // Customize when user clicks blend button

  $("#blend-toolbar").prop("hidden", false);
  $(".link").css({"color": "AliceBlue"});
  $("a.nav-link").css({"color": "AliceBlue"});
  $("body").css({"color": "AliceBlue"}).css({"opacity": "0.9"});
}

function showSlideText(toSlide) {
  // Show slide text after the image is blended

  let title = slidesArray[toSlide].title;
  let artist = slidesArray[toSlide].artist;
  let year = slidesArray[toSlide].year;
  let downloadLink = slidesArray[toSlide].downloadLink;

  $("#art-title").text(title);
  $("#art-artist").text(artist);
  $("#art-year").text(year);
  $("#art-download").attr('href', downloadLink);
}

function clearSlideText() {
  // Remove the slide text

  $("#art-title").text("");
  $("#art-artist").text("");
  $("#art-year").text("");
  $("#art-download").attr('href', "");
}

function closeSlides(slides) {
  // Customize when user clicks close slide button

  clearSlideText();
  if (isAutoMode()) {
    clearAllIntervals(slides);
  }

  $("#blend-toolbar").prop("hidden", true);
  $("body").css({"color": "initial"});
  $("a.nav-link").css("color", "initial");
  $(".link").css("color", "initial");
  $(".overlay").removeClass("overlay");
}

function blend(slides) {

  $("#next-blend").off("click"); // Remove click event until slide is finished

  if (isAutoMode()) {
    clearAllIntervals(slides);
  }

  clearSlideText(); // Clear current slide text

  if (isEndCycle(slides)) {
    // Make the to Slide overlay the page

    // // First cycle is end of cycle, so let's also init active image slide here
    $("#carousel-image .carousel-item").removeClass("active").last().addClass("active");

    $("#carousel-color .carousel-item").last().addClass("overlay");
    $("#carousel-image .carousel-item").first().addClass("overlay");

    // Clear overlay background-color from previous cylce
    $("#carousel-image .carousel-item").css("background-color", "initial");
    slides.toSlide = 0;

  } else {
    $("#carousel-color .active").prev().addClass("overlay");
    $("#carousel-image .active").next().addClass("overlay");
  }

  // Clear the active image to make way for the color slide
  $("#carousel-image .active").removeClass("overlay");

  // Show color slide from left to right
  $("#carousel-color").carousel("prev");
}

window.onload = function() {

  let slides = {
    "automodes": [],
    "interval": "10000", // Automode time interval
    "activeSlide": slidesArray.length - 1,
    "toSlide": 0,
    "length": slidesArray.length
  };

  $("#carousel-color").carousel("pause");
  $("#carousel-image").carousel("pause");

  $("#carousel-color").on("slid.bs.carousel", function () {
    // The color slide is finished, now show image slide from right to left

    $("#carousel-image").carousel("next"); // Next Slide
  });

  $("#carousel-image").on("slid.bs.carousel", function () {
    // Callback for all finished, the image slide is being shown

    $("#carousel-image .active").css("background-color", slidesArray[slides.toSlide].rgba);

    showSlideText(slides.toSlide);

    if ($("#blend-toolbar").is("[hidden]")) {
      // Show blend customizations if not already shown
      setBlendMode();
    }

    $("#next-blend").on("click", function() { // Add back clickable next button
      blend(slides);
    });

    if (isAutoMode()) {
      let setIntervalId = window.setInterval(blend, slides.interval, slides);
      slides.automodes.push(setIntervalId);
    }

    // Keep track of active and to slides
    if (isEndCycle(slides)) {
      slides.activeSlide = 0;
    } else {
      slides.activeSlide++;
    }
    slides.toSlide++;
  });

  $("#start-blend").on("click", function() {
    $("#start-blend").prop("hidden", true);
    blend(slides);
  });

  $("#manual-blend").on("click", function() {
    clearAllIntervals(slides);
  });

  $("#auto-blend").on("click", function() {
    if (!isAutoMode()) {
      let setIntervalId = window.setInterval(blend, slides.interval, slides);
      slides.automodes.push(setIntervalId);
    }
  });

  $("#next-blend").on("click", function() {
    blend(slides);
  });

  $("#stop-blend").on("click", function() {
    $("#start-blend").prop("hidden", false);
    closeSlides(slides);
  });
};
