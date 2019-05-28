import axios from 'axios';
import client from './client';

// Errors
const NO_TOKEN = "NO TOKEN";


/**
 * @desc 
 * @type {Promise} HTTP(s) request
 */
export const logOut = () => {
fetch('/logout', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
    id: client.me,
    token: client.getJWT()
   }),
})
  return Promise.resolve(client.removeCredentials())
}

/**
 * @desc fetch data about current user
 * @type {Promise} one or two http request
 * @returns {Object} or null
 */
export const whoAmI = () => (
  Promise.resolve(client.getJWT() ? client : Promise.reject(NO_TOKEN))
  // If the client doesn't have a token, fetch it on the rendering server
  // !! Those data are not to be trusted !!
  .catch( error => error === NO_TOKEN ? (
    axios.get("/login")
    .then( response => client.setCredentials(response.data))
  ) : Promise.reject(error))
  // Once the token exists, fetch log data on api
  .then(client => client.get("/api/oauth/"))
  .then( response => response.data)
  // On 401, the user isn't logged, remove his JWT;
  .catch( error => error.response && error.response.status === 401 ? client.removeJWT() && null : Promise.reject(error))
);

export const googleLink = () => Promise.resolve();