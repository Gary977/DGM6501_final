let books = [];
const urlParams = new URLSearchParams(window.location.search);
const bookId = parseInt(urlParams.get("id")); 

document.addEventListener("DOMContentLoaded", async function () {

    try {
        const response = await fetch('https://raw.githubusercontent.com/gary977/DGM6501_final/main/json/books.json');
        if (!response.ok) throw new Error('Network response was not ok');
        books = await response.json();
    } catch (error) {
        console.error('Failed to load books:', error);
    }

    const book = books.find(b => b.id === bookId);

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
    } else {
        const container = document.querySelector(".book-detail-container");
        container.innerHTML = "<p>Book not found.</p>";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const commentInput = document.getElementById("comment-input");
    const submitCommentButton = document.getElementById("submit-comment");
    const commentsList = document.getElementById("comments-list");
    const starRatingContainer = document.getElementById("star-rating-container");
    const starContainer =document.getElementById("star-container");
    const starGuide = document.getElementById("star-guide");
    let selectedRating = 0;


    const currentUser = getCurrentUser();


    renderSavedComments();


    renderStarSelector();

    submitCommentButton.addEventListener("click", function () {
        const commentText = commentInput.value.trim();

        if (!selectedRating) {
            alert("Please select a star rating!");
            return;
        }

        if (!commentText) {
            alert("Please enter a comment!");
            return;
        }

        const comment = {
            username: currentUser,
            text: commentText,
            rating: selectedRating,
            time: new Date().toLocaleString()
        };

        saveComment(comment);
        addCommentToList(comment);
        commentInput.value = ""; 
        selectedRating = 0; 
        renderStarSelector(); 
    });

    function renderStarSelector() {
        starRatingContainer.innerHTML = ""; 
        starContainer.innerHTML = "";
        starRatingContainer.appendChild(starGuide);

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("div");
            star.classList.add("star", "empty"); 

            if (i <= selectedRating) {
                star.classList.remove("empty");
                star.classList.add("full");
            }

            star.addEventListener("mouseover", () => updateStarDisplay(i));
            star.addEventListener("mouseout", () => updateStarDisplay(selectedRating));
            star.addEventListener("click", () => {
                selectedRating = i;
                updateStarDisplay(selectedRating);
            });

            starContainer.appendChild(star);
            starRatingContainer.appendChild(starContainer);
        }
    }

    function updateStarDisplay(rating) {
        Array.from(starContainer.children).forEach((star, index) => {
            if (index < rating) {
                star.classList.remove("empty");
                star.classList.add("full");
            } else {
                star.classList.remove("full");
                star.classList.add("empty");
            }
        });
    }

    function saveComment(comment) {
        // 获取现有评论
        const allComments = JSON.parse(localStorage.getItem("comments")) || {};
        const bookComments = allComments[bookId] || [];

        // 添加新的评论到当前书籍的评论列表
        bookComments.push(comment);
        allComments[bookId] = bookComments;

        // 保存到 LocalStorage
        localStorage.setItem("comments", JSON.stringify(allComments));
    }

    function renderSavedComments() {
        const allComments = JSON.parse(localStorage.getItem("comments")) || {};
        const bookComments = allComments[bookId] || [];

        // 渲染当前书籍的评论
        bookComments.forEach(comment => addCommentToList(comment));
    }

    function addCommentToList(comment) {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");
        commentItem.innerHTML = `
            <div class="comment-header">
                <span class="comment-username">${comment.username}</span>
                <span class="comment-time">${comment.time}</span>
            </div>
            <p>${comment.text}</p>
            <div class="comment-rating">
                <span>Rating:</span>
                ${renderStarHTML(comment.rating)}
            </div>
        `;
        commentsList.prepend(commentItem); 
    }

    function renderStarHTML(rating) {
        let stars = "";
        for (let i = 1; i <= 5; i++) {
            stars += `<div class="star ${i <= rating ? "full" : "empty"}"></div>`;
        }
        return stars;
    }

    function getCurrentUser() {

        return localStorage.getItem("currentUser") || "Visitor";
    }
});



function renderStars(container, rating) {
    container.innerHTML = ''; // 清空容器内容

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
