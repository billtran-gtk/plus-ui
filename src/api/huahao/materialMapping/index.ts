import request from '@/utils/request';
import type { AxiosPromise } from 'axios';
import type { MaterialMappingVO, MaterialMappingForm, MaterialMappingQuery } from './types';

/**
 * 查询客户料号与厂内料号对应列表
 * @param query
 * @returns {*}
 */
export const listMaterialMapping = (query?: MaterialMappingQuery): AxiosPromise<MaterialMappingVO[]> => {
  return request({
    url: '/huahao/materialMapping/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询客户料号与厂内料号对应详细
 * @param id
 */
export const getMaterialMapping = (id: string | number): AxiosPromise<MaterialMappingVO> => {
  return request({
    url: '/huahao/materialMapping/' + id,
    method: 'get'
  });
};

/**
 * 新增客户料号与厂内料号对应
 * @param data
 */
export const addMaterialMapping = (data: MaterialMappingForm) => {
  return request({
    url: '/huahao/materialMapping',
    method: 'post',
    data: data
  });
};

/**
 * 修改客户料号与厂内料号对应
 * @param data
 */
export const updateMaterialMapping = (data: MaterialMappingForm) => {
  return request({
    url: '/huahao/materialMapping',
    method: 'put',
    data: data
  });
};

/**
 * 删除客户料号与厂内料号对应
 * @param id
 */
export const delMaterialMapping = (id: string | number | Array<string | number>) => {
  return request({
    url: '/huahao/materialMapping/' + id,
    method: 'delete'
  });
};
