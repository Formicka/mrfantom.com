$(function () {

  "use strict";

  // getElementById wrapper
  function $id(id) {
    return document.getElementById(id);
  }

  // asyncrhonously fetch the html template partial from the file directory,
  // then set its contents to the html of the parent element
  function loadHTML(url, id) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();
    req.onload = () => {
      $id(id).innerHTML = req.responseText;
      $('html, body').animate({
        scrollTop: 0,
      }, 150);
    };
  }

  // use #! to hash
  var router = new Navigo(null, true, '#!');
  router.on({
    'terms': () => { loadHTML('./templates/terms.html', 'view'); },
    'cookies': () => { loadHTML('./templates/cookies.html', 'view'); },
    'gdpr': () => { loadHTML('./templates/gdpr.html', 'view'); },
    'privacy-policy': () => { loadHTML('./templates/oou.html', 'view'); }
  });

  // default route
  router.on(() => { 
    $id('view').innerHTML = $id('view').innerHTML; 
  });
  // 404 route
  router.notFound((query) => { 
    $id('view').innerHTML = loadHTML('./templates/404.html', 'view');; 
  });
  router.resolve();

  window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  //===== Sticky
  $(window).on('scroll', function (event) {
    var scroll = $(window).scrollTop();
    if (scroll < 20) {
      $(".navbar-area").removeClass("sticky");
      //$(".navbar .navbar-brand img").attr("src", "assets/images/logo.svg");
    } else {
      $(".navbar-area").addClass("sticky");
      //$(".navbar .navbar-brand img").attr("src", "assets/images/logo-2.svg");
    }
  });

  //===== Section Menu Active
  var scrollLink = $('.page-scroll');
  // Active link switching
  $(window).scroll(function () {
    var scrollbarLocation = $(this).scrollTop();
    scrollLink.each(function () {
      if($(this.hash).offset()) {
        var sectionOffset = $(this.hash).offset().top - 73;
        if (sectionOffset <= scrollbarLocation) {
          $(this).parent().addClass('active');
          $(this).parent().siblings().removeClass('active');
        }
      }
    });
  });

  //===== close navbar-collapse when a  clicked
  $(".navbar-nav a").on('click', function () {
    $(".navbar-collapse").removeClass("show");
  });
  $(".navbar-toggler").on('click', function () {
    $(this).toggleClass("active");
  });
  $(".navbar-nav a").on('click', function () {
    $(".navbar-toggler").removeClass('active');
  });

  //===== Back to top
  // Show or hide the sticky footer button
  $(window).on('scroll', function (event) {
    if ($(this).scrollTop() > 600) {
      $('.back-to-top').fadeIn(200)
    } else {
      $('.back-to-top').fadeOut(200)
    }
  });

  //Animate the scroll to yop
  $('.back-to-top').on('click', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: 0,
    }, 1500);
  });

    //===== Magnific Popup
    $('.image-popup').magnificPopup({
      type: 'image',
      gallery: {
          enabled: true
      }
    });
  
    //===== testimonial active
    $('.testimonial-active').slick({
      dots: true,
      speed: 800,
      arrows: false,
      centerMode: true,
      centerPadding: "0",
      slidesToShow: 3,
      slidesToScroll: 4,
      responsive: [
          {
              breakpoint: 1200,
              settings: {
                  slidesToShow: 3,
              }
          },
          {
              breakpoint: 992,
              settings: {
                  slidesToShow: 2,
                  centerMode: false,
              }
          },
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 1,
              }
          },
          {
              breakpoint: 576,
              settings: {
                  slidesToShow: 1,
              }
          },
      ]
  });

  //=====  WOW active
  new WOW().init();

  if (document.getElementById("particles-1")) particlesJS("particles-1", {
    "particles": {
      "number": {
        "value": window.mobilecheck() ? 10 : 30,
        "density": {
          "enable": false,
          "value_area": 333
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "image",
        "stroke": {
          "width": 0,
          "color": "#ffffff"
        },
        "image": {
          "src": "/assets/images/ghost-png.png",
          "width": 50,
          "height": 50
        }
      },
      "opacity": {
        "value": 0.26831443294901214,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 35,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1.5,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "window",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": false
  });

  if (document.getElementById("particles-2")) particlesJS("particles-2", {
    "particles": {
      "number": {
        "value": window.mobilecheck() ? 10 : 40,
        "density": {
          "enable": !0,
          "value_area": 4000
        }
      },
      "color": {
        "value": ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
      },
      "shape": {
        "type": "image",
        "stroke": {
          "width": 0,
          "color": "#ffffff"
        },
        "image": {
          "src": "/assets/images/ghost-png.png",
          "width": 50,
          "height": 50
        }
      },
      "opacity": {
        "value": 0.15,
        "random": !0,
        "anim": {
          "enable": !0,
          "speed": 0.2,
          "opacity_min": 0.15,
          "sync": !1
        }
      },
      "size": {
        "value": 50,
        "random": !0,
        "anim": {
          "enable": !0,
          "speed": 2,
          "size_min": 5,
          "sync": !1
        }
      },
      "line_linked": {
        "enable": !1,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": !0,
        "speed": 1,
        "direction": "top",
        "random": !0,
        "straight": !1,
        "out_mode": "out",
        "bounce": !1,
        "attract": {
          "enable": !1,
          "rotateX": 600,
          "rotateY": 600
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": !1,
          "mode": "bubble"
        },
        "onclick": {
          "enable": !1,
          "mode": "repulse"
        },
        "resize": !0
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1,
          }
        },
        "bubble": {
          "distance": 250,
          "size": 0,
          "duration": 2,
          "opacity": 0,
          "speed": 3
        },
        "repulse": {
          "distance": 400,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": false
  });






});
