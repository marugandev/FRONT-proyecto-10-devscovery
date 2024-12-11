import { Menu } from "../../components/Menu/Menu";

export const replaceMenu = () => {
  document.querySelector(".main__auth-section").remove();

  const existingMenu = document.querySelector(".header__menu");
  if (existingMenu) {
    existingMenu.replaceWith(Menu());
  }
};
