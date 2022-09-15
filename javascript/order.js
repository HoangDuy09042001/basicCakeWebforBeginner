$('document').ready(function () {
    $('input[type="checkbox"]').click(function () {
        if ($(this).is(":checked")) {
            console.log("Checkbox is checked.");
        }
        else if ($(this).is(":not(:checked)")) {
            console.log("Checkbox is unchecked.");
        }
    });
    const errorMessages = [
        'Please select our product.',
        'Please fill out your name.',
        'Your name should not exceed 100 characters.',
        'Please fill out your message.',
        'Message should not exceed 30 characters.',
        'Please fill out the deliver date.',
        'Please fill out the address.',
        'Address should not exceed 500 characters.',
    ]
    $('input[type="text"], input[type="email"], textarea').focus(function () {
        let background = $(this).attr('id');
        $('#' + background + '-form').addClass('formgroup-active');
        $('#' + background + '-form').removeClass('formgroup-error');
        keyupEvent('#name', 100);
        keyupEvent('#message', 30);
        keyupEvent('#deliverto', 500);
    });
    $("#myselect").click(function () {
        if ($("#myselect option:selected").text() !== '---Select cake---') {
            $("#myselect").next().text('');
        } else {
            $("#myselect").next().text(errorMessages[0]);
        }
    });
    $("#start").change(function () {
        let txtVal = $('#start').val();
        if (isDate(txtVal)) {
            $("#start").next().text('');
        }
    });
    $('input[type="text"], input[type="email"], textarea').blur(function () {
        let background = $(this).attr('id');
        $('#' + background + '-form').removeClass('formgroup-active');
    });

    function keyupEvent(a, b) {
        $(a).keyup(function () {

            if ($(a).val() == "") {
                switch (a) {
                    case '#name':
                        $(a).next().text(errorMessages[1]);
                        break;
                    case '#message':
                        $(a).next().text(errorMessages[3]);
                        break;
                    case '#deliverto':
                        $(a).next().text(errorMessages[6]);
                        break;
                    default:
                        throw new Error('Invalid key')
                }
            }

            if (b !== undefined) {
                if ($(a).val().length <= b && $(a).val().length > 0) $(a).next().text('');
                switch (a) {
                    case '#name':
                        if ($(a).val().length > b) $(a).next().text('Your name should not exceed ' + b + ' characters');
                        break;
                    case '#message':
                        if ($(a).val().length > b) $(a).next().text('Message should not exceed ' + b + ' characters');
                        break;
                    case '#deliverto':
                        if ($(a).val().length > b) $(a).next().text('Address should not exceed ' + b + ' characters');
                        break;
                    default:
                        throw new Error('Invalid key')
                }
            }
        });
    }
    function isDate(txtDate) {
        let currVal = txtDate;
        if (currVal == '')
            return false;

        let rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/; //Declare Regex
        let dtArray = currVal.match(rxDatePattern); // is format OK?

        if (dtArray == null)
            return false;

        //Checks for mm/dd/yyyy format.
        dtMonth = dtArray[3];
        dtDay = dtArray[5];
        dtYear = dtArray[1];

        if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay > 31)
            return false;
        else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
            return false;
        else if (dtMonth == 2) {
            let isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay == 29 && !isleap))
                return false;
        }
        return true;
    }

    $("#order").submit(function () {
        let stopsubmit = false;
        let checkboxChecks = $('input[type="checkbox"]:checked');
        let date = $('#start').val();
        $('.text-error-message').each(function () {
            if ($(this).text() === '' && $(this).prev().val() === '') {
                switch ($(this).prev().attr('id')) {
                    case 'name':
                        $(this).text(errorMessages[1])
                        stopsubmit = true;
                        break;
                    case 'message':
                        $(this).text(errorMessages[3])
                        stopsubmit = true;
                        break;
                    case 'deliverto':
                        $(this).text(errorMessages[6])
                        stopsubmit = true;
                        break;
                    default:
                        throw new Error('Invalid start or end date');
                }
            }
        })
        let arr = date.split('-').join('/');
        if (!isDate(arr)) {
            if (arr === '') {
                $('#start').next().text(errorMessages[5]);
            } else {
                $('#start').next().text('You have filled invalid date');
            }
            stopsubmit = true;
        }
        if ($("#myselect option:selected").text() === '---Select cake---') {
            $("#myselect").next().text(errorMessages[0]);
            stopsubmit = true;
        }
        if (checkboxChecks.length == 0) {
            stopsubmit = true;
        }
        if (stopsubmit) return false;
    });
});