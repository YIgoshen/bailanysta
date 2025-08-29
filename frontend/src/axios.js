import axios from "axios";

// чтобы не описывать весь путь когда делаю axios запрос - axios.get('http://localhost:4444/posts')
const instance = axios.create({
  baseURL: 'http://localhost:4444'
})


// middleware for auth check

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')

  return config
})

export default instance;
