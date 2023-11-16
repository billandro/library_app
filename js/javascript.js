const addABook = document.querySelector("#add");
const submitButton = document.querySelector("#submit");
const readButton = document.querySelector("#read");
const removeButton = document.querySelector("#remove");
const cardBody = document.querySelector(".books-to-add");
const overLay = document.querySelector("#overlay");
const form = document.querySelector("form");
const body = document.body;

let myLibrary = [
    {   title: "The Alchemist", 
        author: "Paulo Coelho", 
        pages: "128", 
        status: "Read"
    },
];

// class Book constructor 
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

/* retrieves information from the input fields and
pushes the book object into the array */
function takeBookInfo(title, author, pages, status) {
    let book = new Book(title, author, pages, status);
    myLibrary.push(book);
    storeData();
    addBookToPage();
}

// clear container containing book cards
function clearContainer() {
    cardBody.innerText = "";
}

// loops through the array and adds the book to the page
function addBookToPage() {
    clearContainer();
    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
    
        const title = document.createElement("div");
        title.classList.add("title");
    
        const author = document.createElement("div");
        author.classList.add("author");
    
        const pages = document.createElement("div");
        pages.classList.add("pages");
    
        const readDiv = document.createElement("div");
        readDiv.classList.add("read");
    
        const readButton = document.createElement("button");
        readButton.setAttribute("id", "read");
    
        const removeDiv = document.createElement("div");
        removeDiv.classList.add("remove");
    
        const removeCard = document.createElement("button");
        removeCard.setAttribute("id", "remove");
    
        title.innerText = `"${book.title}"`;
        author.innerText = `${book.author}`;
        pages.innerText = `${book.pages}`;
        readButton.innerText = `${book.status}`;
        removeCard.innerText = "Remove";
    
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
    
        readDiv.appendChild(readButton);
        card.appendChild(readDiv);
    
        removeDiv.appendChild(removeCard);
        card.appendChild(removeDiv);
    
        cardBody.appendChild(card);

        // event listener to toggle the read button of cards
        readButton.addEventListener("click", function() {
            if (readButton.id === "read") {
                readButton.id = "not-read";
                readButton.innerText = "Not read";
            } else {
                readButton.id = "read"
                readButton.innerText = "Read";
            }
            storeData();
        });

        // event listener to remove card at specified index
        removeCard.addEventListener("click", function() {
            myLibrary.splice(index, 1);
            storeData();
            retrieveData();
        });
    });
}

// function to open the overlay popup
function openOverLay() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
}

// opens and closes the pop-up form
addABook.addEventListener("click", function() {
    const form = document.getElementById("form");
    if (form.style.display === "none") {
        form.style.display = "block";
        openOverLay();
    } else {
        form.style.display = "none";
    }
});

// The submit button that creates a new card
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    const form = document.getElementById("form");
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readStatus = document.querySelector("#status").checked;
    const overlay = document.getElementById("overlay");

    if (readStatus === true) {
        takeBookInfo(title, author, pages, "Read");
        addBookToPage(); 
        form.style.display = "none";
    } else {
        takeBookInfo(title, author, pages, "Not read");
        addBookToPage();
        form.style.display = "none";
    }
    // close overlay when you submit
    overlay.style.display = "none";

    // empty form input fields after form submission
    const allinputs = document.querySelectorAll("input");
    allinputs.forEach(input => input.value = "");

    storeData();
    retrieveData();
});

// local storage for data
function storeData() {
    if (localStorage) {
        localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
    }
}

// pulls books from local storage when page is refreshed
function retrieveData() {
    // gets information from local storage
    let storedBooks = localStorage.getItem("myLibrary");
    storedBooks = JSON.parse(storedBooks);
    myLibrary = storedBooks;
    addBookToPage();
}
retrieveData();