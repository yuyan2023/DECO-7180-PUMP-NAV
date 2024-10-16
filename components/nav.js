$(document).ready(function () {
    $('.hamburger').click(function () {
        $('.navbar-list').toggleClass('active');
    });

    function handleResize() {
        if ($(window).width() >= 768) {
            $('.navbar-list').removeClass('active');
        }
    }

    handleResize();

    $(window).resize(function () {
        handleResize();
    });
});
