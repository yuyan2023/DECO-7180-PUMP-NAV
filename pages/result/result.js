let isPriceAscending = true;
let isDistanceAscending = true;
let isFuelTypeAscending = true;

const priceButton = document.getElementById('price-button');
const distanceButton = document.getElementById('distance-button');
const typeButton = document.getElementById('fuel-type-button');

priceButton.addEventListener('click', function() {
    isPriceAscending = !isPriceAscending;

    if (isPriceAscending) {
        priceButton.textContent = 'Price ▲';
    } else {
        priceButton.textContent = 'Price ▼';
    }
});

distanceButton.addEventListener('click', function() {
    isDistanceAscending = !isDistanceAscending;

    if (isDistanceAscending) {
        distanceButton.textContent = 'Distance ▲';
    } else {
        distanceButton.textContent = 'Distance ▼';
    }
});

typeButton.addEventListener('click', function() {
    isFuelTypeAscending = !isFuelTypeAscending;

    if (isFuelTypeAscending) {
        typeButton.textContent = 'Fuel Type ▲';
    } else {
        typeButton.textContent = 'Fuel Type ▼';
    }
});
