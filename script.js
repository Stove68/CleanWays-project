const map = L.map('map').setView([51.1657, 10.4515], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let watchId = null;
let routePoints = [];
let routeLine = null;
let actionCounter = 0;

const status = document.getElementById("status");
const routeCount = document.getElementById("routeCount");

navigator.geolocation.getCurrentPosition((position) => {

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    map.setView([lat, lng], 16);

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup("Mein aktueller Standort");

});

document.getElementById("startBtn").addEventListener("click", () => {

    routePoints = [];

    status.innerText = "🟢 Sammelaktion läuft";

    watchId = navigator.geolocation.watchPosition((position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        routePoints.push([lat, lng]);

        if (routeLine) {
            map.removeLayer(routeLine);
        }

        routeLine = L.polyline(routePoints, {
            color: "green",
            weight: 6
        }).addTo(map);

    });

});

document.getElementById("stopBtn").addEventListener("click", () => {

    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
    }

    actionCounter++;

    routeCount.innerText =
        "Sammelaktionen: " + actionCounter;

    status.innerText =
        "✅ Sammelaktion beendet | GPS-Punkte: "
        + routePoints.length;

});
