import * as THREE from 'https://cdn.skypack.dev/three@0.124.0';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/RGBELoader.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/OBJLoader.js';


// parallax start
const textBehind = document.getElementById('text-behind');
const textFront = document.getElementById('text-front');
const textBehindBlur = document.getElementById('text-behind-blur');
const canvasRect = document.getElementById('canvas');
const heroSection = document.getElementById('sec-1');

const parallaxScalling1 = 0.0005;
const parallaxScalling2 = 0.00025;
const parallaxScaling3 = 0.0000001;

let heroSectionHeight = heroSection.getBoundingClientRect().height;

let currentScroll = 0;
let targetScroll = 0;
let ease = 0.001;

let theta1 = 0;


function updateScale() {
    let rect = canvasRect.getBoundingClientRect();

    let startScrollPosition = window.pageYOffset + rect.top;

    let endScrollPosition = window.pageYOffset + rect.bottom;


    if (targetScroll + window.innerHeight < startScrollPosition || targetScroll > endScrollPosition) {

        return;
    }
    currentScroll += (targetScroll - currentScroll - ((heroSectionHeight * 2.5))) * ease;

    let scaleValue1 = 1 + (currentScroll * parallaxScalling1)
    let scaleValue2 = 1 + (currentScroll * parallaxScalling2)

    textBehind.style.transform = `scale(${scaleValue1})`
    textFront.style.transform = `scale(${scaleValue1})`
    textBehindBlur.style.transform = `scale(${scaleValue1})`
    // canvasRect.style.transform = `scale(${scaleValue2})`

    theta1 += currentScroll * parallaxScaling3

    requestAnimationFrame(updateScale)
}

window.addEventListener('scroll', () => {
    targetScroll = window.pageYOffset;
    updateScale();
})
updateScale();
// parallax end




// three scene start
let renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
    antialias: true, alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

let scene = new THREE.Scene();


const hdrEquirect = new RGBELoader()

    .setPath('/assets/')
    .load('ml_gradient_freebie_01.hdr', function () {

        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
    });
scene.environment = hdrEquirect;


scene.fog = new THREE.FogExp2(0x11151c, 0.15);

let group = new THREE.Group();
scene.add(group);

const pointlight = new THREE.PointLight(0x85ccb8, 7.5, 20);
pointlight.position.set(0, 3, 2);
group.add(pointlight);

const pointlight2 = new THREE.PointLight(0x9f85cc, 7.5, 20);
pointlight2.position.set(0, 3, 2);
group.add(pointlight2);


let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

group.add(camera);

const material1 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0,
    metalness: 0.7,
    envMapIntensity: 10
});


const objloader = new OBJLoader();
objloader.load(
    './assets/buddha.obj',
    (object) => {
        object.children[0].material = material1;
        if (window.innerWidth < 575) {
            object.scale.setScalar(15);
        } else {
            object.scale.setScalar(20);
        }
        object.position.set(0, -0.25, 0);
        group.add(object);
    },
);

// RESIZE
window.addEventListener('resize', onWindowResize);

let update = function () {
    // Continuously animate theta1 irrespective of scrolling to ensure there's an inherent animation in the 3D visualization.
    theta1 += 0.0025;

    // create a panning animation for the camera
    camera.position.x = Math.sin(theta1) * 10;
    camera.position.z = Math.cos(theta1) * 10;
    camera.position.y = Math.cos(theta1);

    pointlight.position.x = Math.sin(theta1 + 1) * 11;
    pointlight.position.z = Math.cos(theta1 + 1) * 11;
    pointlight.position.y = 2 * Math.cos(theta1 - 3) + 3;

    pointlight2.position.x = -Math.sin(theta1 + 1) * 11;
    pointlight2.position.z = -Math.cos(theta1 + 1) * 11;
    pointlight2.position.y = 2 * -Math.cos(theta1 - 3) - 6;

    // rotate the group to simulate the rotation of the HDR
    group.rotation.y += 0.01;

    // keep the camera look at 0,0,0
    camera.lookAt(0, 0, 0);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// three scene end




// GSAP Scroll Animations

document.addEventListener('DOMContentLoaded', () => {
    gsap.to('#sec-1', {
        scrollTrigger: {
            trigger: '#sec-1',
            start: 'top top',
            endTrigger: '#sec-spacer',
            end: 'center center',
            pin: true,
            scrub: true,
            pinSpacing: true,
        }
    })


    let tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: '#sec-1 h1',
            start: 'center+=100 center',
            endTrigger: '#sec-1',
            end: 'bottom center',
            scrub: 1.5,
            // markers: true
        }
    })

    tl1.to('#sec-1 h1', {
        scale: 0.5,
        opacity: 0,
    })
    // tl1.to('.bg-showreel', {
    //     opacity: 0
    // })

    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: '#sec-spacer',
            start: 'top bottom',
            endTrigger: '#sec-3',
            end: 'top center',
            // markers: true,
            scrub: 1.5,
        }
    });
    tl2.to('#sec-2 .welcome-lines', {
        scale: 1.5,
        opacity: 1,
    }).to('#sec-2 .welcome-lines', {
        opacity: 0,
    })

    // if ($('body').hasClass('home')) {
    //     document.getElementById('showreel-vid').play();
    // }

    if (window.innerWidth > 768) {
        document.querySelectorAll('.intro-preview').forEach(el => {
            gsap.to(el.querySelector('img'), {
                y: 100,
                scrollTrigger: {
                    trigger: el.querySelector('img'),
                    start: 'center center',
                    endTrigger: el.querySelector('img'),
                    end: 'bottom+=200 bottom-=200',
                    scrub: 1.5,
                    // markers: true,
                }
            })
        })

    }

    // sparkly stars
    function sparklyStars() {
        let index = 0,
            interval = 1000;

        const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const animate = star => {
            star.style.setProperty("--star-left", `${rand(-10, 100)}%`)
            star.style.setProperty("--star-top", `${rand(-40, 80)}%`)

            star.style.animation = "none";
            star.offsetHeight;
            star.style.animation = "";
        }
        for (const star of document.getElementsByClassName('magic-star')) {
            setTimeout(() => {
                animate(star);
                setInterval(() => animate(star), 1000)
            }, index++ * (interval / 3));
        }
    }
    sparklyStars();


    // fading of BG Elements

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 300) {
            $('.bg-elems').css('opacity', 0);
        } else {
            $('.bg-elems').css('opacity', 1);
        }
    });


    // Background Bubbles

    function spawnBubbles() {

        const bubblesContainer = document.getElementById('bubbles');

        const between = (min, max) => Math.random() * (max - min) + min;
        const colors = ['#e44141', '#4f2af3', 'rgb(123, 31, 162)', 'rgb(103, 58, 183)', 'rgb(244, 143, 177)', 'rgb(148, 210, 255)'];


        setInterval(() => {

            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubblesContainer.appendChild(bubble);

            const sizePx = `${between(4, 50)}px`
            bubble.style.width = sizePx;
            bubble.style.height = sizePx;
            bubble.style.opacity = `${between(20, 100)}%`;
            bubble.style.left = `${between(0, 100)}%`;

            const floatingBubbleKeyframes = [
                { top: '100%' },
                { top: `-${sizePx}` }
            ]
            const floatingAnimation = bubble.animate(
                floatingBubbleKeyframes,
                between(10000, 40000),
            );
            floatingAnimation.onfinish = () => {
                bubblesContainer.removeChild(bubble);
            }
            const randomColorIndex = Math.floor(Math.random() * colors.length);
            bubble.style.backgroundColor = colors[randomColorIndex];

        }, 300);
    }
    spawnBubbles()

})

