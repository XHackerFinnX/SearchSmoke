// ======================
// PRODUCT DATA
// ======================
const products = [
    {
        id: "1",
        slug: "sakura-flower",
        name: "Sakura Flower",

        quantity: 1,
        currency: "₽",

        image: [
            "/static/image/pink-sakura-flower.jpg",
            "/static/image/red-rose.jpg",
        ],

        pricing: {
            basePrice: 200,
        },

        store: {
            name: "Flower Market 2b2c",
            distanceKm: 1.2,
        },

        attributes: [
            {
                key: "model",
                label: "Model",
                value: "Mushroom",
                rarity: "3%",
                price: 2.27,
            },
            {
                key: "symbol",
                label: "Symbol",
                value: "Ghost",
                rarity: "0.5%",
                price: 2.29,
            },
            {
                key: "backdrop",
                label: "Backdrop",
                value: "Pure Gold",
                rarity: "1.5%",
                price: 2.26,
            },
            {
                key: "min_price",
                label: "Мин. цена",
                price: 2.26,
            },
        ],

        variants: {
            colors: ["pink", "red"],
            sizes: [],
        },

        meta: {
            collection: "Season 1",
            category: "Flowers",
        },
    },

    {
        id: "2",
        slug: "rose-bloom",
        name: "Rose Bloom",

        quantity: 1,
        currency: "₽",

        image: ["/static/image/red-rose.jpg"],

        pricing: {
            basePrice: 300,
        },

        store: {
            name: "Rose Boutique",
            distanceKm: 2.8,
        },

        attributes: [
            {
                key: "backdrop",
                label: "Backdrop",
                value: "Pure Gold",
                rarity: "1.5%",
                price: 2.26,
            },
        ],

        variants: {
            colors: ["red"],
            sizes: [],
        },

        meta: {
            collection: "Season 1",
            category: "Flowers",
        },
    },

    {
        id: "3",
        slug: "orchid-dream",
        name: "Orchid Dream",

        quantity: 1,
        currency: "₽",

        image: ["/static/image/purple-orchid.jpg"],

        pricing: {
            basePrice: 100,
        },

        store: {
            name: "Orchid House",
            distanceKm: 0.6,
        },

        attributes: [],

        variants: {
            colors: ["purple"],
            sizes: [],
        },

        meta: {
            collection: "Season 2",
            category: "Flowers",
        },
    },

    {
        id: "4",
        slug: "lily-pure",
        name: "Lily Pure",

        quantity: 1,
        currency: "₽",

        image: ["/static/image/white-lily.jpg"],

        pricing: {
            basePrice: 1000,
        },

        store: {
            name: "White Garden",
            distanceKm: 4.1,
        },

        attributes: [],

        variants: {
            colors: ["white"],
            sizes: [],
        },

        meta: {
            collection: "Season 2",
            category: "Flowers",
        },
    },

    {
        id: "5",
        slug: "daisy-fresh",
        name: "Daisy Fresh",

        quantity: 1,
        currency: "₽",

        image: ["/static/image/white-daisy.jpg"],

        pricing: {
            basePrice: 600,
        },

        store: {
            name: "Sunny Flowers",
            distanceKm: 3.3,
        },

        attributes: [],

        variants: {
            colors: ["white"],
            sizes: [],
        },

        meta: {
            collection: "Limited",
            category: "Flowers",
        },
    },

    {
        id: "6",
        slug: "sunflower-joy",
        name: "Sunflower Joy",

        quantity: 1,
        currency: "₽",

        image: ["/static/image/yellow-sunflower.jpg"],

        pricing: {
            basePrice: 900,
        },

        store: {
            name: "Sun Market",
            distanceKm: 5.0,
        },

        attributes: [],

        variants: {
            colors: ["yellow"],
            sizes: [],
        },

        meta: {
            collection: "Limited",
            category: "Flowers",
        },
    },
];

