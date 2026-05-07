export interface MaterialMappingVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 排序号
   */
  sort?: number;

  /**
   * 客户料号
   */
  customerMaterialNo: string;

  /**
   * 厂内料号
   */
  factoryMaterialNo: string;

  /**
   * 客户名称
   */
  customerName: string;

  /**
   * 物料描述
   */
  materialDesc: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 创建时间
   */
  createTime: string;
}

export interface MaterialMappingForm {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 排序号
   */
  sort?: number;

  /**
   * 客户料号
   */
  customerMaterialNo?: string;

  /**
   * 厂内料号
   */
  factoryMaterialNo?: string;

  /**
   * 客户名称
   */
  customerName?: string;

  /**
   * 物料描述
   */
  materialDesc?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface MaterialMappingQuery extends PageQuery {
  /**
   * 客户料号
   */
  customerMaterialNo?: string;

  /**
   * 厂内料号
   */
  factoryMaterialNo?: string;

  /**
   * 客户名称
   */
  customerName?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
