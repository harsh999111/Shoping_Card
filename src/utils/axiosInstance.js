import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  timeoutErrorMessage: 'Timeout! try after some time',
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const sessionUser = sessionStorage.getItem('user')
    let { headers } = config
    if (sessionUser) {
      const JSONSession = JSON.parse(sessionUser)
      headers = {
        ...headers,
        Authorization: `Bearer ${JSONSession.accessToken}`,
      }
    }

    // Do something before request is sent
    return { ...config, headers }
  },
  error =>
    // Do something with request error
    Promise.reject(error)
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response.data,
  error => {
    if (error?.response?.data) {
      return Promise.reject(new Error(error.response.data))
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosInstance
