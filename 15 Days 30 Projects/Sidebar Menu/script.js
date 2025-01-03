const sidebarToggler = document.querySelector(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
const menuToggler = document.querySelector(".menu-toggler");
const collapsedSidebarHeight = "76px";
const fullSidebarHeight = "calc(100vh - 32px)";

sidebarToggler.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

const toggleMenu = (isMenuActive) => {
    sidebar.style.height = isMenuActive ? `${sidebar.scrollHeight}px` : collapsedSidebarHeight ;
    menuToggler.querySelector("span").innerHTML = isMenuActive ? "close" : "menu";
}

menuToggler.addEventListener("click", () => {
    toggleMenu(sidebar.classList.toggle("menu-active"));
})

window.addEventListener("resize", () => {
    if(window.innerWidth >= 800) {
        sidebar.style.height = fullSidebarHeight;
    }
    else {
        sidebar.classList.remove("collapsed");
        sidebar.style.height = "auto";
        toggleMenu(sidebar.classList.toggle("menu-active"));
    }
})