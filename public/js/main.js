var ukiyo;
var slides = [];
var currentSlide = 0;
var currentcolorSlideObject = 0;
var imageSlideObject;
var colorSlideObject;

var carouselItemElement = '<div class="carousel-item overlay"></div>';

$.getJSON("js/ukiyo.json", function(jsonData) {
  ukiyo = jsonData;
  // slides = Object.keys(ukiyo).length;
  var i = 0;
  $.each(ukiyo, function (key, object) {
    slides[i] = object;
    i++;
  });
});

function setSlideMode() {
  $(".close").prop("hidden", false);
  $(".link").css({"color": "AliceBlue"});
  $("a.nav-link").css({"color": "AliceBlue"});
  $("body").css({"color": "AliceBlue"}).css({"opacity": "0.9"});
  //
  // var download = $("#carousel-image .carousel-item.active download").text();
  // var title = $("#carousel-image .carousel-item.active title").text();
  // var artist = $("#carousel-image .carousel-item.active artist").text();
  // var year = $("#carousel-image .carousel-item.active year").text();
  //
  // $("#art-title").text(title);
  // $("#art-artist").text(artist);
  // $("#art-year").text(year);
  // $("#art-download").attr('href', download);
}

function resetSlides() {
  $(".overlay").remove();
  $("#carousel-color .initial").addClass("active");
  $("#carousel-image .initial").addClass("active");
  currentSlide = 0;
}


function closeSlides() {
  $(".close").prop("hidden", true);
  $("body").css({"color": "initial"})
  .css({"background-image": "none"})
  .css({"background-color": "rgba(93, 138, 168, 1)"});
  $("a.nav-link").css({"color": "initial"});
  $(".link").css({"color": "initial"});
  // $('#carousel-color').carousel('dispose');
  // $("#art-title").text("");
  // $("#art-artist").text("");
  // $("#art-year").text("");
}

$("#carousel-image").on("slid.bs.carousel", function (event) {
  $("#carousel-image").carousel("pause");
  $(".overlay").css({"background-image": "none"}).css({"background-color": "initial"});
  // $(".overlay").css({"opacity": "0"});
  // $("body").css({"background-image": "url('images/airforceblue.png')"});
  $("body").css({"background-color": slides[currentSlide-1].rgba})
  // .fadeTo('slow', 1)
  .css({"background-image": slides[currentSlide-1].urlLink})
  .css({"background-size": slides[currentSlide-1].backgroundSize})
  .css({"background-position": slides[currentSlide-1].backgroundPosition});
  setSlideMode();

});
//
//
$("#carousel-color").on("slid.bs.carousel", function (event) {
  debugger;
  $("#carousel-image").carousel(currentSlide);
  $("#carousel-color").carousel("pause");
});

window.onload = function() {
  $("#carousel-color").carousel("pause");
  $("#carousel-image").carousel("pause");

  $("#blend").click(function() {

    if (currentSlide == slides.length) {
      resetSlides();
    }

    if (currentSlide < slides.length) {
      colorSlideObject = $("#carousel-color .carousel-inner").prepend(carouselItemElement).children().first();
      colorSlideObject.css({"background-color": slides[currentSlide].rgba});
      imageSlideObject = $("#carousel-image .carousel-inner").append(carouselItemElement).children().last();
      imageSlideObject.css({"background-image": slides[currentSlide].urlLink});
    }

    debugger;
    ++currentSlide;
    $('#carousel-color').carousel("prev");



  });

  $(".close").click(function() {
    resetSlides();
    closeSlides();
    $("#carousel-color").carousel(0);
    // $('#carousel-image').carousel(0);
  });
};

    //

    //
    // $("#ukiyo-e-wave").click(function() {
    //   $("body").css({"background-image": "url('images/1200px-Tsunami_by_hokusai_19th_century.jpg')"})
    //   // .fadeIn("slow")
    //   .css({"background-color": "rgba(49, 140, 231, 1)"}) // Bleu De France
    //   .css({"background-size": "100%"});
    //   $("#art-link").attr('href', 'images/Great_Wave_off_Kanagawa2.jpg');
    //   $("#art-title").text("The Great Wave off Kanagawa");
    //   $("#art-artist").text("Katsushika Hokusai");
    //   $("#art-year").text("Sometime between 1829 and 1833");
    //   setUkiyo();
    // });
    // $("#ukiyo-e-otani").click(function() {
    //   $("body").css({"background-image": "url('images/Toshusai_Sharaku-_Otani_Oniji,_1794.jpg')"})
    //   .css({"background-color": "rgba(0, 66, 37, 0.7)"}) // British Racing Green
    //   .css({"background-size": "contain"});
    //   $("#art-link").attr('href', 'images/Toshusai_Sharaku-_Otani_Oniji,_1794.jpg');
    //   $("#art-title").text("Ōtani Oniji III in the Role of the Servant Edobei");
    //   $("#art-artist").text("Tōshūsai Sharaku");
    //   $("#art-year").text("1794");
    //   setUkiyo();
    // });
    // $("#ukiyo-e-crows").click(function() {
    //   $("body").css({"background-image": "url('images/Ogata_Crows_and_the_Moon.jpg')"})
    //   .css({"background-color": "rgba(93, 57, 84, 0.7)"}) // Dark Byzantium
    //   .css({"background-size": "110%"});
    //   $("#art-link").attr('href', 'images/Ogata_Crows_and_the_Moon.jpg');
    //   $("#art-title").text("Crows and the Moon");
    //   $("#art-artist").text("Ogata Kōrin");
    //   $("#art-year").text("This print was made probably in Meiji period (1868 - 1912)");
    //   setUkiyo();
    // });
    // $("#ukiyo-e-no").click(function() {
    //   $(".close").prop("hidden", true);
    //   $("body").css({"background-image": "initial"})
    //   .css({"background-color": "rgba(93, 138, 168, 1)"})
    //   .css({"color": "initial"})
    //   .css({"opacity": "initial"});
    //   $(".dropdown-item").css({"color": "initial"});
    //   $("a.nav-link").css({"color": "initial"})
    //   $(".link").css({"color": "initial"});
    //   $("#art-title").text("");
    //   $("#art-artist").text("");
    //   $("#art-year").text("");
    // });
