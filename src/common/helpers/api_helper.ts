import axios from 'axios'

export function getToken() {
  const token = localStorage.getItem('token')

  if (token) return token
  return null
}

const API_URL = process.env.REACT_APP_BASE_URL
const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.interceptors.response.use(
  (resp:any) => resp,
  (error:any) => Promise.reject(error),
)

export async function get(url: string, config = {}) {
  return await axiosApi
    .get(url, { ...config, headers: { authorization: 'Bearer ' + getToken() } })
    .then((response:any) => response.data)
    .catch((error:any) => {
      console.log(error)
      return error.response.data
    })
}
// export async function deleteAxios(url: string, config = {}) {
//   return await axiosApi
//     .post(url, {
//       ...config,
//       headers: { authorization: 'Bearer ' + getToken() },
//     })
//     .then((response:any) => response.data)
//     .catch((error: any) => {
//       console.log(error)
//       return error.response.data
//     })
// }
export async function deleteAxios(url: string, config = {}) {
  return await axiosApi
    .post(url, null, {
      ...config,
      headers: { 
        authorization: 'Bearer ' + getToken()
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      console.log(error);
      return error.response.data;
    });
}

export async function post(url: string, body = {}, config = {}) {
  //   console.log(url, body);
  return await axiosApi
    .post(
      url,
      { ...body },
      {
        ...config,
        headers: {
          authorization: 'Bearer ' + getToken(),
        },
      },
    )
    .then((response:any) => response.data)
    .catch((error:any) => {
      console.log(error)
      return error.response.data
    })
}
export async function put(url: string, body = {}, config = {}) {
  //   console.log(url, body);
  return await axiosApi
    .post(
      url,
      { ...body },
      {
        ...config,
        headers: {
          authorization: 'Bearer ' + getToken(),
        },
      },
    )
    .then((response: any) => response.data)
    .catch((error: any) => {
      console.log(error)
      return error.response.data
    })
}
