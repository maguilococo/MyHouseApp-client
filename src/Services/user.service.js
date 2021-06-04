/* eslint-disable no-use-before-define */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-return-await */
import axios from 'axios';

const { REACT_APP_API_BASE_ENDPOINT } = process.env;

// TODOS LOS USUARIOS PARA EL ADMIN
export async function getAdminUsersDataService(id = '', limit = 10) {
    let endpoint = `${REACT_APP_API_BASE_ENDPOINT}/users`;
    endpoint += getQuerysStrings(limit, id);
    return await axios.get(endpoint);
}

// todos las reservas para el admin
export async function getAdminBookingsDataService(id = '', limit = 10) {
    let endpoint = `${REACT_APP_API_BASE_ENDPOINT}/users/bookings`;
    endpoint += getQuerysStrings(limit, id);
    return await axios.get(endpoint);
}

// TODA LA INFO DEL USUARIO
export async function getUserDataService(userId, limit = 10) {
    let endpoint = `${REACT_APP_API_BASE_ENDPOINT}/user/${userId}`;
    if (limit) endpoint += `?limit=${limit}`;
    return await axios.get(endpoint);
}

// AGREGAR UN USUARIO
export async function addUserService(user) {
    const endpoint = `${REACT_APP_API_BASE_ENDPOINT}/user`;
    return await axios.post(endpoint, user);
}

// EDITAR UN USUARIO
export async function editUserService(userId, user) {
    // console.log('user service', user)
    const endpoint = `${REACT_APP_API_BASE_ENDPOINT}/user/${userId}`;
    return await axios({
        method: 'put',
        url: endpoint,
        data: user
    });
}

// ELIMINAR UN USUARIO
export async function deleteUserService(userId) {
    const endpoint = `${REACT_APP_API_BASE_ENDPOINT}/user/${userId}`;
    return await axios.delete(endpoint);
}

// AGREGAR USUARIOS LOGUEADOS CON GOOGLE
export async function findOrCreateGoogleUserService(user) {
    const endpoint = `${REACT_APP_API_BASE_ENDPOINT}/user/google`;
    return await axios.post(endpoint, user);
};

// FUNCION AUXILIAR
function getQuerysStrings(limit, id) {
    let endpoint = '';
    if (limit) endpoint += `?limit=${limit}`;
    if (id) endpoint += `&id=${id}`;
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);
    endpoint += `&${params.toString()}`;
    return endpoint;
}