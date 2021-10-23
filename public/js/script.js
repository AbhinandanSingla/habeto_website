let searchParams = new URLSearchParams(window.location.search)
$(document).ready(() => {
    if (searchParams.get('register') === 'true') {
        $('#registration').css('display', 'block');
    } else {
        $('#registration').css('display', 'none');

    }
});