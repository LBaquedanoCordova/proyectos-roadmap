const textArea = document.querySelector('.textArea');
const span = document.querySelector('.update');

const maxLength = 250;

textArea.addEventListener('input', e => {
    let text = e.target.value;
    if (text.length > maxLength) {
        e.target.value = text.slice(0, maxLength);
        text = e.target.value;
    }

    span.textContent = text.length;

    if (text.length === maxLength) {
        textArea.style.border = '1px solid red';
    } else {
        textArea.style.border = '';
    }

})