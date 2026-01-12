Telegram.WebApp.ready();
Telegram.WebApp.expand();

console.log("[INIT] Telegram WebApp ready");

const tg = window.Telegram?.WebApp;
const loc = tg?.LocationManager;
const listContainer = document.getElementById("shopsList");

// const DEFAULT_CENTER = [55.755864, 37.617698]; // МОСКВА
const DEFAULT_CENTER = [59.938784, 30.314997]; // СПБ

const shops = [
    {
        id: 1,
        name: "Пора Парить",
        address: "Будапештская ул., 72, корп. 1, Санкт-Петербург",
    },
    { id: 2, name: "S2B", address: "Южное ш., 53, корп. 2, Санкт-Петербург" },
    {
        id: 3,
        name: "Табакон",
        address: "просп. Космонавтов, 14, Санкт-Петербург",
    },
    { id: 4, name: "Табачная Лавка", address: "Ленинградская ул., 57, Пушкин" },
    { id: 5, name: "Табакон", address: "Пролетарская ул., 36, Колпино" },
    {
        id: 6,
        name: "Boogie Shop",
        address: "Большая Конюшенная ул., 17, Санкт-Петербург",
    },
    {
        id: 7,
        name: "Saint Smoke",
        address: "ул. Радищева, 38/20, Санкт-Петербург",
    },
    { id: 8, name: "S2B", address: "Оранжерейная ул., 60А, Пушкин" },
    { id: 9, name: "SharkVape", address: "ул. Веры Слуцкой, 89, Колпино" },
    {
        id: 10,
        name: "Vape Zone",
        address: "Московский просп., 39, Санкт-Петербург",
    },
];

const shopSvg = `<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 640 512"
                    aria-hidden="true"
                >
                    <path
                        fill="currentColor"
                        d="M0 155.2L51.2 32h537.6L640 155.2v52.8c0 29.1-23.7 52.8-52.8 52.8-21.7 0-40.4-13.2-48-32-7.6 18.8-26.3 32-48 32s-40.4-13.2-48-32c-7.6 18.8-26.3 32-48 32s-40.4-13.2-48-32c-7.6 18.8-26.3 32-48 32s-40.4-13.2-48-32c-7.6 18.8-26.3 32-48 32s-40.4-13.2-48-32c-7.6 18.8-26.3 32-48 32-29.1 0-52.8-23.7-52.8-52.8V155.2zM96 480V288c16.7 10.1 36.3 16 57.6 16 21.6 0 41.5-6.1 57.6-16 16.1 9.9 36 16 57.6 16s41.5-6.1 57.6-16c16.1 9.9 36 16 57.6 16s41.5-6.1 57.6-16c16.1 9.9 36 16 57.6 16s41.5-6.1 57.6-16V480c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32z"
                    />
                </svg>`;

const distanceSvg = `<svg
                                class="distance-icon"
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                style="margin-top: 1px;"
                            >
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94z"/>
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                            </svg>`;

let map;
let userCoords = DEFAULT_CENTER;
let userPlacemark = null;

function renderShopCard(shop, coords) {
    const card = document.createElement("div");
    card.className = "location-card";

    card.innerHTML = `
        <div class="location-icon">${shopSvg}</div>
        <div class="location-info">
            <div class="location-name">${shop.name}</div>
            <div class="location-address">${shop.address}</div>
        </div>
        <div class="location-distance" id="dist-${shop.id}">${distanceSvg}</div>
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

    const BalloonLayout = ymaps.templateLayoutFactory.createClass(`
        <div class="tg-balloon">
            <div class="tg-balloon__title">$[properties.name]</div>
            <div class="tg-balloon__address">$[properties.address]</div>
            <button class="tg-balloon__btn" onclick="openRoute($[properties.lat], $[properties.lon])">
                Построить маршрут
            </button>
        </div>
    `);

    for (const shop of shops) {
        const coords = await geocode(shop.address);
        if (!coords) continue;

        const placemark = new ymaps.Placemark(
            coords,
            {
                name: shop.name,
                address: shop.address,
                lat: coords[0],
                lon: coords[1],
            },
            {
                balloonLayout: BalloonLayout,
                balloonPanelMaxMapArea: 0,
                hideIconOnBalloonOpen: false,
                preset: "islands#redIcon",
            }
        );

        map.geoObjects.add(placemark);
        console.log("[MAP] shop added:", shop.name);
        renderShopCard(shop, coords);
    }

    initTelegramLocation();
});
