import { AnchorLink } from "../../components/AnchorLink/AnchorLink";
import { CreatePage } from "../../utils/functions/createPage";
import { Events } from "../Events/Events";
import { LoginRegister } from "../LoginRegister/LoginRegister";

import "./Info.css";

export const Info = () => {
  const info = CreatePage({ className: "info" });
  info.setAttribute("aria-labelledby", "info");

  info.innerHTML = `
    <section class="info__section info__section--about">
      <h2 class="info__title">Info sobre la plataforma</h2>
      <p class="info__description">
        Devscovery es una plataforma gratuita de eventos para developers, creada para ayudarte a descubrir, reservar y asistir a eventos de tecnología, todos patrocinados y sin coste.
      </p>
      <span class="info__borders"></span>
    </section>
    <section class="info__section info__section--how-it-works">
      <h3 class="info__subtitle">¿Cómo funciona?</h3>
      <ul class="info__list">
        <li class="info__list-item"><strong class="info__label-how">1 | Regístrate en Devscovery:</strong> Crea una cuenta para poder reservar eventos y recibir notificaciones personalizadas.</li>
        <li class="info__list-item"><strong class="info__label-how">2 | Explora los eventos:</strong> Accede a eventos patrocinados en desarrollo y tecnología.</li>
        <li class="info__list-item"><strong class="info__label-how">3 | Reserva tu plaza:</strong> Una vez registrado, selecciona el evento y asegura tu lugar al hacer clic en <em>Reservar</em>.</li>
        <li class="info__list-item"><strong class="info__label-how">4 | Confirmación y ticket digital:</strong> Una semana antes del evento, recibirás un correo electrónico de confirmación. Confirma tu asistencia y genera tu ticket digital.</li>
      </ul>
      <span class="info__borders"></span>
    </section>
    <section class="info__section info__section--benefits">
      <h3 class="info__subtitle">Beneficios de Devscovery</h3>
      <ul class="info__list">
        <li class="info__list-item"><strong class="info__label-benefits">✔ Acceso gratuito a eventos premium:</strong> Gracias a patrocinadores y promotores.</li>
        <li class="info__list-item"><strong class="info__label-benefits">✔ Comunidad tech:</strong> Conéctate con otros developers y expande tu red.</li>
        <li class="info__list-item"><strong class="info__label-benefits">✔ Tickets digitales:</strong> Acceso rápido y seguro a todos tus eventos reservados.</li>
      </ul>
      <span class="info__borders"></span>
    </section>
    <section class="info__section info__section--reminders">
      <h3 class="info__subtitle">Recordatorios y confirmaciones</h3>
      <ul class="info__list">
        <li class="info__list-item"><strong class="info__label-reminders">7 días antes:</strong> Confirmación de tu asistencia por email con enlace para obtener tu ticket digital.</li>
        <li class="info__list-item"><strong class="info__label-reminders">Registro fácil: </strong>Administra y revisa tus eventos reservados desde tu cuenta.</li>
      </ul>
      <span class="info__borders"></span>
    </section>
    <section class="info__section info__section--reminders">
      <h3 class="info__cta">Únete a Devscovery</h3>
      <p class="info__cta-description"><span class="info__cta-link"></span>, explora eventos y asegura tu plaza en los próximos eventos tech de la comunidad. ¡Tu próximo evento te espera!</p>
      <span class="info__borders"></span>
    </section>
  `;
  /*  */
  const footer = document.createElement("footer");
  footer.classList.add("info__footer");

  const footerText = document.createElement("p");
  footerText.textContent = "Creado por:";
  footerText.classList.add("info__footer-text");

  const footerA = AnchorLink({
    href: "https://marugandev.netlify.app/",
    className: "info__footer-a",
    target: "_blank"
  });

  const footerImg = document.createElement("img");
  footerImg.src =
    "https://res.cloudinary.com/cloudcloudinary0/image/upload/v1733404016/proyecto-10-devscovery/assets/logo_marugandev/haco9r7lthjeocir8rnk.svg";
  footerImg.alt = "Marugandev";
  footerImg.classList.add("info__footer-img");

  footerA.append(footerImg);
  footer.append(footerText, footerA);
  info.append(footer);

  const registerLink = AnchorLink({
    textContent: "Regístrate",
    href: "/registro",
    className: "info__cta-link--register",
    ariaLabel: "Regístrate en Devscovery"
  });

  const linkContainer = info.querySelector(".info__cta-link");
  linkContainer.appendChild(registerLink);

  if (!localStorage.getItem("user")) {
    registerLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState("", "", "/login");
      LoginRegister();
    });
  } else {
    registerLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState("", "", "/events");
      Events();
    });
  }

  return info;
};
