<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item :label="$t('huahao.appVersion.no')" prop="versionNumber">
              <el-input
                v-model="queryParams.versionNumber"
                :placeholder="$t('huahao.appVersion.placeholder.no')"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item :label="$t('huahao.appVersion.url')" prop="url">
              <el-input v-model="queryParams.url" :placeholder="$t('huahao.appVersion.placeholder.url')" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('huahao.common.query') }}</el-button>
              <el-button icon="Refresh" @click="resetQuery">{{ $t('huahao.common.reset') }}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd">{{ $t('huahao.common.add') }}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()">{{ $t('huahao.common.edit') }}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()">{{ $t('huahao.common.delete') }}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport">{{ $t('huahao.common.export') }}</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="versionList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column :label="$t('huahao.appVersion.no')" align="center" prop="versionNumber" />
        <el-table-column :label="$t('huahao.appVersion.content')" align="center" prop="content" />
        <el-table-column :label="$t('huahao.appVersion.url')" align="center" prop="url" />
        <el-table-column :label="$t('huahao.common.operation')" align="center" fixed="right" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip :content="$t('huahao.common.edit')" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip :content="$t('huahao.common.delete')" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改app安装包版本管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="versionFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('huahao.appVersion.no')" prop="versionNumber">
          <el-input v-model="form.versionNumber" :placeholder="$t('huahao.appVersion.placeholder.no')" />
        </el-form-item>
        <el-form-item :label="$t('huahao.appVersion.url')" prop="url">
          <el-input v-model="form.url" :placeholder="$t('huahao.appVersion.placeholder.formUrl')" disabled />
        </el-form-item>
        <el-form-item :label="$t('huahao.appVersion.content')">
          <el-input v-model="form.content" :placeholder="$t('huahao.appVersion.placeholder.content')" />
        </el-form-item>
        <el-form-item :label="$t('huahao.appVersion.file')" prop="fileList">
          <el-upload
            :on-remove="handleRemove"
            :headers="uploadHeaders"
            :data="{ versionNumber: form.versionNumber }"
            :before-remove="beforeRemove"
            :before-upload="handleBeforeUpload"
            :action="uploadFileUrl"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleUploadSuccess"
            :file-list="fileList"
            :disabled="!form.versionNumber"
          >
            <el-button type="primary" :disabled="!form.versionNumber">{{ $t('huahao.common.clickUpload') }}</el-button>
            <div slot="tip">{{ $t('huahao.common.fileApkTip') }},{{ $t('huahao.common.fileMaxSizeTip') }}</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">{{ $t('huahao.common.confirm') }}</el-button>
          <el-button @click="cancel">{{ $t('huahao.common.cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Version" lang="ts">
import { listVersion, getVersion, delVersion, addVersion, updateVersion } from '@/api/system/version';
import { VersionVO, VersionQuery, VersionForm } from '@/api/system/version/types';
import { globalHeaders } from '@/utils/request';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const versionList = ref<VersionVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const versionFormRef = ref<ElFormInstance>();
const { t } = useI18n();
const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});
const fileList = ref<any[]>([]);
const uploadNumber = ref(0);
const uploadList = ref<any[]>([]);
const baseUrl = import.meta.env.VITE_APP_BASE_API;
const uploadFileUrl = ref(baseUrl + '/system/version/upload');
const uploadHeaders = ref(globalHeaders());
const initFormData: VersionForm = {
  versionId: undefined,
  versionNumber: undefined,
  content: undefined,
  url: undefined
};
const data = reactive<PageData<VersionForm, VersionQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    versionNumber: undefined,
    content: undefined,
    url: undefined,
    params: {}
  },
  rules: {
    versionNumber: [{ required: true, message: t('huahao.appVersion.rules.versionNumberNoRequired'), trigger: 'blur' }]
    // url: [{ required: true, message: '路径不能为空', trigger: 'blur' }],
    // fileList: [{ required: true, message: '文件不能为空', trigger: 'change' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询app安装包版本管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listVersion(queryParams.value);
  versionList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
};

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  versionFormRef.value?.resetFields();
  fileList.value = [];
  uploadNumber.value = 0;
  uploadList.value = [];
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: VersionVO[]) => {
  ids.value = selection.map((item) => item.versionId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = t('huahao.appVersion.addTitle');
};

/** 修改按钮操作 */
const handleUpdate = async (row?: VersionVO) => {
  reset();
  const _versionId = row?.versionId || ids.value[0];
  const res = await getVersion(_versionId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = t('huahao.appVersion.editTitle');
};

/** 提交按钮 */
const submitForm = () => {
  versionFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.versionId) {
        await updateVersion(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addVersion(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess(t('huahao.common.operationSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
};

/** 文件上传前校检 */
const handleBeforeUpload = (file: any) => {
  // 校检版本号是否存在
  if (!form.value.versionNumber) {
    proxy?.$modal.msgError(t('huahao.appVersion.beforeUpload.versionNumberNoRequired'));
    return false;
  }
  // 校检文件类型
  const fileName = file.name.split('.');
  const fileExt = fileName[fileName.length - 1];
  if (fileExt !== 'apk') {
    proxy?.$modal.msgError(t('huahao.appVersion.beforeUpload.fileTypeRequired'));
    return false;
  }

  // 校检文件名是否包含特殊字符
  if (file.name.includes(',')) {
    proxy?.$modal.msgError(t('huahao.appVersion.beforeUpload.fileNameRequired'));
    return false;
  }

  // 校检文件大小（100MB）
  const isLt = file.size / 1024 / 1024 < 100;
  if (!isLt) {
    proxy?.$modal.msgError(t('huahao.appVersion.beforeUpload.fileSizeRequired'));
    return false;
  }

  uploadNumber.value++;
  return true;
};

/** 文件移除 */
const handleRemove = (file: any, fileList: any[]) => {
  // 如果需要删除服务器上的文件，可以在这里调用删除接口
};

/** 删除文件前的确认 */
const beforeRemove = (file: any, fileList: any[]) => {
  return proxy?.$modal.confirm(t('huahao.appVersion.deleteFile') + ` ${file.name}？`);
};

/** 超出限制 */
const handleExceed = () => {
  proxy?.$modal.msgError(t('huahao.appVersion.beforeUpload.fileCount'));
};

/** 上传成功回调 */
const handleUploadSuccess = (res: any, file: UploadFile) => {
  if (res.code === 200) {
    form.value.url = res.data.url;
  }
};

/** 删除按钮操作 */
const handleDelete = async (row?: VersionVO) => {
  const _versionIds = row?.versionId || ids.value;
  // 构建删除提示信息
  let confirmMessage = '';
  if (row) {
    confirmMessage = t('huahao.appVersion.deleteConfirm', {
      no: row.versionNumber
    });
  } else {
    const count = ids.value.length;
    confirmMessage = t('huahao.appVersion.deleteBatchConfirm', { count });
  }
  await proxy?.$modal.confirm(confirmMessage).finally(() => (loading.value = false));
  await delVersion(_versionIds);
  proxy?.$modal.msgSuccess(t('huahao.common.deleteSuccess'));
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'system/version/export',
    {
      ...queryParams.value
    },
    `version_${new Date().getTime()}.xlsx`
  );
};

onMounted(() => {
  getList();
});
</script>
