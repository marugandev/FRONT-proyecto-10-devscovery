import {
  Alert,
  RemoveAlert
} from "../../components/AlertManagement/AlertManagement";
import { RenderEvent } from "../../components/RenderEvent/RenderEvent";
import { CreatePage } from "../../utils/functions/createPage";
import { getEvents } from "../../utils/functions/eventService";

import "./Events.css";

export const Events = async () => {
  const section = CreatePage({
    className: "events"
  });
  section.setAttribute("aria-labelledby", "events");
  try {
    const res = await getEvents();

    RenderEvent({
      parentElement: section,
      res: res.data
    });
  } catch (error) {
    RemoveAlert();
    Alert({
      textContent:
        "Error al mostrar los eventos. Por favor, intentalo de nuevo más tarde.",
      onAccept: RemoveAlert
    });

    console.error("Error al mostrar los eventos", error);
  }

  return section;
};
