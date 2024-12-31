/* const URL = "http://localhost:3000/api/v1"; */
// development URL

/* const BASE_URL =
  process.env.VITE_API_URL === "production"
    ? "https://front-proyecto-10-devscovery-rtc.vercel.app/" // URL de producción
    : "http://localhost:3000"; */

const BASE_URL = import.meta.env.VITE_API_URL;
/* console.log("Base URL:", BASE_URL); */

export const API = async ({
  endpoint,
  headers = {},
  isJSON = true,
  body,
  method = "GET"
}) => {
  const defaultHeaders = {};

  if (isJSON) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const combinedHeaders = { ...defaultHeaders, ...headers };

  const res = await fetch(BASE_URL + endpoint, {
    headers: combinedHeaders,
    body: isJSON ? JSON.stringify(body) : body,
    method
  });

  if (!res.ok) {
    const errorRes = await res.json();
    console.error("Error de la API:", errorRes);
    throw new Error(errorRes.message || "Error desconocido");
  }

  const response = await res.json();
  return response;
};
