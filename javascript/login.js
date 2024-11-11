
function loginUser(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
       

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);

        alert('Login successful!');
        window.location.href = 'index.html'; 
    } else {
        alert('Incorrect username or password.');
    }
}


document.getElementById('login-form').addEventListener('submit', loginUser);
