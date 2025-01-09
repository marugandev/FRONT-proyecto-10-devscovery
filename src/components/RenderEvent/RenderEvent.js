import { LoginRegister } from "../../pages/LoginRegister/LoginRegister";
import { putEventAttendees } from "../../utils/functions/eventAttendeesService";
import { Alert, RemoveAlert } from "../AlertManagement/AlertManagement";
import { Button } from "../Button/Button";

import "./RenderEvent.css";

export const RenderEvent = ({ parentElement, res }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  for (const event of res) {
    const article = document.createElement("article");
    const headerEvent = document.createElement("header");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const divDetailsContainer = document.createElement("div");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const sectionEventDetails = document.createElement("section");
    const location = document.createElement("p");
    const date = document.createElement("p");
    const duration = document.createElement("p");
    const organizer = document.createElement("p");
    const attendees = document.createElement("p");
    const button = Button({
      textContent: "Reservar",
      className: "events__button"
    });

    article.classList.add("events__card");
    headerEvent.classList.add("events__header");
    title.classList.add("events__title");
    description.classList.add("events__description");
    divDetailsContainer.classList.add("events__details-container");
    figure.classList.add("events__img-container");
    img.classList.add("events__img");
    sectionEventDetails.classList.add("events__details");
    location.classList.add("events__location");
    date.classList.add("events__date");
    duration.classList.add("events__duration");
    organizer.classList.add("events__organizer");
    attendees.classList.add("events__attendees");

    title.textContent = event.title;
    description.textContent = event.description;
    img.src = event.img || "ruta/a/imagen/por/defecto.jpg";
    img.alt = `Imagen del evento ${event.title}`;

    location.innerHTML = `<strong class="events__label events__label--location">Ubicación:</strong> ${
      event.location || "Virtual"
    }`;

    const formattedDate = new Date(event.date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const formattedTime = new Date(event.date).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit"
    });
    date.innerHTML = `<strong class="events__label events__label--date">Fecha:</strong> ${formattedDate}, ${formattedTime}h`;

    duration.innerHTML = `<strong class="events__label events__label--duration">Duración:</strong> ${event.duration} minutos`;
    organizer.innerHTML = `<strong class="events__label events__label--organizer">Organizado por:</strong> ${event.organizer}`;
    attendees.innerHTML = `<strong class="events__label events__label--attendees">Asistentes:</strong> ${event.attendees.length} | ${event.maxAttendees}`;

    if (user) {
      const isUserAttending = user.favoriteEvents.includes(event._id);
      if (isUserAttending) {
        button.classList.add("events__button--clicked");
        button.textContent = "Reservado ✔︎";
      }
    }

    button.addEventListener("click", async (e) => {
      e.preventDefault();

      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user._id) {
        Alert({
          textContent:
            "Inicia sesión o regístrate para poder reservar los eventos.",
          onAccept: () => {
            RemoveAlert();
            LoginRegister();
          }
        });

        console.error(
          "Inicia sesión o regístrate para poder reservar los eventos."
        );
        return;
      }

      const userId = user._id;

      button.classList.toggle("events__button--clicked");

      try {
        button.disabled = true;

        const res = await putEventAttendees(
          event._id,
          { attendees: userId },
          token
        );
        console.log(res);

        if (res.status === "success") {
          button.textContent = button.classList.contains(
            "events__button--clicked"
          )
            ? "Reservado ✔︎"
            : "Reservar";

          const attendeesCountChange = button.classList.contains(
            "events__button--clicked"
          )
            ? 1
            : -1;
          const updatedAttendeesCount = Math.max(
            res.event.attendees.length + attendeesCountChange,
            0
          );

          attendees.innerHTML = `<strong class="events__label events__label--attendees">Asistentes:</strong> ${updatedAttendeesCount} | ${event.maxAttendees}`;

          if (
            window.location.pathname.includes("myEvents") &&
            !button.classList.contains("events__button--clicked")
          ) {
            article.remove();
          }

          localStorage.setItem("user", JSON.stringify(res.user));
        }
      } catch (error) {
        Alert({
          textContent:
            "Error al registrar tu asistencia. Por favor, intentalo de nuevo más tarde.",
          onAccept: RemoveAlert
        });

        console.error("Fallo al registrar asistencia:", error);
      } finally {
        button.disabled = false;
      }
    });

    headerEvent.append(title, description);
    divDetailsContainer.append(figure, sectionEventDetails);
    figure.append(img);
    sectionEventDetails.append(
      location,
      date,
      duration,
      organizer,
      attendees,
      button
    );
    article.append(headerEvent, divDetailsContainer);
    parentElement.append(article);
  }
};
