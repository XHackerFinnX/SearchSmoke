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
        address: "Будапештская улица, 72к1, Санкт-Петербург, 192284",
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

const shopMapSvg = `<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 640 512"
                    aria-hidden="true"
                >
                    <path
                        fill="currentColor"
                        d="M0 155.2L51.2 32h537.6L640 155.2v52.8c0 29.1-23.7 52.8-52.8 52.8-21.7 0-40.4-13.2-48-32-7.6 18.8-26.3 32-48 32s-40.4-13.2-48-32c-7.6 18.8-26.3 32-48 32s-40.4-13.2-48-32c-7.6 18.8-26.3 32-48 32s-40.4-13.2-48-32c-7.6 18.8-26.3 32-48 32s-40.4-13.2-48-32c-7.6 18.8-26.3 32-48 32-29.1 0-52.8-23.7-52.8-52.8V155.2zM96 480V288c16.7 10.1 36.3 16 57.6 16 21.6 0 41.5-6.1 57.6-16 16.1 9.9 36 16 57.6 16s41.5-6.1 57.6-16c16.1 9.9 36 16 57.6 16s41.5-6.1 57.6-16c16.1 9.9 36 16 57.6 16s41.5-6.1 57.6-16V480c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32z"
                    />
                </svg>`;

const distanceMapSvg = `<svg
                                class="distance-icon"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                style="margin-top: 1px;"
                            >
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94z"/>
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                            </svg>`;

const itineraryMapSvg = `                            
<svg fill="#ffffff" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M8.82929429,20 C8.41745788,21.1651924 7.30621883,22 6,22 C4.34314575,22 3,20.6568542 3,19 C3,17.3431458 4.34314575,16 6,16 C7.30621883,16 8.41745788,16.8348076 8.82929429,18 L17.5,18 C18.8807119,18 20,16.8807119 20,15.5 C20,14.1192881 18.8807119,13 17.5,13 L6.5,13 C4.01471863,13 2,10.9852814 2,8.5 C2,6.01471863 4.01471863,4 6.5,4 L9.58578644,4 L8.29289322,2.70710678 L9.70710678,1.29289322 L13.4142136,5 L9.70710678,8.70710678 L8.29289322,7.29289322 L9.58578644,6 L6.5,6 C5.11928813,6 4,7.11928813 4,8.5 C4,9.88071187 5.11928813,11 6.5,11 L17.5,11 C19.9852814,11 22,13.0147186 22,15.5 C22,17.9852814 19.9852814,20 17.5,20 L8.82929429,20 Z M6,18 C5.44771525,18 5,18.4477153 5,19 C5,19.5522847 5.44771525,20 6,20 C6.55228475,20 7,19.5522847 7,19 C7,18.4477153 6.55228475,18 6,18 Z M18,2 C19.6568542,2 21,3.34314575 21,5 C21,6.65685425 19.6568542,8 18,8 C16.3431458,8 15,6.65685425 15,5 C15,3.34314575 16.3431458,2 18,2 Z M18,4 C17.4477153,4 17,4.44771525 17,5 C17,5.55228475 17.4477153,6 18,6 C18.5522847,6 19,5.55228475 19,5 C19,4.44771525 18.5522847,4 18,4 Z"/>
</svg>`;

const copyMapSvg = `<svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="#FFFFFF"
                            stroke="#FFFFFF"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#a)">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M8 5h7.795c1.115 0 1.519.116 1.926.334.407.218.727.538.945.945.218.407.334.811.334 1.926V16a1 1 0 1 0 2 0V8.128c0-1.783-.186-2.43-.534-3.082a3.635 3.635 0 0 0-1.512-1.512C18.302 3.186 17.655 3 15.872 3H8a1 1 0 0 0 0 2zm7.721 2.334C15.314 7.116 14.91 7 13.795 7h-7.59c-1.115 0-1.519.116-1.926.334a2.272 2.272 0 0 0-.945.945C3.116 8.686 3 9.09 3 10.205v7.59c0 1.114.116 1.519.334 1.926.218.407.538.727.945.945.407.218.811.334 1.926.334h7.59c1.114 0 1.519-.116 1.926-.334.407-.218.727-.538.945-.945.218-.407.334-.811.334-1.926v-7.59c0-1.115-.116-1.519-.334-1.926a2.272 2.272 0 0 0-.945-.945z"
                                    fill="#FFFFFF"
                                />
                            </g>

                            <defs>
                                <clipPath id="a">
                                    <path d="M0 0h24v24H0z" />
                                </clipPath>
                            </defs>
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
    const res = await ymaps.geocode(address, { results: 1 });
    const first = res.geoObjects.get(0);
    if (!first) return null;

    return {
        coords: first.geometry.getCoordinates(),
        oid: first.properties.get("CompanyMetaData")?.id || null,
    };
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

    map.events.add("click", (e) => {
        const target = e.get("target");

        if (!(target instanceof ymaps.Placemark)) {
            map.geoObjects.each((obj) => {
                if (obj.balloon && obj.balloon.isOpen()) {
                    obj.balloon.close();
                }
            });
        }
    });

    console.log("[MAP] created");

    const BalloonLayout = ymaps.templateLayoutFactory.createClass(
        `
