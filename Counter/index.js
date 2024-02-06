const result = document.getElementById('label')
const increase = document.getElementById('increase')
const decrease = document.getElementById('decrease')
const reset = document.getElementById('reset')

let counter = 0;

increase.addEventListener('click', () => {
    counter++;
    result.innerHTML = counter;
})

decrease.addEventListener('click', () => {
    counter--;
    result.innerHTML = counter;
})

reset.addEventListener('click', () => {
    counter = 0;
    result.innerHTML = counter;
})