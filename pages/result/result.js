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

let sqlQuery = `
    SELECT DISTINCT "Site_Name"
    FROM "28ab00ec-00dd-4edf-b272-0543df4dcbe5"
    WHERE "TransactionDateutc" >= '2024-07-31T00:00:00'
    AND "TransactionDateutc" < '2024-08-01T00:00:00'
`;

$.ajax({
    url: 'https://www.data.qld.gov.au/api/3/action/datastore_search_sql',
    data: {
        sql: sqlQuery
    },
    dataType: 'jsonp',
    success: function(data) {
        console.log('Total unique Site Names found: ' + data.result.records.length);
        data.result.records.forEach(function(record) {
            console.log('Site Name:', record.Site_Name);
        });
    },
    error: function(error) {
        console.error('Error fetching data:', error);
    }
});
