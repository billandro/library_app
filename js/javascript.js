const addABook = document.querySelector("#add");
const submitButton = document.querySelector("#submit");
const cardBody = document.querySelector(".books-to-add");
const overLay = document.querySelector("#overlay");
const form = document.querySelector("form");

let myLibrary = [
    {   title: "The Alchemist", 
        author: "Paulo Coelho", 
        pages: "128", 
        status: "Read"
    },
];

// Book class constructor
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

// Function to retrieve information from the input fields and push the book object into the array
function takeBookInfo(title, author, pages, status) {
    let book = new Book(title, author, pages, status);
    myLibrary.push(book);
    storeData();
    addBookToPage();
}

// Function to clear container containing book cards
function clearContainer() {
    cardBody.innerHTML = "";
}

// Function to update the button color based on the read status
function updateReadButtonColor(button) {
    if (button.innerText === "Read") {
        button.style.backgroundColor = "var(--greenBG-color)";
    } else if (button.innerText === "Not Read") {
        button.style.backgroundColor = "var(--redBG-color)";
    }
}

// Function to loop through the array and add the book to the page
function addBookToPage() {
    clearContainer();
    
    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
    
        const title = document.createElement("div");
        title.classList.add("title");
        title.innerText = `"${book.title}"`;
    
        const author = document.createElement("div");
        author.classList.add("author");
        author.innerText = `${book.author}`;

        const pages = document.createElement("div");
        pages.classList.add("pages");
        pages.innerText = `${book.pages}`;
    
        const readDiv = document.createElement("div");
        readDiv.classList.add("read");
    
        let readButton = document.createElement("button");
        readButton.setAttribute("data-index", index);
        readButton.classList.add("read-toggle");
        readButton.innerText = `${book.status}`;
        updateReadButtonColor(readButton); // Update button color
    
        const removeDiv = document.createElement("div");
        removeDiv.classList.add("remove");
    
        let removeCard = document.createElement("button");
        removeCard.setAttribute("data-index", index);
        removeCard.classList.add("remove-card");
        removeCard.innerText = "Remove";
    
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        readDiv.appendChild(readButton);
        card.appendChild(readDiv);
        removeDiv.appendChild(removeCard);
        card.appendChild(removeDiv);
        cardBody.appendChild(card);
    });

    // Attach event listeners after the cards have been added to the DOM
    document.querySelectorAll(".read-toggle").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            myLibrary[index].status = myLibrary[index].status === "Read" ? "Not Read" : "Read"; 
            storeData();
            addBookToPage();
        });
    });

    document.querySelectorAll(".remove-card").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            myLibrary.splice(index, 1);
            storeData();
            addBookToPage();
        });
    });
}

// Function to open the overlay popup
function openOverLay() {
    overLay.style.display = "flex";
}

// Function to close the form and overlay
function closeForm() {
    form.style.display = "none";
    overLay.style.display = "none";
}

// Function to handle form submission
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readStatus = document.querySelector("#status").checked;

    if (title && author && pages) {  // Ensure all fields are filled
        if (readStatus === true) {
            takeBookInfo(title, author, pages, "Read");
        } else {
            takeBookInfo(title, author, pages, "Not Read");
        }

        closeForm();
        // Clear form input fields after form submission
        form.reset();
    } else {
        alert("Please fill in all fields.");
    }
});

// Function to handle "Add a Book" button click
addABook.addEventListener("click", function() {
    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block";
        openOverLay();
    } else {
        closeForm();
    }
});

// Function to store data in localStorage
function storeData() {
    if (localStorage) {
        localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
    }
}

// Function to retrieve data from localStorage
function retrieveData() {
    let storedBooks = localStorage.getItem("myLibrary");
    
    if (storedBooks) {
        myLibrary = JSON.parse(storedBooks);
    } else {
        myLibrary = [];
    }

    addBookToPage();
}

retrieveData();

// Event listener to close overlay when clicking outside the form
overLay.addEventListener("click", function(e) {
    if (e.target.id === "overlay") {
        closeForm();
    }
});