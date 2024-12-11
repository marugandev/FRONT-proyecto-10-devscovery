import { Header } from "./src/components/Header/Header";
import { Events } from "./src/pages/Events/Events";
import "./style.css";

const runApp = async () => {
  const body = document.querySelector("body");
  const main = document.createElement("main");

  body.append(Header());
  body.append(main);
  main.append(await Events());
};
runApp();
