// ======================
// PRODUCT DATA
// ======================
const products = [
    {
        id: "#R3951",
        slug: "sakura-flower",
        name: "Sakura Flower",

        quantity: 1,
        currency: "TON",

        image: [
            "/frontend/static/image/pink-sakura-flower.jpg",
            "/frontend/static/image/red-rose.jpg",
        ],

        pricing: {
            basePrice: 200,
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
        id: "#R4012",
        slug: "rose-bloom",
        name: "Rose Bloom",

        quantity: 1,
        currency: "TON",

        image: ["/frontend/static/image/red-rose.jpg"],

        pricing: {
            basePrice: 300,
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
        id: "#R4038",
        slug: "orchid-dream",
        name: "Orchid Dream",

        quantity: 1,
        currency: "TON",

        image: ["/frontend/static/image/purple-orchid.jpg"],

        pricing: {
            basePrice: 100,
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
        id: "#R4041",
        slug: "lily-pure",
        name: "Lily Pure",

        quantity: 1,
        currency: "TON",

        image: ["/frontend/static/image/white-lily.jpg"],

        pricing: {
            basePrice: 1000,
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
        id: "#R4055",
        slug: "daisy-fresh",
        name: "Daisy Fresh",

        quantity: 1,
        currency: "TON",

        image: ["/frontend/static/image/white-daisy.jpg"],

        pricing: {
            basePrice: 600,
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
        id: "#R4068",
        slug: "sunflower-joy",
        name: "Sunflower Joy",

        quantity: 1,
        currency: "TON",

        image: ["/frontend/static/image/yellow-sunflower.jpg"],

        pricing: {
            basePrice: 900,
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
                <div class="product-id">${product.id}</div>
            </div>
        `;
        card.addEventListener("click", () => openProductModal(product));
        grid.appendChild(card);
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
