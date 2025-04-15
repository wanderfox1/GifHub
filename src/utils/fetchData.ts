import axios from 'axios';
import {gif} from "../MainPage/mainPage.tsx";


export const fetchData = async (url : string): Promise<gif[]>  => {
    try {
        const res = await axios.get(url);
        return Array.isArray(res.data.data) ? res.data.data : [res.data.data]

    } catch (error) {
        console.log("error with fetch", error)
        throw error;
    }
}