//import { notify } from '../notify.js';
import { getUserData, setUserData, clearUserData } from '../utils.js';

const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        //send request with appropriate method, headers and body (if any)
        const response = await fetch(host + url, options);

        //handle errors
        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message)
        }

        /*
        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
        */
        //return result
        try {
            //parse response (if needed)
            return await response.json();
        } catch (err) {
            return response;
        }

    } catch (err) {
         alert(err.message);
        // notify(err.message); - ако има нотификации
        throw err;
    }
}

//function that creates headers based on application state and body
function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {},
    };


    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData) {
        options.headers['X-Authorization'] = userData.token;
    }


    return options;
}

//decorator functions for all REST methods (CRUD actions)
export async function get(url) {
    return await request(url, createOptions());
}

export async function post(url, data) {
    return await request(url, createOptions('post', data));
}

export async function put(url, data) {
    return await request(url, createOptions('put', data));
}

export async function del(url) {
    return await request(url, createOptions('delete'));
}

//authentication functions (login, register, logout)
export async function login(email, password) {
    const result = await post('/users/login', { email, password });

    const userData = {
       // username: result.username,
        email: result.email,
        id: result._id,
       // gender: result.gender,
        token: result.accessToken
    }

    setUserData(userData);
    return result;
}

export async function register(email, password) {
    const result = await post('/users/register', { email, password });

    const userData = {
       // username: result.username,
        email: result.email,
        id: result._id,
        //gender: result.gender,
        token: result.accessToken
    }

    setUserData(userData);
    return result;
}

export function logout() {
    
    /*
    if (url == '/users/logout') {
        return response
    }
    */
   const result = get('/users/logout');
   clearUserData(result);
  // return result;
}
