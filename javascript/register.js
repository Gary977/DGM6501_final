
function registerUser(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm-password').value;

    if (localStorage.getItem(username)) {
        alert('This username is already taken.');
        return;
    }

    if(password !== confirm){
        alert('Please ensure the confirm password is correct.')
        return;
    }

    const userData = {
        email: email,
        password: password,
    };
    localStorage.setItem(username, JSON.stringify(userData));
    

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);

    alert('Registration successful!');
    window.location.href = 'index.html'; 
}


document.getElementById('register-form').addEventListener('submit', registerUser);
