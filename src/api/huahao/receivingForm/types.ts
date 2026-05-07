export interface ReceivingFormVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * R/C ID
   */
  rcId?: string;

  /**
   * 料号
   */
  partNo: string;

  /**
   * 验收单号
   */
  accNo?: string;

  /**
   * Quality数量
   */
  quantity?: number;

  /**
   * Date Code日期代码
   */
  dc?: string;

  /**
   * Lot Code批次代码
   */
  lot?: string;

  /**
   * MSL Level湿度敏感等级
   */
  msl?: string;

  /**
   * Location库位
   */
  location?: string;

  /**
   * AsnNO送货单号
   */
  asnNo?: string;

  /**
   * PalletID托盘ID
   */
  palletId?: string;

  /**
   * 标签类型（0:9常规,1:98/99）
   */
  label?: number;

  /**
   * 收料时间
   */
  receivingTime?: string;

  /**
   * 是否提交(0-否 1-是)
   */
  flag?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 创建时间
   */
  createTime?: string;
}

export interface ReceivingFormForm {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * R/C ID
   */
  rcId?: string;

  /**
   * 料号
   */
  partNo?: string;

  /**
   * 验收单号
   */
  accNo?: string;

  /**
   * Quality数量
   */
  quantity?: number;

  /**
   * Date Code日期代码
   */
  dc?: string;

  /**
   * Lot Code批次代码
   */
  lot?: string;

  /**
   * MSL Level湿度敏感等级
   */
  msl?: string;

  /**
   * Location库位
   */
  location?: string;

  /**
   * AsnNO送货单号
   */
  asnNo?: string;

  /**
   * PalletID托盘ID
   */
  palletId?: string;

  /**
   * 标签类型（0:9常规,1:98/99）
   */
  label?: number;

  /**
   * 收料时间
   */
  receivingTime?: string;

  /**
   * 是否提交(0-否 1-是)
   */
  flag?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface ReceivingFormQuery extends PageQuery {
  /**
   * R/C ID
   */
  rcId?: string;

  /**
   * 料号
   */
  partNo?: string;

  /**
   * 验收单号
   */
  accNo?: string;

  /**
   * AsnNO送货单号
   */
  asnNo?: string;

  /**
   * 是否提交(0-否 1-是)
   */
  flag?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
