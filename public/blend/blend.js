let blend = {
  "jsonData": "/blend/slides.json",
  "interval": "10000", // Automode time interval
  "automodes": [], // IDs for interval timers
  "activeSlide": 0,
  "toSlide": 0,
  "slidesArray": [],

  getBlendSlides: function() {
    // Get slides from json file and init Bootstrap carousels and blend slidesArray 

    let self = this;

    const carouselItemElement = '<div class="carousel-item"></div>';

    $.getJSON(blend.jsonData, function(jsonData) {
      let i = 0;
      $.each(jsonData, function (key, slide) {
        self.slidesArray[i] = slide; // Save each slide in an array
        $("#carousel-color .carousel-inner").prepend(carouselItemElement).children().first()
        .css("background-color", slide.rgba);
        $("#carousel-image .carousel-inner").append(carouselItemElement).children().last()
        .css("background-size", slide.backgroundSize)
        .css("background-position", slide.backgroundPosition)
        .css("background-image", "url(" + slide.urlLink + ")")
        .css("opacity", slide.opacity)
        // Trick webkit etc. to preload carousel images
        .addClass("active");
        i++;
      });
        // Set active slide and init active color slide
        blend.activeSlide = blend.slidesArray.length - 1;
        $("#carousel-color .carousel-item").first().addClass("active");
      });
  },

  startBlend: function() {
    // Customize what happens when the user start blend button

    $("#blend-toolbar").prop("hidden", false);
    $(".link").css({"color": "AliceBlue"});
    $("a.nav-link").css({"color": "AliceBlue"});
    $("body").css({"color": "AliceBlue"}).css({"opacity": "0.9"});
  },

  closeBlend: function() {
    // Customize what happens when the user close blend button

    this.clearSlideText();
    if (this.isAutoMode()) {
      this.clearAllIntervals();
    }

    $("#blend-toolbar").prop("hidden", true);
    $("body").css({"color": "initial"});
    $("a.nav-link").css("color", "initial");
    $(".link").css("color", "initial");
    $(".overlay").removeClass("overlay");
  },

  isAutoMode: function() {
    // Returns true if the #auto-blend button is active

    if ($("#auto-blend").hasClass("active")) {
      return true;
    } else {
      return false;
    }
  },

  isEndCycle: function() {
    // Returns true if the activeSlide is the last slide

    if (this.activeSlide == this.slidesArray.length - 1) {
      return true;
    } else {
      return false;
    }
  },

  clearAllIntervals: function() {
    // Clear the array of setInterval timer IDs

    $.each(this.automodes, function (index, automode) {
      window.clearInterval(automode);
    });
    this.automodes = [];
  },

  showSlideText: function() {
    // Show slide text after the image is blended

    let title = this.slidesArray[this.toSlide].title;
    let artist = this.slidesArray[this.toSlide].artist;
    let year = this.slidesArray[this.toSlide].year;
    let downloadLink = this.slidesArray[this.toSlide].downloadLink;

    $("#art-title").text(title);
    $("#art-artist").text(artist);
    $("#art-year").text(year);
    $("#art-download").attr('href', downloadLink);
  },

  clearSlideText: function() {
    // Remove the slide text

    $("#art-title").text("");
    $("#art-artist").text("");
    $("#art-year").text("");
    $("#art-download").attr('href', "");
  },

  showSlide: function() {
    // Blend the color and image slides

    $("#next-blend").off("click"); // Remove click event until slide is finished

    if (this.isAutoMode()) {
      this.clearAllIntervals();
    }

    this.clearSlideText(); // Clear current slide text

    if (this.isEndCycle()) {
      // Make the to Slide overlay the page

      // // First cycle is end of cycle, so let's also init active image slide here
      $("#carousel-image .carousel-item").removeClass("active").last().addClass("active");

      $("#carousel-color .carousel-item").last().addClass("overlay");
      $("#carousel-image .carousel-item").first().addClass("overlay");

      // Clear overlay background-color from previous cylce
      $("#carousel-image .carousel-item").css("background-color", "initial");
      this.toSlide = 0;

    } else {
      $("#carousel-color .active").prev().addClass("overlay");
      $("#carousel-image .active").next().addClass("overlay");
    }

    // Clear the active image to make way for the color slide
    $("#carousel-image .active").removeClass("overlay");

    // Show color slide from left to right
    $("#carousel-color").carousel("prev");
  }

};

window.onload = function() {

  blend.getBlendSlides();

  $("#carousel-color").carousel("pause");
  $("#carousel-image").carousel("pause");

  $("#carousel-color").on("slid.bs.carousel", function () {
    // The color slide is finished, now show image slide from right to left

    $("#carousel-image").carousel("next"); // Next Slide
  });

  $("#carousel-image").on("slid.bs.carousel", function () {
    // Callback for all finished, the image slide is being shown

    $("#carousel-image .active").css("background-color", blend.slidesArray[blend.toSlide].rgba);

    blend.showSlideText(blend.toSlide);

    if ($("#blend-toolbar").is("[hidden]")) {
      // Show blend customizations if not already shown
      blend.startBlend();
    }

    $("#next-blend").on("click", function() { // Add back clickable next button
      blend.showSlide();
    });

    if (blend.isAutoMode()) {
      let setIntervalId = setInterval(blend.showSlide.bind(blend), blend.interval);
      blend.automodes.push(setIntervalId);
    }

    // Keep track of active and to slides
    if (blend.isEndCycle()) {
      blend.activeSlide = 0;
    } else {
      blend.activeSlide++;
    }
    blend.toSlide++;
  });

  $("#start-blend").on("click", function() {
    $("#start-blend").prop("hidden", true);
    blend.showSlide();
  });

  $("#manual-blend").on("click", function() {
    $("#auto-blend").removeClass("active");
    blend.clearAllIntervals();
  });

  $("#auto-blend").on("click", function() {
    $("#manual-blend").removeClass("active");
    if (!blend.isAutoMode()) {
      let setIntervalId = setInterval(blend.showSlide.bind(blend), blend.interval);
      blend.automodes.push(setIntervalId);
    }
  });

  $("#next-blend").on("click", function() {
    blend.showSlide();
  });

  $("#stop-blend").on("click", function() {
    $("#start-blend").prop("hidden", false);
    blend.closeBlend();
  });
}
