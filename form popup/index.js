const btn = document.getElementById('btn');
const message = document.getElementById('popupmessage'); 
const content = document.querySelector('.container');
const xbtn = document.getElementById('x')

let isOpen = false;

btn.addEventListener('click', () => {
    if (isOpen) {
        content.classList.remove('hide'); 
        message.classList.add('hide'); 
    } else {
        message.classList.remove('hide'); 
        content.classList.add('hide'); 
    }
    
    isOpen = !isOpen;
});


xbtn.addEventListener('click', ()=>{
    content.classList.remove('hide'); 
        message.classList.add('hide');
})