const dropdownHeader = document.getElementById('dropdown-header');
const dropdownList = document.getElementById('dropdown-list');
const dropdownItems = document.querySelectorAll('.dropdown-item');


dropdownList.addEventListener('click', event => {
    const item = event.target.closest('.dropdown-item');
    if (item) {
        dropdownHeader.firstChild.nodeValue = item.firstChild.nodeValue.trim();

        dropdownItems.forEach(i => i.classList.remove('highlight'));
        item.classList.add('highlight');
    }
});

dropdownHeader.addEventListener('click', () => {
    dropdownList.classList.toggle('dropdown-list_open');
});
