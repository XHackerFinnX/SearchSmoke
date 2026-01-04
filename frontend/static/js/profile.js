// Cashback system configuration
const CASHBACK_LEVELS = [
    { level: 0, percent: 0, requiredPurchases: 0 },
    { level: 1, percent: 2, requiredPurchases: 5 },
    { level: 2, percent: 5, requiredPurchases: 15 },
    { level: 3, percent: 7, requiredPurchases: 30 },
    { level: 4, percent: 9, requiredPurchases: 50 },
    { level: 5, percent: 11, requiredPurchases: 75 },
    { level: 6, percent: 13, requiredPurchases: 100 },
    { level: 7, percent: 15, requiredPurchases: 150 },
    { level: 8, percent: 17, requiredPurchases: 200 },
    { level: 9, percent: 18, requiredPurchases: 300 },
    { level: 10, percent: 20, requiredPurchases: 500 },
];

let userData = {
    totalPurchases: 35,
    availableCashback: 500,
    // totalSpent: 9200,
    // earnedCashback: 870,
};

let settingsData = {
    language: "ru",
    notifications: "on",
};

// Mock data for history
const historyData = [
    {
        id: 1,
        date: "07.01.25",
        name: "Алексей Петров",
        type: "deposit",
        amount: 250,
        number: "#64817",
    },
    {
        id: 2,
        date: "07.01.25",
        name: "Мария Иванова",
        type: "withdrawal",
        amount: 150,
        number: "#64816",
    },
    {
        id: 3,
        date: "06.01.25",
        name: "Дмитрий Сидоров",
        type: "deposit",
        amount: 500,
        number: "#64815",
    },
    {
        id: 4,
        date: "06.01.25",
        name: "Елена Козлова",
        type: "deposit",
        amount: 75,
        number: "#64814",
    },
    {
        id: 5,
        date: "05.01.25",
        name: "Игорь Морозов",
        type: "withdrawal",
        amount: 300,
        number: "#64813",
    },
    {
        id: 6,
        date: "05.01.25",
        name: "Наталья Фомина",
        type: "deposit",
        amount: 430,
        number: "#64812",
    },
    {
        id: 7,
        date: "04.01.25",
        name: "Виктор Павлов",
        type: "withdrawal",
        amount: 220,
        number: "#64811",
    },
    {
        id: 8,
        date: "04.01.25",
        name: "Оксана Миронова",
        type: "deposit",
        amount: 180,
        number: "#64810",
    },
    {
        id: 9,
        date: "03.01.25",
        name: "Роман Лебедев",
        type: "deposit",
        amount: 390,
        number: "#64809",
    },
    {
        id: 10,
        date: "03.01.25",
        name: "Инна Гусева",
        type: "withdrawal",
        amount: 270,
        number: "#64808",
    },
    {
        id: 11,
        date: "02.01.25",
        name: "Артур Беляев",
        type: "deposit",
        amount: 510,
        number: "#64807",
    },
    {
        id: 12,
        date: "02.01.25",
        name: "Ирина Шестакова",
        type: "withdrawal",
        amount: 135,
        number: "#64806",
    },
    {
        id: 13,
        date: "01.01.25",
        name: "Максим Зуев",
        type: "deposit",
        amount: 600,
        number: "#64805",
    },
    {
        id: 14,
        date: "01.01.25",
        name: "Светлана Анисимова",
        type: "withdrawal",
        amount: 200,
        number: "#64804",
    },
    {
        id: 15,
        date: "31.12.24",
        name: "Олег Яковлев",
        type: "deposit",
        amount: 350,
        number: "#64803",
    },
    {
        id: 16,
        date: "31.12.24",
        name: "Людмила Николаева",
        type: "withdrawal",
        amount: 90,
        number: "#64802",
    },
    {
        id: 17,
        date: "30.12.24",
        name: "Григорий Макаров",
        type: "deposit",
        amount: 420,
        number: "#64801",
    },
    {
        id: 18,
        date: "30.12.24",
        name: "Алёна Воробьева",
        type: "withdrawal",
        amount: 310,
        number: "#64800",
    },
    {
        id: 19,
        date: "29.12.24",
        name: "Владимир Рябов",
        type: "deposit",
        amount: 240,
        number: "#64799",
    },
    {
        id: 20,
        date: "29.12.24",
        name: "Жанна Комарова",
        type: "withdrawal",
        amount: 180,
        number: "#64798",
    },
];

