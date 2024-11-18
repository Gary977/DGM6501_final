let books = [];

document.addEventListener("DOMContentLoaded", function () {
    // 获取 URL 参数中的书籍 ID

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get("id")); // 假设传递的是 ?id=1

    loadBook();
    // 根据书籍 ID 加载对应书籍
    const book = books.find(b => b.id === bookId);

    if (book) {
        // 动态填充书籍信息
        document.getElementById("book-cover").src = book.image;
        document.getElementById("book-title").textContent = book.title;
        document.getElementById("book-author").textContent = `by ${book.author}`;
        document.getElementById("book-rating").textContent = `Rating: ${book.rating}`;
        document.getElementById("book-description").textContent = book.description;
        document.getElementById("book-added-date").textContent = `Added: ${new Date(book.addedDate).toLocaleDateString()}`;
    } else {
        // 如果没有找到书籍
        const container = document.querySelector(".book-detail-container");
        // container.innerHTML = "<p>Book not found.</p>";
    }

    // 评论功能
    const commentInput = document.getElementById("comment-input");
    const submitCommentButton = document.getElementById("submit-comment");
    const commentsList = document.getElementById("comments-list");

    submitCommentButton.addEventListener("click", function () {
        const commentText = commentInput.value.trim();
        if (commentText) {
            addComment(commentText);
            commentInput.value = ""; // 清空输入框
        } else {
            alert("Please enter a comment!");
        }
    });

    function addComment(text) {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");
        commentItem.innerHTML = `<p>${text}</p><span>Posted just now</span>`;
        commentsList.prepend(commentItem);
    }
});

async function loadBook() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/gary977/DGM6501_final/main/json/books.json');
        if (!response.ok) throw new Error('Network response was not ok');
        books = await response.json();
    } catch (error) {
        console.error('Failed to load books:', error);
    }
}
