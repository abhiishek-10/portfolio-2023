


// gsap.registerPlugin(ScrollTrigger);


// // lenis start
// const lenis = new Lenis()
// function raf(time) {
//     lenis.raf(time)
//     requestAnimationFrame(raf)
// }
// requestAnimationFrame(raf)



gsap.registerPlugin(ScrollTrigger);



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


const lenis = new Lenis({
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





// lenis end






// Hacker text hover
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const elements = [...document.querySelectorAll("a.navigation")]
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



// Pre loader
$(document).ready(function () {

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
        )
        .to(".preloader", {
            display: "none"
        });
    if ($('body').hasClass('home')) {
        document.getElementById('showreel-vid').play();
    }

})
