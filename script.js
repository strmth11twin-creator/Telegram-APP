const searchInput = document.querySelector("[data-search-input]");
const containerChats = document.querySelector("[data-container-chats]");
const createBtn = document.querySelector("[data-create-btn]");
const name = document.querySelector("[data-name]");
const header = document.querySelector("[data-header]");
const footer = document.querySelector("[data-footer]");
const sidebar = document.querySelector("[data-sidebar]");
const navigation = document.querySelector("[data-navigation]");
const headerBtn = document.querySelector("[data-header-btn]");
const removeBtn = document.querySelector("[data-remove-btn]");
const sectionsList = document.querySelectorAll(".navigation_list--items");
const sectionsNavigation = document.querySelector("[data-sections-navigation]");
const input = document.querySelector("[data-input]");
const telegramBtn = document.querySelector("[data-telegram-btn]");
const containerMessages = document.querySelector("[data-container-messages]");
const file = document.querySelector("[data-file]");
const fileInput = document.querySelector("[data-file-input]")

let chatList = [
    {
        id: 1, type: "chat", image: "https://avatars.mds.yandex.net/get-kinopoisk-image/10768063/0b3b2109-f8ad-4fc9-aa56-fb51a9454bf5/1920x", name: "Иван",
        text: "Привет, как дела?", time: "15:30", messages: 1
    },
    {
        id: 2, type: "chat", image: "https://avatars.mds.yandex.net/i?id=0b13cc249e10179265de085cd992d165662f9391-6950859-images-thumbs&n=13", name: "Мария",
        text: "Давай встретимся завтра😊", time: "15:30", messages: 1
    },
    {
        id: 3, type: "channel", image: "https://avatars.mds.yandex.net/i?id=286c3aa89816456cdc0f7dca252f094601e0c7fa23b7166d-12726868-images-thumbs&n=13", name: "Новости IT",
        text: "Apple предоставила новый AirPodsPro", time: "14:45", messages: 1
    },
    {
        id: 4, type: "bot", image: "https://logos.telegram-store.com/bots/worldweatherappbot/telegram_bot_logo.jpg", name: "Weather Bot",
        text: "Погода в твоем городе +22°С", time: "14:10",
    }
]

let messages = JSON.parse(localStorage.getItem("messages")) || {};
let searchList = [];
let filteredList = [];
let current = "all";
let currentChatId = null;

function saveToLocalStorage(messagesList) {
    localStorage.setItem("messages", JSON.stringify(messagesList))
}

file.addEventListener("click", (e) => {
    fileInput.click()
})

fileInput.addEventListener("change", (e) => {
    const files = fileInput.files[0];

    if(!messages[currentChatId]) {
        messages[currentChatId] = [];
    }

    messages[currentChatId].push(files.name);

    fileInput.value = "";

    saveToLocalStorage(messages);
    renderMessages();
})

telegramBtn.addEventListener("click", () => {
    if (input.value.trim()) {

        if(!messages[currentChatId]) {
            messages[currentChatId] = [];
        }

        messages[currentChatId].push(input.value);

        input.value = "";

        if (input.value.trim()) {
            telegramBtn.innerHTML = `<svg class="icons"><use href="icon.svg"></use></svg>`
        } else {
            telegramBtn.innerHTML = `<svg class="icons"><use href="icon-icons (5).svg"></use></svg>`
        }

        saveToLocalStorage(messages);
        renderMessages();
    }
})

input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        telegramBtn.click();
    }
})

input.addEventListener("input", (e) => {
    if (e.target.value.trim()) {
        telegramBtn.innerHTML = `<svg class="icons"><use href="icon.svg"></use></svg>`
    } else {
        telegramBtn.innerHTML = `<svg class="icons"><use href="icon-icons (5).svg"></use></svg>`
    }
})

searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.trim();

    renderAndRenderFiltered(searchValue);
})

