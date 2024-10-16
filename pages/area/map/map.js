import "../../../components/nav.js"

document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([-27.4698, 153.0251], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    function getLatestUniqueBrandStations(data) {
        const brandMap = new Map();

        data.forEach(station => {
            const brand = station.Site_Brand || 'Unknown';
            const currentStation = brandMap.get(brand);

            if (!currentStation || new Date(station.Last_Updated) > new Date(currentStation.Last_Updated)) {
                brandMap.set(brand, station);
            }
        });

        return Array.from(brandMap.values());
    }

    function addMarkersAndUpdateList(data) {
        // Clear existing markers and station list
        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
        const stationList = document.getElementById('station-details');
        stationList.innerHTML = '';

        // Get latest unique brand stations
        const uniqueStations = getLatestUniqueBrandStations(data);

        // Add new markers and update station list
        uniqueStations.forEach(station => {
            const popupContent = `
            <strong>${station.Site_Name}</strong><br/>
            Address: ${station.Sites_Address_Line_1}<br/>
            Suburb: ${station.Site_Suburb}<br/>
            Brand: ${station.Site_Brand || 'Unknown'}<br/>
            Fuel Type: ${station.Fuel_Type || 'N/A'}<br/>
            Price: $${(station.Price / 100).toFixed(2)} AUD<br/>
            Last Updated: ${new Date(station.Last_Updated).toLocaleString()}
        `;

            L.marker([station.Site_Latitude, station.Site_Longitude])
                .bindPopup(popupContent)
                .addTo(map);

            // Create improved station card
            const card = document.createElement('div');
            card.className = 'station-card';
            card.innerHTML = `
            <h3>${station.Site_Name}</h3>
            <p><strong>Address:</strong> ${station.Sites_Address_Line_1}, ${station.Site_Suburb}</p>
            <p><strong>Brand:</strong> ${station.Site_Brand || 'Unknown'}</p>
            <p><strong>Fuel Type:</strong> ${station.Fuel_Type || 'N/A'}</p>
            <p class="price">Price: $${(station.Price / 100).toFixed(2)} AUD</p>
            <p class="last-updated">Last Updated: ${new Date(station.Last_Updated).toLocaleString()}</p>
        `;
            stationList.appendChild(card);
        });
    }

    function fetchStations(suburb) {
        var sql = encodeURIComponent(`SELECT * FROM "28ab00ec-00dd-4edf-b272-0543df4dcbe5" WHERE "Site_Suburb" = '${suburb}'`);
        fetch(`https://www.data.qld.gov.au/api/3/action/datastore_search_sql?sql=${sql}`)
            .then(response => response.json())
            .then(json => {
                if (json.result && json.result.records) {
                    const firstRecord = json.result.records[0];
                    if (firstRecord && firstRecord.Site_Latitude && firstRecord.Site_Longitude) {
                        map.setView([firstRecord.Site_Latitude, firstRecord.Site_Longitude], 15);
                    }
                    addMarkersAndUpdateList(json.result.records);
                } else {
                    console.error('No records found or error in response:', json);
                }
            })
            .catch(error => console.error('Error loading the data:', error));
    }

    function populateSuburbs() {
        var sql = encodeURIComponent(`SELECT DISTINCT "Site_Suburb" FROM "28ab00ec-00dd-4edf-b272-0543df4dcbe5"`);
        fetch('https://www.data.qld.gov.au/api/3/action/datastore_search_sql?sql=' + sql)
            .then(response => response.json())
            .then(json => {
                if (json.result && json.result.records) {
                    var suburbSelector = document.getElementById('suburbSelector');
                    json.result.records.forEach(record => {
                        var option = new Option(record.Site_Suburb, record.Site_Suburb);
                        suburbSelector.add(option);
                    });
                } else {
                    console.error('No suburbs found or error in response:', json);
                }
            })
            .catch(error => console.error('Error loading suburbs:', error));
    }

    document.getElementById('suburbSelector').addEventListener('change', function () {
        fetchStations(this.value);
    });

    populateSuburbs();
});