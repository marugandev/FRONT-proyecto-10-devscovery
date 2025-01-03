import { RenderProfile } from "../../components/RenderProfile/RenderProfile";
import { moveInputs } from "../../utils/animations/moveInputs";
import { CreatePage } from "../../utils/functions/createPage";
import { removeLocalStorage } from "../../utils/functions/removeLocalStorage";
import {
  getUserById,
  getUsers,
  putUser,
  deleteUser
} from "../../utils/functions/userService";

import "./UserManagement.css";

export const UserManagement = async () => {
  const section = CreatePage({ className: "user-management" });

  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const h2 = document.createElement("h2");
  h2.classList.add("user-management__title");
  h2.textContent = "Gestión de usuarios";

  const select = document.createElement("select");
  select.classList.add("user-management__select");

  const placeholderOption = document.createElement("option");
  placeholderOption.classList.add("user-management__option--placeholder");
  placeholderOption.textContent = "Selecciona un usuario";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;

  select.append(placeholderOption);

  try {
    const users = await getUsers(token);
    if (!users || users.length === 0) {
      throw new Error("No se encontraron usuarios");
    }

    users.data.sort((a, b) => a.userName.localeCompare(b.userName));

    users.data.forEach((user) => {
      const option = document.createElement("option");
      option.classList.add("user-management__option");
      option.value = user._id;
      option.textContent = user.userName;

      select.append(option);
    });
  } catch (error) {
    console.error("Fallo al obtener usuarios:", error);
    alert("Fallo al cargar los usuarios. Por favor, inténtalo más tarde.");
  }

  select.addEventListener("change", async () => {
    const userId = select.value;

    const form = document.querySelector(".user-management__form");
    if (form) {
      form.remove();
    }

    try {
      const res = await getUserById(userId, token);

      if (res.error) {
        throw new Error(res.error);
      }

      const handleModify = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userName", e.target.elements.inputUserName.value);
        formData.append("email", e.target.elements.inputEmail.value);
        formData.append("password", e.target.elements.inputPassword.value);

        if (e.target.elements.inputAvatar.files[0]) {
          formData.append("avatar", e.target.elements.inputAvatar.files[0]);
        }

        try {
          const response = await putUser(userId, formData, token);
          console.log("Usuario actualizado", response);
          alert("Usuario actualizado correctamente");

          if (userLocalStorage && userLocalStorage._id === userId) {
            localStorage.setItem("user", JSON.stringify(response.user));
          }
          window.location.href = "/events";
        } catch (error) {
          console.error("Error al actualizar el usuario:", error);
        }
      };

      const handleDelete = async () => {
        const isConfirmed = window.confirm(
          "¿Seguro de que deseas eliminar la cuenta? La acción no se puede deshacer."
        );
        if (isConfirmed) {
          try {
            await deleteUser(userId, token);
            alert("Usuario eliminado");

            if (userLocalStorage && userLocalStorage._id === userId)
              removeLocalStorage();
            window.location.href = "/events";
          } catch (error) {
            console.error("Error al eliminar el usuario:", error);
          }
        }
      };

      RenderProfile({
        blockClassBEM: "user-management",
        closeLinkSection: document.querySelector(".user-management"),
        h2TextContent: "Perfil",
        parentElement: section,
        res,
        handleModify,
        handleDelete
      });

      moveInputs();
    } catch (error) {
      console.error("Error al cargar el perfil:", error);
      alert(
        "Error al cargar el perfil, por favor inténtalo de nuevo mas tarde"
      );
    }
  });

  section.append(h2);
  section.append(select);

  return section;
};
