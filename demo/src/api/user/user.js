import axios from 'axios'
import Qs from 'qs'

/* 获取所有用户列表 */
export const getAllUser = params => { return axios.post(`/user/user_index`, Qs.stringify(params)).then( res => res.data ); };

/* 根据login获取子层列表 */
export const getSubordinateUser = params => { return axios.post(`/user/get_subordinate_user`, Qs.stringify(params)).then( res => res.data ); };

/* 根据login获取交易列表 */
export const getTradeList = params => { return axios.post(`/account/get_trade`, Qs.stringify(params)).then( res => res.data ); };

/* 根据login获取交易历史 */
export const getTradeHistory = params => { return axios.post(`/account/get_trade_history`, Qs.stringify(params)).then( res => res.data ); };

/* 获取客户数月增长数据 */
export const getClientStatistic = params => { return axios.post(`/manage/register_statistic`, Qs.stringify(params)).then( res => res.data ); };

/* 交易量统计 */
export const getVolumeStatistic = params => { return axios.post(`/manage/volume_statistic`, Qs.stringify(params)).then( res => res.data ); };

/* 本月客户活跃度 */
export const getActiveStatistic = params => { return axios.post(`/manage/active_statistic`, Qs.stringify(params)).then( res => res.data ); };

/* 首页统计数据 */
export const getIndexStatistic = params => { return axios.post(`/manage/statistic`, Qs.stringify(params)).then( res => res.data ); };

/* 添加用户 */
export const addUser = params => { return axios.post(`/user/add`, Qs.stringify(params)).then( res => res.data ); };
