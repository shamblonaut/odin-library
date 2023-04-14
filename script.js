let library = [];

function Book(title, author, publishedYear, pages, read) {
  this.title = title;
  this.author = author;
  this.publishedYear = publishedYear;
  this.pages = pages;
  this.read = read;
  this.card = undefined;
}

const booksSection = document.querySelector(".books");
const newBookButton = document.querySelector("#new-book-button");
const newBookSection = document.querySelector(".new-book");
const newBookForm = document.querySelector("#new-book-form");

newBookSection.style.display = "none";

function checkFormFilled(form) {
  let allFilled = true;
  form.querySelectorAll("[required]").forEach((i) => {
    if (!i.value) {
      allFilled = false;
      return;
    }
  });
  return allFilled;
}

newBookButton.addEventListener("click", () => {
  switch (newBookSection.style.display) {
    case "none":
      // Display the previously hidden form
      newBookSection.style.display = "block";
      newBookButton.textContent = "Add Book";
      break;
    case "block":
      if (checkFormFilled(newBookForm)) {
        // Get the entered data from the form
        const newBookData = new FormData(newBookForm);
        addBookToLibrary(
          new Book(
            newBookData.get("title"),
            newBookData.get("author"),
            newBookData.get("published"),
            newBookData.get("pages"),
            newBookData.get("read")
          )
        );

        // Clear and hide the form
        newBookForm.reset();
        newBookSection.style.display = "none";
        newBookButton.textContent = "New Book";
      } else {
        alert("Please fill out the form completely!");
      }

      break;
  }
});

function toggleMark(book) {
  book.read = !book.read;

  // Change colors and text based on read status
  if (book.read) {
    book.card.childNodes[2].textContent = "Read";
    book.card.childNodes[3].childNodes[0].textContent = "Mark as Unread";

    book.card.childNodes[3].childNodes[0].classList.add("read");
    book.card.childNodes[3].childNodes[0].classList.remove("unread");

    book.card.classList.add("read");
    book.card.childNodes[2].classList.add("read");
  } else {
    book.card.childNodes[2].textContent = "Not Read";
    book.card.childNodes[3].childNodes[0].textContent = "Mark as Read";

    book.card.childNodes[3].childNodes[0].classList.add("unread");
    book.card.childNodes[3].childNodes[0].classList.remove("read");

    book.card.classList.remove("read");
    book.card.childNodes[2].classList.remove("read");
  }
}

function removeBook(book) {
  book.card.parentElement.removeChild(book.card);
  library.splice(library.indexOf(book), 1);
}

function addBookToLibrary(book) {
  library.push(book);

  /*
    <div class="book read">
      <p id="book-title">Title</p>
      <div class="book-info">
        <p id="book-author">Author</p>
        <p id="book-published">Published Year</p>
        <p id="book-pages">Pages</p>
        <p id="book-read">Is read</p>
        <div class="book-actions">
          <button id="mark-status">Mark as Read/Unread</button>
          <button id="remove-book">Remove Book</button>
        </div>
      </div>
    </div>
  */

  book.card = document.createElement("div");
  book.card.classList.add("book");
  if (book.read) book.card.classList.add("read");

  const bookTitle = document.createElement("p");
  bookTitle.id = "book-title";
  bookTitle.textContent = book.title;
  book.card.appendChild(bookTitle);

  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");

  const bookAuthor = document.createElement("p");
  bookAuthor.id = "book-author";
  bookAuthor.textContent = book.author;
  bookInfo.appendChild(bookAuthor);

  const bookPublishedYear = document.createElement("p");
  bookPublishedYear.id = "book-published";
  bookPublishedYear.textContent = book.publishedYear;
  bookInfo.appendChild(bookPublishedYear);

  const bookPages = document.createElement("p");
  bookPages.id = "book-pages";
  bookPages.textContent = `${book.pages} pages`;
  bookInfo.appendChild(bookPages);

  book.card.appendChild(bookInfo);

  const bookRead = document.createElement("p");
  bookRead.id = "book-read";
  bookRead.classList.add("book-info");
  bookRead.textContent = book.read ? "Read" : "Not Read";
  if (book.read) bookRead.classList.add("read");
  book.card.appendChild(bookRead);

  const bookActions = document.createElement("div");
  bookActions.classList.add("book-actions");

  const markButton = document.createElement("button");
  markButton.id = "mark-status";
  markButton.classList.add(book.read ? "read" : "unread");
  markButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";
  markButton.addEventListener("click", () => toggleMark(book));
  bookActions.appendChild(markButton);

  const removeButton = document.createElement("button");
  removeButton.id = "remove-book";
  removeButton.textContent = "Remove Book";
  removeButton.addEventListener("click", () => removeBook(book));
  bookActions.appendChild(removeButton);

  book.card.appendChild(bookActions);

  booksSection.appendChild(book.card);
}

// Default books
addBookToLibrary(
  new Book(
    "Alice's Adventures in Wonderland",
    "Lewis Carrol",
    1865,
    352,
    true
  )
);
addBookToLibrary(
  new Book(
    "The Alchemist",
    "Paolo Coelho",
    1988,
    154,
    true
  )
);
addBookToLibrary(
  new Book(
    "One Hundred Years of Solitude",
    "Gabriel García Márquez",
    1967,
    344,
    false
  )
);
