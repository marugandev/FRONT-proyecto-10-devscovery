import { AnchorLink } from "../AnchorLink/AnchorLink";
import { Button } from "../Button/Button";

export const AuthForm = ({
  formClass,
  title,
  fields,
  submitButtonText,
  avatar = null,
  formFooter = null
}) => {
  const form = document.createElement("form");
  const divClose = document.createElement("div");

  const aClose = AnchorLink({
    textContent: "X",
    className: "auth-section__close-link"
  });
  const h2 = document.createElement("h2");
  const pError = document.createElement("p");
  const submitButton = Button({
    type: "submit",
    textContent: submitButtonText,
    className: "auth-section__button"
  });

  form.classList.add("auth-section__form");
  form.classList.add(formClass);
  divClose.classList.add("auth-section__close-container");
  h2.textContent = title;
  h2.classList.add("auth-section__h2");
  pError.classList.add("auth-section__error");

  divClose.append(aClose);
  if (avatar) {
    form.append(divClose, h2, pError, avatar, ...fields, submitButton);
  } else {
    form.append(divClose, h2, pError, ...fields, submitButton);
  }

  if (formFooter) form.append(formFooter);

  return form;
};
