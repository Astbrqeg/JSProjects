document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        const h3 = question.querySelector('h3');
        const plus = question.querySelector('.plus');
        const minus = question.querySelector('.minus');
        const answer = question.querySelector('.answer');

        h3.addEventListener('click', () => {
            if (answer.classList.contains('active')) {
                answer.classList.remove('active')
                plus.style.display('inline-block')
                minus.style.display('none')
            } else {
                answer.classList.add('active')
                plus.style.display('none')
                minus.style.display('inline-block')
            }
        })


    })
})