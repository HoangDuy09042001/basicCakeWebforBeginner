$('document').ready(function () {
    const errorBtns = document.querySelectorAll('.error-message');
    const errorMessages = [
        'Please fill out your name',
        'Please fill out your email',
        'Please fill out the subject',
        'Please fill out the message',
    ]
    $('input[type="text"], input[type="email"], textarea').focus(function () {
        let background = $(this).attr('id');
        $('#' + background + '-form').addClass('formgroup-active');
        $('#' + background + '-form').removeClass('formgroup-error');
        keyupEvent('#name', 100);
        keyupEvent('#email', 100);
        keyupEvent('#subject', 50, 250);
        keyupEvent('#message', 500);
    });
    $('input[type="text"], input[type="email"], textarea').blur(function () {
        let background = $(this).attr('id');
        $('#' + background + '-form').removeClass('formgroup-active');
    });
    function keyupEvent(a, b, c) {
        $(a).keyup(function () {
            if ($(a).val() == "") {
                switch (a) {
                    case '#name':
                        // thu
                        $(a).closest('div').next().text(errorMessages[0]);
                        break;
                    case '#email':
                        $(a).closest('div').next().text(errorMessages[1]);
                        break;
                    case '#subject':
                        $(a).closest('div').next().text(errorMessages[2]);
                        break;
                    case '#message':
                        $(a).closest('div').next().text(errorMessages[3]);
                        break;
                    default:
                        throw new Error('Invalid key')
                }
            }
            if (b !== undefined && c === undefined) {
                if ($(a).val().length <= b && $(a).val().length > 0) $(a).closest('div').next().text('');
                if ($(a).val().length > b) $(a).closest('div').next().text('Your name should not exceed ' + b + ' characters');
            }
            if (b !== undefined && c !== undefined) {
                if ($(a).val().length <= b && $(a).val().length > 0) $(a).closest('div').next().text('Subject should not shorter than ' + b + 'characters.');
                if ($(a).val().length <= c && $(a).val().length > b) $(a).closest('div').next().text('');
                if ($(a).val().length > c) $(a).closest('div').next().text('Subject should not exceed ' + c + ' characters');
            }
        });
    }

    $("#waterform").submit(function () {
        let stopsubmit = false;
        for (const errorBtn of errorBtns) {
            if (errorBtn.innerText === '' && errorBtn.previousElementSibling.children[0].value === '') {
                errorBtn.closest('.formgroup').classList.add('formgroup-error');
                if (errorBtn.previousElementSibling.children[0].classList.contains('name')) {
                    errorBtn.innerText = errorMessages[0];
                } else if (errorBtn.previousElementSibling.children[0].classList.contains('email')) {
                    errorBtn.innerText = errorMessages[1];
                } else if (errorBtn.previousElementSibling.children[0].classList.contains('subject')) {
                    errorBtn.innerText = errorMessages[2];
                } else if (errorBtn.previousElementSibling.children[0].classList.contains('message')) {
                    errorBtn.innerText = errorMessages[3];
                }
                stopsubmit = true;
            } else if (errorBtn.innerText !== '') {
                errorBtn.closest('.formgroup').classList.add('formgroup-error');
                stopsubmit = true;
            }
        }
        if (stopsubmit) return false;
    });

});