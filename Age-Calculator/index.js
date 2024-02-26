document.addEventListener('DOMContentLoaded', function () {
const dayInput = document.getElementById('days');
const monthInput = document.getElementById('months');
const yearInput = document.getElementById('years');
const dayError = document.getElementById('day-error');
const monthError = document.getElementById('month-error');
const yearError = document.getElementById('year-error');
const submitBtn = document.getElementById('submit');
const dayCount = document.getElementById('daycount');
const monthCount = document.getElementById('monthcount');
const yearCount = document.getElementById('yearcount');
const inputRequiredError = 'This field is required';
const inputDayError = 'Must be a valid day';
const inputMonthError = 'Must be a valid month';
const inputYearError = 'Must be in the past';

function setError(element, message) {
    element.innerHTML = message;
}

function checkInputValue(value, minValue, maxValue, errorElement, requiredErrorMessage, rangeErrorMessage) {
    if (value == '') {
        setError(errorElement, requiredErrorMessage);
        return false;
    } else if (value < minValue || value > maxValue) {
        setError(errorElement, rangeErrorMessage);
        return false;
    } else {
        setError(errorElement, '');
        return true;
    }
}

function checkDayInput() {
    return checkInputValue(
        dayInput.value,
        1,
        31,
        dayError,
        inputRequiredError,
        inputDayError
    );
}

function checkMonthInput() {
    return checkInputValue(
        monthInput.value,
        1,
        12,
        monthError,
        inputRequiredError,
        inputMonthError
    );
}

function checkYearInput() {
    let year = yearInput.value;
    const currentYear = new Date().getFullYear();
    if (year == '') {
        setError(yearError, inputRequiredError);
        return false;
    } else if (year > currentYear) {
        setError(yearError, inputYearError);
        return false;
    } else {
        setError(yearError, '');
        return true;
    }
}

function calculateAge(birthday) {
    let birthdate = new Date(birthday);
    let today = new Date();

    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();
    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        if (months === 0) {
            months = 11;
        } else {
            months = 12 + months;
        }
        days = 30 + days;
    }

    yearCount.innerHTML = years;
    monthCount.innerHTML = months;
    dayCount.innerHTML = days;
}

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (!checkDayInput() || !checkMonthInput() || !checkYearInput()) return;

    let birthday = `${monthInput.value}/${dayInput.value}/${yearInput.value}`;
    calculateAge(birthday);
});
})