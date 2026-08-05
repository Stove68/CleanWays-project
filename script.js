const map = L.map('map').setView([51.1657, 10.4515], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let tracking = false;
let watchId = null;
let routePoints = [];
let routeLine = null;

const status = document.getElementById("status");

document.getElementById("startBtn").addEventListener("click", () => {

    tracking = true;
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

        map.setView([lat, lng], 17);

    });

});

document.getElementById("stopBtn").addEventListener("click", () => {

    tracking = false;

    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
    }

    status.innerText =
        "✅ Sammelaktion beendet | GPS-Punkte: "
        + routePoints.length;
});
