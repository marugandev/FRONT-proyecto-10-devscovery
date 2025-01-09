import { AuthForm } from "../AuthForm/AuthForm";
import { AnchorLink } from "../AnchorLink/AnchorLink";
import { FieldForm } from "../FieldForm/FieldForm";

export const Login = () => {
  const fields = [
    FieldForm({
      fieldFormClass: "auth-section__fieldset auth-section__fieldset--email",
      inputType: "email",
      inputClass: "auth-section__input auth-section__input--email",
      inputName: "inputEmail",
      inputMaxLength: 50,
      inputAutocomplete: "email",
      labelTextContent: "Correo electrónico",
      labelClass: "auth-section__label auth-section__label--email"
    }),
    FieldForm({
      fieldFormClass: "auth-section__fieldset auth-section__fieldset--password",
      inputType: "password",
      inputClass: "auth-section__input auth-section__input--password",
      inputName: "inputPassword",
      inputMinLength: 8,
      inputMaxLength: 100,
      inputAutocomplete: "current-password",
      labelTextContent: "Contraseña",
      labelClass: "auth-section__label auth-section__label--password"
    })
  ];

  const formFooter = document.createElement("p");
  const aFooter = AnchorLink({
    textContent: "Regístrate",
    className: "auth-section__register-link"
  });

  formFooter.classList.add("auth-section__register");
  formFooter.textContent = "¿Aún no tienes cuenta?";

  formFooter.append(aFooter);

  const form = AuthForm({
    formClass: "auth-section__login-form",
    title: "Inicia Sesión",
    fields,
    submitButtonText: "Inicia Sesión",
    formFooter
  });

  return form;
};
