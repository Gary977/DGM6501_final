let books = [];
const urlParams = new URLSearchParams(window.location.search);
const bookId = parseInt(urlParams.get("id"));
let book = null;
document.addEventListener("DOMContentLoaded", async function () {

    try {
        const response = await fetch('json/books.json');
        if (!response.ok) throw new Error('Network response was not ok');
        books = await response.json();
    } catch (error) {
        console.error('Failed to load books:', error);
    }

    book = books.find(b => b.id === bookId);

    if (book) {

        document.getElementById("book-cover").src = book.image;
        document.getElementById("book-title").textContent = book.title;
        document.getElementById("book-author").textContent = `by ${book.author} (${book.year})`;

        const ratingContainer = document.getElementById("book-rating");
        renderStars(ratingContainer, book.rating);
        const numericRating = document.createElement('span');
        numericRating.textContent = ` ${book.rating}`;
        ratingContainer.appendChild(numericRating);
        document.getElementById("book-description").textContent = book.description;
        document.getElementById("book-added-date").textContent = `Added: ${new Date(book.addedDate).toLocaleDateString()}`;
        document.getElementById("exchange").href = `exchange.html?id=${book.id}`;
        document.getElementById("average-price").textContent = book.averagePrice.toFixed(2);
        document.getElementById("annotating-owners").textContent = book.annotatingOwnersCount;
        document.getElementById("book-condition").textContent = book.condition;
        document.getElementById("exchange-times").textContent = book.exchangeTimes;
        const currentThoughts = document.getElementById("current-owner-thoughts");
        currentThoughts.textContent = book.currentOwner.thoughts || "No thoughts available.";

        document.getElementById("annotation-checkbox").checked = book.currentOwner.annotated;
        document.getElementById("highlight-checkbox").checked = book.currentOwner.highlighted;


        // Calculate total savings
        const totalSavings = book.averagePrice * book.exchangeTimes;
        document.getElementById("total-savings").textContent = totalSavings.toFixed(2);
        const thoughtsList = document.getElementById("thoughts-list");

        // Populate the thoughts list
        book.ownerThoughts.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.classList.add("thought-item");
            const footer = document.createElement("div");
            footer.classList.add("thought-footer");
            const annotationInfo = document.createElement("span");
            annotationInfo.classList.add("annotation");
            annotationInfo.innerHTML = `
            <span class="annotation">
                <label><input type="checkbox" disabled ${entry.annotated ? "checked" : ""}> Annotated</label>
                <label><input type="checkbox" disabled ${entry.highlighted ? "checked" : ""}> Highlighted</label>
            </span>
        `;
            // Create container for stars
            const ratingContainer = document.createElement("div");
            ratingContainer.classList.add("rating-container");

            // Render stars using the provided function
            renderStars(ratingContainer, entry.rating);

            // Add the thought and rating to the list item
            listItem.innerHTML = `
            <strong>${entry.owner}:</strong>
            <p>${entry.thoughts}</p>
        `;
            footer.appendChild(annotationInfo);
            footer.appendChild(ratingContainer);
            listItem.appendChild(footer);

            thoughtsList.appendChild(listItem);
        });
    } else {
        const container = document.querySelector(".book-detail-container");
        container.innerHTML = "<p>Book not found.</p>";
    }
});





function renderStars(container, rating) {
    container.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        if (i <= Math.floor(rating)) {
            star.classList.add('full');
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            star.classList.add('half');
            const percentage = (rating % 1) * 100;
            star.style.background = `linear-gradient(90deg, #FFD700 ${percentage}%, #ccc ${percentage}%)`;
        } else {
            star.classList.add('empty');
        }

        container.appendChild(star);
    }
}
