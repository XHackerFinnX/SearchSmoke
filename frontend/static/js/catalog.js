// ======================
// PRODUCT DATA
// ======================
const products = [
    {
        id: "#R3951",
        name: "Sakura Flower",
        image: "/frontend/static/image/pink-sakura-flower.jpg",
    },
    {
        id: "#R3970",
        name: "Sakura Flower",
        image: "/frontend/static/image/pink-sakura-flower.jpg",
    },
    {
        id: "#R4012",
        name: "Rose Bloom",
        image: "/frontend/static/image/red-rose.jpg",
    },
    {
        id: "#R4038",
        name: "Orchid Dream",
        image: "/frontend/static/image/purple-orchid.jpg",
    },
    {
        id: "#R4041",
        name: "Lily Pure",
        image: "/frontend/static/image/white-lily.jpg",
    },
    {
        id: "#R4055",
        name: "Daisy Fresh",
        image: "/frontend/static/image/white-daisy.jpg",
    },
    {
        id: "#R4068",
        name: "Sunflower Joy",
        image: "/frontend/static/image/yellow-sunflower.jpg",
    },
];

// ======================
// FILTER DATA
// ======================
const filtersData = {
    collection: ["Сезон 1", "Сезон 2", "Лимитед"],
    model: ["Цветы", "Животные", "Природа"],
    background: [
        "Зеленый",
        "Синий",
        "Розовый",
        "Желтый",
        "Зеленый",
        "Синий",
        "Розовый",
        "Желтый",
        "Желтый",
        "Зеленый",
        "Синий",
        "Розовый",
        "Желтый",
    ],
};

let currentFilter = null;

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
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <div class="product-name">${product.name}</div>
                <div class="product-id">${product.id}</div>
            </div>
        `;
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
