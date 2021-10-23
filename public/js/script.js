let searchParams = new URLSearchParams(window.location.search)
$(document).ready(() => {
    if (searchParams.get('register') === 'true') {
        $('#registration').css('display', 'block');
    } else {
        $('#registration').css('display', 'none');

    }
    $('.r_navbar img').click(() => {
        $('#registration').css('display', 'none');
    })
});