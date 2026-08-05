const map = L.map('map').setView([51.1657, 10.4515], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

/* Beispielroute */

const route = [
    [51.2277, 6.7735],
    [51.2285, 6.7750],
    [51.2295, 6.7770],
    [51.2305, 6.7790]
];

L.polyline(route, {
    color: 'green',
    weight: 8
}).addTo(map);

/* Aktueller Standort */

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        map.setView([lat, lon], 15);

        L.marker([lat, lon])
            .addTo(map)
            .bindPopup("Mein aktueller Standort")

    });

}
