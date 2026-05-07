/**
 * 验收单表单对象
 */
export interface AcceptanceFormVO {
  /**
   * 主键
   */
  id: string | number;

  /**
   * 租户编号
   */
  tenantId?: string;

  /**
   * 验收单号
   */
  accNo?: string;

  /**
   * 状态（0：未开始，1：收料中，2：已完成）
   */
  status?: string;

  /**
   * 导入文件名
   */
  fileName?: string;

  /**
   * 创建者
   */
  createBy?: number;

  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 更新者
   */
  updateBy?: number;

  /**
   * 更新时间
   */
  updateTime?: string;

  /**
   * 创建部门
   */
  createDept?: number;

  /**
   * 删除标志（0代表存在 1代表删除）
   */
  delFlag?: string;
}

/**
 * 验收单查询对象
 */
export interface AcceptanceFormQuery extends PageQuery {
  /**
   * 验收单号
   */
  accNo?: string;

  /**
   * 状态（0：未开始，1：收料中，2：已完成）
   */
  status?: string;

  /**
   * 导入文件名
   */
  fileName?: string;

  /**
   * 创建时间范围
   */
  params?: {
    beginCreateTime?: string;
    endCreateTime?: string;
  };
}
