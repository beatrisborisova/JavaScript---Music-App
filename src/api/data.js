import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllSongs() {
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function getSongById(songId) {
    return api.get('/data/albums/' + songId);
}

export async function createSong(song) {
    return api.post('/data/albums', song);
}

export async function editSong(songId, song) {
    return api.put('/data/albums/' + songId, song);
}

export async function deleteSong(songId) {
    return api.del('/data/albums/' + songId);
}

export async function searchSong(query) {
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}