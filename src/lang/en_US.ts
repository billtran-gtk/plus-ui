export default {
  // 路由国际化
  route: {
    dashboard: 'Dashboard',
    document: 'Document'
  },
  // Dashboard Internationalization
  dashboard: {
    welcome: 'Welcome to',
    systemName: 'Huahao Automatic Label Conversion System',
    description: 'A simple and efficient enterprise management platform',
    quickAccess: 'Quick Access',
    acceptanceManagement: 'Acceptance Management',
    materialMapping: 'Material Mapping',
    receivingForm: 'Receiving Form',
    receivingFormReport: 'Receiving Form Report',
    acceptanceFormImportReport: 'Acceptance Document Import Report',
    networkFile: 'Network Shared File Configuration'
  },
  // 登录页面国际化
  login: {
    selectPlaceholder: 'Please select/enter a company name',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    logging: 'Logging...',
    code: 'Verification Code',
    rememberPassword: 'Remember me',
    switchRegisterPage: 'Sign up now',
    rule: {
      tenantId: {
        required: 'Please enter your tenant id'
      },
      username: {
        required: 'Please enter your account'
      },
      password: {
        required: 'Please enter your password'
      },
      code: {
        required: 'Please enter a verification code'
      }
    },
    social: {
      wechat: 'Wechat Login',
      maxkey: 'MaxKey Login',
      topiam: 'TopIam Login',
      gitee: 'Gitee Login',
      github: 'Github Login'
    }
  },
  // 注册页面国际化
  register: {
    selectPlaceholder: 'Please select/enter a company name',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    register: 'Register',
    registering: 'Registering...',
    registerSuccess: 'Congratulations, your {username} account has been registered!',
    code: 'Verification Code',
    switchLoginPage: 'Log in with an existing account',
    rule: {
      tenantId: {
        required: 'Please enter your tenant id'
      },
      username: {
        required: 'Please enter your account',
        length: 'The length of the user account must be between {min} and {max}'
      },
      password: {
        required: 'Please enter your password',
        length: 'The user password must be between {min} and {max} in length',
        pattern: "Can't contain illegal characters: {strings}"
      },
      code: {
        required: 'Please enter a verification code'
      },
      confirmPassword: {
        required: 'Please enter your password again',
        equalToPassword: 'The password entered twice is inconsistent'
      }
    }
  },
  // 导航栏国际化
  navbar: {
    full: 'Full Screen',
    language: 'Language',
    dashboard: 'Dashboard',
    document: 'Document',
    message: 'Message',
    layoutSize: 'Layout Size',
    selectTenant: 'Select Tenant',
    layoutSetting: 'Layout Setting',
    personalCenter: 'Personal Center',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to log out?',
    logoutTitle: 'Confirm',
    confirm: 'Confirm',
    cancel: 'Cancel',
    search: 'Search'
  },
  // Profile Internationalization
  profile: {
    personalInfo: 'Personal Information',
    basicInfo: 'Basic Information',
    changePassword: 'Change Password',
    oldPassword: 'Old Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    save: 'Save',
    close: 'Close',
    placeholder: {
      oldPassword: 'Please enter old password',
      newPassword: 'Please enter new password',
      confirmPassword: 'Please confirm new password'
    },
    rules: {
      oldPasswordRequired: 'Old password is required',
      newPasswordRequired: 'New password is required',
      passwordLength: 'Length must be between 6 and 20 characters',
      passwordPattern: 'Cannot contain illegal characters: < > " \' \\ |',
      confirmPasswordRequired: 'Confirm password is required',
      passwordNotMatch: 'The two passwords do not match'
    },
    updateSuccess: 'Update successful'
  },
  // Tags View Internationalization
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  // Huahao Module Internationalization
  huahao: {
    // Menu Translation
    menu: {
      huahao: 'Huahao',
      acceptance: 'Acceptance',
      acceptanceReport: 'Acceptance Report',
      materialMapping: 'Material Mapping',
      receivingForm: 'Receiving Form',
      receivingFormReport: 'Receiving Form Report',
      version: 'APP Version'
    },
    // Common
    common: {
      search: 'Search',
      query: 'Query',
      reset: 'Reset',
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      export: 'Export',
      import: 'Import',
      confirm: 'Confirm',
      cancel: 'Cancel',
      operation: 'Operation',
      operationSuccess: 'Operation Successful',
      deleteSuccess: 'Delete Successful',
      no: 'No',
      startDate: 'Start Date',
      endDate: 'End Date',
      downloadTemplate: 'Download Template',
      uploadTip: 'Drop file here or ',
      clickUpload: 'click to upload',
      fileFormatTip: 'Only xls and xlsx files are allowed',
      fileSizeTip: 'File size should not exceed 10MB',
      importResult: 'Import Result',
      generateAsnFile: 'Generate ASN File',
      importDataFailed: 'Import failed, please check if required fields are valid',
      importSuccess: 'Import Successful',
      importFailed: 'Import Failed'
    },
    // Acceptance Management
    acceptance: {
      title: 'Acceptance Management',
      receiptNo: 'Receipt No',
      asnNo: 'ASN No',
      partNo: 'Part No',
      quantity: 'Quantity',
      receivedQuantity: 'Received Quantity',
      msl: 'MSL',
      locator: 'Locator',
      addTitle: 'Add Acceptance',
      editTitle: 'Edit Acceptance',
      generateButton: 'Generate',
      importTitle: 'Acceptance Import',
      deleteConfirm: 'Are you sure to delete the acceptance data with ID "{id}"?',
      placeholder: {
        receiptNo: 'Please enter receipt No',
        asnNo: 'Please enter ASN No',
        partNo: 'Please enter part No',
        quantity: 'Please enter quantity',
        receivedQuantity: 'Please enter received quantity',
        msl: 'Please enter MSL',
        locator: 'Please enter locator'
      },
      queryConditionRequired: 'Please enter at least one query condition',
      rules: {
        receiptNoRequired: 'Receipt No is required',
        asnNoRequired: 'ASN No is required',
        partNoRequired: 'Part No is required',
        quantityRequired: 'Quantity is required',
        receivedQuantityRequired: 'Received quantity is required',
        mslRequired: 'MSL is required',
        locatorRequired: 'Locator is required'
      }
    },
    // Acceptance Report
    acceptanceReport: {
      title: 'Acceptance Report',
      date: 'Date',
      accNo: 'Acceptance No',
      importTime: 'Import Time',
      status: 'Status',
      statusNotStarted: 'Not Started',
      statusInProgress: 'In Progress',
      statusCompleted: 'Completed',
      queryFailed: 'Failed to query acceptance report'
    },
    // Material Mapping
    materialMapping: {
      title: 'Material Mapping',
      customerMaterialNo: 'Customer Material No',
      factoryMaterialNo: 'Factory Material No',
      customerName: 'Customer Name',
      materialDesc: 'Material Description',
      remark: 'Remark',
      createTime: 'Create Time',
      addTitle: 'Add Material Mapping',
      editTitle: 'Edit Material Mapping',
      importTitle: 'Material Mapping Import',
      deleteConfirm: 'Are you sure to delete the mapping between customer material No "{customerNo}" and factory material No "{factoryNo}"?',
      deleteBatchConfirm: 'Are you sure to delete the selected {count} material mappings?',
      placeholder: {
        customerMaterialNo: 'Please enter customer material No',
        factoryMaterialNo: 'Please enter factory material No',
        customerName: 'Please enter customer name',
        materialDesc: 'Please enter material description',
        remark: 'Please enter remark'
      },
      rules: {
        customerMaterialNoRequired: 'Customer material No is required',
        factoryMaterialNoRequired: 'Factory material No is required'
      }
    },
    // Receiving Form
    receivingForm: {
      title: 'Receiving Form',
      rcId: 'Reel/Carton ID',
      partNo: 'Part No',
      accNo: 'Acceptance No',
      quantity: 'Quantity',
      dc: 'Date Code',
      dcCodeOriginal: 'Date Code Original',
      lot: 'Lot Code',
      msl: 'MSL Level',
      location: 'Location',
      asnNo: 'AsnNO',
      palletId: 'PalletID',
      receivingTime: 'Receiving Time',
      flag: 'Submitted',
      yes: 'Yes',
      no: 'No',
      addTitle: 'Add Receiving Form',
      editTitle: 'Edit Receiving Form',
      deleteConfirm: 'Are you sure to delete the receiving record of part No "{partNo}"?',
      deleteBatchConfirm: 'Are you sure to delete the selected {count} receiving records?',
      placeholder: {
        rcId: 'Please enter reel/carton ID',
        partNo: 'Please enter part No',
        accNo: 'Please enter acceptance No',
        dc: 'Please enter date code',
        lot: 'Please enter lot No',
        msl: 'Please enter MSL',
        location: 'Please enter location',
        asnNo: 'Please enter ASN No',
        palletId: 'Please enter pallet ID',
        receivingTime: 'Select receiving time',
        remark: 'Please enter remark'
      },
      rules: {
        partNoRequired: 'Part No is required'
      }
    },
    // Receiving Form Report
    receivingFormReport: {
      title: 'Receiving Form Report',
      receivingTime: 'Receiving Time',
      accNo: 'Acceptance No',
      asnNo: 'ASN No',
      selectAccNo: 'Please select acceptance No',
      selectAccNoFirst: 'Please select acceptance No first',
      noDataForAccNo: 'No unsubmitted data for current acceptance No',
      generateAsnConfirm: 'After generating ASN file, current data will be marked as submitted. Continue?',
      generateAsnSuccess: 'ASN file generated successfully, please check browser downloads',
      placeholder: {
        asnNo: 'Please enter ASN No'
      }
    },
    // Receiving Error Messages
    receiving: {
      noUnsubmittedData: 'No unsubmitted data found',
      generateAsnFailed: 'Failed to generate ASN file',
      generateAsnFileFailed: 'Failed to generate ASN file, please check Network Shared File Configuration if the file path is valid'
    },
    // Network Shared File Configuration
    networkFile: {
      title: 'Network Shared File Configuration',
      filePath: 'File Path',
      type: 'File Type',
      isEnable: 'Is Enable',
      addTitle: 'Add Network Shared File Configuration',
      editTitle: 'Edit Network Shared File Configuration',
      deleteConfirm: 'Are you sure to delete the configuration for file path "{filePath}"?',
      deleteBatchConfirm: 'Are you sure to delete the selected {count} network shared file configurations?',
      selectPlaceholder: 'Please select file type',
      placeholder: {
        filePath: 'Please enter network shared file path',
        type: 'Please select file type'
      },
      rules: {
        filePathNoRequired: 'Network shared file path is required',
        typeNoRequired: 'File type is required'
      },
      networkFileAddFailed: 'This type of configuration already exists. Please do not add it repeatedly',
      enabled: 'Enabled',
      disabled: 'Disabled'
    },
    // appVersion
    appVersion: {
      title: 'App Package Version Management',
      no: 'Version Number',
      url: 'Download URL',
      content: 'Update Content',
      file: 'Installation Package',
      addTitle: 'Add App Package Version',
      editTitle: 'Edit App Package Version',
      deleteConfirm: 'Are you sure to delete the configuration for version number "{no}"?',
      deleteFile: 'Are you sure to remove the file',
      deleteBatchConfirm: 'Are you sure to delete the selected {count} app package versions?',
      placeholder: {
        no: 'Please enter version number',
        url: 'Please enter download URL',
        formUrl: 'Upload installation package to auto-fill download URL',
        content: 'Please enter update content'
      },
      rules: {
        versionNumberNoRequired: 'Version number is required'
      },
      beforeUpload: {
        versionNumberNoRequired: 'Please fill in version number first',
        fileTypeRequired: 'Incorrect file format, please upload apk file!',
        fileNameRequired: 'Incorrect file name, cannot contain English comma!',
        fileSizeRequired: 'File size cannot exceed 100M',
        fileUploading: 'File is uploading, please wait...',
        fileCount: 'Can only upload one file'
      }
    }
  }
};
