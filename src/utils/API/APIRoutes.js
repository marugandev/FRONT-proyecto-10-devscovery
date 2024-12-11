/* const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://miapi.com' // URL de producción
  : 'http://localhost:4000'; // URL de desarrollo

export const API_ROUTES = {
  users: {
    register: `${BASE_URL}/api/users/register`,
    login: `${BASE_URL}/api/users/login`,
    getProfile: (userId) => `${BASE_URL}/api/users/${userId}`
  },
  events: {
    getAll: `${BASE_URL}/api/events`,
    getEvent: (eventId) => `${BASE_URL}/api/events/${eventId}`,
    createEvent: `${BASE_URL}/api/events`
  }
}; */

/* import { API_ROUTES } from './config/apiRoutes';

export const fetchEvents = async () => {
  const response = await fetch(API_ROUTES.events.getAll);
  const data = await response.json();
  return data;
};
 */
