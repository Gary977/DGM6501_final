let books = [];
const urlParams = new URLSearchParams(window.location.search);
const bookId = parseInt(urlParams.get("id"));

document.addEventListener("DOMContentLoaded", async function () {

    try {
        const response = await fetch('json/books.json');
        if (!response.ok) throw new Error('Network response was not ok');
        books = await response.json();
    } catch (error) {
        console.error('Failed to load books:', error);
    }

    const book = books.find(b => b.id === bookId);

    if (book) {


        const container = document.getElementById("exchange-page");
        const ownerBookHTML = `
        <div class="owner-book">
            <h2>Owner's Book</h2>
            <img src="${book.image}" alt="Owner's Book Cover">
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Condition:</strong> ${book.condition}</p>
            <p><strong>Notes:</strong> ${book.currentOwner.thoughts}</p>
        </div>
    `;
        container.innerHTML = ownerBookHTML + container.innerHTML;
    
    } else {
        container.innerHTML = "<p>Book not found.</p>";
    }

    document.getElementById("back-button").href = `detail.html?id=${book.id}`;
});

document.querySelector(".upload-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const condition = document.getElementById("condition").value;
    const notes = document.getElementById("notes").value;
    const image = document.getElementById("image").files[0];

    if (!image) {
        alert("Please upload a book cover image!");
        return;
    }


    const reader = new FileReader();
    reader.onload = function () {
        const userBookHTML = `
            <div class="user-book">
                <h2>Your Book</h2>
                <img src="${reader.result}" alt="Your Book Cover">
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Condition:</strong> ${condition}</p>
                <p><strong>Notes:</strong> ${notes}</p>
            </div>
        `;
        document.querySelector(".exchange-info").insertAdjacentHTML("afterbegin", userBookHTML);
    };
    reader.readAsDataURL(image);


    document.querySelector(".upload-form").reset();
});


