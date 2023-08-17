import axios from "axios";

const api = process.env.REACT_APP_BACKEND_URL;

export const ApiService = {
    getAllFilms: async () => {
        const result = await axios.get(`${api}/films/all`);
        return result;
    },
};
