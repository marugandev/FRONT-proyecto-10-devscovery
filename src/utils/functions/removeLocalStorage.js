export const removeLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
