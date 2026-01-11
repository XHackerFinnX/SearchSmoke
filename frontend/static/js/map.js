Telegram.WebApp.ready();
Telegram.WebApp.expand();

console.log("[INIT] Telegram WebApp ready");

const tg = window.Telegram?.WebApp;
const loc = tg?.LocationManager;
const listContainer = document.getElementById("shopsList");

// const DEFAULT_CENTER = [55.755864, 37.617698]; // МОСКВА
const DEFAULT_CENTER = [59.938784, 30.314997]; // СПБ

const shops = [
    { id: 1, name: "Пора Парить", address: "Будапештская ул., 72, корп. 1, Санкт-Петербург" },
    { id: 2, name: "S2B", address: "Южное ш., 53, корп. 2, Санкт-Петербург" },
    { id: 3, name: "Табакон", address: "просп. Космонавтов, 14, Санкт-Петербург" },
    { id: 4, name: "Табачная Лавка", address: "Ленинградская ул., 57, Пушкин" },
    { id: 5, name: "Табакон", address: "Пролетарская ул., 36, Колпино" },
    { id: 6, name: "Boogie Shop", address: "Большая Конюшенная ул., 17, Санкт-Петербург" },
    { id: 7, name: "Saint Smoke", address: "ул. Радищева, 38/20, Санкт-Петербург" },
    { id: 8, name: "S2B", address: "Оранжерейная ул., 60А, Пушкин" },
    { id: 9, name: "SharkVape", address: "ул. Веры Слуцкой, 89, Колпино" },
    { id: 10, name: "Vape Zone", address: "Московский просп., 39, Санкт-Петербург" },
];

let map;
let userCoords = DEFAULT_CENTER;
let userPlacemark = null;

function renderShopCard(shop, coords) {
    const card = document.createElement("div");
    card.className = "location-card";

    card.innerHTML = `
        <div class="location-icon">🏪</div>
        <div class="location-info">
            <div class="location-name">${shop.name}</div>
            <div class="location-address">${shop.address}</div>
        </div>
        <div class="location-distance" id="dist-${shop.id}">—</div>
    `;

    card.onclick = () => openRoute(coords[0], coords[1]);

    listContainer.appendChild(card);
}


/* ================= GEO LOCATION (TELEGRAM) ================= */

function initTelegramLocation() {
    if (!loc) {
        console.warn("[GEO] LocationManager not available");
        return;
    }

    loc.init(() => {
        console.log("[GEO] init");

        if (!loc.isLocationAvailable) {
            console.warn("[GEO] not available");
            return;
        }

        loc.getLocation((pos) => {
            if (!pos) {
                console.warn("[GEO] location denied or unavailable");
                return;
            }

            userCoords = [pos.latitude, pos.longitude];
            console.log("[GEO] coords:", userCoords);

            updateUserPosition();
        });
    });
}

document.getElementById("geoSettingsBtn")?.addEventListener("click", () => {
    console.log("[GEO] open settings");
    tg?.LocationManager?.openSettings();
});

/* ================= MAP ================= */

async function geocode(address) {
    const res = await ymaps.geocode(address);
    const first = res.geoObjects.get(0);
    if (!first) return null;
    return first.geometry.getCoordinates();
}

function updateUserPosition() {
    if (!map) return;

    map.setCenter(userCoords, 14);

    if (!userPlacemark) {
        userPlacemark = new ymaps.Placemark(
            userCoords,
            { balloonContent: "Вы здесь" },
            { preset: "islands#blueCircleIcon" }
        );
        map.geoObjects.add(userPlacemark);
        console.log("[MAP] user placemark created");
    } else {
        userPlacemark.geometry.setCoordinates(userCoords);
        console.log("[MAP] user placemark updated");
    }
}

function openRoute(lat, lon) {
    const url = `https://yandex.ru/maps/?rtext=~${lat},${lon}&rtt=auto`;
    console.log("[ROUTE] open:", url);
    Telegram.WebApp.openLink(url);
}

/* ================= INIT MAP ================= */

ymaps.ready(async () => {
    console.log("[MAP] ymaps ready");

    map = new ymaps.Map("map", {
        center: userCoords,
        zoom: 12,
        controls: [],
    });

    console.log("[MAP] created");

    for (const shop of shops) {
        const coords = await geocode(shop.address);
        if (!coords) continue;

        const placemark = new ymaps.Placemark(
            coords,
            {
                balloonContent: `
                    <b>${shop.name}</b><br>
                    ${shop.address}<br><br>
                    <button onclick="openRoute(${coords[0]}, ${coords[1]})">
                        Построить маршрут
                    </button>
                `,
            },
            { preset: "islands#redIcon" }
        );

        map.geoObjects.add(placemark);
        console.log("[MAP] shop added:", shop.name);
        renderShopCard(shop, coords);
    }

    initTelegramLocation();
});
