const URL = "http://localhost:3000/api/v1";
// development URL

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

  const res = await fetch(URL + endpoint, {
    headers: combinedHeaders,
    body: isJSON ? JSON.stringify(body) : body,
    method
  });

  const response = await res.json();
  return response;
};
