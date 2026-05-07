export interface VersionVO {
  /**
   * 主键
   */
  versionId: string | number;

  /**
   * 版本号
   */
  versionNumber: string;

  /**
   * 内容
   */
  content: string;

  /**
   * 路径
   */
  url: string;
}

export interface VersionForm extends BaseEntity {
  /**
   * 主键
   */
  versionId?: string | number;

  /**
   * 版本号
   */
  versionNumber?: string;

  /**
   * 内容
   */
  content?: string;

  /**
   * 路径
   */
  url?: string;
}

export interface VersionQuery extends PageQuery {

  /**
   * 版本号
   */
  versionNumber?: string;

  /**
   * 内容
   */
  content?: string;

  /**
   * 路径
   */
  url?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
