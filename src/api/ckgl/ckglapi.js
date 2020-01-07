import {get,post} from '../index'

export const getTable = params => post(`/getTable`, params);
export const Login = params => post(`/Login`, params);
export const getTableDataA=params => post(`/kcxxsd/selectStkc`, params);