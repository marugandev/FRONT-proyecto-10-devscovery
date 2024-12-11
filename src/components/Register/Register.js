import { AuthForm } from "../AuthForm/AuthForm";
import { AnchorLink } from "../AnchorLink/AnchorLink";
import { FieldForm } from "../FieldForm/FieldForm";

export const Register = () => {
  const fields = [
    FieldForm({
      fieldFormClass: "auth-section__fieldset auth-section__fieldset--userName",
      inputType: "text",
      inputClass: "auth-section__input auth-section__input--userName",
      inputName: "inputUserName",
      inputMinLength: 3,
      inputMaxLength: 20,
      labelTextContent: "Nombre de usuario",
      labelClass: "auth-section__label auth-section__label--userName"
    }),
    FieldForm({
      fieldFormClass: "auth-section__fieldset auth-section__fieldset--email",
      inputType: "email",
      inputClass: "auth-section__input auth-section__input--email",
      inputName: "inputEmail",
      inputMaxLength: 50,
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
      labelTextContent: "Contraseña",
      labelClass: "auth-section__label auth-section__label--password"
    }),
    FieldForm({
      fieldFormClass: "auth-section__fieldset auth-section__fieldset--password",
      inputType: "password",
      inputClass: "auth-section__input auth-section__input--password",
      inputName: "inputRepeatPassword",
      inputMinLength: 8,
      inputMaxLength: 100,
      labelTextContent: "Repite la contraseña",
      labelClass: "auth-section__label auth-section__label--password"
    })
  ];

  const formFooter = document.createElement("p");
  const aFooter = AnchorLink({
    textContent: "Inicia sesión",
    className: "auth-section__login-link"
  });

  formFooter.classList.add("auth-section__login");
  formFooter.textContent = "¿Ya tienes cuenta?";

  formFooter.append(aFooter);

  const form = AuthForm({
    formClass: "auth-section__register-form",
    title: "Regístrate",
    fields,
    submitButtonText: "Regístrate",
    formFooter
  });

  return form;
};
