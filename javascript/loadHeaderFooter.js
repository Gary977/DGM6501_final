// loadHeaderFooter.js
// 'https://raw.githubusercontent.com/gary977/DGM6501_final/main/header.html'
// https://raw.githubusercontent.com/gary977/DGM6501_final/main/footer.html'
async function loadHeaderAndFooter() {

    document.body.style.display = 'none';

    try {

        const headerResponse = await fetch('https://raw.githubusercontent.com/gary977/DGM6501_final/main/header.html');
        const headerData = await headerResponse.text();
        document.getElementById('header-container').innerHTML = headerData;


        const footerResponse = await fetch('https://raw.githubusercontent.com/gary977/DGM6501_final/main/footer.html');
        const footerData = await footerResponse.text();
        document.getElementById('footer-container').innerHTML = footerData;


        const headerScript = document.createElement('script');
        headerScript.src = 'javascript/header.js';
        document.body.appendChild(headerScript);



        document.body.style.display = 'block';

    } catch (error) {
        console.error('Error loading header or footer:', error);

        document.body.style.display = 'block';
    }
}

loadHeaderAndFooter();