// Mock data for invited users
const invitedData = [
    {
        id: 1,
        date: "07.01.25",
        name: "Анна Волкова",
        status: "completed",
        number: "#INV001",
    },
    {
        id: 2,
        date: "07.01.25",
        name: "Сергей Новиков",
        status: "waiting",
        number: "#INV002",
    },
    {
        id: 3,
        date: "06.01.25",
        name: "Ольга Смирнова",
        status: "completed",
        number: "#INV003",
    },
    {
        id: 4,
        date: "06.01.25",
        name: "Павел Кузнецов",
        status: "waiting",
        number: "#INV004",
    },
    {
        id: 5,
        date: "05.01.25",
        name: "Татьяна Лебедева",
        status: "completed",
        number: "#INV005",
    },
    {
        id: 6,
        date: "05.01.25",
        name: "Егор Соловьёв",
        status: "completed",
        number: "#INV006",
    },
    {
        id: 7,
        date: "04.01.25",
        name: "Вероника Климова",
        status: "waiting",
        number: "#INV007",
    },
    {
        id: 8,
        date: "04.01.25",
        name: "Арсений Никифоров",
        status: "completed",
        number: "#INV008",
    },
    {
        id: 9,
        date: "03.01.25",
        name: "Алина Герасимова",
        status: "waiting",
        number: "#INV009",
    },
    {
        id: 10,
        date: "03.01.25",
        name: "Вадим Титов",
        status: "completed",
        number: "#INV010",
    },
    {
        id: 11,
        date: "02.01.25",
        name: "Надежда Боброва",
        status: "completed",
        number: "#INV011",
    },
    {
        id: 12,
        date: "02.01.25",
        name: "Артем Ефимов",
        status: "waiting",
        number: "#INV012",
    },
    {
        id: 13,
        date: "01.01.25",
        name: "Диана Орлова",
        status: "completed",
        number: "#INV013",
    },
    {
        id: 14,
        date: "01.01.25",
        name: "Илья Захаров",
        status: "waiting",
        number: "#INV014",
    },
    {
        id: 15,
        date: "31.12.24",
        name: "Яна Чернышева",
        status: "completed",
        number: "#INV015",
    },
    {
        id: 16,
        date: "31.12.24",
        name: "Геннадий Литвинов",
        status: "waiting",
        number: "#INV016",
    },
    {
        id: 17,
        date: "30.12.24",
        name: "Маргарита Сафонова",
        status: "completed",
        number: "#INV017",
    },
    {
        id: 18,
        date: "30.12.24",
        name: "Фёдор Данилов",
        status: "waiting",
        number: "#INV018",
    },
    {
        id: 19,
        date: "29.12.24",
        name: "Эльвира Зайцева",
        status: "completed",
        number: "#INV019",
    },
    {
        id: 20,
        date: "29.12.24",
        name: "Станислав Козин",
        status: "waiting",
        number: "#INV020",
    },
];

// Cashback calculation system
class CashbackSystem {
    constructor() {
        this.loadUserData();
        this.updateDisplay();
    }

    loadUserData() {
        // const saved = localStorage.getItem("UserData");
        // if (saved) userData = { ...userData, ...JSON.parse(saved) };
    }

    saveUserData() {
        localStorage.setItem("UserData", JSON.stringify(userData));
    }

    calculateLevel() {
        let lvl = 0;
        for (let i = 1; i < CASHBACK_LEVELS.length; i++) {
            if (
                userData.totalPurchases >= CASHBACK_LEVELS[i].requiredPurchases
            ) {
                lvl = i;
            } else break;
        }
        return lvl;
    }

    addPurchase(amount) {
        userData.totalPurchases++;
        // userData.totalSpent += amount;

        const lvl = this.calculateLevel();
        const cashback = Math.floor(
            amount * (CASHBACK_LEVELS[lvl].percent / 100)
        );

        // userData.earnedCashback += cashback;
        // userData.availableCashback += cashback;

        localStorage.setItem("UserData", JSON.stringify(userData));
        this.updateDisplay();
    }

    getProgressToNextLevel() {
        const level = this.calculateLevel();
        if (level >= CASHBACK_LEVELS.length - 1) return 100;

        const next = CASHBACK_LEVELS[level + 1];
        return Math.min(
            100,
            Math.floor((userData.totalPurchases / next.requiredPurchases) * 100)
        );
    }

