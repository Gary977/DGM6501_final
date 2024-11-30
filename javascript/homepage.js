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
const detail = document.getElementById('detailsButton')
const closeButton = document.querySelector('.close-button');

let bookItemRect = null;

initialize();

// https://raw.githubusercontent.com/gary977/DGM6501_final/main/json/books.json
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
        bookItem.innerHTML = ``;
        bookItem.addEventListener('click', function () {
            modalBookCover.src = book.image;
            modalBookTitle.textContent = book.title;
            modalBookAuthor.textContent = `By ${book.author}`;
            modalBookRating.textContent = `Rating: ${book.rating}`;
            modalBookDescription.textContent = book.description;
            detail.href=`detail.html?id= ${book.id}`;
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

document.addEventListener("DOMContentLoaded", function () {
    // 定义每年的数据
    const moneySavingData = {
        2022: [250, 260, 240, 290, 300, 310, 280, 260, 270, 320, 300, 330],
        2023: [320, 340, 300, 310, 380, 360, 350, 400, 370, 390, 420, 390],
        2024: [400, 380, 410, 470, 450, 430, 440, 410, 420, 460, 450, 420]
    };
    let currentChart;
    const currentYear = 2022;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
    updateStats(currentYear);
    initializeChart(moneySavingData[2024], months);


    document.querySelectorAll('.switch-btn').forEach((button, index) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.switch-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const year = [2022, 2023, 2024][index]; // 根据按钮切换年份
            initializeChart(moneySavingData[year], months);
            updateStats(year);
        });
    });

    function initializeChart(data, labels) {
        const ctx = document.getElementById("exchangeChart").getContext("2d");
        if (currentChart) {
            currentChart.destroy();
        }
        currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels, 
                datasets: [{
                    label: "Money Saved ($)",
                    data: data,
                    borderColor: "#FFD700", 
                    backgroundColor: "rgba(255, 215, 0, 0.3)",
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
                            color: "#4a4a4a",
                            callback: function (value) {
                                return `$${value}`; 
                            }
                        }
                    }
                },
                plugins: {
                    legend: { display: true } 
            }
        }
        });
    }


    function updateStats(year) {
        const totalMoneySaved = moneySavingData[year].reduce((acc, val) => acc + val, 0); 
        const totalExchanges = Math.floor(totalMoneySaved /15) ;

        document.getElementById("total-money").textContent = `$${totalMoneySaved}`;
        document.getElementById("total-exchanges").textContent = totalExchanges;
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const bookExchangeData = [300, 400, 500, 600, 750]; 
    const carbonReductionData = bookExchangeData.map(exchange => exchange * 2.5); 

    new Chart(document.getElementById("userChart"), {
        type: 'bar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"], 
            datasets: [{
                label: "CO₂ Reduced (kg)", 
                data: carbonReductionData, 
                backgroundColor: "#4caf50", 
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
                    beginAtZero: true, 
                    grid: {
                        color: "#d3d3d3" 
                    },
                    ticks: {
                        color: "#4a4a4a" 
                    }
                }
            },
            plugins: {
                legend: { display: true } 
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".timeline-step");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    entry.target.classList.remove("active");
                }
            });
        },
        { threshold: 0.5 } 
    );

    steps.forEach((step) => observer.observe(step));
});

document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".step");

    // 滚动动画
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = "scale(1)";
                    entry.target.style.opacity = "1";
                } else {
                    entry.target.style.transform = "scale(0.8)";
                    entry.target.style.opacity = "0.5";
                }
            });
        },
        { threshold: 0.2 }
    );

    steps.forEach((step) => {
        step.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        observer.observe(step);
    });
});
