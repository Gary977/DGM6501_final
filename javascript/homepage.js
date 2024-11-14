//for slider
let currentIndex = 0;
let booksPerPage = 5;

//json data
let books = [];
//for bookModal
const bookModal = document.getElementById('bookModal');
const bookModalContent = document.querySelector('.book-modal-content');
const modalBookCover = document.getElementById('modalBookCover');
const modalBookTitle = document.getElementById('modalBookTitle');
const modalBookAuthor = document.getElementById('modalBookAuthor');
const modalBookRating = document.getElementById('modalBookRating');
const modalBookDescription = document.getElementById('modalBookDescription');
const closeButton = document.querySelector('.close-button');
let bookItemRect = null;

initialize();


async function initialize() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/gary977/DGM6501_final/main/json/books.json');
        if (!response.ok) throw new Error('Network response was not ok');

        books = await response.json();
        console.log(books); 
        showPopularBooks();
  
        window.addEventListener("resize", updateBooksPerPage);

        //book toggle
        document.getElementById('book-toggle').addEventListener('click', function () {
            const button = document.getElementById('book-toggle');
            const title = document.getElementById('title');

            if (button.textContent === "Show Popular Books") {
                showPopularBooks();
                title.textContent = "Popular Books";
                title.setAttribute('data-text', "Popular Books");
                button.textContent = 'Show New Additions';
            } else {
                showNewAdditions();
                title.textContent = "New Additions";
                title.setAttribute('data-text', "New Additions");

                button.textContent = 'Show Popular Books';
            }
        });

        
        //book modal exit
        closeButton.addEventListener('click', function () {
            if (bookItemRect) {
                zoom();
            }

            bookModalContent.classList.remove('show');
            bookModal.classList.remove('show');

            setTimeout(() => {
                bookModalContent.style.transformOrigin = "center center";
            }, 400);
        });

        window.addEventListener('click', function (event) {
            if (event.target === bookModal) {
                if (bookItemRect) {
                    zoom();
                }

                bookModalContent.classList.remove('show');
                bookModal.classList.remove('show');

                setTimeout(() => {
                    bookModalContent.style.transformOrigin = "center center";
                }, 400);
            }
        });

        



    } catch (error) {
        console.error('Failed to load books:', error);
    }
}







// Function to display books in the books container
function displayBooks(books) {
    const container = document.getElementById('books-container');
    container.innerHTML = "";
    books.forEach(book => {
        const bookItem = document.createElement('div');

        bookItem.classList.add('book-item');
        bookItem.style.backgroundImage = `url(${book.image})`;
        bookItem.style.backgroundSize = "cover";
        bookItem.style.backgroundPosition = "center";
        bookItem.innerHTML = `
        

        `;
        bookItem.addEventListener('click', function () {
            modalBookCover.src = book.image;
            modalBookTitle.textContent = book.title;
            modalBookAuthor.textContent = `By ${book.author}`;
            modalBookRating.textContent = `Rating: ${book.rating}`;
            modalBookDescription.textContent = book.description;
            renderStars(modalBookRating, book.rating);

            bookItemRect = bookItem.getBoundingClientRect();
            zoom();
            bookModal.classList.add('show');
            bookModalContent.classList.add('show');
            setTimeout(() => {
                bookModalContent.style.transformOrigin = "center center";
            }, 400);
        });
        container.appendChild(bookItem);

    });
    updateSliderPosition();
}

// render star
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


function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
    }
}

function nextSlide() {
    const totalBooks = document.querySelectorAll('.book-item').length;
    if (currentIndex < Math.ceil(totalBooks / booksPerPage) - 1) {
        currentIndex++;
        updateSliderPosition();
    }
}

function updateSliderPosition() {
    const container = document.getElementById('books-container');
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Function to show books sorted by rating (high to low)

function showPopularBooks() {

    const sortedBooks = books.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    displayBooks(sortedBooks);

}

// Function to show books sorted by addedDate (newest to oldest)
function showNewAdditions() {
    const sortedBooks = books.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    displayBooks(sortedBooks);
}

function zoom() {
    const centerX = bookItemRect.left + bookItemRect.width / 2;
    const centerY = bookItemRect.top + bookItemRect.height / 2;
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;
    const offsetX = ((centerX - windowCenterX) / bookModalContent.offsetWidth) * 100;
    const offsetY = ((centerY - windowCenterY) / bookModalContent.offsetHeight) * 100;
    bookModalContent.style.transformOrigin = `${50 + offsetX}% ${50 + offsetY}%`;
}

function updateBooksPerPage() {
    if (window.innerWidth > 1280) {
        booksPerPage = 5;
    } else if (window.innerWidth > 640) {
        booksPerPage = 4;
    } else {
        booksPerPage = 3;
    }
}

document.addEventListener("DOMContentLoaded", function() {

    const exchangeData1Y = [150, 200, 180, 220, 250];
    const exchangeData6M = [100, 150, 200, 180, 220];
    const exchangeData3M = [80, 130, 150, 140, 200];
    let currentChart;

    function initializeChart(data) {
        const ctx = document.getElementById("exchangeChart").getContext("2d");
        if (currentChart) {
            currentChart.destroy(); 
        }
        currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [{
                    label: "Book Exchanges",
                    data: data,
                    borderColor: "#4a4a4a", 
                    backgroundColor: "rgba(74, 74, 74, 0.1)", 
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        grid: {
                            color: "#d3d3d3" 
                        },
                        ticks: {
                            color: "#4a4a4a"
                        }
                    },
                    y: {
                        grid: {
                            color: "#d3d3d3" 
                        },
                        ticks: {
                            color: "#4a4a4a" 
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    initializeChart(exchangeData1Y);

    document.querySelectorAll('.switch-btn').forEach((button, index) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.switch-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (index === 0) initializeChart(exchangeData1Y); // 1Y
            if (index === 1) initializeChart(exchangeData6M); // 6M
            if (index === 2) initializeChart(exchangeData3M); // 3M
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const userData = [300, 400, 500, 600, 750];

    new Chart(document.getElementById("userChart"), {
        type: 'bar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                label: "Users",
                data: userData,
                backgroundColor: "#8e8e8e",
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    grid: {
                        color: "#d3d3d3"
                    },
                    ticks: {
                        color: "#4a4a4a" 
                    }
                },
                y: {
                    grid: {
                        color: "#d3d3d3" 
                    },
                    ticks: {
                        color: "#4a4a4a" 
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

});
