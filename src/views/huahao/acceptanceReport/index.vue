<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item :label="$t('huahao.acceptanceReport.date')" prop="createTime" label-width="80px">
              <el-date-picker
                v-model="createTimeRange"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t('huahao.common.startDate')"
                :end-placeholder="$t('huahao.common.endDate')"
                value-format="YYYY-MM-DD"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label-width="0">
              <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('huahao.common.query') }}</el-button>
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
            <el-button type="success" plain icon="Upload" @click="handleImport">{{ $t('huahao.common.import') }}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport">{{ $t('huahao.common.export') }}</el-button>
          </el-col>
          <right-toolbar v-model:show-search="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <!-- 导入对话框 -->
      <el-dialog v-model="importDialog.visible" :title="$t('huahao.acceptance.importTitle')" width="500px" append-to-body>
        <el-upload
          ref="uploadRef"
          :action="uploadUrl"
          :headers="uploadHeaders"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :before-upload="beforeUpload"
          :limit="1"
          :auto-upload="false"
          accept=".xls,.xlsx"
          drag
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            {{ $t('huahao.common.uploadTip') }}<em>{{ $t('huahao.common.clickUpload') }}</em>
          </div>
          <template #tip>
            <div class="el-upload__tip text-center">
              <div class="text-red">{{ $t('huahao.common.fileFormatTip') }}</div>
              <div class="text-red">{{ $t('huahao.common.fileSizeTip') }}</div>
              <el-link type="primary" :underline="false" style="font-size: 12px; vertical-align: baseline" @click="downloadTemplate">
                {{ $t('huahao.common.downloadTemplate') }}
              </el-link>
            </div>
          </template>
        </el-upload>
        <template #footer>
          <div class="dialog-footer">
            <el-button :loading="buttonLoading" type="primary" @click="submitImport">{{ $t('huahao.common.confirm') }}</el-button>
            <el-button @click="cancelImport">{{ $t('huahao.common.cancel') }}</el-button>
          </div>
        </template>
      </el-dialog>

      <el-table v-loading="loading" border :data="acceptanceList">
        <el-table-column :label="$t('huahao.common.no')" type="index" width="80" align="center">
          <template #default="scope">
            <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('huahao.acceptanceReport.accNo')" align="center" prop="accNo" :show-overflow-tooltip="true" min-width="150" />

        <el-table-column :label="$t('huahao.acceptanceReport.importTime')" align="center" prop="createTime" width="500" />

        <el-table-column :label="$t('huahao.acceptanceReport.status')" align="center" prop="status" width="300">
          <template #default="scope">
            <el-tag v-if="scope.row.status === '0'" type="info">{{ $t('huahao.acceptanceReport.statusNotStarted') }}</el-tag>
            <el-tag v-else-if="scope.row.status === '1'" type="warning">{{ $t('huahao.acceptanceReport.statusInProgress') }}</el-tag>
            <el-tag v-else-if="scope.row.status === '2'" type="success">{{ $t('huahao.acceptanceReport.statusCompleted') }}</el-tag>
            <el-tag v-else type="info">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('huahao.common.operation')" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip :content="$t('huahao.common.delete')" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" :disabled="scope.row.status === '2'"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
  </div>
</template>

<script setup name="AcceptanceReport" lang="ts">
import { useI18n } from 'vue-i18n';
import { delAcceptanceForm, listAcceptanceForm } from '@/api/huahao/acceptance';
import type { AcceptanceFormQuery, AcceptanceFormVO } from '@/api/huahao/acceptance/types';
import { globalHeaders } from '@/utils/request';

const { t } = useI18n();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const acceptanceList = ref<AcceptanceFormVO[]>([]);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);
const buttonLoading = ref(false);
const uploadRef = ref();

const queryFormRef = ref<ElFormInstance>();
const createTimeRange = ref<[string, string]>([]);

// 导入弹框控制
const importDialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

