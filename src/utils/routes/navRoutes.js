import { Contact } from "../../pages/Contact/Contact";
import { Info } from "../../pages/Info/Info";
import { MyEvents } from "../../pages/MyEvents/MyEvents";
import { Events } from "../../pages/Events/Events";
import { EventManagement } from "../../pages/EventManagement/EventManagement";
import { UserManagement } from "../../pages/UserManagement/UserManagement";

export const navRoutes = [
  {
    path: "/events",
    title: "Eventos",
    page: Events,
    id: "events"
  },
  {
    path: "/myEvents",
    title: "Mis eventos ✔︎",
    page: MyEvents,
    id: "myEvents"
  },
  {
    path: "/userManagement",
    title: "Gestión de usuarios ★",
    page: UserManagement,
    id: "userManagement"
  },
  {
    path: "/eventManagement",
    title: "Gestión de Eventos ★",
    page: EventManagement,
    id: "eventManagement"
  },
  {
    path: "/info",
    title: "Info",
    page: Info,
    id: "info"
  },
  {
    path: "/contact",
    title: "Contacto",
    page: Contact,
    id: "contact"
  }
];
