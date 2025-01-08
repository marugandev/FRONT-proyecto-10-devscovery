import "./Loader.css";

export const Loader = () => {
  const main = document.querySelector("main");
  if (!main) {
    console.error("No se encontró el elemento main");
    return;
  }

  const div = document.createElement("div");
  div.classList.add("loader");

  main.prepend(div);
  /*   return div; */
};
