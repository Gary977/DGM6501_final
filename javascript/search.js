let books = [];

function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; 

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book-result');
            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <div class="book-details">
                    <h3>${book.title}</h3>
                    <p>${book.author} <span>(${book.year})</span></p>
                    <p class="rating">Rating: ${book.rating}</p>
                    <p class="description">${book.description}</p>
                </div>
            `;
            bookElement.addEventListener("click", function () {
                window.location.href = `detail.html?id=${book.id}`; 
            });
            resultsContainer.appendChild(bookElement);
        });
    }
}


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


async function performSearch() {
    try {
        const response = await fetch('json/books.json');
        if (!response.ok) throw new Error('Network response was not ok');
        books = await response.json();
        let results = [];
        const searchType = getQueryParam('searchType');
        const query = getQueryParam('query').toLowerCase();

        if (searchType === "title") {
            results = books.filter(book => book.title.toLowerCase().includes(query));
        } else if (searchType === "author") {
            results = books.filter(book => book.author.toLowerCase().includes(query));
        }

        displayResults(results);
    } catch (error) {
        console.error('Failed to load books:', error);
    }
}

document.addEventListener("DOMContentLoaded", performSearch);