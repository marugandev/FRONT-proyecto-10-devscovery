import "./Loader.css";

export const Loader = (parentElement) => {
  const container = document.querySelector(parentElement);

  if (!container) {
    console.error(
      `No se encontró el elemento con el selector ${parentElement}`
    );
    return;
  }

  const div = document.createElement("div");
  div.classList.add("loader");

  container.append(div);
};
