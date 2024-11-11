// loadHeaderFooter.js


fetch('../header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        const headerScript = document.createElement('script');
        headerScript.src = 'javascript/header.js'; // 路径根据实际情况调整
        document.body.appendChild(headerScript);
    })
    .catch(error => console.error('Error loading header:', error));


fetch('../footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
