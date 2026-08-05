const map = L.map('map').setView([51.1657, 10.4515], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let tracking = false;
let watchId = null;
let routePoints = [];
let routeLine = null;

let savedRoutes =
    JSON.parse(
        localStorage.getItem("cleanwaysRoutes")
    ) || [];

const status = document.getElementById("status");

document.getElementById("routeCount").innerText =
    "Sammelaktionen: " + savedRoutes.length;

/* Gespeicherte Routen laden */

savedRoutes.forEach(route => {

    L.polyline(route.points, {
        color: "green",
        weight: 6
    }).addTo(map);

});

/* Start */

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

/* Stop */

document.getElementById("stopBtn").addEventListener("click", () => {

    tracking = false;

    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
    }

    savedRoutes.push({
        date: new Date().toISOString(),
        points: routePoints
    });

    localStorage.setItem(
        "cleanwaysRoutes",
        JSON.stringify(savedRoutes)
    );

    document.getElementById("routeCount").innerText =
        "Sammelaktionen: " + savedRoutes.length;

    status.innerText =
        "✅ Sammelaktion beendet";

});
