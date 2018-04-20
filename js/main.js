// When the DOM is ready

$(function() {

  // lottie.loadAnimation({
  // container: document.getElementById('bm'), // the dom element that will contain the animation
  // renderer: 'svg',
  // loop: true,
  // autoplay: true,
  // path: 'js/data.json' // the path to the animation json
  // });

  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('header').outerHeight();
  var projectHeight = $('#neuron-cover').outerHeight();

  $(window).scroll(function(event){
      didScroll = true;
  });

  if(screen.availWidth > 1366) {
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
  }

  function hasScrolled() {
      var st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta)
          return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
          // Scroll Down
          $('header').addClass('nav-up');
      } else {
          // Scroll Up
          if(st + $(window).height() < $(document).height()) {
              $('header').removeClass('nav-up');
          }
      }

      lastScrollTop = st;
  }


  $('.slide-section').click(function (e) {
    var linkHref = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(linkHref).offset().top - projectHeight / 4
    }, 1000);
    e.preventDefault();
  });

  var scrollMagicController = new ScrollMagic.Controller();

  function animate(elementId) {
    var scene = new ScrollMagic.Scene({
      triggerElement: elementId,
      reverse: false
    }).addTo(scrollMagicController);

    var timeline = new TimelineMax();

    var tween1 = TweenMax.to(elementId + ' .first-title', 0.3, {css:{className:"+=fadeInDown"}});
    var tween2 = TweenMax.to(elementId + ' .second-title', 0.3, {css:{className:"+=fadeInDown"}});
    var tween3 = TweenMax.to(elementId + ' .inner-but', 0.2, {css:{className:"+=fadeInLeft"}});
    var tween4 = TweenMax.to(elementId + ' .icon-right', 0.2, {css:{className:"+=fadeInLeft"}});
    var tween5 = TweenMax.to(elementId + ' .pretitle', 0.3, {css:{className:"+=fadeInDown"}});
    var tween6 = TweenMax.to(elementId + ' .clip-polygon', 0.001, {css:{className:"+=image-animated"}});
    var tweenBoxLeft = TweenMax.to(elementId + ' .box-left', 0.2, {css:{className:"+=b-left-animated"}});
    var tweenBoxRight = TweenMax.to(elementId + ' .box-right', 0.2, {css:{className:"+=b-right-animated"}});

    timeline
          .add(tween6)
          .add(tween1)
          .add(tween2)
          .add(tween3)
          .add(tween4)
          .add(tweenBoxLeft)
          .add(tweenBoxRight)
          .add(tween5);

    scene.setTween(timeline);
  }

  // Link to projects animation

  $('.but-text').hover(function(e) {
    $('.icon-right').css('margin-left', '25px');
  }, function(e) {
    $('.icon-right').css('margin-left', '20px');
  });

  $(window).on('load', function() {
    setTimeout(function () {
      $('#loader').fadeOut('slow');
      $('body').removeClass('lock-screen');

      $('.hero-title').addClass('fadeInUp');

      // Init ScrollMagic Controller
      animate('#neuron-cover');
      animate('#vault-cover');
      animate('#planime-cover');
      animate('#escapes-cover');
    }, 1000);
  });

  //smooth scrolling
  var $window = $(window);		//Window object

  var scrollTime = 0.9;			//Scroll time
  var scrollDistance = 170;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll

  $window.on("mousewheel DOMMouseScroll", function(event){

    event.preventDefault();

    var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
    var scrollTop = $window.scrollTop();
    var finalScroll = scrollTop - parseInt(delta*scrollDistance);

    TweenMax.to($window, scrollTime, {
      scrollTo : { y: finalScroll, autoKill:true },
        ease: Power1.easeOut,	//For more easing functions see https://api.greensock.com/js/com/greensock/easing/package-detail.html
        autoKill: true,
        overwrite: 5
      });
  });

}());



// var myHeaders = new Headers();
// var myInit = { method: 'GET',
//                headers: myHeaders,
//                mode: 'no-cors',
//                cache: 'default' };
//
// fetch('/Users/anastasiyaprh/Downloads/my-portfolio/neuron.html', myInit).then(el => console.log(el));
