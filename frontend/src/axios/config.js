import axios from 'axios'

const PORT = import.meta.env.VITE_REACT_APP_PORT;

const blogFetch = axios.create({
    baseURL: `http://localhost:${PORT}`,
    headers: {
        "Content-Type": "application/json",
    }
})

export default blogFetch