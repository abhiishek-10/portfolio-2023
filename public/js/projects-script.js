$(document).ready(function () {
    // Create a ScrollTrigger instance
    gsap.registerPlugin(ScrollTrigger);

    // Pin the element until the ".projects-section" top reaches the top of the screen
    if (window.innerWidth > 768) {
        gsap.to(".project-bg-pattern", {
            scrollTrigger: {
                trigger: ".project-bg-pattern",
                start: "top top",
                endTrigger: ".projects-section",
                end: "top top",
                pin: true,
                pinSpacing: false,
            }
        });
    }
});
