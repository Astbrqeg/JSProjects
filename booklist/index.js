const title = document.getElementById("title");
const author = document.getElementById("author");
const year = document.getElementById("year");
const bookList = document.getElementById("book-list");
const btn = document.querySelector(".btn");
const form = document.getElementById("book-form");

function displayBooksFromLocalStorage() {
  const bookListStorage = getbookFromLocalStorage();
  bookList.innerHTML = "";

  bookListStorage.forEach(book => {
    const newRow = document.createElement("section");

    const newTitle = document.createElement("div");
    newTitle.innerHTML = book.title;
    newRow.appendChild(newTitle);

    const newAuthor = document.createElement("div");
    newAuthor.innerHTML = book.author;
    newRow.appendChild(newAuthor);

    const newYear = document.createElement("div");
    newYear.innerHTML = book.year;
    newRow.appendChild(newYear);

    document.getElementById("book-list").appendChild(newRow);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const yearSelect = document.getElementById("year");
  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= currentYear - 100; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
});

function getbookFromLocalStorage() {
  let bookList;
  if (localStorage.getItem('books') == null) {
    bookList = [];
  } else {
    bookList = JSON.parse(localStorage.getItem('books'));
  }
  return bookList;
}

function addBooksToLocalStorage(title, author, year) {
  const book = {
    title: title,
    author: author,
    year: year
  };

  const list = getbookFromLocalStorage();
  list.push(book);
  localStorage.setItem('books', JSON.stringify(list));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const titleValue = title.value;
  const authorValue = author.value;
  const yearValue = year.value;

  if (titleValue && authorValue && yearValue) {
    addBooksToLocalStorage(titleValue, authorValue, yearValue);
    displayBooksFromLocalStorage();
    form.reset();
  } else {
    alert("Please fill in all fields");
  }
});

window.addEventListener("load", displayBooksFromLocalStorage);
btn.addEventListener('click', displayBooksFromLocalStorage);
