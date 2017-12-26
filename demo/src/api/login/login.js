import axios from 'axios'
import Qs from 'qs'

/* 登录 */
export const requestLogin = params => { return axios.post(`/login/login`, Qs.stringify(params)).then( res => res.data ); };
