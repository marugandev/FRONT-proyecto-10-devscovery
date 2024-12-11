import { navigate } from "../../utils/functions/navigate";
import { navRoutes } from "../../utils/routes/navRoutes";
import { AnchorLink } from "../AnchorLink/AnchorLink";
import "./Nav.css";

export const Nav = () => {
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");
  ul.classList.add("header__nav-list");

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  navRoutes.forEach((route) => {
    const li = document.createElement("li");
    li.classList.add("header__nav-item");

    if (route.id === "myEvents" && !user) {
      li.classList.add("header__nav-item--disabled");
    }

    if (route.id === "userManagement" || route.id === "eventManagement") {
      if (user && user.role === "admin") {
        const a = AnchorLink({
          textContent: route.title,
          href: route.path,
          id: route.id,
          className: "nav__anchor",
          ariaLabel: route.title
        });

        a.addEventListener("click", (e) => navigate(e, route, navRoutes));
        li.append(a);
        ul.append(li);
      }
    } else {
      const a = AnchorLink({
        textContent: route.title,
        href: route.path,
        id: route.id,
        className: "nav__anchor",
        ariaLabel: route.title
      });

      a.addEventListener("click", (e) => navigate(e, route, navRoutes));
      li.append(a);
      ul.append(li);
    }
  });

  nav.append(ul);

  return nav;
};
