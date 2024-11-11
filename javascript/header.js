//for userinfo
const userDashboard = document.getElementById('userDashboard');
const userName = document.getElementById('userName');
const userAvatar = document.getElementById('userAvatar');
const userMenu = document.getElementById('userMenu');
// log in state
let isLoggedIn = false;

updateUserInfo();

//log in
userDashboard.addEventListener('click', () => {
    if (isLoggedIn) {
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
    } else {
        isLoggedIn = true;
    }
});

//user menu exit
window.addEventListener('click', (event) => {
    if (!userDashboard.contains(event.target)) {
        userMenu.style.display = 'none';
    }
});

function updateUserInfo() {
    if (isLoggedIn) {
        userName.textContent = "John Doe"; // 用户名
        userAvatar.src = "pictures/test.jpg"; // 用户头像
        userDashboard.classList.add('logged-in');
    } else {
        userName.textContent = "Log In";
        userAvatar.src = "pictures/default.png"; // 默认头像
        userDashboard.classList.remove('logged-in');
    }
}

