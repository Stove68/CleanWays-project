const map = L.map("map").setView([51.1657, 10.4515], 6);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

L.marker([51.1657, 10.4515]).addTo(map);

let watchId = null;
let routePoints = [];

document.getElementById("startBtn").addEventListener("click", () => {

    watchId = navigator.geolocation.watchPosition((position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        routePoints.push([lat, lng]);

        console.log(routePoints);

    });

});
