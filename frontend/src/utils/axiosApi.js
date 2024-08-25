import axios from "axios";
import { BASE_URL } from "./constants";

export const AXIOS = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // Send cookies with requests
})