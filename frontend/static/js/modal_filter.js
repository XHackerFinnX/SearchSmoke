const filtersData = {
    collection: ["Сезон 1", "Сезон 2", "Лимитед"],
    model: ["Цветы", "Животные", "Природа"],
    background: ["Зеленый", "Синий", "Розовый", "Желтый"],
};

let currentFilter = null;

let selectedFilters = {
    collection: [],
    model: [],
    background: [],
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".filter-button").forEach((btn) => {
        btn.addEventListener("click", () => {
            openFilterModal(btn.dataset.filter);
        });
    });
});

function openFilterModal(type) {
    currentFilter = type;

    document.getElementById("filterTitle").textContent = {
        collection: "Коллекция",
        model: "Модель",
        background: "Фон",
    }[type];

    document.querySelectorAll(".filter-button").forEach((btn) => {
        btn.classList.remove("active");
    });

    document
        .querySelector(`.filter-button[data-filter="${type}"]`)
        .classList.add("active");

    const container = document.getElementById("filterOptions");
    container.innerHTML = "";

    const selected = [];
    const unselected = [];

    filtersData[type].forEach((value) => {
        if (selectedFilters[type].includes(value)) {
            selected.push(value);
        } else {
            unselected.push(value);
        }
    });

    [...selected, ...unselected].forEach((value) => {
        const checked = selectedFilters[type].includes(value);

        container.innerHTML += `
        <label class="filter-option">
            <input type="checkbox" value="${value}" ${checked ? "checked" : ""}>
            <span>${value}</span>
        </label>
    `;
    });

    document.getElementById("filterModal").classList.add("active");
}

function closeFilterModal() {
    document.getElementById("filterModal").classList.remove("active");

    document.querySelectorAll(".filter-button").forEach((btn) => {
        btn.classList.remove("active");
    });
}

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
}

function resetFilter() {
    selectedFilters[currentFilter] = [];

    const count = document.getElementById(currentFilter + "Count");
    count.style.display = "none";

    closeFilterModal();
}
