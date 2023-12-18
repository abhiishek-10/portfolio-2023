document.querySelector(".contact-main").onmousemove = e => {
    const rect = e.target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    e.target.style.setProperty("--mouse-x", `${x}px`);
    e.target.style.setProperty("--mouse-y", `${y}px`);
}