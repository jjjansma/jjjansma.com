const slidesJson = "/blend/slides.json";
let slides = [];
let activeSlide = 0; // Slide that has the active class
let toSlide = 0; // Slide that is being transitioned to
let interval = 5000; // Auto blend time interval
let autoBlend;

const carouselItemElement = '<div class="carousel-item"></div>';

$.getJSON(slidesJson, function(jsonData) {
  let i = 0;
  $.each(jsonData, function (key, object) {
    slides[i] = object;

    $("#carousel-color .carousel-inner").prepend(carouselItemElement).children().first()
    .css("background-color", slides[i].rgba);

    $("#carousel-image .carousel-inner").append(carouselItemElement).children().last()
    .css("background-size", slides[i].backgroundSize)
    .css("background-position", slides[i].backgroundPosition)
    .css("background-image", "url(" + slides[i].urlLink + ")")
    .css("opacity", slides[i].opacity)
    // Trick webkit etc. to preload carousel images
    .addClass("active");

    i++;
  });
  // Set active slide and init active color slide
  activeSlide = slides.length - 1;
  $("#carousel-color .carousel-item").first().addClass("active");
});

function isEndCycle() {
  // Returns true if the activeSlide is the last slide

  if (activeSlide == slides.length - 1) {
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

function setBlendMode() {
  // Customize when user clicks blend button

  $(".blend-toolbar").prop("hidden", false);
  $(".link").css({"color": "AliceBlue"});
  $("a.nav-link").css({"color": "AliceBlue"});
  $("body").css({"color": "AliceBlue"}).css({"opacity": "0.9"});
}

function showSlideText() {
  // Show slide text after the image is blended

  let title = slides[toSlide].title;
  let artist = slides[toSlide].artist;
  let year = slides[toSlide].year;
  let downloadLink = slides[toSlide].downloadLink;

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

function closeSlides() {
  // Customize when user clicks close slide button

  if (isAutoMode()) {
    window.clearInterval(autoBlend);
  }

  $(".blend-toolbar").prop("hidden", true);
  $("body").css({"color": "initial"});
  $("a.nav-link").css("color", "initial");
  $(".link").css("color", "initial");
  $(".overlay").removeClass("overlay");
  clearSlideText();
}

function setManualMode() {
  window.clearInterval(autoBlend);
  $("#auto-blend").removeClass("active");
  $("#manual-blend").addClass("active");
}

function blend() {

  $("#blend, #manual-blend").off("click"); // Remove click event until slide is finished

  clearSlideText(); // Clear current slide text

  if (isEndCycle()) {
    // Make the to Slide overlay the page

    // // First cycle is end of cycle, so let's also init active image slide here
    $("#carousel-image .carousel-item").removeClass("active").last().addClass("active");

    $("#carousel-color .carousel-item").last().addClass("overlay");
    $("#carousel-image .carousel-item").first().addClass("overlay");

    // Clear overlay background-color from previous cylce
    $("#carousel-image .carousel-item").css("background-color", "initial");
    toSlide = 0;

  } else {
    $("#carousel-color .active").prev().addClass("overlay");
    $("#carousel-image .active").next().addClass("overlay");
  }

  // Clear the active image to make way for the color slide
  $("#carousel-image .active").removeClass("overlay");

  // Show color slide from left to right
  $("#carousel-color").carousel("prev");
}

function triggerBlend() {
  // Click Blend button, start next slide and set manual mode if necessary

  if (isAutoMode()) {
    setManualMode();
  }
  blend();
}

function manualBlend() {
  // Click Manual button, set manual mode or start next slide

  if (isAutoMode()) {
    setManualMode();
  } else {
    blend();
  }
}

window.onload = function() {

  $("#carousel-color").carousel("pause");
  $("#carousel-image").carousel("pause");

  $("#carousel-color").on("slid.bs.carousel", function () {
    // The color slide is finished, now show image slide from right to left

    $("#carousel-image").carousel("next"); // Next Slide
  });

  $("#carousel-image").on("slid.bs.carousel", function () {
    // Callback for all finished, the image slide is being shown

    $("#carousel-image .active").css("background-color", slides[toSlide].rgba);

    showSlideText();

    if ($(".blend-toolbar").is("[hidden]")) {
      // Show blend customizations if not already shown
      setBlendMode();
    }

    $("#blend").on("click", function() { // Add back cycle
      triggerBlend();
    });

    $("#manual-blend").on("click", function() {
      manualBlend();
    });

    // Keep track of active and to slides
    if (isEndCycle()) {
      activeSlide = 0;
    } else {
      activeSlide++;
    }
    toSlide++;
  });

  $("#auto-blend").on("click", function() {
    if (!isAutoMode()) {
      autoBlend = window.setInterval(blend, interval);
    }
  });

  $("#blend").on("click", function() {
    triggerBlend();
  });

  $("#manual-blend").on("click", function() {
    manualBlend();
  });

  $("#close-blend").on("click", function() {
    closeSlides();
  });
};
