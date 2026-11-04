export default {
  // 路由国际化
  route: {
    dashboard: '首页',
    document: '项目文档'
  },
  // 首页国际化
  dashboard: {
    welcome: '欢迎使用',
    systemName: '桦灏自动标签转换系统',
    description: '一个简洁高效的企业管理平台',
    quickAccess: '快速访问',
    acceptanceManagement: '验收单管理',
    materialMapping: '料号对应',
    receivingForm: '收料明细',
    receivingFormReport: '收料明细报告',
    acceptanceFormImportReport: '验收单导入报告',
    networkFile: '网络共享文件配置'
  },
  // 登录页面国际化
  login: {
    selectPlaceholder: '请选择/输入公司名称',
    username: '用户名',
    password: '密码',
    login: '登 录',
    logging: '登 录 中...',
    code: '验证码',
    rememberPassword: '记住我',
    switchRegisterPage: '立即注册',
    rule: {
      tenantId: {
        required: '请输入您的租户编号'
      },
      username: {
        required: '请输入您的账号'
      },
      password: {
        required: '请输入您的密码'
      },
      code: {
        required: '请输入验证码'
      }
    },
    social: {
      wechat: '微信登录',
      maxkey: 'MaxKey登录',
      topiam: 'TopIam登录',
      gitee: 'Gitee登录',
      github: 'Github登录'
    }
  },
  // 注册页面国际化
  register: {
    selectPlaceholder: '请选择/输入公司名称',
    username: '用户名',
    password: '密码',
    confirmPassword: '确认密码',
    register: '注 册',
    registering: '注 册 中...',
    registerSuccess: '恭喜你，您的账号 {username} 注册成功！',
    code: '验证码',
    switchLoginPage: '使用已有账户登录',
    rule: {
      tenantId: {
        required: '请输入您的租户编号'
      },
      username: {
        required: '请输入您的账号',
        length: '用户账号长度必须介于 {min} 和 {max} 之间'
      },
      password: {
        required: '请输入您的密码',
        length: '用户密码长度必须介于 {min} 和 {max} 之间',
        pattern: '不能包含非法字符：{strings}'
      },
      code: {
        required: '请输入验证码'
      },
      confirmPassword: {
        required: '请再次输入您的密码',
        equalToPassword: '两次输入的密码不一致'
      }
    }
  },
  // 导航栏国际化
  navbar: {
    full: '全屏',
    language: '语言',
    dashboard: '首页',
    document: '项目文档',
    message: '消息',
    layoutSize: '布局大小',
    selectTenant: '选择租户',
    layoutSetting: '布局设置',
    personalCenter: '个人中心',
    logout: '退出登录',
    logoutConfirm: '确定注销并退出系统吗？',
    logoutTitle: '提示',
    confirm: '确定',
    cancel: '取消',
    search: '搜索'
  },
  // 个人中心国际化
  profile: {
    personalInfo: '个人信息',
    basicInfo: '基本资料',
    changePassword: '修改密码',
    oldPassword: '旧密码',
    newPassword: '新密码',
    confirmPassword: '确认密码',
    save: '保存',
    close: '关闭',
    placeholder: {
      oldPassword: '请输入旧密码',
      newPassword: '请输入新密码',
      confirmPassword: '请确认新密码'
    },
    rules: {
      oldPasswordRequired: '旧密码不能为空',
      newPasswordRequired: '新密码不能为空',
      passwordLength: '长度在 6 到 20 个字符',
      passwordPattern: '不能包含非法字符：< > " \' \\ |',
      confirmPasswordRequired: '确认密码不能为空',
      passwordNotMatch: '两次输入的密码不一致'
    },
    updateSuccess: '修改成功'
  },
  // 标签页国际化
  tagsView: {
    refresh: '刷新页面',
    close: '关闭当前',
    closeOthers: '关闭其他',
    closeLeft: '关闭左侧',
    closeRight: '关闭右侧',
    closeAll: '关闭所有'
  },
  // 桦灏模块国际化
  huahao: {
    // 菜单翻译
    menu: {
      huahao: '桦灏管理',
      acceptance: '验收单',
      acceptanceReport: '验收单导入报告',
      materialMapping: '料号对应',
      receivingForm: '收料明细',
      receivingFormReport: '收料明细报告',
      networkFile: '网络共享文件配置',
      version: 'app版本管理'
    },
    // 公共
    common: {
      search: '搜索',
      query: '查询',
      reset: '重置',
      add: '新增',
      edit: '修改',
      delete: '删除',
      export: '导出',
      import: '导入',
      confirm: '确 定',
      cancel: '取 消',
      operation: '操作',
      operationSuccess: '操作成功',
      deleteSuccess: '删除成功',
      no: '序号',
      startDate: '开始日期',
      endDate: '结束日期',
      downloadTemplate: '下载模板',
      uploadTip: '将文件拖到此处，或',
      clickUpload: '点击上传',
      fileFormatTip: '仅允许导入 xls、xlsx 格式文件',
      fileApkTip: '仅允许导入apk文件',
      fileSizeTip: '文件大小不超过 10MB',
      fileMaxSizeTip: '且大小不超过100MB',
      importResult: '导入结果',
      generateAsnFile: '生成ASN文件',
      importDataFailed: '导入数据失败，请检查必填项是否存在异常',
      importSuccess: '导入成功',
      importFailed: '导入失败'
    },
    // 验收单管理
    acceptance: {
      title: '验收单管理',
      receiptNo: '验收单号',
      asnNo: 'AsnNo',
      partNo: '料号',
      quantity: '应收数量',
      receivedQuantity: '已收数量',
      msl: '湿敏等级',
      locator: '仓位',
      addTitle: '添加验收单',
      editTitle: '修改验收单',
      importTitle: '验收单导入',
      deleteConfirm: '是否确认删除编号为"{id}"的验收单数据？',
      importDataNullFailed: '导入数据失败，导入数据不能为空',
      importDataDiffFailed: '导入数据失败，导入数据的验收单号必须一致',
      importDataSysFailed: '导入数据失败，系统存在相同验收单号',
      accNoNotFound: '验收单不存在，请确认验收单号是否正确',
      oracleQuery: '查询Oracle',
      oracleQueryTitle: '从Oracle查询验收单',
      oracleQueryTip: '输入或用扫码枪扫描验收单号后按Enter，系统会直接查询Oracle并导入验收单明细',
      oracleQuerySuccess: '查询成功，已导入{count}笔明细',
      placeholder: {
        receiptNo: '请输入验收单号',
        oracleReceiptNo: '请输入或扫描验收单号',
        asnNo: '请输入AsnNo',
        partNo: '请输入料号',
        quantity: '请输入应收数量',
        receivedQuantity: '请输入已收数量',
        msl: '请输入湿敏等级',
        locator: '请输入仓位'
      },
      queryConditionRequired: '请至少输入一个查询条件',
      rules: {
        receiptNoRequired: '验收单号不能为空',
        asnNoRequired: 'AsnNo不能为空',
        partNoRequired: '料号不能为空',
        quantityRequired: '应收数量不能为空',
        receivedQuantityRequired: '已收数量不能为空',
        mslRequired: '湿敏等级不能为空',
        locatorRequired: '仓位不能为空'
      }
    },
    // 验收单导入报告
    acceptanceReport: {
      title: '验收单导入报告',
      date: '日期',
      accNo: '验收单号',
      importTime: '导入时间',
      status: '状态',
      statusNotStarted: '未开始',
      statusInProgress: '收料中',
      statusCompleted: '已完成',
      queryFailed: '查询验收单导入报告失败'
    },
    // 料号对应
    materialMapping: {
      title: '料号对应',
      customerMaterialNo: '客户料号',
      factoryMaterialNo: '厂内料号',
      customerName: '客户名称',
      materialDesc: '物料描述',
      remark: '备注',
      createTime: '创建时间',
      addTitle: '添加客户料号与厂内料号对应',
      editTitle: '修改客户料号与厂内料号对应',
      importTitle: '料号对应导入',
      deleteConfirm: '是否确认删除客户料号"{customerNo}"与厂内料号"{factoryNo}"的对应关系？',
      deleteBatchConfirm: '是否确认删除选中的{count}条料号对应关系？',
      placeholder: {
        customerMaterialNo: '请输入客户料号',
        factoryMaterialNo: '请输入厂内料号',
        customerName: '请输入客户名称',
        materialDesc: '请输入物料描述',
        remark: '请输入备注'
      },
      rules: {
        customerMaterialNoRequired: '客户料号不能为空',
        factoryMaterialNoRequired: '厂内料号不能为空'
      }
    },
    // 收料明细
    receivingForm: {
      title: '收料明细',
      rcId: 'R/C ID',
      partNo: '料号',
      accNo: '验收单号',
      quantity: 'Quantity',
      dc: 'Date Code',
      dcCodeOriginal: 'Date Code Original',
      lot: 'Lot Code',
      msl: 'MSL Level',
      location: 'Location',
      asnNo: 'AsnNO',
      palletId: 'PalletID',
      receivingTime: '收料时间',
      flag: '是否提交',
      yes: '是',
      no: '否',
      addTitle: '添加收料明细',
      editTitle: '修改收料明细',
      generateButton: '生成',
      deleteConfirm: '是否确认删除料号"{partNo}"的收料记录？',
      deleteBatchConfirm: '是否确认删除选中的{count}条收料记录？',
      placeholder: {
        rcId: '请输入R/C ID',
        partNo: '请输入料号',
        accNo: '请输入验收单号',
        dc: '请输入日期',
        lot: '请输入批次号',
        msl: '请输入湿敏等级',
        location: '请输入仓位',
        asnNo: '请输入AsnNo',
        palletId: '请输入PalletID',
        receivingTime: '选择收料时间',
        remark: '请输入备注'
      },
      rules: {
        rcIdNoRequired: 'R/C ID不能为空',
        partNoRequired: '料号不能为空'
      }
    },
    // 收料明细报告
    receivingFormReport: {
      title: '收料明细报告',
      receivingTime: '收料时间',
      accNo: '验收单',
      asnNo: 'AsnNo',
      selectAccNo: '请选择验收单号',
      selectAccNoFirst: '请先选择验收单',
      noDataForAccNo: '当前验收单号没有未提交的数据',
      generateAsnConfirm: '生成ASN文件后，当前数据将标记为已提交，是否继续？',
      generateAsnSuccess: 'ASN文件生成成功',
      placeholder: {
        asnNo: '请输入AsnNo'
      }
    },
    // 收料相关错误信息
    receiving: {
      noUnsubmittedData: '没有找到未提交的数据',
      generateAsnFailed: '生成ASN文件失败',
      generateAsnFileFailed: '生成ASN文件失败，请检查网络共享文件配置是否正确'
    },
    // 网络共享文件配置
    networkFile: {
      title: '网络共享文件配置',
      filePath: '文件路径',
      type: '文件类型',
      isEnable: '是否启用',
      addTitle: '添加网络共享文件配置',
      editTitle: '修改网络共享文件配置',
      deleteConfirm: '是否确认删除文件路径"{filePath}"的配置？',
      deleteBatchConfirm: '是否确认删除选中的{count}条网络共享文件配置？',
      selectPlaceholder: '请选择文件类型',
      placeholder: {
        filePath: '请输入网络共享文件路径',
        type: '请选择文件类型'
      },
      rules: {
        filePathNoRequired: '网络共享文件路径不能为空',
        typeNoRequired: '文件类型不能为空'
      },
      networkFileAddFailed: '已存在同类型配置，请勿重复添加',
      enabled: '启用',
      disabled: '禁用'
    },
    // app安装包版本管理
    appVersion: {
      title: 'app安装包版本管理',
      no: '版本号',
      url: '下载地址',
      content: '更新内容',
      file: '安装包',
      addTitle: '添加app安装包版本',
      editTitle: '修改app安装包版本',
      deleteConfirm: '是否确认删除版本号"{no}"的配置？',
      deleteFile: '确定移除文件',
      deleteBatchConfirm: '是否确认删除选中的{count}条app安装包版本？',
      placeholder: {
        no: '请输入版本号',
        url: '请输入下载地址',
        formUrl: '上传安装包后自动填入下载地址',
        content: '请输入更新内容'
      },
      rules: {
        versionNumberNoRequired: '版本号不能为空'
      },
      beforeUpload: {
        versionNumberNoRequired: '请先填写版本号',
        fileTypeRequired: '文件格式不正确，请上传 apk 格式文件!',
        fileNameRequired: '文件名不正确，不能包含英文逗号!',
        fileSizeRequired: '文件大小不能超过 100M',
        fileUploading: '文件正在上传中，请稍后...',
        fileCount: '只能上传一个文件'
      }
    }
  }
};
