const input = document.getElementById('searchBar');
const but = document.getElementById('cloakedbutton');
const searchsButton = document.getElementById('searchsButton');

input.addEventListener('keypress', async event => {
    event.preventDefault();

    if (event.key === 'Enter') {
        window.navigator.serviceWorker.register('./sw.js', {
            scope: __uv$config.prefix
        }).then(() => {
            let url = input.value.trim();
            if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
            else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

            window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
        });
    }
});

but.addEventListener('click', async event => {
    event.preventDefault();
    window.location.href = __uv$config.prefix + __uv$config.encodeUrl('https://www.google.com');
});

searchsButton.addEventListener('keypress', async event => {
    event.preventDefault();
    if (event.key === 'Enter') {
        window.navigator.serviceWorker.register('./sw.js', {
            scope: __uv$config.prefix
        }).then(() => {
            url = input.value;
            if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
            else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

            window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
        });
    }
});




function isUrl(val = '') {
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};