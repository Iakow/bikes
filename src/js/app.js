new WOW({
  mobile: true
}).init();


$(document).ready(function(){
  $('a[href*=\\#]').on("click", function(e){
    var anchor = $(this);

    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top
    }, 777);

    e.preventDefault();
    return false;s
  });
});

var x = $(window).width();
alert(x);

alert(screen.width);

alert(window.devicePixelRatio);