    getPurchasesToNextLevel() {
        const level = this.calculateLevel();
        if (level >= CASHBACK_LEVELS.length - 1) return 0;

        return Math.max(
            0,
            CASHBACK_LEVELS[level + 1].requiredPurchases -
                userData.totalPurchases
        );
    }

    getFractionalLevelProgress() {
        const level = this.calculateLevel();

        if (level >= CASHBACK_LEVELS.length - 1) {
            return { level, progress: 1 };
        }

        const current = CASHBACK_LEVELS[level];
        const next = CASHBACK_LEVELS[level + 1];

        const from = current.requiredPurchases;
        const to = next.requiredPurchases;

        const progress = (userData.totalPurchases - from) / (to - from);

        return {
            level,
            progress: Math.max(0, Math.min(1, progress)),
        };
    }

    updateProgressBar() {
        const data = this.getFractionalLevelProgress();
        const level = data.level;
        const progress = data.progress;

        const markers = document.querySelectorAll(".progress-marker");
        const track = document.getElementById("progressTrack");
        const fill = document.getElementById("progressFillEnhanced");

        if (!markers[level] || !fill || !track) return;

        const trackRect = track.getBoundingClientRect();
        const currRect = markers[level].getBoundingClientRect();

        const currCenter = currRect.left - trackRect.left + currRect.width / 2;

        if (level >= markers.length - 1) {
            fill.style.width = `${currCenter}px`;
            return;
        }

        const nextRect = markers[level + 1].getBoundingClientRect();
        const nextCenter = nextRect.left - trackRect.left + nextRect.width / 2;

        const fillWidth = currCenter + (nextCenter - currCenter) * progress;

        fill.style.width = `${fillWidth}px`;
    }

    updateMarkers() {
        const level = this.calculateLevel();

        document.querySelectorAll(".progress-marker").forEach((m, i) => {
            m.classList.remove("active", "current");
            if (i < level) m.classList.add("active");
            if (i === level) m.classList.add("current");
        });
    }

    updateDisplay() {
        const level = this.calculateLevel();

        document.getElementById("currentLevel").textContent = level;
        document.getElementById("currentCashback").textContent =
            CASHBACK_LEVELS[level].percent + "%";
        document.getElementById("availableCashback").textContent =
            userData.availableCashback.toFixed(0);

        this.updateMarkers();
        this.updateProgressBar();
    }
}

// Enhanced Cashback Widget Management
class EnhancedCashbackWidget {
    constructor() {
        this.progressTrack = document.querySelector(".progress-track-wrapper");
        this.scrollLeft = document.getElementById("scrollLeft");
        this.scrollRight = document.getElementById("scrollRight");
        this.init();
    }

    init() {
        if (!this.progressTrack) return;
        this.centerCurrentLevel();
    }

    centerCurrentLevel() {
        const level = cashbackSystem.calculateLevel();
        const markers = document.querySelectorAll(".progress-marker");

        if (!markers[level]) return;

        const markerRect = markers[level].getBoundingClientRect();
        const containerRect = this.progressTrack.getBoundingClientRect();

        this.progressTrack.scrollTo({
            left:
                markerRect.left -
                containerRect.left -
                containerRect.width / 2 +
                markerRect.width / 2,
            behavior: "smooth",
        });
    }
}

// Initialize cashback system
const cashbackSystem = new CashbackSystem();
// Initialize enhanced widget
let enhancedWidget;

// Demo function to simulate purchases (for testing)
function simulatePurchase() {
    const amounts = [10, 25, 50, 100, 200, 500];
    cashbackSystem.addPurchase(
        amounts[Math.floor(Math.random() * amounts.length)]
    );
}

function openQrCodeModal() {
    const modal = document.getElementById("qrcodeModal");
    const img = document.getElementById("balanceQrImg");
    const loader = document.getElementById("qrLoader"); // предполагаем, что у вас есть элемент для лоадера

    // Сначала показываем модальное окно с лоадером
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Показываем лоадер и скрываем QR-код
    if (loader) loader.style.display = "flex"; // или "block" в зависимости от типа элемента
    img.style.display = "none";

    // данные пользователя
    const userId = 12345;

    // POST-запрос для получения QR
    fetch("/api/client/club-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: userId,
        }),
    })
        .then((res) => res.blob())
        .then((blob) => {
            const imgUrl = URL.createObjectURL(blob);

            // Когда изображение загрузилось, скрываем лоадер и показываем QR
            img.onload = function () {
                if (loader) loader.style.display = "none";
                img.style.display = "block";
                URL.revokeObjectURL(imgUrl); // освобождаем память
            };

            // Устанавливаем источник изображения
            img.src = imgUrl;
        })
        .catch((err) => {
            console.error("Ошибка получения QR:", err);
            if (loader) loader.style.display = "none";
            // Можно добавить сообщение об ошибке
            alert("Не удалось загрузить QR-код");
        });
}

