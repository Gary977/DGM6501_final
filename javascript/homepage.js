//for slider
let currentIndex = 0;
let booksPerPage = 5;
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

// log in state
let isLoggedIn = false; // 更改为 true 时显示用户名

//for userinfo
const userDashboard = document.getElementById('userDashboard');
const userName = document.getElementById('userName');
const userAvatar = document.getElementById('userAvatar');
const userMenu = document.getElementById('userMenu');

//json data
const books = [
    {
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "rating": "4.5",
        "image": "pictures/book1.jpg",
        "addedDate": "2024-11-01T08:30:00Z",
        "description": "A classic novel of manners that explores issues of class, marriage, and morality."
    },
    {
        "title": "1984",
        "author": "George Orwell",
        "rating": "4.8",
        "image": "pictures/book2.jpg",
        "addedDate": "2024-11-02T09:00:00Z",
        "description": "A classic novel of manners that explores issues of class, marriage, and morality."
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "rating": "4.6",
        "image": "pictures/book3.jpg",
        "addedDate": "2024-11-03T10:15:00Z",
        "description": "A classic novel of manners that explores issues of class, marriage, and morality."
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "rating": "4.4",
        "image": "pictures/book4.jpg",
        "addedDate": "2024-11-04T11:45:00Z",
        "description": "A classic novel of manners that explores issues of class, marriage, and morality."
    },
    {
        "title": "Moby-Dick",
        "author": "Herman Melville",
        "rating": "4.3",
        "image": "pictures/book5.jpg",
        "addedDate": "2024-11-05T12:30:00Z",
        "description": "A classic novel of manners that explores issues of class, marriage, and morality."
    },
    {
        "title": "The Odyssey",
        "author": "Homer",
        "rating": "4.7",
        "image": "pictures/book6.jpg",
        "addedDate": "2024-11-06T13:00:00Z",
        "description": "The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is one of the oldest works of literature still widely read by modern audiences. Like the Iliad, the Odyssey is divided into 24 books. It follows the Greek hero Odysseus, king of Ithaca, and his journey home after the Trojan War. After the war, which lasted ten years, his journey from Troy to Ithaca, via Africa and southern Europe, lasted for ten additional years during which time he encountered many perils and all of his crewmates were killed."
    },
    {
        "title": "War and Peace",
        "author": "Leo Tolstoy",
        "rating": "4.8",
        "image": "pictures/book7.jpg",
        "addedDate": "2024-11-07T14:20:00Z",
        "description": "A classic novel of manners that explores issues of class, marriage, and morality."
    },
    {
        "title": "Crime and Punishment",
        "author": "Fyodor Dostoevsky",
        "rating": "4.7",
        "image": "pictures/book8.jpg",
        "addedDate": "2024-11-08T15:00:00Z",
        "description": "A classic novel of manners that explores issues of class, marriage, and morality."
    },
    {
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "rating": "4.2",
        "image": "pictures/book9.jpg",
        "addedDate": "2024-11-09T16:30:00Z",
        "description": "A classic novel of manners that explores issues of class, marriage, and morality."
    },
    {
        "title": "The Brothers Karamazov",
        "author": "Fyodor Dostoevsky",
        "rating": "4.6",
        "image": "pictures/book10.jpg",
        "addedDate": "2024-11-10T17:45:00Z",
        "description": "A classic novel of manners that explores issues of class, marriage, and morality."
    }
]

function updateUserInfo() {
    if (isLoggedIn) {
        userName.textContent = "John Doe"; // 用户名
        userAvatar.src = "pictures/test.jpg"; // 用户头像
        userDashboard.classList.add('logged-in');
    } else {
        userName.textContent = "Log In";
        userAvatar.src = "path/to/default-avatar.png"; // 默认头像
        userDashboard.classList.remove('logged-in');
    }
}

userDashboard.addEventListener('click', () => {
    if (isLoggedIn) {
        // 切换下拉菜单的显示状态
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
    } else {
        // 未登录时点击跳转到登录页面
        isLoggedIn = true;
    }
});

// 在页面加载时设置用户信息
updateUserInfo();

// 点击页面其他区域时关闭下拉菜单
window.addEventListener('click', (event) => {
    if (!userDashboard.contains(event.target)) {
        userMenu.style.display = 'none';
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



showPopularBooks(books);


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

window.addEventListener("resize", updateBooksPerPage);