// ======================
// FILTER DATA
// ======================
const filtersData = {
    collection: ["Сезон 1", "Сезон 2", "Лимитед"],
    model: ["Цветы", "Животные", "Природа"],
    background: ["Зеленый", "Синий", "Розовый", "Желтый"],
};

const cartState = {
    total: 0,
    count: 0,
};

let currentFilter = null;
let currentProduct = null;

let selectedFilters = {
    collection: [],
    model: [],
    background: [],
};

// ======================
// INIT
// ======================
function init() {
    renderProducts(products);
    setupCategoryButtons();
    setupSearch();
    setupFilterButtons();
}

document.addEventListener("DOMContentLoaded", init);

// ======================
// RENDER Products
// ======================
function renderProducts(list) {
    const grid = document.getElementById("productsGrid");
    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;color:var(--text-secondary);padding:40px 0;">
                Товары не найдены
            </p>
        `;
        return;
    }

    list.forEach((product) => {
        const card = document.createElement("div");

        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image[0]}" alt="${product.name}">
            </div>

            <div class="product-details">
                <div class="product-name">${product.name}</div>

                <div class="product-store">
                    <div class="store-name">
                        <svg
                            width="17"
                            height="17"
                            viewBox="0 -17.5 177 177"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                        <path 
                            d="M13.9434 68.9343C12.0295 68.3318 10.3861 67.9458 8.849 67.3059C4.76458 65.606 2.24753 62.8059 1.30109 58.2043C0.24908 53.4623 0.896735 48.5013 3.13093 44.1882C9.12394 32.239 15.5626 20.56 24.2735 10.3087C28.1814 5.70905 32.806 2.83035 39.1967 2.47396C62.8479 1.06047 86.5568 0.888302 110.226 1.95767C116.16 2.24842 122.07 2.99391 127.997 3.45269C130.34 3.63384 132.702 3.69616 135.052 3.64562C138.387 3.57408 141.549 4.10965 144.376 5.94281C146.349 7.22266 148.455 8.39367 150.152 9.98529C160.582 19.7647 168.934 31.0535 174.542 44.2774C176.238 48.2758 176.15 52.3419 175.095 56.4709C173.336 63.3559 169.082 67.5632 162.011 68.8017C161.68 68.8667 161.354 68.954 161.035 69.0642C160.823 69.1299 160.625 69.2401 160.101 69.4698C159.851 74.3169 159.616 79.328 159.33 84.3359C158.689 95.5383 158.196 106.752 157.28 117.932C156.926 122.244 155.763 126.522 154.643 130.73C153.653 134.448 150.981 136.806 147.348 138.06C142.264 139.869 136.908 140.793 131.511 140.791C107.149 140.616 82.7875 140.441 58.4261 140.266C49.7822 140.207 41.1348
                            140.295 32.4948 140.079C29.1326 140.001 25.7892 139.552 22.5251 138.742C16.1068 137.123 12.0118 132.95 11.7421 126.197C11.3483 116.344 11.1298 106.458 11.4737 96.6088C11.7671 88.2175 12.9609 79.8584 13.7524 71.4841C13.822 70.7156 13.8706 69.9391 13.9434 68.9343ZM97.5157 133.039C97.6601 132.665 97.7651 132.276 97.8301 131.88C98.0513 121.116 98.3059 110.352 98.4379 99.5846C98.4812 96.0771 98.7194 92.6589 100.039 89.3582C101.713 85.1721 104.714 82.8834 109.237 82.701C113.948 82.5106 118.661 82.2875 123.374 82.2415C126.175 82.2054 128.974 82.359 131.754 82.701C133.287 82.8184 134.738 83.4446 135.875 84.4803C137.011 85.5166 137.77 86.9028 138.029 88.419C138.581 90.9341 138.906 93.4931 139.001 96.0666C139.364 107.923 139.603 119.784 139.89 131.827C140.62 131.667 141.561 131.402 142.52 131.265C145.357 130.858 146.84 129.209 147.23 126.417C147.649 123.422 148.393 120.452 148.554 117.446C149.327 102.99 149.963 88.5266 150.615 74.0622C150.711 71.9495 150.629 69.8289 150.629 68.3127L141.069 60.1532C138.406 64.3137 134.456 67.1162
                            128.916 67.3131C123.456 67.51 118.959 65.4095 115.253 61.5982C106.817 69.504 96.3376 69.2349 88.01 60.9355C84.641 66.1954 79.5498 68.1552 73.6001 67.9583C67.8755 67.768 62.6227 66.0706 58.4425 61.7151C54.8044 66.1336 50.4148 68.5254 44.9147 68.6724C39.631 68.8516 34.468 67.069 30.4201 63.6685C29.3274 65.2438 27.8865 66.5465 26.2093 67.4752C24.5321 68.404 22.6635 68.9336 20.7484 69.0242C20.6184 69.4285 20.5209 69.8433 20.457 70.2634C20.0691 80.581 19.5203 90.8973 19.372 101.219C19.2624 108.842 19.5571 116.479 19.8971 124.099C20.1314 129.311 22.0919 131.384 27.3137 131.865C33.0042 132.39 38.7294 132.647 44.4442 132.763C54.2078 132.96 63.9754 132.983 73.7418 133.032C81.5989 133.07 89.4487 133.039 97.5157 133.039ZM129.248 90.665C123.144 90.8842 117.672 91.0187 112.209 91.2977C108.323 91.4946 107.885 91.937 107.071 95.6354C106.904 96.5143 106.811 97.4062 106.794 98.3015C106.309 108.704 106.17 119.132 104.329 129.43C104.216 130.586 104.207 131.75 104.301 132.908H129.248V90.665ZM68.8928 10.8227C67.7915 16.9437 66.7269 22.6564
                            65.7423 28.3823C64.5083 35.5469 63.4629 42.7461 62.0898 49.8831C61.3285 53.8396 62.5559 57.5868 66.2248 59.0885C68.7084 60.0754 71.341 60.6342 74.0109 60.7413C77.6635 60.904 80.3393 59.0582 81.9979 55.6518C83.4143 52.7435 84.2951 49.8556 83.5403 46.5976C83.2732 45.3934 83.1504 44.162 83.1734 42.9288C83.287 33.7473 83.453 24.5666 83.5941 15.3857C83.6171 13.8709 83.5974 12.3553 83.5974 10.8227H68.8928ZM129.461 11.9325C131.458 16.7172 133.301 21.0359 135.067 25.3874C137.883 32.3216 140.646 39.2777 143.44 46.2198C143.605 46.6294 143.768 47.1976 144.097 47.3578C146.36 48.4624 146.883 50.7407 147.877 52.7149C150.256 57.4405 153.959 60.0971 159.406 59.8884C164.78 59.6823 168.128 54.492 166.304 49.4047C163.755 42.5721 160.224 36.1474 155.823 30.3324C151.169 23.9955 146.275 17.9039 139.765 13.2577C136.591 10.9907 133.413 11.0917 129.461 11.9325ZM61.7216 11.1448H49.8562C49.4591 12.1083 49.1435 12.812 48.8757 13.5327C43.8403 27.0762 38.8338 40.6316 33.7445 54.1548C33.4715 54.707 33.4087 55.3399 33.5679 55.935C33.727 56.5302 34.0973
                            57.0468 34.6096 57.389C38.4413 60.567 42.827 61.5636 47.5007 59.949C49.1524 59.3109 50.5215 58.1031 51.3607 56.5439C52.6609 53.8191 53.6316 50.9488 54.2523 47.9943C56.776 36.5084 59.1297 24.9805 61.526 13.4644C61.6384 12.6968 61.7039 11.9233 61.7216 11.1477V11.1448ZM90.8217 11.2592C90.722 11.4821 90.653 11.7174 90.6163 11.9588C90.8657 24.2901 90.9484 36.6285 91.4695 48.9487C91.6914 54.221 95.2428 59.3254 102.348 58.5713C107.764 57.9963 111.626 51.9683 109.865 46.8069C108.606 43.1143 107.658 39.3084 106.705 35.5181C104.689 27.5048 102.762 19.4687 100.753 11.2579L90.8217 11.2592ZM42.7941 11.4396C40.9741 11.6162 39.5413 11.8275 38.1026 11.8787C35.0973 11.9844 32.9772 13.282 31.0594 15.7046C22.7292 26.2276 16.429 37.9779 10.1084 49.7165C9.18052 51.6316 8.51965 53.6648 8.14409 55.7594C7.62821 58.1104 8.18544 59.1258 10.3586 60.0256C13.4678 61.3602 16.8903 61.7907 20.2331 61.2675C22.4167 60.9183 23.4906 59.6056 24.1896 57.6576C26.2971 51.7716 28.3134 45.8436 30.6722 40.0586C34.5144 30.633 38.5995 21.3076 42.7941 11.4422V11.4396ZM108.213 11.3018C108.168 11.7104 108.171 12.1227 108.223 12.5306C113.571 25.6363 116.631 39.4218 120.238 53.0421C120.445 53.9168 120.856 54.7301 121.438 55.4152C122.02 56.1003 122.756 56.638 123.585 56.9837C127.064 58.5189 130.839 58.579 133.248 54.5176C134.276 52.7848 135.948 51.4198 134.548 48.8239C128.998 38.5345 125.276 27.5194 122.227 16.2625C121.852 14.8783 121.338 13.5312 120.862 12.0879L108.213 11.3018Z" 
                            fill="#ffffff"
                        />
                        <path
                            d="M58.8208 76.022C66.2442 76.4538 73.5315 76.7558 80.7959 77.3386C86.8998 77.8289 89.6282 80.3965 89.8232 86.5024C90.0247 93.1097 89.8428 99.723 89.2791 106.309C88.8131 111.815 86.1746 114.626 80.0083 114.617C68.3452 114.599 56.6811 115.033 45.016 115.158C42.3247 115.152 39.6389 114.916 36.9876 114.453C31.141 113.508 28.0949 110.128 28.1067 104.059C28.1185 98.0113 28.4802 91.9506 28.9875 85.9215C29.1416 83.7188 30.0808 81.6448 31.6345 80.0762C33.1883 78.5075 35.2534 77.5486 37.4544 77.3734C44.6019 76.7341 51.7789 76.4492 58.8208 76.022ZM80.9954 106.748C82.5385 100.3 82.8876 93.6236 82.0272 87.0491C81.9517 86.4203 81.0092 85.6603 80.3056 85.3978C79.2364 85.0532 78.1193 84.8806 76.997 84.8884C70.6003 84.683 64.2014 84.408 57.8028 84.3982C52.4169 84.3903 47.0251 84.6193 41.6451 84.9127C36.0518 85.2179 34.787 86.6422 34.9097 92.185C34.9793 95.3262 35.1598 98.4668 35.3475 101.604C35.6166 106.107 36.0399 106.834 40.4315 106.953C51.5335 107.253 62.6426 107.302 73.7494 107.358C76.0834 107.37 78.4199 106.976 80.9954 106.748Z"
                            fill="#ffffff"
                        />
                    </svg>
                        <div style="line-height: 2px;">
                            ${product.store.name}
                        </div>
                    </div>
                    <div class="product-distance">
                        <div class="product-price-container">
                            <span class="product-price">${product.pricing.basePrice} ₽</span>
                        </div>
                        <div class="distance-container">
                            <span class="distance-placeholder"></span>
                            <span class="distance km" style="display:none;"></span>
                            <span class="km-text" id="kmText"></span>
                            <svg
                                class="distance-icon"
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94z"/>
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;

        card.addEventListener("click", () => openProductModal(product));
        grid.appendChild(card);

        // Сначала показываем индикатор загрузки
        const distancePlaceholder = card.querySelector(".distance-placeholder");
        const kmElement = card.querySelector(".km");

        setTimeout(() => {
            // Скрываем индикатор и показываем расстояние
            distancePlaceholder.style.display = "none";
            kmElement.style.display = "inline-block";
            kmElement.textContent = `${product.store.distanceKm} км`;
        }, 2000);
    });
}

// Setup category button functionality
function setupCategoryButtons() {
    const buttons = document.querySelectorAll(".category-button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
}

function syncDotsWithSlider(slider, dotsContainer) {
    const dots = dotsContainer.querySelectorAll(".dot");

    slider.onscroll = () => {
        const slideWidth = slider.clientWidth;
        const index = Math.round(slider.scrollLeft / slideWidth);

        dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    };
}

// ======================
// MAIN FILTER ENGINE 🔥
// ======================
function applyAllFilters() {
    let result = [...products];

    // 🔍 SEARCH
    const query = document
        .getElementById("searchInput")
        .value.toLowerCase()
        .trim();

    if (query) {
        result = result.filter(
            (p) =>
                p.name.toLowerCase().includes(query) ||
                p.id.toLowerCase().includes(query)
        );
    }

    // 🧩 FILTERS (заготовка под будущую логику)
    Object.keys(selectedFilters).forEach((key) => {
        if (selectedFilters[key].length) {
            // тут позже можно привязать фильтры к продуктам
            // сейчас просто оставляем
        }
    });

    renderProducts(result);
}

// ======================
// SEARCH
// ======================
function setupSearch() {
    document.getElementById("searchInput").addEventListener("input", () => {
        applyAllFilters();
        updateClearButtonVisibility();
    });
}

// ======================
// FILTER BUTTONS
// ======================
function setupFilterButtons() {
    document.querySelectorAll(".filter-button").forEach((btn) => {
        btn.addEventListener("click", () =>
            openFilterModal(btn.dataset.filter)
        );
    });
}

// ======================
// MODAL
// ======================
function openFilterModal(type) {
    currentFilter = type;

    document.getElementById("filterTitle").textContent = {
        collection: "Коллекция",
        model: "Модель",
        background: "Фон",
    }[type];

    document
        .querySelectorAll(".filter-button")
        .forEach((b) => b.classList.remove("active"));
    document
        .querySelector(`.filter-button[data-filter="${type}"]`)
        .classList.add("active");

    const container = document.getElementById("filterOptions");
    container.innerHTML = "";

    const selected = [];
    const unselected = [];

    filtersData[type].forEach((v) =>
        selectedFilters[type].includes(v)
            ? selected.push(v)
            : unselected.push(v)
    );

    [...selected, ...unselected].forEach((value) => {
        const checked = selectedFilters[type].includes(value);
        container.innerHTML += `
            <label class="filter-option">
                <input type="checkbox" value="${value}" ${
            checked ? "checked" : ""
        }>
                <span>${value}</span>
            </label>
        `;
    });

    document.getElementById("filterModal").classList.add("active");
    lockBody();
}

function closeFilterModal() {
    document.getElementById("filterModal").classList.remove("active");
    unlockBody();
    document
        .querySelectorAll(".filter-button")
        .forEach((b) => b.classList.remove("active"));
}

function openProductModal(product) {
    const slider = document.getElementById("productImageSlider");
    const dotsContainer = document.getElementById("productImageDots");

    currentProduct = product;

    document.getElementById("productModalName").textContent = product.name;
    document.getElementById("productModalId").textContent = product.id;

    renderAttributes(product.attributes || []);

    slider.innerHTML = "";
    dotsContainer.innerHTML = "";

    product.image.forEach((src, index) => {
        // slides
        slider.innerHTML += `
            <div class="product-image-slide">
                <img src="${src}" alt="">
            </div>
        `;

        // dots
        dotsContainer.innerHTML += `
            <span class="dot ${
                index === 0 ? "active" : ""
            }" data-index="${index}"></span>
        `;
    });

    // если картинка одна — скрываем точки
    dotsContainer.style.display = product.image.length > 1 ? "flex" : "none";

    // старт всегда с первой
    slider.scrollLeft = 0;

    syncDotsWithSlider(slider, dotsContainer);

    document.getElementById("productModal").classList.add("active");
    lockBody();
}

function closeProductModal() {
    document.getElementById("productModal").classList.remove("active");
    unlockBody();
}

function renderAttributes(attributes) {
    const container = document.getElementById("productAttributes");
    container.innerHTML = "";

    attributes.forEach((attr) => {
        let valueHtml = "";

        if (attr.name) {
            valueHtml += attr.name;
        }

        if (attr.percent) {
            valueHtml += ` <small>${attr.percent}</small>`;
        }

        if (attr.price !== undefined) {
            valueHtml += ` · ${attr.price} ₽`;
        }

        container.innerHTML += `
            <div class="attr-row">
                <span>${attr.label}</span>
                <span class="attr-value">${valueHtml}</span>
            </div>
        `;
    });
}

// ======================
// APPLY / RESET
// ======================
function applyFilter() {
    const checked = [
        ...document.querySelectorAll("#filterOptions input:checked"),
    ].map((i) => i.value);

    selectedFilters[currentFilter] = checked;

    const count = document.getElementById(currentFilter + "Count");
    if (checked.length) {
        count.textContent = checked.length;
        count.style.display = "inline-block";
    } else {
        count.style.display = "none";
    }

    closeFilterModal();
    applyAllFilters();
    updateClearButtonVisibility();
}

function resetFilter() {
    selectedFilters[currentFilter] = [];
    document.getElementById(currentFilter + "Count").style.display = "none";

    closeFilterModal();
    applyAllFilters();
    updateClearButtonVisibility();
}

// ======================
// Background look
// ======================
function lockBody() {
    document.body.classList.add("modal-open");
}

function unlockBody() {
    document.body.classList.remove("modal-open");
}

// ======================
// CLEAR ALL BUTTON
// ======================
function updateClearButtonVisibility() {
    const hasFilters = Object.values(selectedFilters).some((arr) => arr.length);
    const hasSearch =
        document.getElementById("searchInput").value.trim().length > 0;

    document.getElementById("clearFiltersBtn").style.display =
        hasFilters || hasSearch ? "block" : "none";
}

document.getElementById("clearFiltersBtn").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";

    Object.keys(selectedFilters).forEach((key) => {
        selectedFilters[key] = [];
        const count = document.getElementById(key + "Count");
        if (count) count.style.display = "none";
    });

    closeFilterModal();
    renderProducts(products); // возвращаем карточки
    updateClearButtonVisibility();
});

function showCartWidget() {
    const widget = document.getElementById("cartWidget");

    document.getElementById(
        "cartTotalPrice"
    ).textContent = `${cartState.total.toFixed(2)} ₽`;

    document.getElementById("cartTotalCount").textContent = `${
        cartState.count
    } ${getProductWord(cartState.count)}`;

    widget.classList.add("active");
}

function getProductWord(count) {
    if (count === 1) return "товар";
    if (count >= 2 && count <= 4) return "товара";
    return "товаров";
}

function addToCart() {
    if (!currentProduct) return;

    const price = getProductPrice(currentProduct);

    cartState.total += price;
    cartState.count += currentProduct.quantity || 1;

    closeProductModal();
    showCartWidget();
}

function getProductPrice(product) {
    return product.pricing?.basePrice || 0;
}
