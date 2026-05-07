<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item :label="$t('huahao.materialMapping.customerMaterialNo')" prop="customerMaterialNo" label-width="160px">
              <el-input
                v-model="queryParams.customerMaterialNo"
                :placeholder="$t('huahao.materialMapping.placeholder.customerMaterialNo')"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item :label="$t('huahao.materialMapping.factoryMaterialNo')" prop="factoryMaterialNo" label-width="200px">
              <el-input
                v-model="queryParams.factoryMaterialNo"
                :placeholder="$t('huahao.materialMapping.placeholder.factoryMaterialNo')"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('huahao.common.search') }}</el-button>
              <el-button icon="Refresh" @click="resetQuery">{{ $t('huahao.common.reset') }}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="hover">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button v-hasPermi="['huahao:materialMapping:add']" type="primary" plain icon="Plus" @click="handleAdd">{{
              $t('huahao.common.add')
            }}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['huahao:materialMapping:export']" type="warning" plain icon="Download" @click="handleExport">{{
              $t('huahao.common.export')
            }}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['huahao:materialMapping:import']" type="success" plain icon="Upload" @click="handleImport">{{
              $t('huahao.common.import')
            }}</el-button>
          </el-col>
          <right-toolbar v-model:show-search="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="materialMappingList" @selection-change="handleSelectionChange">
        <el-table-column :label="$t('huahao.common.no')" type="index" width="60" align="center">
          <template #default="scope">
            <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('huahao.materialMapping.customerMaterialNo')"
          align="center"
          prop="customerMaterialNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          :label="$t('huahao.materialMapping.factoryMaterialNo')"
          align="center"
          prop="factoryMaterialNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column :label="$t('huahao.common.operation')" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip :content="$t('huahao.common.edit')" placement="top">
              <el-button v-hasPermi="['huahao:materialMapping:edit']" link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip :content="$t('huahao.common.delete')" placement="top">
              <el-button
                v-hasPermi="['huahao:materialMapping:remove']"
                link
                type="primary"
                icon="Delete"
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>

    <!-- 添加或修改客户料号与厂内料号对应对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="600px" append-to-body>
      <el-form ref="materialMappingFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item :label="$t('huahao.materialMapping.customerMaterialNo')" prop="customerMaterialNo">
          <el-input v-model="form.customerMaterialNo" :placeholder="$t('huahao.materialMapping.placeholder.customerMaterialNo')" />
        </el-form-item>
        <el-form-item :label="$t('huahao.materialMapping.factoryMaterialNo')" prop="factoryMaterialNo">
          <el-input v-model="form.factoryMaterialNo" :placeholder="$t('huahao.materialMapping.placeholder.factoryMaterialNo')" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">{{ $t('huahao.common.confirm') }}</el-button>
          <el-button @click="cancel">{{ $t('huahao.common.cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 导入对话框 -->
    <el-dialog v-model="upload.open" :title="upload.title" width="400px" append-to-body>
      <el-upload
        ref="uploadRef"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <el-icon class="el-icon--upload">
          <i-ep-upload-filled />
        </el-icon>
        <div class="el-upload__text">
          {{ $t('huahao.common.uploadTip') }}<em>{{ $t('huahao.common.clickUpload') }}</em>
        </div>
        <template #tip>
          <div class="text-center el-upload__tip">
            <div class="text-red">{{ $t('huahao.common.fileFormatTip') }}</div>
            <div class="text-red">{{ $t('huahao.common.fileSizeTip') }}</div>
            <el-link type="primary" :underline="false" style="font-size: 12px; vertical-align: baseline" @click="importTemplate">{{
              $t('huahao.common.downloadTemplate')
            }}</el-link>
          </div>
        </template>
      </el-upload>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitFileForm">{{ $t('huahao.common.confirm') }}</el-button>
          <el-button @click="upload.open = false">{{ $t('huahao.common.cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="MaterialMapping" lang="ts">
import { useI18n } from 'vue-i18n';
import { listMaterialMapping, getMaterialMapping, delMaterialMapping, addMaterialMapping, updateMaterialMapping } from '@/api/huahao/materialMapping';
import { MaterialMappingVO, MaterialMappingQuery, MaterialMappingForm } from '@/api/huahao/materialMapping/types';
import { globalHeaders } from '@/utils/request';
import type { UploadInstance, UploadFile } from 'element-plus';
import { ElMessageBox } from 'element-plus';

const { t } = useI18n();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const materialMappingList = ref<MaterialMappingVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const materialMappingFormRef = ref<ElFormInstance>();
const uploadRef = ref<UploadInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

/** 导入参数 */
interface ImportOption {
  open: boolean;
  title: string;
  isUploading: boolean;
  headers: { Authorization: string };
  url: string;
}

const upload = reactive<ImportOption>({
  open: false,
  title: '',
  isUploading: false,
  headers: globalHeaders(),
  url: import.meta.env.VITE_APP_BASE_API + '/huahao/materialMapping/importData'
});

const initFormData: MaterialMappingForm = {
  id: undefined,
  sort: undefined,
  customerMaterialNo: undefined,
  factoryMaterialNo: undefined,
  customerName: undefined,
  materialDesc: undefined,
  remark: undefined
};

const data = reactive<PageData<MaterialMappingForm, MaterialMappingQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    customerMaterialNo: undefined,
    factoryMaterialNo: undefined,
    customerName: undefined
  },
  rules: {}
});

const { queryParams, form } = toRefs(data);

// 使用 computed 包装验证规则，确保语言切换时规则也会更新
const rules = computed(() => ({
  customerMaterialNo: [{ required: true, message: t('huahao.materialMapping.rules.customerMaterialNoRequired'), trigger: 'blur' }],
  factoryMaterialNo: [{ required: true, message: t('huahao.materialMapping.rules.factoryMaterialNoRequired'), trigger: 'blur' }]
}));

/** 查询客户料号与厂内料号对应列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMaterialMapping(queryParams.value);
  materialMappingList.value = res.rows;
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
  materialMappingFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MaterialMappingVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = t('huahao.materialMapping.addTitle');
};

/** 修改按钮操作 */
const handleUpdate = async (row?: MaterialMappingVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getMaterialMapping(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = t('huahao.materialMapping.editTitle');
};

/** 提交按钮 */
const submitForm = () => {
  materialMappingFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMaterialMapping(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addMaterialMapping(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess(t('huahao.common.operationSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: MaterialMappingVO) => {
  const _ids = row?.id || ids.value;

  // 构建删除提示信息
  let confirmMessage = '';
  if (row) {
    confirmMessage = t('huahao.materialMapping.deleteConfirm', {
      customerNo: row.customerMaterialNo,
      factoryNo: row.factoryMaterialNo
    });
  } else {
    const count = ids.value.length;
    confirmMessage = t('huahao.materialMapping.deleteBatchConfirm', { count });
  }

  await proxy?.$modal.confirm(confirmMessage).finally(() => (loading.value = false));
  await delMaterialMapping(_ids);
  proxy?.$modal.msgSuccess(t('huahao.common.deleteSuccess'));
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'huahao/materialMapping/export',
    {
      ...queryParams.value
    },
    `material_mapping_${new Date().getTime()}.xlsx`
  );
};

/** 导入按钮操作 */
const handleImport = () => {
  upload.title = t('huahao.materialMapping.importTitle');
  upload.open = true;
};

/** 下载模板操作 */
const importTemplate = () => {
  proxy?.download('huahao/materialMapping/importTemplate', {}, `material_mapping_template_${new Date().getTime()}.xlsx`);
};

/** 文件上传中处理 */
const handleFileUploadProgress = () => {
  upload.isUploading = true;
};

/** 文件上传成功处理 */
const handleFileSuccess = (response: any, file: UploadFile) => {
  upload.open = false;
  upload.isUploading = false;
  uploadRef.value?.handleRemove(file);

  // 检查响应状态
  if (response.code === 200) {
    // 导入成功
    ElMessageBox.alert(
      "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + '</div>',
      t('huahao.common.importResult'),
      { dangerouslyUseHTMLString: true }
    );
    getList();
  } else {
    // 导入失败，检查是否是错误码
    let errorMessage = '';
    if (response.msg === 'IMPORT_DATA_FAILED') {
      // 使用国际化的错误消息
      errorMessage = t('huahao.common.importDataFailed');
    } else {
      // 其他错误直接显示后端返回的消息
      errorMessage = response.msg || t('huahao.common.importFailed');
    }
    proxy?.$modal.msgError(errorMessage);
  }
};

/** 提交上传文件 */
const submitFileForm = () => {
  uploadRef.value?.submit();
};

onMounted(() => {
  getList();
});
</script>
