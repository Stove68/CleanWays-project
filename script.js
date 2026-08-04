alert("CleanWays Script läuft");

document.getElementById("map").style.backgroundColor = "red";

const map = L.map('map').setView([51.0, 10.0], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);
