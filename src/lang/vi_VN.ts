export default {
  // 路由国际化
  route: {
    dashboard: 'Trang chủ',
    document: 'Tài liệu dự án'
  },
  // 首页国际化
  dashboard: {
    welcome: 'Chào mừng bạn sử dụng',
    systemName: 'Hệ thống chuyển đổi tem tự động Hua Ha',
    description: 'Một nền tảng quản lý doanh nghiệp đơn giản và hiệu quả',
    quickAccess: 'Truy cập nhanh',
    acceptanceManagement: 'Quản lý đơn nghiệm thu',
    materialMapping: 'Đối ứng mã vật tư',
    receivingForm: 'Chi tiết nhận liệu',
    receivingFormReport: 'Báo cáo chi tiết nhận liệu',
    acceptanceFormImportReport: 'Báo cáo nhập đơn nghiệm thu',
    networkFile: 'Cấu hình tệp chia sẻ mạng'
  },
  // 登录页面国际化
  login: {
    selectPlaceholder: 'Vui lòng chọn/nhập tên công ty',
    username: 'Tên người dùng',
    password: 'Mật khẩu',
    login: 'Đăng nhập',
    logging: 'Đang đăng nhập...',
    code: 'Mã xác nhận',
    rememberPassword: 'Ghi nhớ đăng nhập',
    switchRegisterPage: 'Đăng ký ngay',
    rule: {
      tenantId: {
        required: 'Vui lòng nhập mã định danh khách hàng (Tenant ID)'
      },
      username: {
        required: 'Vui lòng nhập tài khoản của bạn'
      },
      password: {
        required: 'Vui lòng nhập mật khẩu của bạn'
      },
      code: {
        required: 'Vui lòng nhập mã xác nhận'
      }
    },
    social: {
      wechat: 'Đăng nhập qua WeChat',
      maxkey: 'Đăng nhập qua MaxKey',
      topiam: 'Đăng nhập qua TopIam',
      gitee: 'Đăng nhập qua Gitee',
      github: 'Đăng nhập qua Github'
    }
  },
  // 注册页面国际化
  register: {
    selectPlaceholder: 'Vui lòng chọn/nhập tên công ty',
    username: 'Tên người dùng',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    register: 'Đăng ký',
    registering: 'Đang đăng ký...',
    registerSuccess: 'Chúc mừng, tài khoản {username} của bạn đã đăng ký thành công!',
    code: 'Mã xác nhận',
    switchLoginPage: 'Đăng nhập bằng tài khoản đã có',
    rule: {
      tenantId: {
        required: 'Vui lòng nhập mã định danh khách hàng (Tenant ID)'
      },
      username: {
        required: 'Vui lòng nhập tài khoản của bạn',
        length: 'Độ dài tài khoản phải từ {min} đến {max} ký tự'
      },
      password: {
        required: 'Vui lòng nhập mật mã của bạn',
        length: 'Độ dài mật mã phải từ {min} đến {max} ký tự',
        pattern: 'Không được chứa các ký tự không hợp lệ: {strings}'
      },
      code: {
        required: 'Vui lòng nhập mã xác nhận'
      },
      confirmPassword: {
        required: 'Vui lòng nhập lại mật mã của bạn',
        equalToPassword: 'Mật mã nhập lại không khớp'
      }
    }
  },
  // 导航栏国际化
  navbar: {
    full: 'Toàn màn hình',
    language: 'Ngôn ngữ',
    dashboard: 'Trang chủ',
    document: 'Tài liệu dự án',
    message: 'Thông báo / Tin nhắn',
    layoutSize: 'Kích thước bố cục',
    selectTenant: 'Chọn khách hàng (Tenant)',
    layoutSetting: 'Thiết lập bố cục',
    personalCenter: 'Trung tâm cá nhân',
    logout: 'Đăng xuất',
    logoutConfirm: 'Bạn có chắc chắn muốn đăng xuất và thoát hệ thống không?',
    logoutTitle: 'Gợi ý / Thông báo',
    confirm: 'Xác nhận',
    cancel: 'Hủy',
    search: 'Tìm kiếm'
  },
  // 个人中心国际化
  profile: {
    personalInfo: 'Thông tin cá nhân',
    basicInfo: 'Thông tin cơ bản',
    changePassword: 'Đổi mật khẩu',
    oldPassword: 'Mật khẩu cũ',
    newPassword: 'Mật khẩu mới',
    confirmPassword: 'Xác nhận mật khẩu',
    save: 'Lưu',
    close: 'Đóng',
    placeholder: {
      oldPassword: 'Vui lòng nhập mật khẩu cũ',
      newPassword: 'Vui lòng nhập mật khẩu mới',
      confirmPassword: 'Vui lòng xác nhận mật khẩu mới'
    },
    rules: {
      oldPasswordRequired: 'Mật khẩu cũ không được để trống',
      newPasswordRequired: 'Mật khẩu mới không được để trống',
      passwordLength: 'Độ dài từ 6 đến 20 ký tự',
      passwordPattern: 'Không được chứa ký tự không hợp lệ: < > " \' \\ |',
      confirmPasswordRequired: 'Xác nhận mật khẩu không được để trống',
      passwordNotMatch: 'Mật khẩu nhập lại không khớp'
    },
    updateSuccess: 'Thay đổi thành công'
  },
  // 标签页国际化
  tagsView: {
    refresh: 'Tải lại trang',
    close: 'Đóng trang hiện tại',
    closeOthers: 'Đóng các trang khác',
    closeLeft: 'Đóng các trang bên trái',
    closeRight: 'Đóng các trang bên phải',
    closeAll: 'Đóng tất cả'
  },
  // 桦灏模块国际化
  huahao: {
    // 菜单翻译
    menu: {
      huahao: 'Quản lý Hoa Hạo',
      acceptance: 'Phiếu nghiệm thu',
      acceptanceReport: 'Báo cáo nhập phiếu nghiệm thu',
      materialMapping: 'Đối chiếu mã vật tư',
      receivingForm: 'Chi tiết nhận hàng',
      receivingFormReport: 'Báo cáo chi tiết nhận hàng',
      networkFile: 'Cấu hình tệp chia sẻ mạng',
      version: 'APP Phiên bản'
    },
    // 公共
    common: {
      search: 'Tìm kiếm',
      query: 'Tra cứu',
      reset: 'Thiết lập lại',
      add: 'Thêm mới',
      edit: 'Chỉnh sửa',
      delete: 'Xóa',
      export: 'Xuất tệp',
      import: 'Nhập tệp',
      confirm: 'Xác nhận',
      cancel: 'Hủy bỏ',
      operation: 'Thao tác',
      operationSuccess: 'Thao tác thành công',
      deleteSuccess: 'Xóa thành công',
      no: 'NO.',
      startDate: 'Ngày bắt đầu',
      endDate: 'Ngày kết thúc',
      downloadTemplate: 'Tải xuống biểu mẫu',
      uploadTip: 'Kéo tệp vào đây, hoặc',
      clickUpload: 'Nhấn để tải lên',
      fileFormatTip: 'Chỉ cho phép nhập tệp định dạng xls, xlsx',
      fileSizeTip: 'Dung lượng tệp không quá 10MB',
      importResult: 'Kết quả nhập tệp',
      generateAsnFile: 'Tạo tệp ASN',
      importDataFailed: 'Nhập dữ liệu thất bại, vui lòng kiểm tra xem các mục bắt buộc có bất thường không',
      importSuccess: 'Nhập tệp thành công',
      importFailed: 'Nhập tệp thất bại'
    },
    // 验收单管理
    acceptance: {
      title: 'Quản lý phiếu nghiệm thu',
      receiptNo: 'Mã phiếu nghiệm thu',
      asnNo: 'AsnNo',
      partNo: 'Mã vật tư',
      quantity: 'Số lượng phải thu',
      receivedQuantity: 'Số lượng thực thu',
      msl: 'Cấp độ nhạy ẩm (MSL)',
      locator: 'Vị trí kho',
      addTitle: 'Thêm phiếu nghiệm thu',
      editTitle: 'Chỉnh sửa phiếu nghiệm thu',
      importTitle: 'Nhập tệp phiếu nghiệm thu',
      importDataNullFailed: 'Nhập dữ liệu thất bại, dữ liệu nhập không được để trống',
      importDataDiffFailed: 'Nhập dữ liệu thất bại, số biên lai của dữ liệu nhập phải giống nhau',
      importDataSysFailed: 'Nhập dữ liệu thất bại, số biên lai giống nhau tồn tại trong hệ thống',
      deleteConfirm: 'Bạn có chắc chắn muốn xóa dữ liệu phiếu nghiệm thu có mã là "{id}" không?',
      placeholder: {
        receiptNo: 'Vui lòng nhập mã phiếu nghiệm thu',
        asnNo: 'Vui lòng nhập mã nhà cung cấp',
        partNo: 'Vui lòng nhập mã vật tư',
        quantity: 'Vui lòng nhập số lượng phải thu',
        receivedQuantity: 'Vui lòng nhập số lượng thực thu',
        msl: 'Vui lòng nhập cấp độ nhạy ẩm',
        locator: 'Vui lòng nhập vị trí kho'
      },
      queryConditionRequired: 'Vui lòng nhập ít nhất một điều kiện tra cứu',
      rules: {
        receiptNoRequired: 'Mã phiếu nghiệm thu không được để trống',
        asnNoRequired: 'Mã nhà cung cấp không được để trống',
        partNoRequired: 'Mã vật tư không được để trống',
        quantityRequired: 'Số lượng phải thu không được để trống',
        receivedQuantityRequired: 'Số lượng thực thu không được để trống',
        mslRequired: 'Cấp độ nhạy ẩm không được để trống',
        locatorRequired: 'Vị trí kho không được để trống'
      }
    },
    // 验收单导入报告
    acceptanceReport: {
      title: 'Báo cáo nhập dữ liệu phiếu nghiệm thu',
      date: 'Ngày',
      accNo: 'Mã đơn nghiệm thu',
      importTime: 'Thời gian nhập (Import)',
      status: 'Trạng thái',
      statusNotStarted: 'Chưa bắt đầu',
      statusInProgress: 'Đang nhận hàng',
      statusCompleted: 'Đã hoàn thành',
      queryFailed: 'Truy vấn báo cáo nhập đơn nghiệm thu thất bại'
    },
    // 料号对应
    materialMapping: {
      title: 'Đối chiếu mã vật tư',
      customerMaterialNo: 'Mã vật tư khách hàng',
      factoryMaterialNo: 'Mã vật tư nội bộ (nhà máy)',
      customerName: 'Tên khách hàng',
      materialDesc: 'Mô tả vật tư',
      remark: 'Ghi chú',
      createTime: 'Thời gian tạo',
      addTitle: 'Thêm đối chiếu mã khách hàng và mã nội bộ',
      editTitle: 'Sửa đối chiếu mã khách hàng và mã nội bộ',
      importTitle: 'Nhập (Import) dữ liệu đối chiếu mã vật tư',
      deleteConfirm:
        'Bạn có chắc chắn muốn xóa mối quan hệ tương ứng giữa Mã linh kiện khách hàng "{customerNo}" và Mã linh kiện nội bộ "{factoryNo}" không?',
      deleteBatchConfirm: 'Bạn có chắc chắn muốn xóa {count} mối quan hệ tương ứng của mã linh kiện đã chọn không?',
      placeholder: {
        customerMaterialNo: 'Vui lòng nhập mã linh kiện khách hàng',
        factoryMaterialNo: 'Vui lòng nhập mã linh kiện nội bộ (hoặc mã linh kiện nhà máy)',
        customerName: 'Vui lòng nhập tên khách hàng',
        materialDesc: 'Vui lòng nhập mô tả vật tư',
        remark: 'Vui lòng nhập ghi chú'
      },
      rules: {
        customerMaterialNoRequired: 'Mã linh kiện khách hàng không được để trống',
        factoryMaterialNoRequired: 'Mã linh kiện nội bộ không được để trống'
      }
    },
    // 收料明细
    receivingForm: {
      title: 'Chi tiết nhận hàng',
      rcId: 'R/C ID',
      partNo: 'Mã vật tư',
      accNo: 'Số phiếu kiểm nhận',
      quantity: 'Quantity',
      dc: 'Date Code',
      lot: 'Lot Code',
      msl: 'MSL Level',
      location: 'Location',
      asnNo: 'AsnNO',
      palletId: 'PalletID',
      receivingTime: 'Thời gian nhận hàng',
      flag: 'Có xác nhận gửi/nộp không',
      yes: 'Có',
      no: 'Không',
      addTitle: 'Thêm chi tiết nhận hàng',
      editTitle: 'Chỉnh sửa chi tiết nhận hàng',
      generateButton: 'Tạo thành',
      deleteConfirm: 'Bạn có chắc chắn muốn xóa bản ghi nhận hàng của mã "{partNo}" không?',
      deleteBatchConfirm: 'Bạn có chắc chắn muốn xóa {count} bản ghi nhận hàng đã chọn không?',
      placeholder: {
        rcId: 'Vui lòng nhập số cuộn/số thùng',
        partNo: 'Vui lòng nhập mã linh kiện',
        accNo: 'Vui lòng nhập số phiếu kiểm nhận',
        dc: 'Vui lòng nhập ngày',
        lot: 'Vui lòng nhập số lô',
        msl: 'Vui lòng nhập cấp độ nhạy ẩm',
        location: 'Vui lòng nhập vị trí kho',
        asnNo: 'Vui lòng nhập mã nhà cung cấp',
        palletId: 'Vui lòng nhập số Pallet',
        receivingTime: 'Chọn thời gian nhận hàng',
        remark: 'Vui lòng nhập ghi chú'
      },
      rules: {
        rcIdNoRequired: 'Cuộn (Reel) / Số thùng không được để trống',
        partNoRequired: 'Mã linh kiện không được để trống'
      }
    },
    // 收料明细报告
    receivingFormReport: {
      title: 'Báo cáo chi tiết nhập hàng',
      receivingTime: 'Thời gian nhập hàng',
      accNo: 'Phiếu nghiệm thu',
      asnNo: 'AsnNo',
      selectAccNo: 'Vui lòng chọn số phiếu nghiệm thu',
      selectAccNoFirst: 'Vui lòng chọn phiếu nghiệm thu trước',
      noDataForAccNo: 'Số phiếu nghiệm thu hiện tại không có dữ liệu chưa gửi',
      generateAsnConfirm: 'Sau khi tạo tệp ASN, dữ liệu hiện tại sẽ được đánh dấu là đã gửi, tiếp tục không?',
      generateAsnSuccess: 'Tạo tệp ASN thành công, vui lòng kiểm tra mục tải xuống của trình duyệt',
      placeholder: {
        asnNo: 'Vui lòng nhập mã nhà cung cấp'
      }
    },
    // 收料相关错误信息
    receiving: {
      noUnsubmittedData: 'Không tìm thấy dữ liệu chưa gửi',
      generateAsnFailed: 'Tạo tệp ASN thất bại',
      generateAsnFileFailed: 'Tạo tệp ASN thất bại, vui lòng kiểm tra cấu hình chia sẻ tệp mạng có chính xác không'
    },
    // 网络共享文件配置
    networkFile: {
      title: 'Cấu hình tệp chia sẻ mạng',
      filePath: 'Đường dẫn tệp',
      type: 'Loại tệp',
      isEnable: 'Có kích hoạt hay không',
      addTitle: 'Thêm cấu hình tệp chia sẻ mạng',
      editTitle: 'Sửa cấu hình tệp chia sẻ mạng',
      deleteConfirm: 'Xác nhận xóa cấu hình đường dẫn tệp "{filePath}"?',
      deleteBatchConfirm: 'Xác nhận xóa {count} mục cấu hình tệp chia sẻ mạng đã chọn?',
      selectPlaceholder: 'Vui lòng chọn loại tệp',
      placeholder: {
        filePath: 'Vui lòng nhập đường dẫn tệp chia sẻ mạng',
        type: 'Vui lòng chọn loại tệp'
      },
      rules: {
        filePathNoRequired: 'Đường dẫn tệp chia sẻ mạng không được để trống',
        typeNoRequired: 'Loại tệp không được để trống'
      },
      networkFileAddFailed: 'Đã tồn tại cấu hình cùng loại, vui lòng không thêm trùng lặp',
      enabled: 'Bật',
      disabled: 'Vô hiệu hóa'
    },
    // app安装包版本管理
    appVersion: {
      title: 'Quản lý phiên bản gói cài đặt ứng dụng',
      no: 'Số phiên bản',
      url: 'Địa chỉ tải về',
      content: 'Nội dung cập nhật',
      file: 'Gói cài đặt',
      addTitle: 'Thêm phiên bản gói cài đặt ứng dụng',
      editTitle: 'Sửa phiên bản gói cài đặt ứng dụng',
      deleteConfirm: 'Bạn có chắc chắn muốn xóa cấu hình số phiên bản "{no}" không?',
      deleteFile: 'Xác nhận xóa tệp',
      deleteBatchConfirm: 'Bạn có chắc chắn muốn xóa {count} phiên bản gói cài đặt ứng dụng đã chọn không?',
      placeholder: {
        no: 'Vui lòng nhập số phiên bản',
        url: 'Vui lòng nhập địa chỉ tải về',
        formUrl: 'Tải lên gói cài đặt để tự động điền địa chỉ tải về',
        content: 'Vui lòng nhập nội dung cập nhật'
      },
      rules: {
        versionNumberNoRequired: 'Số phiên bản không được để trống'
      },
      beforeUpload: {
        versionNumberNoRequired: 'Vui lòng điền số phiên bản trước',
        fileTypeRequired: 'Định dạng tệp không đúng, vui lòng tải lên tệp apk!',
        fileNameRequired: 'Tên tệp không đúng, không được chứa dấu phẩy tiếng Anh!',
        fileSizeRequired: 'Kích thước tệp không được vượt quá 100M',
        fileUploading: 'Tệp đang tải lên, vui lòng đợi...',
        fileCount: 'Chỉ có thể tải lên một tệp'
      }
    }
  }
};
