/* eslint-disable no-use-before-define */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-return-await */
import axios from 'axios';

const { REACT_APP_API_BASE_ENDPOINT } = process.env;
// const REACT_APP_API_BASE_ENDPOINT = 'http://localhost:3001';

// TRAE PUBLICACIONES DISPONIBLE
export async function getFilteredPropiertiesService(id = '', limit = 10) {
  let endpoint = `${REACT_APP_API_BASE_ENDPOINT}/posts`;
  endpoint += getQuerysStrings(limit, id);
  return await axios.get(endpoint);
}

// homework
// TODAS LAS PUBLICACIONES
export async function getPostsService(limit = 10) {
  let endpoint = `${REACT_APP_API_BASE_ENDPOINT}/posts`;
  if (limit) endpoint += `?limit=${limit}`;
  return await axios.get(endpoint);
}

// TODAS LA INFO DEL ADMIN

// TODAS LAS PUBLICACIONES PARA EL ADMIN
export async function getAdminPostDataService(id = '', limit = 10) {
  console.log('service ',id)
  let endpoint = `${REACT_APP_API_BASE_ENDPOINT}/posts`;
  endpoint += getQuerysStrings(limit, id);
  return await axios.get(endpoint);
}

// DETALLES DE UN POST
export async function getPostService(id) {
  const endpoint = `${REACT_APP_API_BASE_ENDPOINT}/post/${id}`;
  return await axios.get(endpoint);
}

// AGREGAR UN POST
export async function addPostService(post) {
  const endpoint = `${REACT_APP_API_BASE_ENDPOINT}/post`;
  return await axios.post(endpoint, post);
}

// ENVIAR MAIL DE CONFIRMACIÓN DE PAGO
export async function sendPaymentEmail(order) {
  const endpoint = `${REACT_APP_API_BASE_ENDPOINT}/mailer/payment`;
  return await axios.post(endpoint, order);
}

// EDITAR UN POST
export async function editPostService(postId, post) {
  const endpoint = `${REACT_APP_API_BASE_ENDPOINT}/post/${postId}`;
  return await axios.put(endpoint, post);
}

// ELIMINAR UN POST
export async function deletePostService(postId) {
  const endpoint = `${REACT_APP_API_BASE_ENDPOINT}/post/${postId}`;
  return await axios.delete(endpoint);
}

// FUNCION AUXILIAR
// &id=bc6b5eff-d880-4048-8c37-24e446a1962b&page=6
function getQuerysStrings(limit, id) {
  let endpoint = '';
  if (limit) endpoint += `?limit=${limit}`;
  if (id) endpoint += `&id=${id}`;
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  endpoint += `&${params.toString()}`;
  return endpoint;
  // return `&${params.toString()}`; // window.location.search;
}


// DATA TYPE PARSER FORM
export function valueTypes (input) {
  let values = {}
  Object.entries(input).forEach(e => {
     if (e[1] === 'false') e[1] = false;
     if (e[1] === 'true') e[1] = true;
     values[e[0]] = e[1];
   })
  return values;
}

//UPDATE EXPIRATION DATE
export async function updateExpirationDate() {
  let endpoint = `${REACT_APP_API_BASE_ENDPOINT}/updater`;
  return await axios.get(endpoint);
}
