const elementsDetails = document.querySelectorAll('.details');


elementsDetails.forEach(detailElem => {
    detailElem.addEventListener('toggle', () => {
        if (detailElem.open) {
            elementsDetails.forEach(detail => {
                console.log(detailElem !== detail);
                if (detailElem !== detail) {
                    detail.removeAttribute('open');
                }
            })
        }
    })
})
