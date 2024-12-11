export const CreatePage = ({ id, className }) => {
  const main = document.querySelector("main");
  const section = document.createElement("section");

  main.innerHTML = "";

  if (id) section.id = id;
  if (className) section.classList.add(className);

  main.append(section);
  return section;
};
