$(document).ready(function () {
    // Create a ScrollTrigger instance
    gsap.registerPlugin(ScrollTrigger);

    // Pin the element until the ".projects-section" top reaches the top of the screen
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
});
