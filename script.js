const map = L.map('map').setView([51.1657, 10.4515], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

/* Beispielroute Düsseldorf */

const route = [
    [51.2277, 6.7735],
    [51.2285, 6.7750],
    [51.2295, 6.7770],
    [51.2305, 6.7790]
];

L.polyline(route, {
    color: 'green',
    weight: 6
}).addTo(map);
