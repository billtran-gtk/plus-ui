import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DemoVO } from '@/api/demo/demo/types';

/**
 * 查询验收单明细列表
 * @param query
 * @returns {*}
 */
export const listData = (query?: {}): AxiosPromise<[]> => {
  return request({
    url: '/pda/acceptance/list',
    method: 'get',
    params: query
  });
};

/**
 * 根据id查询验收单
 * @param id
 */
export const getData = (id: string | number): AxiosPromise<DemoVO> => {
  return request({
    url: '/pda/acceptance/' + id,
    method: 'get'
  });
};

/**
 * 生成PalletId
 */
export const generatePalletId = () => {
  return request({
    url: '/pda/acceptance/generate/palletId',
    method: 'get'
  });
};

/**
 * 生成RCId
 */
export const generateRcId = () => {
  return request({
    url: '/pda/acceptance/generate/rcId',
    method: 'get'
  });
};

/**
 * 删除测试单
 * @param id
 */
export const delData = (id: string | number | Array<string | number>) => {
  return request({
    url: '/pda/acceptance/' + id,
    method: 'delete'
  });
};

/**
 * 修改测试单
 * @param data
 */
export const updateData = (data: any) => {
  return request({
    url: '/pda/acceptance',
    method: 'put',
    data: data
  });
};

/**
 * 新增测试单
 * @param data
 */
export const addData = (data: any) => {
  return request({
    url: '/pda/acceptance',
    method: 'post',
    data: data
  });
};

/**
 * 获取验收单号列表（用于下拉框）
 */
export const getAccNoList = (): AxiosPromise<string[]> => {
  return request({
    url: '/pda/acceptance/accNoList',
    method: 'get'
  });
};

/**
 * 获取验收单下拉选项列表（包含文件名和验收单号）
 */
export const getAccNoOptions = (): AxiosPromise<Array<{accNo: string, fileName: string}>> => {
  return request({
    url: '/pda/acceptance/accNoOptions',
    method: 'get'
  });
};

/**
 * 查询验收单导入报告列表（分页）
 */
export const listAcceptanceForm = (query: any): AxiosPromise<any> => {
  return request({
    url: '/pda/acceptance/form/list',
    method: 'get',
    params: query
  });
};

/**
 * 删除验收单
 * @param id
 */
export const delAcceptanceForm = (id: string | number | Array<string | number>) => {
  return request({
    url: '/pda/acceptance/form/' + id,
    method: 'delete'
  });
};
