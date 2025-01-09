const showCookieBanner = () => {

    if (!localStorage.getItem('cookiesAccepted')) {
        const cookieBanner = document.createElement('div');
        const overlay = document.createElement('div');
        const footer = document.querySelector('.footer');

        cookieBanner.className = 'cookie-banner';
        cookieBanner.innerHTML = `<p>We use cookies to improve your user experience</p>
        <button class="accept-btn">I like cookies</button>`;

        overlay.className = 'overlay';

        footer.after(cookieBanner);
        cookieBanner.after(overlay);

        const acceptButton = cookieBanner.querySelector('.accept-btn');
        handleCookieAcceptance(acceptButton, cookieBanner, overlay);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    showCookieBanner();
});


function handleCookieAcceptance(acceptButton, cookieBanner, overlay) {
    acceptButton.addEventListener('click', () => {
        
        localStorage.setItem('cookiesAccepted', 'true');

        cookieBanner.remove();
        overlay.remove();
    });
}

//hacer git add, commit y push
//pasar al sgte