function closeQrCodeModal() {
    const modal = document.getElementById("qrcodeModal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

// History modal functions
function openHistoryModal() {
    const modal = document.getElementById("historyModal");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Populate history list
    populateHistoryList();

    setTimeout(() => {
        modal.classList.add("active");
    }, 10);
}

function closeHistoryModal() {
    const modal = document.getElementById("historyModal");
    modal.classList.remove("active");

    setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }, 300);
}

function populateHistoryList() {
    const historyList = document.getElementById("historyList");
    if (!historyList) return;

    // Group history by date
    const groupedHistory = {};
    historyData.forEach((item) => {
        if (!groupedHistory[item.date]) {
            groupedHistory[item.date] = [];
        }
        groupedHistory[item.date].push(item);
    });

    let html = "";
    Object.keys(groupedHistory).forEach((date) => {
        // Convert date format
        const [day, month, year] = date.split(".");
        const months = [
            "ЯНВАРЯ",
            "ФЕВРАЛЯ",
            "МАРТА",
            "АПРЕЛЯ",
            "МАЯ",
            "ИЮНЯ",
            "ИЮЛЯ",
            "АВГУСТА",
            "СЕНТЯБРЯ",
            "ОКТЯБРЯ",
            "НОЯБРЯ",
            "ДЕКАБРЯ",
        ];
        const monthName = months[Number.parseInt(month) - 1];
        const fullYear = `20${year}`;

        html += `<div class="date-separator">${day} ${monthName} ${fullYear}</div>`;

        groupedHistory[date].forEach((item) => {
            const isDeposit = item.type === "deposit";
            const statusClass = isDeposit
                ? "status-deposit"
                : "status-withdrawal";
            const statusText = isDeposit ? "Пополнение" : "Вывод";
            const amountClass = isDeposit
                ? "amount-positive"
                : "amount-negative";
            const amountSign = isDeposit ? "+" : "-";
            const avatarLetter = item.name.charAt(0).toUpperCase();

            html += `
        <div class="list-item">
          <div class="item-avatar">${avatarLetter}</div>
          <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-details">
              <span class="item-number">${item.number}</span>
              <span>•</span>
              <span class="item-status ${statusClass}">${statusText}</span>
            </div>
          </div>
          <div class="item-amount ${amountClass}">
            ${amountSign} ${item.amount}
            <div class="stars-icon"></div>
          </div>
        </div>
      `;
        });
    });

    historyList.innerHTML = html;
}

// Invited modal functions
function openInvitedModal() {
    const modal = document.getElementById("invitedModal");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Populate invited list
    populateInvitedList();

    setTimeout(() => {
        modal.classList.add("active");
    }, 10);
}

function closeInvitedModal() {
    const modal = document.getElementById("invitedModal");
    modal.classList.remove("active");

    setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }, 300);
}

function populateInvitedList() {
    const invitedList = document.getElementById("invitedList");
    if (!invitedList) return;

    // Group invited by date
    const groupedInvited = {};
    invitedData.forEach((item) => {
        if (!groupedInvited[item.date]) {
            groupedInvited[item.date] = [];
        }
        groupedInvited[item.date].push(item);
    });

    let html = "";
    Object.keys(groupedInvited).forEach((date) => {
        // Convert date format
        const [day, month, year] = date.split(".");
        const months = [
            "ЯНВАРЯ",
            "ФЕВРАЛЯ",
            "МАРТА",
            "АПРЕЛЯ",
            "МАЯ",
            "ИЮНЯ",
            "ИЮЛЯ",
            "АВГУСТА",
            "СЕНТЯБРЯ",
            "ОКТЯБРЯ",
            "НОЯБРЯ",
            "ДЕКАБРЯ",
        ];
        const monthName = months[Number.parseInt(month) - 1];
        const fullYear = `20${year}`;

        html += `<div class="date-separator">${day} ${monthName} ${fullYear}</div>`;

        groupedInvited[date].forEach((item) => {
            const isCompleted = item.status === "completed";
            const statusClass = isCompleted
                ? "status-completed"
                : "status-waiting";
            const statusText = isCompleted
                ? "Завершил покупку"
                : "Ожидание покупки";
            const avatarLetter = item.name.charAt(0).toUpperCase();

            html += `
        <div class="list-item">
          <div class="item-avatar">${avatarLetter}</div>
          <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-details">
              <span class="item-number">${item.number}</span>
              <span>•</span>
              <span class="item-status ${statusClass}">${statusText}</span>
            </div>
          </div>
        </div>
      `;
        });
    });

    invitedList.innerHTML = html;
}

