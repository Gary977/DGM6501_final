
function loadUserData() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    const userData = JSON.parse(localStorage.getItem(currentUser));
    if (userData) {
        document.getElementById('username-display').textContent = currentUser;
        document.getElementById('email-display').textContent = userData.email;
        document.getElementById('username').textContent = currentUser;
        document.getElementById('email').textContent = userData.email;
        document.getElementById('birthdate').value = userData.birthdate || "";
        document.getElementById('bio').value = userData.bio || "";
        document.getElementById('avatar-preview').src = userData.avatar || "images/default-avatar.png";
    }
}


function saveUserData() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    const birthdate = document.getElementById('birthdate').value;
    const bio = document.getElementById('bio').value;
    const avatarSrc = document.getElementById('avatar-preview').src;

    const userData = JSON.parse(localStorage.getItem(currentUser)) || {};
    userData.birthdate = birthdate;
    userData.bio = bio;
    userData.avatar = avatarSrc;

    localStorage.setItem(currentUser, JSON.stringify(userData));


    const saveMessage = document.getElementById('save-message');
    saveMessage.style.display = 'block';
    setTimeout(() => saveMessage.style.display = 'none', 2000); 
}


function updateAvatar() {
    const fileInput = document.getElementById('avatar-input');
    const avatarPreview = document.getElementById('avatar-preview');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            avatarPreview.src = e.target.result;
            const currentUser = localStorage.getItem('currentUser');
            const userData = JSON.parse(localStorage.getItem(currentUser)) || {};
            userData.avatar = e.target.result;
            localStorage.setItem(currentUser, JSON.stringify(userData));
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadUserData();

 
    document.getElementById('save').addEventListener('click', saveUserData);
});
