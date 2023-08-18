import axios from "axios";

const api = process.env.REACT_APP_BACKEND_URL;

export const ApiService = {
    getAllFilms: async () => {
        const result = await axios.get(`${api}/films/all`);
        return result;
    },
    getAllPeople: async (page) => {
        const result = await axios.get(`${api}/people/all/?page=${page}`);
        return result;
    },
    getAllStarships: async (page) => {
        const result = await axios.get(`${api}/starships/all/?page=${page}`);
        return result;
    },
    getAllPlanets: async (page) => {
        const result = await axios.get(`${api}/planets/all/?page=${page}`);
        return result;
    },

    getPeopleFromName: async (name) => {
        const result = await axios.get(`${api}/people/search/?search=${name}`);
        return result;
    },
    getStarshipsFromName: async (name) => {
        const result = await axios.get(
            `${api}/starships/search/?search=${name}`
        );
        return result;
    },
    getPlanetsFromName: async (name) => {
        const result = await axios.get(`${api}/planets/search/?search=${name}`);
        return result;
    },
};
