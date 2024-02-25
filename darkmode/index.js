// selectors
const themeToggleBtn = document.querySelector('.mode');
const h1 = document.getElementById('h1')


// state
const theme = localStorage.getItem('theme');

// on mount
theme && document.body.classList.add(theme);

// handlers
const handleThemeToggle = () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark-mode');
        h1.innerHTML = '<h1 ">Dark Mode</h1>'
  } else {
    localStorage.removeItem('theme');
    h1.innerHTML = '<h1 ">Light Mode</h1>'



  }
};

// events
themeToggleBtn.addEventListener('click', handleThemeToggle);