// Settings modal functions
function openSettingsModal() {
    const modal = document.getElementById("settingsModal");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        modal.classList.add("active");
    }, 10);
}

function closeSettingsModal() {
    const modal = document.getElementById("settingsModal");
    modal.classList.remove("active");

    setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }, 300);
}

function selectLanguage(lang) {
    // Remove active class from all language buttons
    document.querySelectorAll(".language-btn").forEach((btn) => {
        btn.classList.remove("active");
    });

    // Add active class to selected language
    document.querySelector(`[data-lang="${lang}"]`).classList.add("active");

    // Save language preference
    settingsData.language = lang;
    localStorage.setItem("Settings", JSON.stringify(settingsData));

    // In real app, you would change the app language here
    console.log(`Language changed to: ${lang}`);
}

function toggleNotifications(setting) {
    // Remove active class from all vibration buttons
    document.querySelectorAll(".notifications-btn").forEach((btn) => {
        btn.classList.remove("active");
    });

    // Add active class to selected setting
    document
        .querySelector(`[data-notifications="${setting}"]`)
        .classList.add("active");

    // Save vibration preference
    settingsData.notifications = setting;
    localStorage.setItem("Settings", JSON.stringify(settingsData));

    // In real app, you would enable/disable vibration here
    console.log(`Notifications ${setting === "on" ? "enabled" : "disabled"}`);
}

function openPolicy() {
    // In real app, open privacy policy page
    console.log("Opening privacy policy...");
    // window.open('/privacy-policy', '_blank')
}

function openSupport() {
    // In real app, open support chat or page
    console.log("Opening support...");
    // window.open('https://t.me/roomstars_support', '_blank')
}

// Referral modal functions
function openReferralModal() {
    const modal = document.getElementById("referralModal");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        modal.classList.add("active");
    }, 10);
}

function closeReferralModal() {
    const modal = document.getElementById("referralModal");
    modal.classList.remove("active");

    setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }, 300);
}

function copyReferralLink() {
    const linkInput = document.getElementById("referralLink");
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(linkInput.value).then(() => {
        const copyBtn = document.querySelector(".copy-btn");
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `Скопировано <svg
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
                                        fill="#22c55e"
                                    />
                                </g>

                                <defs>
                                    <clipPath id="a">
                                        <path d="M0 0h24v24H0z" />
                                    </clipPath>
                                </defs>
                            </svg>`;
        copyBtn.style.background = "#22c55e";
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = "";
        }, 2000);
    });
}

function shareReferralLink() {
    const link = document.getElementById("referralLink").value;
    const encodedLink = encodeURIComponent(link);
    const shareText = encodeURIComponent("Находи товары рядом с домом!");
    const telegramShareUrl = `https://t.me/share/url?url=${encodedLink}&text=${shareText}`;

    if (navigator.share) {
        navigator
            .share({
                title: "Присоединяйтесь к SearchSmoke",
                text: "Находи товары рядом с домом!",
                url: link,
            })
            .catch((err) => {
                window.open(telegramShareUrl, "_blank");
            });
    } else {
        window.open(telegramShareUrl, "_blank");
    }
}

// Update the original CashbackSystem updateDisplay method
const originalUpdateDisplay = CashbackSystem.prototype.updateDisplay;
CashbackSystem.prototype.updateDisplay = function () {
    originalUpdateDisplay.call(this);

    if (window.enhancedWidget?.updateDisplay) {
        enhancedWidget.updateDisplay();
    }
};

// Load settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem("Settings");
    if (saved) {
        settingsData = { ...settingsData, ...JSON.parse(saved) };
    }
}

// Format balance display
document.addEventListener("DOMContentLoaded", () => {
    // Load settings
    loadSettings();
    // Initialize display
    cashbackSystem.updateDisplay();
    setTimeout(() => (enhancedWidget = new EnhancedCashbackWidget()), 100);
});

// Export for testing
if (typeof window !== "undefined") {
    window.simulatePurchase = simulatePurchase;
    window.cashbackSystem = cashbackSystem;
}
