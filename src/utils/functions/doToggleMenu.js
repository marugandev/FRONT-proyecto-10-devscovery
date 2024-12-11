export const doToggleMenu = () => {
  const menu = document.querySelector(".header__menu");

  if (menu) {
    menu.classList.toggle("header__menu-toggle");

    const iconToggleMenu = document.querySelector(
      'img[src="/public/assets/icons/devscovery_menu_close.svg"], img[src="/public/assets/icons/devscovery_menu_open.svg"]'
    );

    if (iconToggleMenu) {
      if (iconToggleMenu.src.includes("menu_close")) {
        iconToggleMenu.src = "/public/assets/icons/devscovery_menu_open.svg";
        iconToggleMenu.alt = "Abrir menú";
        iconToggleMenu.title = "Abrir menú";
      } else {
        iconToggleMenu.src = "/public/assets/icons/devscovery_menu_close.svg";
        iconToggleMenu.alt = "Cerrar menú";
        iconToggleMenu.title = "Cerrar menú";
      }
    }
  }
};
