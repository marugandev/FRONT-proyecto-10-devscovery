import { Button } from "../../components/button/button";
import { CloseLink } from "../../components/CloseLink.js/CloseLink";
import { RenderEventManagement } from "../../components/RenderEventManagement/RenderEventManagement";
import { moveInputs } from "../../utils/animations/moveInputs";
import { createEventFormData } from "../../utils/functions/createEventFormData";
import { CreatePage } from "../../utils/functions/createPage";
import {
  deleteEvent,
  getEventById,
  getEvents,
  postEvent,
  putEvent
} from "../../utils/functions/eventService";

import "./EventManagement.css";

export const EventManagement = async () => {
  const token = localStorage.getItem("token");

  const section = CreatePage({ className: "event-management" });

  const closeDiv = CloseLink({
    classNameAnchor: "event-management__close-link",
    classNameDiv: "event-management__close-container",
    section
  });

  const h2 = document.createElement("h2");
  h2.classList.add("event-management__title");
  h2.textContent = "Gestión de eventos";

  const createButton = Button({
    textContent: "Crear evento",
    className: "event-management__button-create"
  });

  const select = document.createElement("select");
  select.classList.add("event-management__select");

  const placeholderOption = document.createElement("option");
  placeholderOption.classList.add("event-management__option--placeholder");
  placeholderOption.textContent = "Seleccionar evento";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;

  section.append(closeDiv);
  section.append(h2);
  section.append(createButton);
  section.append(select);
  select.append(placeholderOption);

  try {
    const events = await getEvents();
    if (!events || events.length === 0) {
      throw new Error("No se encontraron eventos");
    }

    events.data.sort((a, b) => a.title.localeCompare(b.title));

    events.data.forEach((event) => {
      const option = document.createElement("option");
      option.classList.add("event-management__option");
      option.value = event._id;
      option.textContent = event.title;

      select.append(option);
    });
  } catch (error) {
    console.error("Fallo al obtener los eventos:", error);
    alert("Fallo al cargar los eventos. Por favor, inténtalo más tarde.");
  }

  createButton.addEventListener("click", (e) => {
    e.preventDefault();
    createButton.remove();
    select.remove();
    document.querySelector(".event-management__title").remove();

    const handleCreate = async (e) => {
      e.preventDefault();

      const formData = createEventFormData(
        e,
        "https://res.cloudinary.com/cloudcloudinary0/image/upload/v1733241914/proyecto-10-devscovery/assets/ukf0bbdstpcgrlf6euzh.webp"
      );

      try {
        const res = await postEvent(formData, token);

        if (res.status === "error") {
          alert(res.message);
        } else {
          console.log("Evento creado", res);
          alert("Evento creado con éxito");

          window.location.href = "/events";
        }
      } catch (error) {
        console.error("Error al crear el evento:", error);
      }
    };

    RenderEventManagement({
      h2TextContent: "Crear evento",
      parentElement: section,
      handleCreate,
      create: true
    });
  });

  select.addEventListener("change", async (e) => {
    e.preventDefault();

    createButton.remove();
    select.remove();
    document.querySelector(".event-management__title").remove();

    const eventId = select.value;

    const form = document.querySelector(".user-management__form");
    if (form) {
      form.remove();
    }

    try {
      const res = await getEventById(eventId, token);

      if (res.error) {
        throw new Error(res.error);
      }

      const handleModify = async (e) => {
        e.preventDefault();

        const formData = createEventFormData(e, res.data.img);

        try {
          const response = await putEvent(eventId, formData, token);
          console.log("Evento actualizado", response);
          alert("Evento actualizado correctamente");

          window.location.href = "/events";
        } catch (error) {
          console.error("Error al actualizar el evento:", error);
        }
      };

      const handleDelete = async () => {
        const isConfirmed = window.confirm(
          "¿Seguro de que deseas eliminar el evento? La acción no se puede deshacer."
        );
        if (isConfirmed) {
          try {
            await deleteEvent(eventId, token);
            alert("Evento eliminado");

            window.location.href = "/events";
          } catch (error) {
            console.error("Error al eliminar el evento:", error);
          }
        }
      };

      RenderEventManagement({
        h2TextContent: "Modificar evento",
        parentElement: section,
        res,
        handleModify,
        handleDelete,
        modifyAndDelete: true
      });

      moveInputs();
    } catch (error) {
      console.error("Error al cargar el evento:", error);
      alert(
        "Error al cargar el evento, por favor inténtalo de nuevo mas tarde"
      );
    }
  });

  return section;
};
