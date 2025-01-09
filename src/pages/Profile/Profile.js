import { RenderProfile } from "../../components/RenderProfile/RenderProfile";
import { CreatePage } from "../../utils/functions/createPage";
import { moveInputs } from "../../utils/animations/moveInputs";
import {
  getUserById,
  putUser,
  deleteUser
} from "../../utils/functions/userService";
import { removeLocalStorage } from "../../utils/functions/removeLocalStorage";
import {
  Alert,
  RemoveAlert
} from "../../components/AlertManagement/AlertManagement";

import "./Profile.css";

export const Profile = async () => {
  const section = CreatePage({ className: "profile" });
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  try {
    const res = await getUserById(user._id, token);

    if (res.error) {
      throw new Error(res.error);
    }

    const handleModify = (e) => {
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
          const response = await putUser(user._id, formData, token);

          if (response.user) {
            localStorage.setItem("user", JSON.stringify(response.user));
          }

          RemoveAlert();
          Alert({
            textContent: "Perfil actualizado.",
            onAccept: () => {
              RemoveAlert;
              window.location.href = "/events";
            }
          });

          console.log("Perfil actualizado", response);
        } catch (error) {
          RemoveAlert();
          Alert({
            textContent: error,
            onAccept: RemoveAlert
          });

          console.error("Error al actualizar el perfil:", error);
        }
      };

      Alert({
        textContent: "¿Seguro que deseas guardar los cambios en tu perfil?",
        cancelButton: true,
        onAccept,
        onCancel: RemoveAlert
      });
    };

    const handleDelete = () => {
      const onAccept = async () => {
        try {
          const response = await deleteUser(user._id, token);

          removeLocalStorage();

          RemoveAlert();
          Alert({
            textContent: "Perfil eliminado.",
            onAccept: () => {
              RemoveAlert;
              window.location.href = "/events";
            }
          });

          console.log("Perfil eliminado:", response);
        } catch (error) {
          RemoveAlert();
          Alert({
            textContent: error,
            onAccept: RemoveAlert
          });

          console.error("Error al eliminar el perfil:", error);
        }
      };

      Alert({
        textContent:
          "¿Seguro de que deseas eliminar tu cuenta? La acción no se puede deshacer.",
        cancelButton: true,
        onAccept,
        onCancel: RemoveAlert
      });
    };

    const handleLogout = () => {
      const onAccept = () => {
        removeLocalStorage();

        RemoveAlert();
        Alert({
          textContent: "Sesión cerrada",
          onAccept: () => {
            RemoveAlert();
            window.location.href = "/events";
          }
        });

        console.log("Sesión cerrada");
      };

      Alert({
        textContent: "¿Seguro que deseas cerrar sesión?",
        cancelButton: true,
        onAccept,
        onCancel: RemoveAlert
      });
    };

    RenderProfile({
      blockClassBEM: "profile",
      parentElement: section,
      res,
      handleModify,
      handleDelete,
      handleLogout,
      logout: true
    });
  } catch (error) {
    Alert({
      textContent:
        "Error al cargar el perfil, por favor inténtalo de nuevo más tarde.",
      onAccept: RemoveAlert
    });

    console.error("Error al cargar el perfil:", error);
  }

  moveInputs();

  return section;
};
