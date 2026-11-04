/**
 * 直接从 Oracle 查出来的验收单明细
 *
 * 六个字段与后端 OracleReceiptDetailVo 一一对应：
 * receiptNo / asnNo / partNo / quantity 来自 ERP，msl 来自 EHS 或 WMS，locator 来自 WMS。
 * 查无 msl 或 locator 时后端回的是空字符串而不是 null。
 */
export interface OracleReceiptDetailVO {
  /**
   * 验收单号
   */
  receiptNo?: string;

  /**
   * 供应商号
   */
  asnNo?: string;

  /**
   * 料号
   */
  partNo?: string;

  /**
   * 应收数量
   */
  quantity?: number;

  /**
   * 湿敏等级
   */
  msl?: string;

  /**
   * 仓位
   */
  locator?: string;
}

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
