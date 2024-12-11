import { LoginRegister } from "../../pages/LoginRegister/LoginRegister";
import { Profile } from "../../pages/Profile/Profile";
import { navRoutes } from "./navRoutes";

export const routes = [
  ...navRoutes,
  {
    path: "/login",
    title: "Iniciar sesión",
    page: LoginRegister,
    id: "login"
  },
  {
    path: "/register",
    title: "Registrarse",
    page: LoginRegister,
    id: "register"
  },
  {
    path: "/profile",
    title: "Gestión de usuarios ★",
    page: Profile,
    id: "profile"
  }
];
