export const navigate = (e, route, routes = []) => {
  e.preventDefault();
  window.history.pushState("", "", route.path);
  route.page();

  window.addEventListener("popstate", () => {
    const currentRoute = routes.find(
      (route) => route.path === window.location.pathname
    );
    if (currentRoute) currentRoute.page();
  });
};