<div class="tg-balloon">
    <div class="tg-balloon__title">$[properties.name]</div>
    <div class="tg-balloon__address">$[properties.address]</div>
    
    <div class="tg-balloon__actions">
        <button class="tg-balloon__btn-route">
            ${itineraryMapSvg} Маршрут
        </button>

        <button class="tg-balloon__btn-map">
            ${distanceMapSvg}
        </button>

        <button class="tg-balloon__btn-catalog">
            ${shopMapSvg}
        </button>
        <button class="tg-balloon__btn-copy">
              ${copyMapSvg}
          </button>
    </div>
</div>
`,
        {
            build: function () {
                BalloonLayout.superclass.build.call(this);

                this._element = this.getElement();

                this._btnRoute = this._element.querySelector(
                    ".tg-balloon__btn-route"
                );
                this._btnMap = this._element.querySelector(
                    ".tg-balloon__btn-map"
                );
                this._btnCatalog = this._element.querySelector(
                    ".tg-balloon__btn-catalog"
                );
                this._btnCopy = this._element.querySelector(
                    ".tg-balloon__btn-copy"
                );

                this._onRouteClick = () => {
                    openRoute(
                        this.getData().properties.get("lat"),
                        this.getData().properties.get("lon")
                    );
                };

                this._onMapClick = () => {
                    const lat = this.getData().properties.get("lat");
                    const lon = this.getData().properties.get("lon");
                    const oid = this.getData().properties.get("oid");

                    let url;

                    if (oid) {
                        url = `https://yandex.ru/maps/?mode=poi&poi[uri]=ymapsbm1://org?oid=${oid}&pt=${lon},${lat}&z=21`;
                    } else {
                        url = `https://yandex.ru/maps/?pt=${lon},${lat}&z=17&l=map`;
                    }

                    Telegram.WebApp.openLink(url);
                };

                this._onCatalogClick = () => {
                    Telegram.WebApp.openLink(
                        "/frontend/templates/catalog.html"
                    );
                };

                this._onCopyClick = () => {
                    const address = this.getData().properties.get("address");
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(address).then(() => {
                            console.log("[CLIPBOARD] Address copied:", address);

                            this._btnCopy.classList.add("copied");
                            setTimeout(() => {
                                this._btnCopy.classList.remove("copied");
                            }, 1500);
                        });
                    } else {
                        prompt("Скопируйте адрес:", address);
                    }
                };

                this._onBalloonClick = (e) => e.stopPropagation();

                this._btnRoute.addEventListener("click", this._onRouteClick);
                this._btnMap.addEventListener("click", this._onMapClick);
                this._btnCatalog.addEventListener(
                    "click",
                    this._onCatalogClick
                );
                this._btnCopy.addEventListener("click", this._onCopyClick);
                this._element.addEventListener("click", this._onBalloonClick);
            },

            clear: function () {
                if (this._btnRoute)
                    this._btnRoute.removeEventListener(
                        "click",
                        this._onRouteClick
                    );

                if (this._btnMap)
                    this._btnMap.removeEventListener("click", this._onMapClick);

                if (this._btnCatalog)
                    this._btnCatalog.removeEventListener(
                        "click",
                        this._onCatalogClick
                    );

                if (this._btnCopy)
                    this._btnCopy.removeEventListener(
                        "click",
                        this._onCopyClick
                    );

                if (this._element)
                    this._element.removeEventListener(
                        "click",
                        this._onBalloonClick
                    );

                BalloonLayout.superclass.clear.call(this);
            },
        }
    );

    for (const shop of shops) {
        const geo = await geocode(shop.address);
        if (!geo) continue;

        const { coords, oid } = geo;

        const placemark = new ymaps.Placemark(
            coords,
            {
                name: shop.name,
                address: shop.address,
                lat: coords[0],
                lon: coords[1],
                oid: oid,
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
