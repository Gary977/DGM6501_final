//for userinfo
const userDashboard = document.getElementById('userDashboard');
const userName = document.getElementById('userName');
const userAvatar = document.getElementById('userAvatar');
const userMenu = document.getElementById('userMenu');
// log in state
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const logoutOption = document.getElementById('logoutOption');

updateUserInfo();

//log in
userDashboard.addEventListener('click', () => {
    if (isLoggedIn) {
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
    } else {
        window.location.href = 'login.html';
    }
});

logoutOption.addEventListener('click', () => {
    logoutUser();
});

//user menu exit
window.addEventListener('click', (event) => {
    if (!userDashboard.contains(event.target)) {
        userMenu.style.display = 'none';
    }
});

function updateUserInfo() {

    if (isLoggedIn) {
        const currentUser = localStorage.getItem('currentUser');
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userName.textContent = currentUser;
        userAvatar.src = userData.avatar; 
        userDashboard.classList.add('logged-in');
    } else {
        userName.textContent = "Log In";
        userAvatar.src = "icons/login.png"; 
        userDashboard.classList.remove('logged-in');
    }
}

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = 'login.html'; 
}

document.addEventListener('DOMContentLoaded', updateUserInfo);

