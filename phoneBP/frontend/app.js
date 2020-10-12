var brojac = 0;
var e = 0
setTimeout(function () {
  $('.loader_bg').fadeToggle();
}, 2000);
console.log($('.search').height());
function scrollFunction() {
  if (window.innerWidth > 750) {
    window.onscroll = function () {
      if ($(document).scrollTop() > $('.search').height()) {
        $('.normal-header').addClass('white-header');
        $(".nav-header").addClass('nav-header-blue');
        $('.nav-tab .fas').css({ color: 'white' });
        $('.nav-tabs').css({ color: 'rgb(91,197,255)' });
        $('.nav-tab').hover(function () { $(this).find('.fas').css({ color: 'rgb(91,197,255)' }); }, 
        function(){ $(this).find('.fas').css({ color: 'white' })});

      } else {
        $('.normal-header').removeClass('white-header');
        $(".nav-header").removeClass('nav-header-blue');
        $('.nav-tab').hover(function () { $(this).find('.fas').css({ color: 'white' }); }, 
        function(){ $(this).find('.fas').css({ color: 'rgb(91,197,255)' })});
        $('.nav-tabs').css({ color: 'white' });
        $('.nav-tab .fas').css({ color: 'rgb(91,197,255)' });

      }

    }

  } else {
    $('.normal-header').removeClass('white-header');
    $(".nav-header").removeClass('nav-header-blue');
      $('.nav-tabs').css({ color: 'white' });
      $('.nav-tab .fas').css({ color: 'rgb(91,197,255)' });
      $('.nav-tab').hover(function () { $(this).find('.fas').css({ color: 'white' }); }, 
    function(){ $(this).find('.fas').css({ color: 'rgb(91,197,255)' })});

    window.onscroll = null;

  }
}
$(document).ready(function () {
  scrollFunction();
})
$(window).on('resize', function () {
  scrollFunction()
})
$("#menu-bar").click(function () {
  if (e == 0) {

    $("header").addClass("mobil");
    $(".nav-tab").addClass('nav-tab-visible');


    ++e;
  }
  else {
    --e;
    $("header").removeClass('mobil');
    $(".nav-tab").removeClass('nav-tab-visible');


  }
  if ($(".fa-ellipsis-h").hasClass("rotate90") && brojac == 0) {
    $(".fa-ellipsis-h").removeClass("rotate90");
    $(".fa-ellipsis-h").addClass("rotate180");
  }
  else if ($(".fa-ellipsis-h").hasClass("rotate180") && brojac == 0) {
    $(".fa-ellipsis-h").removeClass("rotate180");
    $(".fa-ellipsis-h").addClass("rotate270");
  }
  else if ($(".fa-ellipsis-h").hasClass("rotate270") && brojac == 0) {
    $(".fa-ellipsis-h").removeClass("rotate270");
    $(".fa-ellipsis-h").addClass("rotate360");
    ++brojac;
  }
  else if ($(".fa-ellipsis-h").hasClass("rotate360") && brojac == 1) {
    $(".fa-ellipsis-h").removeClass("rotate360");
    $(".fa-ellipsis-h").addClass("rotate270");
  }
  else if ($(".fa-ellipsis-h").hasClass("rotate270") && brojac == 1) {
    $(".fa-ellipsis-h").removeClass("rotate270");
    $(".fa-ellipsis-h").addClass("rotate180");
  }
  else if ($(".fa-ellipsis-h").hasClass("rotate180") && brojac == 1) {
    $(".fa-ellipsis-h").removeClass("rotate180");
    $(".fa-ellipsis-h").addClass("rotate90");

  }
  else if ($(".fa-ellipsis-h").hasClass("rotate90") && brojac == 1) {
    $(".fa-ellipsis-h").removeClass("rotate90");
    --brojac;
  }
  else {
    $(".fa-ellipsis-h").addClass("rotate90");
  }
})
/*function getId(url) {
  const regExp = '/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}

const videoId = getId('https://www.youtube.com/watch?v=OoY7zp8GkLI');
const iframeMarkup = 'https://www.youtube.com/embed/'+videoId;
  console.log(iframeMarkup);
  document.getElementById('youtubevideo').src=iframeMarkup;*/
