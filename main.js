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
console.log(myLibrary);

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

    newDiv.append(removeBtn);
    displayDiv.append(newDiv);
  }
}

function removeBook(id) {
  const index = myLibrary.findIndex((b) => b.id === id);
  if(index !== -1) myLibrary.splice(index, 1);
  displayBook(myLibrary);
}

 displayBook(myLibrary);
