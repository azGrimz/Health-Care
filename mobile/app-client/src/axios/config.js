import axios from 'axios'
//import { IP } from "@env"

const blogFetch = axios.create({
    baseURL: `http://192.168.15.63:8080`,
    headers: {
        "Content-Type": "application/json",
    }
})

export default blogFetch