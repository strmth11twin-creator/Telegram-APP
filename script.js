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
let index = null;

function saveToLcalStorage(list) {
    localStorage.setItem("chats", JSON.stringify(list));
}

createBtn.addEventListener("click", () => {
    if (createInput.value.trim()) {
        const newChat = {
            id: Date.now(),
            text: createInput.value
        }

        chatsList.push(newChat);
        createInput.value = "";
        saveToLcalStorage(chatsList);
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
    if(e.target.classList.contains("chat")) {
        document.querySelectorAll(".chat").forEach(chat => {
            chat.classList.remove("active")
        })

        e.target.classList.add("active");
        header.classList.add("header-visible");
        footer.classList.add("footer-visible");
        sidebar.classList.add("sidebar-hidden");
        navigation.classList.add("navigation-visible");

        name.textContent = e.target.textContent;

        index = e.target.id
    }
}) 

function render() {
    containerChats.innerHTML = "";
    chatsList.forEach((chat) => {
        const chatElement = document.createElement("div");
        chatElement.classList.add("chat");
        chatElement.textContent = chat.text;

        containerChats.append(chatElement);
    })
}

render();