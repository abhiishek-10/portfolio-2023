let bgBlog = $('.bg-blob')
window.onmousemove = e => {
    const rect = e.target.getBoundingClientRect(),
        x = e.clientX - window.left,
        y = e.clientY - window.top;

    bgBlog.animate({
        // left: `${x}px`,
        // top: `${y}px`,
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
    }, { duration: 100, fill: "forwards" });
}


