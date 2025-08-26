(function () {
    emailjs.init("Yi5TcQ_jw8-V4AGcg");
})();

$(document).ready(function () {
    $(".main-fields input").each(function () {
        $(this).on("keydown", function () {
            $(this).removeClass("error");
        })
    })
    $("#send-query").click(function (e) {
        e.preventDefault();
        var name = $("#fname").val();
        var email = $("#email").val();
        var job = $("#job").val();

        // Email validation using regex
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var isValidEmail = emailRegex.test(email);

        if (name == "" || email == "" || job == "") {
            if (name == "") {
                $("#fname").addClass("error");
            }
            if (email == "") {
                $("#email").addClass("error");
            }
            if (job == "") {
                $("#job").addClass("error");
            }
        } else if (!isValidEmail) {
            $("#email").addClass("error");

        } else {
            $('#send-query').fadeOut();
            $('.form-loader').css('opacity', 1);
            emailjs.send("service_fix0yqh", "template_kdraajd", {
                name: name,
                email: email,
                job: job,
            }).then(function (response) {
                console.log(response);
                $('.form-loader').fadeOut();

                $('.main-fields').css('opacity', 0);
                $('.success-msg').css('opacity', 1);
            }, function (error) {
                console.log(error);

                $('.form-loader').fadeOut();

                $('.success-msg').text(`It's not you, it's us. Please try again later : (`)
                $('.main-fields').css('opacity', 0);
                $('.success-msg').css('opacity', 1);
            });
        }
    })
});


const blob = document.getElementById("bg-blob");

window.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" });
}
