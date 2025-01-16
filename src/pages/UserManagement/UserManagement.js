import {
  Alert,
  RemoveAlert
} from "../../components/AlertManagement/AlertManagement";
import { Loader } from "../../components/Loader/Loader";
import { RenderProfile } from "../../components/RenderProfile/RenderProfile";
import { moveInputs } from "../../utils/animations/moveInputs";
import { CreatePage } from "../../utils/functions/createPage";

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
    Alert({
      textContent:
        "Fallo al cargar los usuarios. Por favor, inténtalo más tarde.",
      onAccept: RemoveAlert
    });

    console.error("Fallo al obtener usuarios:", error);
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

        const onAccept = async () => {
          const formData = new FormData();
          formData.append("userName", e.target.elements.inputUserName.value);
          formData.append("email", e.target.elements.inputEmail.value);
          formData.append("password", e.target.elements.inputPassword.value);

          if (e.target.elements.inputAvatar.files[0]) {
            formData.append("avatar", e.target.elements.inputAvatar.files[0]);
          }
          try {
            Loader(".alert__buttons-container");

            const response = await putUser(userId, formData, token);

            if (userLocalStorage && userLocalStorage._id === userId) {
              localStorage.setItem("user", JSON.stringify(response.user));
            }

            RemoveAlert();
            Alert({
              textContent: "Usuario actualizado",
              onAccept: () => {
                RemoveAlert;
                window.location.href = "/events";
              }
            });

            console.log("Usuario actualizado", response);
          } catch (error) {
            RemoveAlert();
            Alert({
              textContent: error,
              onAccept: RemoveAlert
            });

            console.error("Error al actualizar el usuario:", error);
          }
        };
        Alert({
          textContent: "¿Seguro que deseas guardar los cambios en la cuenta?",
          cancelButton: true,
          onAccept,
          onCancel: RemoveAlert
        });
      };

      const handleDelete = () => {
        const onAccept = async () => {
          try {
            Loader(".alert__buttons-container");

            const response = await deleteUser(userId, token);

            if (userLocalStorage && userLocalStorage._id === userId)
              localStorage.clear();

            RemoveAlert();
            Alert({
              textContent: "Usuario eliminado",
              onAccept: () => {
                RemoveAlert;
                window.location.href = "/events";
              }
            });

            console.log("Usuario eliminado", response);
          } catch (error) {
            RemoveAlert();
            Alert({
              textContent: error,
              onAccept: RemoveAlert
            });

            console.error("Error al eliminar el usuario:", error);
          }
        };
        Alert({
          textContent:
            "¿Seguro de que deseas eliminar la cuenta? La acción no se puede deshacer.",
          cancelButton: true,
          onAccept,
          onCancel: RemoveAlert
        });
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
      Alert({
        textContent:
          "Error al cargar el perfil, por favor inténtalo de nuevo mas tarde",
        onAccept: RemoveAlert
      });

      console.error("Error al cargar el perfil:", error);
    }
  });

  section.append(h2);
  section.append(select);

  return section;
};
