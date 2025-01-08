import "./MyEvents.css";
import { CreatePage } from "../../utils/functions/createPage";
import { RenderEvent } from "../../components/RenderEvent/RenderEvent";
import { getUserById } from "../../utils/functions/userService";
import { Events } from "../Events/Events";
import {
  Alert,
  RemoveAlert
} from "../../components/AlertManagement/AlertManagement";

export const MyEvents = async () => {
  const section = CreatePage({
    className: "myEvents"
  });
  section.setAttribute("aria-labelledby", "My events");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  try {
    const res = await getUserById(user._id, token);

    if (res.data.favoriteEvents.length === 0) {
      const onAccept = () => {
        RemoveAlert();
        window.history.pushState("", "", "/events");
        Events();
      };
      Alert({
        textContent: "No tienes eventos reservados en este momento",
        onAccept
      });
    } else {
      RenderEvent({
        parentElement: section,
        res: res.data.favoriteEvents
      });
    }
  } catch (error) {
    Alert({
      textContent:
        "Error al obtener tus eventos. Por favor, intentalo de nuevo más tarde.",
      onAccept: RemoveAlert
    });
    console.error("Error al obtener los eventos del usuario:", error);
  }
  return section;
};
