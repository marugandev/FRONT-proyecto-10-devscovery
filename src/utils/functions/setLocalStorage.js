export const setLocalStorage = (res) => {
  localStorage.setItem("token", res.token);
  localStorage.setItem("user", JSON.stringify(res.user));
};