function renderAndRenderFiltered(searchValue) {
    searchList = chatList.filter(v => v.name.toLowerCase().includes(searchValue.toLowerCase()));

    renderedFilter();
}

sectionsNavigation.addEventListener("click", (e) => {
    if (e.target.classList.contains("navigation_list--items")) {
        sectionsList.forEach(v => v.classList.remove("active"));

        e.target.classList.add("active");

        if (e.target.dataset.filter === "all") {
            current = "all"
        } else if (e.target.dataset.filter === "channel") {
            current = "channel"
        } else if (e.target.dataset.filter === "bot") {
            current = "bot"
        }

        render();
    }
})

headerBtn.addEventListener("click", (e) => {
    header.classList.remove("header-visible");
    footer.classList.remove("footer-visible");
    sidebar.classList.remove("sidebar-hidden");
    navigation.classList.remove("navigation-visible");
})

containerChats.addEventListener("click", (e) => {
    const chatEl = e.target.closest(".container_chats--chat");
    if (!chatEl) return;

    const chat = chatList.find(c => c.id === +chatEl.dataset.id);
    sectionsList.forEach(v => v.classList.remove("active"));
    currentChatId = chat.id;

    chatEl.classList.add("active");

    name.textContent = chat.name;

    containerMessages.classList.add("container-messages-visible")
    header.classList.add("header-visible");
    footer.classList.add("footer-visible");
    sidebar.classList.add("sidebar-hidden");
    navigation.classList.add("navigation-visible");

    renderMessages();
})

function renderedFilter() {
    containerChats.innerHTML = "";

    filteredList = searchList;

    if (current === "channel") {
        filteredList = searchList.filter(v => v.type === "channel")
    }

    if (current === "bot") {
        filteredList = searchList.filter(v => v.type === "bot")
    }

    filteredList.forEach(chat => {
        const chatElement = document.createElement("div");
        chatElement.classList.add("container_chats--chat");
        chatElement.dataset.id = chat.id;
        chatElement.dataset.type = chat.type;

        chatElement.innerHTML = `
        <img src="${chat.image}" class="chat_photo"  alt="Фото человека">

        <div class="chat_content">
         <h3 class="chat_content--title">${chat.name}</h3>
         <p class="chat_content--text">${chat.text}</p>
        </div>

        <div class="chat_time">
         <span class="chat_time--time">${chat.time}</span>
         ${chat.messages ? `<p class="chat_time--messages">${chat.messages}</p>` : ""}
        </div>
        `

        containerChats.append(chatElement);
    })
}

function render() {
    containerChats.innerHTML = "";

    filteredList = chatList;

    if (current === "channel") {
        filteredList = chatList.filter(v => v.type === "channel")
    }

    if (current === "bot") {
        filteredList = chatList.filter(v => v.type === "bot")
    }

    filteredList.forEach(chat => {
        const chatElement = document.createElement("div");
        chatElement.classList.add("container_chats--chat");
        chatElement.dataset.id = chat.id;
        chatElement.dataset.type = chat.type;

        chatElement.innerHTML = `
        <img src="${chat.image}" class="chat_photo"  alt="Фото человека">

        <div class="chat_content">
         <h3 class="chat_content--title">${chat.name}</h3>
         <p class="chat_content--text">${chat.text}</p>
        </div>

        <div class="chat_time">
         <span class="chat_time--time">${chat.time}</span>
         ${chat.messages ? `<p class="chat_time--messages">${chat.messages}</p>` : ""}
        </div>
        `

        containerChats.append(chatElement);
    })
}

function renderMessages() {
    containerMessages.innerHTML = "";

    const chatMessages = messages[currentChatId] || [];

    chatMessages.forEach(message => {
        const messageElement = document.createElement("span");
        messageElement.textContent = message;
        messageElement.classList.add("message-text");

        containerMessages.append(messageElement);
    })
}

render();
renderMessages();