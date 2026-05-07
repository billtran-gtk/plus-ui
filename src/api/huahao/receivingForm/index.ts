import request from '@/utils/request';
import type { AxiosPromise } from 'axios';
import type { ReceivingFormVO, ReceivingFormForm, ReceivingFormQuery } from './types';

/**
 * 查询收料明细列表
 * @param query
 * @returns {*}
 */
export const listReceivingForm = (query?: ReceivingFormQuery): AxiosPromise<ReceivingFormVO[]> => {
  return request({
    url: '/huahao/receivingForm/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询收料明细详细
 * @param id
 */
export const getReceivingForm = (id: string | number): AxiosPromise<ReceivingFormVO> => {
  return request({
    url: '/huahao/receivingForm/' + id,
    method: 'get'
  });
};

/**
 * 新增收料明细
 * @param data
 */
export const addReceivingForm = (data: ReceivingFormForm) => {
  return request({
    url: '/huahao/receivingForm',
    method: 'post',
    data: data
  });
};

/**
 * 修改收料明细
 * @param data
 */
export const updateReceivingForm = (data: ReceivingFormForm) => {
  return request({
    url: '/huahao/receivingForm',
    method: 'put',
    data: data
  });
};

/**
 * 删除收料明细
 * @param id
 */
export const delReceivingForm = (id: string | number | Array<string | number>) => {
  return request({
    url: '/huahao/receivingForm/' + id,
    method: 'delete'
  });
};
