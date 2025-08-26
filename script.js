gsap.registerPlugin(ScrollTrigger);

// lenis start

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Edge (based on chromium) detection
var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;


var output = 'Detecting browsers by ducktyping:<hr>';
output += 'isFirefox: ' + isFirefox + '<br>';
output += 'isChrome: ' + isChrome + '<br>';
output += 'isSafari: ' + isSafari + '<br>';
output += 'isOpera: ' + isOpera + '<br>';
output += 'isIE: ' + isIE + '<br>';
output += 'isEdge: ' + isEdge + '<br>';
output += 'isEdgeChromium: ' + isEdgeChromium + '<br>';
output += 'isBlink: ' + isBlink + '<br>';


let lenis;
if (!ScrollTrigger.isTouch) {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    function raf(time) {
        lenis.raf(time);
        ScrollTrigger.update();
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (isFirefox == false) {
        ScrollTrigger.normalizeScroll(true);
    }

}
// lenis end








// Pre loader
preLoader();
function preLoader() {

    const preLoaderTl = gsap.timeline();

    preLoaderTl.to("body", {
        overflow: "hidden"
    })
        .to(".preloader .text-container", {
            duration: 0,
            opacity: 1,
            ease: "Power3.easeOut"
        })
        .from(".preloader .text-container p", {
            duration: 1.5,
            delay: 1,
            y: 70,
            skewY: 10,
            stagger: 0.4,
            ease: "Power3.easeOut"
        })
        .to(".preloader .text-container p", {
            duration: 1.2,
            y: 80,
            skewY: -20,
            stagger: 0.2,
            ease: "Power3.easeOut"
        })
        .to(".preloader", {
            duration: 1.5,
            height: "0vh",
            ease: "Power3.easeOut"
        })
        .to(
            "body",
            {
                overflow: "hidden auto"
            },
            "-=2"
        );


    // const buddhaObj = new Image();
    // buddhaObj.src = "./assets/buddha.obj";
    // buddhaObj.onload = function () {
    // };
}

$(document).ready(function () {



    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 300) {
            $(".navbar").addClass("scrolled");
            $('.bg-elems').css('opacity', 0);

        } else {
            $(".navbar").removeClass("scrolled");
            $('.bg-elems').css('opacity', 1);
        }
    });

    const headerTl = gsap.timeline({
        paused: true
    })
    const animateOpenNav = () => {
        headerTl.to("#nav-container", 0.2, {
            autoAlpha: 1,
            delay: 0.1
        })

        headerTl.from(".flex > div", 0.4, {
            opacity: 0,
            y: 10,
            stagger: {
                amount: 0.04
            },
        })

        headerTl.to(".nav-link > a", 0.8, {
            top: 0,
            ease: "power2.inOut",
            stagger: {
                amount: 0.1
            }
        }, "-=0.4")

        headerTl.from('.nav-footer', 0.3, {
            opacity: 0,
        }, "-=0.5").reverse();

    }
    const openNav = () => {
        animateOpenNav();

        const navBtn = document.getElementById('menu-toggle-btn');
        navBtn.onclick = function (e) {
            navBtn.classList.toggle('active');
            if (navBtn.classList.contains('active')) {
                if (!ScrollTrigger.isTouch) {
                    lenis.stop();
                }
            } else {
                if (!ScrollTrigger.isTouch) {
                    lenis.start();
                }
            }
            headerTl.reversed(!headerTl.reversed())
        }
    }
    openNav();





    // Hacker text hover
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const elements = [...document.querySelectorAll("a.h-effect")]
    elements.map(element => {

        element.onmouseover = event => {
            let iterations = 0;
            const interval = setInterval(() => {
                event.target.innerText = event.target.innerText.split("")
                    .map((letter, index) => {

                        if (index < iterations) {
                            return event.target.dataset.value[index];
                        }

                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");

                if (iterations >= event.target.dataset.value.length) {
                    clearInterval(interval);
                }


                iterations += 1 / 3;
            }, 30);

        }
    })


})

$(window).load(function () {
    $(".preloader").css("display", "none");
})