
var currentUkiyoImage = 1;

var ukiyoImages = [
  {
    artLink: "images/Great_Wave_off_Kanagawa2.jpg",
    artTitle: "The Great Wave off Kanagawa",
    artArtist: "Katsushika Hokusai",
    artYear: "Sometime between 1829 and 1833"
  },
  {
    artLink: "images/Toshusai_Sharaku-_Otani_Oniji,_1794.jpg",
    artTitle: "Ōtani Oniji III in the Role of the Servant Edobei",
    artArtist: "Tōshūsai Sharaku",
    artYear: "1794"
  },
  {
    artLink: "images/Ogata_Crows_and_the_Moon.jpg",
    artTitle: "Crows and the Moon",
    artArtist: "Ogata Kōrin",
    artYear: "Meiji period (1868 - 1912)"
  }
];

function setUkiyo() {
  $(".close").prop("hidden", false);
  $(".link").css({"color": "AliceBlue"});
  $("a.nav-link").css({"color": "AliceBlue"});
  $("body").css({"color": "AliceBlue"}).css({"opacity": "0.9"});

  var ukiyoImage = ukiyoImages[currentUkiyoImage - 1];

  $("#art-link").attr('href', ukiyoImage.artLink);
  $("#art-title").text(ukiyoImage.artTitle);
  $("#art-artist").text(ukiyoImage.artArtist);
  $("#art-year").text(ukiyoImage.artYear);

}

function unsetUkiyo() {
  $(".close").prop("hidden", true);
  $("body").css({"color": "initial"}).css({"opacity": "initial"});
  $("a.nav-link").css({"color": "initial"});
  $(".link").css({"color": "initial"});
  $("#art-title").text("");
  $("#art-artist").text("");
  $("#art-year").text("");
}

window.onload = function() {
  $('.carousel').carousel('pause');

  $("#ukiyo-e-mode").click(function() {

    if (currentUkiyoImage > ukiyoImages.length) {
      currentUkiyoImage = 1;
    }
    setUkiyo();
    $('.carousel').carousel(currentUkiyoImage);
    currentUkiyoImage += 1;
  });

  $(".close").click(function() {
    unsetUkiyo();
    $('.carousel').carousel(0);
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
