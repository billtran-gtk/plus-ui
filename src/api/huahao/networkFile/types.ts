export interface NetworkFileVO {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 文件路径
   */
  filePath?: string;

  /**
   * 类型
   */
  type: string;

  /**
   * 是否启用
   */
  isEnable: string;

  /**
   * 创建时间
   */
  createTime: string;
}

export interface NetworkFile {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 文件路径
   */
  filePath?: string;

  /**
   * 类型
   */
  type: string;

  /**
   * 是否启用
   */
  isEnable: string;

  /**
   * 创建时间
   */
  createTime: string;
}

export interface NetworkFileQuery extends PageQuery {
  /**
   * 文件路径
   */
  filePath?: string;

  /**
   * 类型
   */
  type: string;
  /**
   * 日期范围参数
   */
  params?: any;
}
