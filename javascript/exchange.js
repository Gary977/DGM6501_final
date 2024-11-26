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

        // 渲染书主的书籍信息
        const container = document.getElementById("exchange-page");
        const ownerBookHTML = `
        <div class="owner-book">
            <h2>Owner's Book</h2>
            <img src="${book.image}" alt="Owner's Book Cover">
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Condition:</strong> ${book.condition}</p>
            <p><strong>Notes:</strong> ${book.notes}</p>
        </div>
    `;
        container.innerHTML = ownerBookHTML + container.innerHTML;
    
    } else {
        container.innerHTML = "<p>Book not found.</p>";
    }
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

    // 创建 FileReader 来读取上传的图片
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

    // 清空表单
    document.querySelector(".upload-form").reset();
});
