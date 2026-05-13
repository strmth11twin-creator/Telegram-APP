const searchInput = document.querySelector("[data-search-input]");
const containerChats = document.querySelector("[data-container-chats]");
const createBtn = document.querySelector("[data-create-btn]");
const createInput = document.querySelector("[data-create-input]");
const name = document.querySelector("[data-name]");
const header = document.querySelector("[data-header]");
const footer = document.querySelector("[data-footer]");
const sidebar = document.querySelector("[data-sidebar]");
const navigation = document.querySelector("[data-navigation]");
const headerBtn = document.querySelector("[data-header-btn]");
const removeBtn = document.querySelector("[data-remove-btn]");

let chatsList = JSON.parse(localStorage.getItem("chats")) || [];
let filterList = [];
let index = null;

function saveToLcalStorage(list) {
    localStorage.setItem("chats", JSON.stringify(list));
}

createBtn.addEventListener("click", () => {
    if (createInput.value.trim()) {
        if(createInput.value.length > 20) {
            createInput.value = "";
            return alert("Название чата не должно превышать 20 символов");
        }

        const newChat = {
            id: Date.now(),
            text: createInput.value,
        }

        chatsList.push(newChat);
        createInput.value = "";
        saveToLcalStorage(chatsList);
        render();
    }
})

searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.trim();

    renderAndRenderFiltered(searchValue);
})

function renderAndRenderFiltered(searchValue) {
    filterList = chatsList.filter(chat => chat.text.toLowerCase().includes(searchValue.toLowerCase()))

    renderFiltered();
}

headerBtn.addEventListener("click", (e) => {
    header.classList.remove("header-visible");
    footer.classList.remove("footer-visible");
    sidebar.classList.remove("sidebar-hidden");
    navigation.classList.remove("navigation-visible");
})

containerChats.addEventListener("click", (e) => {
    if(e.target.classList.contains("chat")) {
        document.querySelectorAll(".chat").forEach(chat => {
            chat.classList.remove("active")
        })

        e.target.classList.add("active");
        header.classList.add("header-visible");
        footer.classList.add("footer-visible");
        sidebar.classList.add("sidebar-hidden");
        navigation.classList.add("navigation-visible");

        name.textContent = e.target.querySelector("p").textContent;

        index = e.target.id
    }

    if(e.target.classList.contains("remove-btn")) {
        const id = Number(e.target.dataset.id);
        chatsList = chatsList.filter(c => c.id !== id);

        saveToLcalStorage(chatsList);
        render();
    }
}) 

function renderFiltered() {
    containerChats.innerHTML = "";
    filterList.forEach((chat) => {
        const chatElement = document.createElement("div");
        chatElement.classList.add("chat");

        const chatText = document.createElement("p");
        chatText.textContent = chat.text;

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.dataset.id = chat.id;
        removeBtn.textContent = "X";

        chatElement.append(chatText);
        chatElement.append(removeBtn);
        containerChats.append(chatElement);
    })
}

function render() {
    containerChats.innerHTML = "";
    chatsList.forEach((chat) => {
        const chatElement = document.createElement("div");
        chatElement.classList.add("chat");

        const chatText = document.createElement("p");
        chatText.textContent = chat.text;

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.dataset.id = chat.id;
        removeBtn.textContent = "X";
        
        chatElement.append(chatText);
        chatElement.append(removeBtn);
        containerChats.append(chatElement);
    })
}

render();