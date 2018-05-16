const slidesJson = "blend/slides.json";
let slides = [];
let currentSlide = 0;
let imageSlideObject;
let colorSlideObject;

const carouselItemElement = '<div class="carousel-item overlay" style="position: fixed; width: 100%; height: 100%; top: 0; left: 0;"></div>';

$.getJSON(slidesJson, function(jsonData) {
  let i = 0;
  $.each(jsonData, function (key, object) {
    slides[i] = object;
    i++;
  });
});

function customizeBlendStyles() {

  $("body").css("background-blend-mode", "darken")
  .css("background-attachment", "fixed");

  $("body, a").css("-webkit-transition", "color 0.5s ease").css("transition", "color 0.5s ease");

}

function setSlideMode() {
  // Customize when user clicks blend button
  $(".close").prop("hidden", false);
  $(".link").css({"color": "AliceBlue"});
  $("a.nav-link").css({"color": "AliceBlue"});
  $("body").css({"color": "AliceBlue"}).css({"opacity": "0.9"});
}

function setSlideText() {

  let title = slides[currentSlide].title;
  let artist = slides[currentSlide].artist;
  let year = slides[currentSlide].year;
  let downloadLink = slides[currentSlide].downloadLink;

  $("#art-title").text(title);
  $("#art-artist").text(artist);
  $("#art-year").text(year);
  $("#art-download").attr('href', downloadLink);
}

function resetSlides() {
  // Carousel cycle has been completed or user clicks close button
  $(".overlay").remove();
  $("#carousel-color .initial").addClass("active");
  $("#carousel-image .initial").addClass("active");
  currentSlide = 0;
}

function clearSlideText() {
  // $("#blend-header").fadeOut("slow");
  $("#art-title").text("");
  $("#art-artist").text("");
  $("#art-year").text("");
}

function closeSlides() {
  // Customize when user clicks close button
  $(".close").prop("hidden", true);
  $("body").css({"color": "initial"})
  .css("background-image", "none")
  .css("background-color", "rgba(93, 138, 168, 1)");
  $("a.nav-link").css("color", "initial");
  $(".link").css("color", "initial");
  clearSlideText();
}

function startSlide() {

  $("#blend").off("click"); // Remove click event until slide is finished

  clearSlideText();
  setSlideMode();

  if (currentSlide == slides.length) {
    resetSlides();
  }

  if (currentSlide < slides.length) {
    colorSlideObject = $("#carousel-color .carousel-inner").prepend(carouselItemElement).children().first();
    colorSlideObject.css("background-color", slides[currentSlide].rgba);

    imageSlideObject = $("#carousel-image .carousel-inner").append(carouselItemElement).children().last();
    imageSlideObject.css("background-image", "url(" + slides[currentSlide].urlLink + ")")
    .css("background-size", slides[currentSlide].backgroundSize)
    .css("background-position", slides[currentSlide].backgroundPosition);
  }

  // var background = document.createElement("img");
  // background.src = slides[currentSlide].urlLink;
  // background.onload = function() {
  //   $('#carousel-color').carousel("prev");
  // };

  $('#carousel-color').carousel("prev");
}

window.onload = function() {

  customizeBlendStyles();

  $("#carousel-color").carousel("pause");
  $("#carousel-image").carousel("pause");

  $("#carousel-color").on("slid.bs.carousel", function () {
    // Callback function for when a color slide has been shown
    // Wait until the background image is loaded in cache

    const background = document.createElement("img");
    background.onload = function() {
      $("#carousel-image").carousel(currentSlide+1); // Next Slide
    };
    background.src = slides[currentSlide].urlLink;

    // $("#carousel-image").carousel(currentSlide+1); // Next Slide
  });

  $("#carousel-image").on("slid.bs.carousel", function () {
    // Callback function for when an image slide has been shown
    $(".overlay").css("background-image", "none").css("background-color", "initial");
    $("body").css("background-color", slides[currentSlide].rgba)
    .css("background-size", slides[currentSlide].backgroundSize)
    .css("background-position", slides[currentSlide].backgroundPosition)
    .css("background-image", "url(" + slides[currentSlide].urlLink + ")");

    setSlideText();
    ++currentSlide; // Finished showing current slide

    $("#blend").click(function() { // Add back click event
      startSlide();
    });
  });

  $("#blend").click(function() {
    startSlide();
  });

  $(".close").click(function() {
    resetSlides();
    closeSlides();
    $("#carousel-color").carousel(0);

  });
};
