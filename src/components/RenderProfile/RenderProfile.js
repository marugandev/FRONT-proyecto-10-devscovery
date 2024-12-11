import { Button } from "../button/button";
import { CloseLink } from "../CloseLink.js/CloseLink";
import { FieldForm } from "../FieldForm/FieldForm";

export const RenderProfile = ({
  blockClassBEM,
  closeLinkSection = document.querySelector(".profile"),
  h2TextContent = "Mi perfil",
  parentElement,
  res,
  handleModify,
  handleDelete,
  handleLogout,
  logout = false
}) => {
  const form = document.createElement("form");
  form.classList.add(`${blockClassBEM}__form`);

  const closeDiv = CloseLink({
    classNameAnchor: `${blockClassBEM}__close-link`,
    classNameDiv: `${blockClassBEM}__close-container`,
    section: closeLinkSection
  });

  const h2 = document.createElement("h2");
  h2.classList.add(`${blockClassBEM}__title`);
  h2.textContent = h2TextContent;

  const divAvatar = document.createElement("div");
  divAvatar.classList.add(`${blockClassBEM}__avatar-container`);

  const avatar = document.createElement("img");
  avatar.classList.add(`${blockClassBEM}__avatar`);
  avatar.src = res.data.avatar;

  const fieldsetAvatar = FieldForm({
    fieldFormClass: `${blockClassBEM}__avatar-fieldform`,
    inputType: "file",
    inputClass: `${blockClassBEM}__avatar-input`,
    inputName: "inputAvatar",
    inputRequired: false,
    labelTextContent: "Subir imagen",
    labelClass: `${blockClassBEM}__avatar-label`
  });

  divAvatar.append(avatar, fieldsetAvatar);
  form.append(closeDiv, h2, divAvatar);

  const inputAvatar = divAvatar.querySelector(
    `.${blockClassBEM}__avatar-input`
  );
  inputAvatar.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatar.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  const userName = FieldForm({
    fieldFormClass: `${blockClassBEM}__fieldset ${blockClassBEM}__fieldset--userName`,
    inputType: "text",
    inputClass: `${blockClassBEM}__input ${blockClassBEM}__input--userName`,
    inputName: "inputUserName",
    inputRequired: false,
    inputMinLength: 3,
    inputMaxLength: 20,
    labelTextContent: res.data.userName,
    labelClass: `${blockClassBEM}__label profile__label--userName`
  });

  const email = FieldForm({
    fieldFormClass: `${blockClassBEM}__fieldset profile__fieldset--email`,
    inputType: "email",
    inputClass: `${blockClassBEM}__input profile__input--email`,
    inputName: "inputEmail",
    inputRequired: false,
    inputMaxLength: 50,
    labelTextContent: res.data.email,
    labelClass: `${blockClassBEM}__label profile__label--email`
  });

  const password = FieldForm({
    fieldFormClass: `${blockClassBEM}__fieldset ${blockClassBEM}__fieldset--password`,
    inputType: "password",
    inputClass: `${blockClassBEM}__input ${blockClassBEM}__input--password`,
    inputName: "inputPassword",
    inputRequired: false,
    inputMinLength: 8,
    inputMaxLength: 100,
    labelTextContent: "●●●●●●●●",
    labelClass: `${blockClassBEM}__label ${blockClassBEM}__label--password`
  });

  const fieldsetGroupData = [
    { legendText: "Nombre de usuario:", fieldset: userName },
    { legendText: "Email:", fieldset: email },
    { legendText: "Contraseña:", fieldset: password }
  ];

  fieldsetGroupData.forEach(({ legendText, fieldset }) => {
    const fieldsetGroup = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = legendText;

    fieldsetGroup.classList.add(`${blockClassBEM}__fieldset-group`);
    legend.classList.add(`${blockClassBEM}__legend-fieldset-group`);

    fieldsetGroup.append(legend, fieldset);
    form.append(fieldsetGroup);
  });

  const divButtons = document.createElement("div");
  const modifyButton = Button({
    type: "submit",
    textContent: "Modificar",
    className: `${blockClassBEM}__button profile__button-modify`
  });
  const deleteButton = Button({
    textContent: "Eliminar",
    className: `${blockClassBEM}__button profile__button-delete`
  });

  form.addEventListener("submit", handleModify);
  deleteButton.addEventListener("click", handleDelete);

  divButtons.classList.add(`${blockClassBEM}__buttons-group`);
  divButtons.append(modifyButton, deleteButton);

  if (logout) {
    const logoutButton = Button({
      textContent: "Cerrar sesión",
      className: `${blockClassBEM}__button ${blockClassBEM}__button-logout`
    });
    logoutButton.addEventListener("click", handleLogout);
    divButtons.append(logoutButton);
  }

  form.append(divButtons);

  parentElement.append(form);
};
