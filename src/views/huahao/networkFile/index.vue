<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item :label="$t('huahao.networkFile.filePath')" prop="filePath" label-width="120px">
              <el-input
                v-model="queryParams.filePath"
                :placeholder="$t('huahao.networkFile.placeholder.filePath')"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item :label="$t('huahao.networkFile.type')" prop="type">
              <el-select v-model="queryParams.type" filterable :placeholder="proxy.$t('huahao.networkFile.selectPlaceholder')" style="width: 100%">
                <el-option v-for="item in fileTypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd">{{ $t('huahao.common.add') }}</el-button>
          </el-col>
          <right-toolbar v-model:show-search="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="networkFileList" @selection-change="handleSelectionChange">
        <el-table-column :label="$t('huahao.common.no')" type="index" width="60" align="center">
          <template #default="scope">
            <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('huahao.networkFile.filePath')" align="center" prop="filePath" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('huahao.networkFile.type')" align="center" prop="type" :show-overflow-tooltip="true">
          <template #default="scope">
            <dict-tag :options="fileTypeList" :value="scope.row.type" />
          </template>
        </el-table-column>
        <el-table-column prop="isEnable" :label="$t('huahao.networkFile.isEnable')" align="center" :show-overflow-tooltip="true">
          <template #default="scope">
            <!--            <dict-tag :options="sys_normal_disable" :value="scope.row.isEnable" />-->
            <el-tag type="success" v-if="scope.row.isEnable === '0'">{{ $t('huahao.networkFile.enabled') }}</el-tag>
            <el-tag type="info" v-else>{{ $t('huahao.networkFile.disabled') }}</el-tag>
          </template>
          <!--          </template>-->
        </el-table-column>
        <el-table-column :label="$t('huahao.common.operation')" align="center" width="150" class-name="small-padding fixed-width">
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

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>

    <!-- 添加或修改网络共享文件配置对应对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="600px" append-to-body>
      <el-form ref="networkFileRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item :label="$t('huahao.networkFile.filePath')" prop="filePath">
          <el-input v-model="form.filePath" :placeholder="$t('huahao.networkFile.placeholder.filePath')" />
        </el-form-item>
        <el-form-item :label="$t('huahao.networkFile.type')" prop="type">
          <el-select v-model="form.type" filterable :placeholder="proxy.$t('huahao.networkFile.selectPlaceholder')" style="width: 100%">
            <el-option v-for="item in fileTypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('huahao.networkFile.isEnable')" prop="isEnable">
          <el-switch v-model="form.isEnable" active-value="0" inactive-value="1"></el-switch>
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

<script setup name="networkFile" lang="ts">
import { useI18n } from 'vue-i18n';
import { addNetworkFile, delNetworkFile, getNetworkFile, listNetworkFile, updateNetworkFile } from '@/api/huahao/networkFile';
import { NetworkFile, NetworkFileQuery, NetworkFileVO } from '@/api/huahao/networkFile/types';
import type { UploadInstance } from 'element-plus';
import i18n from '@/lang';

const { t } = useI18n();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = toRefs<any>(proxy?.useDict('sys_normal_disable'));
const networkFileList = ref<NetworkFileVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
// 使用 computed 包装国际化列表，确保语言切换时列表也会更新
const fileTypeList = computed(() => {
  const currentLang = i18n.global.locale.value;
  if (currentLang === 'zh_CN') {
    return [
      { label: '验收单', value: '1' },
      { label: 'ASN', value: '2' }
    ];
  } else if (currentLang === 'en_US') {
    return [
      { label: 'Acceptance', value: '1' },
      { label: 'ASN', value: '2' }
    ];
  } else {
    return [
      { label: 'Phiếu nghiệm thu', value: '1' },
      { label: 'ASN', value: '2' }
    ];
  }
});
const queryFormRef = ref<ElFormInstance>();
const networkFileRef = ref<ElFormInstance>();
const uploadRef = ref<UploadInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: NetworkFile = {
  filePath: undefined,
  type: undefined,
  isEnable: false,
  createTime: ''
};

const data = reactive<PageData<NetworkFile, NetworkFileQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    type: '',
    filePath: ''
  },
  rules: {}
});

const { queryParams, form } = toRefs(data);

// 使用 computed 包装验证规则，确保语言切换时规则也会更新
const rules = computed(() => ({
  filePath: [{ required: true, message: t('huahao.networkFile.rules.filePathNoRequired'), trigger: 'blur' }],
  type: [{ required: true, message: t('huahao.networkFile.rules.typeNoRequired'), trigger: 'blur' }]
}));

/** 查询网络共享文件配置对应列表 */
const getList = async () => {
  loading.value = true;
  const res = await listNetworkFile(queryParams.value);
  networkFileList.value = res.rows;
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
  networkFileRef.value?.resetFields();
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
const handleSelectionChange = (selection: NetworkFileVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = t('huahao.networkFile.addTitle');
};

/** 修改按钮操作 */
const handleUpdate = async (row?: NetworkFileVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getNetworkFile(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = t('huahao.networkFile.editTitle');
};

/** 提交按钮 */
const submitForm = () => {
  networkFileRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateNetworkFile(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addNetworkFile(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess(t('huahao.common.operationSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: NetworkFileVO) => {
  const _ids = row?.id || ids.value;

  // 构建删除提示信息
  let confirmMessage = '';
  if (row) {
    confirmMessage = t('huahao.networkFile.deleteConfirm', {
      filePath: row.filePath
    });
  } else {
    const count = ids.value.length;
    confirmMessage = t('huahao.networkFile.deleteBatchConfirm', { count });
  }

  await proxy?.$modal.confirm(confirmMessage).finally(() => (loading.value = false));
  await delNetworkFile(_ids);
  proxy?.$modal.msgSuccess(t('huahao.common.deleteSuccess'));
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'huahao/networkFile/export',
    {
      ...queryParams.value
    },
    `networkFile_${new Date().getTime()}.xlsx`
  );
};

onMounted(() => {
  getList();
});
</script>