// 上传配置
const baseUrl = import.meta.env.VITE_APP_BASE_API;
const uploadUrl = ref(baseUrl + '/pda/acceptance/import');
const uploadHeaders = ref(globalHeaders());

const data = reactive<PageData<any, AcceptanceFormQuery>>({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    params: {}
  },
  rules: {}
});

const { queryParams } = toRefs(data);

/** 查询验收单导入报告列表 */
const getList = async () => {
  loading.value = true;

  // 处理时间范围参数
  if (createTimeRange.value && createTimeRange.value.length === 2) {
    queryParams.value.params = {
      beginCreateTime: createTimeRange.value[0] + ' 00:00:00',
      endCreateTime: createTimeRange.value[1] + ' 23:59:59'
    };
  } else {
    queryParams.value.params = {};
  }

  try {
    const res = await listAcceptanceForm(queryParams.value);
    acceptanceList.value = res.rows;
    total.value = res.total;
  } catch (error) {
    console.error(t('huahao.acceptanceReport.queryFailed'), error);
  } finally {
    loading.value = false;
  }
};
// 删除按钮操作
const handleDelete = async (row?: AcceptanceFormVO) => {
  const id = row?.id;

  // 构建删除提示信息
  let confirmMessage = '';
  if (row) {
    confirmMessage = t('huahao.acceptance.deleteConfirm', {
      id: row.accNo
    });
  }

  await proxy?.$modal.confirm(confirmMessage).finally(() => (loading.value = false));
  await delAcceptanceForm(id);
  proxy?.$modal.msgSuccess(t('huahao.common.deleteSuccess'));
  await getList();
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  createTimeRange.value = [];
  queryFormRef.value?.resetFields();
  handleQuery();
};

/** 导入按钮操作 */
const handleImport = () => {
  importDialog.visible = true;
  importDialog.title = t('huahao.acceptance.importTitle');
};

/** 导出按钮操作 */
const handleExport = () => {
  // 导出时移除分页参数，导出所有数据
  const exportParams = { ...queryParams.value };
  delete exportParams.pageNum;
  delete exportParams.pageSize;

  proxy?.download('pda/acceptance/form/export', exportParams, `acceptance_form_${new Date().getTime()}.xlsx`);
};

/** 下载模板 */
const downloadTemplate = () => {
  proxy?.download('pda/acceptance/importTemplate', {}, `acceptance_template_${new Date().getTime()}.xlsx`);
};

/** 文件上传前的钩子 */
const beforeUpload = (file: any) => {
  const isXls = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const isLt10M = file.size / 1024 / 1024 < 10;

  if (!isXls) {
    proxy?.$modal.msgError(t('huahao.common.fileFormatTip'));
    return false;
  }
  if (!isLt10M) {
    proxy?.$modal.msgError('上传文件大小不能超过 10MB!');
    return false;
  }
  return true;
};

/** 提交导入 */
const submitImport = () => {
  buttonLoading.value = true;
  uploadRef.value.submit();
};

/** 处理上传成功 */
const handleUploadSuccess = (response: any) => {
  buttonLoading.value = false;
  importDialog.visible = false;
  uploadRef.value.clearFiles();

  if (response.code === 200) {
    proxy?.$modal.msgSuccess(t('huahao.common.importSuccess') + ': ' + response.msg);
    getList();
  } else {
    // 检查是否是错误码
    if (response.msg === 'IMPORT_DATA_FAILED') {
      // 使用国际化的错误消息
      proxy?.$modal.msgError(t('huahao.common.importDataFailed'));
    } else {
      // 其他错误直接显示后端返回的消息
      proxy?.$modal.msgError(response.msg || t('huahao.common.importFailed'));
    }
  }
};

/** 处理上传失败 */
const handleUploadError = (error: Error) => {
  buttonLoading.value = false;
  proxy?.$modal.msgError('上传失败: ' + error.message);
};

/** 取消导入 */
const cancelImport = () => {
  importDialog.visible = false;
  buttonLoading.value = false;
  uploadRef.value.clearFiles();
};

onMounted(() => {
  getList();
});
</script>
