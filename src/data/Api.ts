import axios, { AxiosInstance } from "axios";
import * as dotenv from "dotenv";

class Api {
    public ApiInstance: AxiosInstance;
    constructor() {
        dotenv.config();
        this.ApiInstance = axios.create({
            baseURL: process.env.RESULTADOS_API_BASEURL,
        });
    }
}

export default new Api()