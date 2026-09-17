const myLibrary = [];

function Book(title, author, page, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}

function addBookToLibrary(title, author, page, read) {
  const book = new Book(title, author, page, read);
  myLibrary.push(book);
}

addBookToLibrary("Dune", "Frank Herbert", 412, true);
addBookToLibrary("1984", "George Orwell", 328, false);

function displayBook(bookArray) {
  const displayDiv = document.getElementById("library");
  
  displayDiv.textContent = "";
  for (const book of bookArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    const read = book.read ? "read" : "not read";
    newDiv.textContent = `The title is ${book.title}, the author is ${book.author}, page number ${book.page}, read: ${read}`;
    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "remove";
    removeBtn.dataset.id = book.id;
    
    removeBtn.addEventListener("click", (e) => {
      removeBook(e.currentTarget.dataset.id);
    })

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.dataset.id = book.id;
    
    toggleBtn.addEventListener("click", (e) => {
      const index = myLibrary.findIndex((b) => b.id === e.currentTarget.dataset.id);
      const found = myLibrary[index];

      found.toggleRead();
      displayBook(myLibrary);
    })

    newDiv.append(removeBtn);
    newDiv.append(toggleBtn);
    displayDiv.append(newDiv);
  }
}

function removeBook(id) {
  const index = myLibrary.findIndex((b) => b.id === id);
  if(index !== -1) myLibrary.splice(index, 1);
  displayBook(myLibrary);
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

const newBookBtn = document.getElementById("new-book");
const dialog = document.getElementById("book-dialog");
const cancelBtn = document.getElementById("cancel");
const form = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("f-title").value;
  const author = document.getElementById("f-author").value;
  const page = Number(document.getElementById("f-pages").value);
  const read = document.getElementById("f-read").checked;

  addBookToLibrary(title, author, page, read)
  displayBook(myLibrary);
  dialog.close();
  form.reset()
});

 displayBook(myLibrary);
