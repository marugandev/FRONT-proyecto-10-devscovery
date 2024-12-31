import { Header } from "./src/components/Header/Header";
import { Events } from "./src/pages/Events/Events";
import {
  listenToTokenChanges,
  verifyJwt
} from "./src/utils/functions/tokenManagement";

import "./style.css";

const runApp = async () => {
  const body = document.querySelector("body");
  const main = document.createElement("main");

  const token = localStorage.getItem("token");
  if (token) verifyJwt(token);

  listenToTokenChanges();

  body.append(Header());
  body.append(main);
  main.append(await Events());
};
runApp();
