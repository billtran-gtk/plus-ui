import request from '@/utils/request';
import type { AxiosPromise } from 'axios';
import type { NetworkFileVO, NetworkFile, NetworkFileQuery } from './types';

/**
 * 查询网络共享文件配置对应列表
 * @param query
 * @returns {*}
 */
export const listNetworkFile = (query?: NetworkFileQuery): AxiosPromise<NetworkFileVO[]> => {
  return request({
    url: '/huahao/network/file/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询网络共享文件配置
 * @param id
 */
export const getNetworkFile = (id: string | number): AxiosPromise<NetworkFileVO> => {
  return request({
    url: '/huahao/network/file/' + id,
    method: 'get'
  });
};

/**
 * 新增网络共享文件配置
 * @param data
 */
export const addNetworkFile = (data: NetworkFile) => {
  return request({
    url: '/huahao/network/file',
    method: 'post',
    data: data
  });
};

/**
 * 修改网络共享文件配置
 * @param data
 */
export const updateNetworkFile = (data: NetworkFile) => {
  return request({
    url: '/huahao/network/file',
    method: 'put',
    data: data
  });
};

/**
 * 删除网络共享文件配置
 * @param id
 */
export const delNetworkFile = (id: string | number | Array<string | number>) => {
  return request({
    url: '/huahao/network/file/' + id,
    method: 'delete'
  });
};
