import { CreatePage } from "../../utils/functions/createPage";
import "./Contact.css";

export const Contact = () => {
  const contact = CreatePage({ className: "contact" });
  contact.setAttribute("aria-labelledby", "contact");

  contact.innerHTML = `
  <section class="contact__section contact__section--intro">
      <h2 class="contact__title">Contacto</h2>  
      <p class="contact__description">
          Si tienes preguntas, sugerencias o necesitas asistencia, estamos aquí para ayudarte.
      </p>
      <span class="contact__borders"></span>
  </section>
  <section class="contact__section contact__section--help">
      <h3 class="contact__subtitle">¿Cómo podemos ayudarte?</h3>
      <p><strong class="contact__label">Dudas sobre Devscovery:</strong> Si tienes preguntas sobre el funcionamiento de la plataforma o el registro, contacta con nuestro equipo de soporte.</p>
      <p><strong class="contact__label">Soporte de Eventos:</strong> ¿Problemas para reservar o confirmar tu asistencia? Envíanos un mensaje y te ayudaremos a resolverlo.</p>
      <p><strong class="contact__label">Propuestas de Patrocinio:</strong> Si deseas patrocinar un evento en Devscovery, estaremos encantados de colaborar contigo.</p>
      <span class="contact__borders"></span>
  </section>
  <section class="contact__section contact__section--methods">
      <h3 class="contact__subtitle">Formas de contacto</h3>
        <p><strong class="contact__label">Email:</strong> <a href="mailto:support@devscovery.com" class="contact__link">support@devscovery.com</a></p>
        <p><strong class="contact__label">Teléfono:</strong> +34 999 999 999</p>
        <p><strong class="contact__label">Redes Sociales:</strong> Síguenos en <a href="#" class="contact__link">Twitter</a>, <a href="#" class="contact__link">LinkedIn</a>, y <a href="#" class="contact__link">GitHub</a> para actualizaciones y novedades.</p>
      <span class="contact__borders"></span>
  </section>
`;

  return contact;
};
