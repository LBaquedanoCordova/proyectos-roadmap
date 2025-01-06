const contentDiv = document.getElementById("content");
const anchorElement = document.querySelectorAll('a');



const loadPage = url => {
  fetch(url)
    .then(response => {
        if (!response.ok) throw new Error('Error al cargar la pagina');
        return response.text();
    })
    .then(html => {
        const match = html.match(/<div.+?<\/div>/gs);
        
        contentDiv.innerHTML = match;
    })
    .catch(error => contentDiv.innerHTML = `<p>Error: ${error.message}</p>`);
};

loadPage('./other-Tabs/first.html');


anchorElement.forEach(a => {
    a.addEventListener('click', e =>  {
        e.preventDefault();

        const url = a.dataset.page;
        loadPage(`./other-Tabs/${url}`);
    })
})

