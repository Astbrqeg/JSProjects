document.addEventListener('DOMContentLoaded', () => {
    const email = document.querySelector('#email-input');
    const submitbtn = document.querySelector('#submit');
    const form = document.querySelector('.container');
    const message = document.querySelector('.message');
    const warning = document.querySelector('#warning');
    const Dismiss = document.querySelector('#Dismiss')
    var mailFormat =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    submitbtn.addEventListener('click', () => {
        if (email.value.match(mailFormat)) {
            form.classList.add('hidden');
            message.classList.remove('hidden');
            var userEmailValue = email.value;
            document.querySelector("#inputed-email").innerHTML = userEmailValue;
        } else {
            warning.classList.remove('hidden');
        }
    });


    Dismiss.addEventListener('click', () => {
        form.classList.remove('hidden')
        warning.classList.add('hidden')
        message.classList.add('hidden');
    })


});


