<template>
  <div class="p-2">
    <el-card shadow="hover">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button v-hasPermi="['huahao:receivingForm:add']" type="primary" plain icon="Plus" @click="handleAdd">{{ $t('huahao.common.add') }}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['huahao:receivingForm:export']" type="warning" plain icon="Download" @click="handleExport">{{ $t('huahao.common.export') }}</el-button>
          </el-col>
          <right-toolbar v-model:show-search="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="receivingFormList" @selection-change="handleSelectionChange">
        <el-table-column :label="$t('huahao.common.no')" type="index" width="60" align="center">
          <template #default="scope">
            <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('huahao.receivingForm.rcId')" align="center" prop="rcId" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('huahao.receivingForm.partNo')" align="center" prop="partNo" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('huahao.receivingForm.accNo')" align="center" prop="accNo" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('huahao.receivingForm.quantity')" align="center" prop="quantity" />
        <el-table-column :label="$t('huahao.receivingForm.dc')" align="center" prop="dc" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('huahao.receivingForm.lot')" align="center" prop="lot" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('huahao.receivingForm.msl')" align="center" prop="msl" />
        <el-table-column :label="$t('huahao.receivingForm.location')" align="center" prop="location" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('huahao.receivingForm.asnNo')" align="center" prop="asnNo" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('huahao.receivingForm.palletId')" align="center" prop="palletId" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('huahao.receivingForm.receivingTime')" align="center" prop="receivingTime" width="180" />
        <el-table-column :label="$t('huahao.receivingForm.flag')" align="center" prop="flag">
          <template #default="scope">
            <el-tag :type="scope.row.flag === '1' ? 'success' : 'info'">
              {{ scope.row.flag === '1' ? $t('huahao.receivingForm.yes') : $t('huahao.receivingForm.no') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('huahao.common.operation')" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip :content="$t('huahao.common.edit')" placement="top">
              <el-button v-hasPermi="['huahao:receivingForm:edit']" link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip :content="$t('huahao.common.delete')" placement="top">
              <el-button v-hasPermi="['huahao:receivingForm:remove']" link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>

    <!-- 添加或修改收料明细对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="800px" append-to-body>
      <el-form ref="receivingFormFormRef" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.rcId')" prop="rcId">
              <el-input v-model="form.rcId" :placeholder="$t('huahao.receivingForm.placeholder.rcId')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.partNo')" prop="partNo">
              <el-input v-model="form.partNo" :placeholder="$t('huahao.receivingForm.placeholder.partNo')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.accNo')" prop="accNo">
              <el-input v-model="form.accNo" :placeholder="$t('huahao.receivingForm.placeholder.accNo')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.quantity')" prop="quantity">
              <el-input-number v-model="form.quantity" :min="0" controls-position="right" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.dc')" prop="dc">
              <el-input v-model="form.dc" :placeholder="$t('huahao.receivingForm.placeholder.dc')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.lot')" prop="lot">
              <el-input v-model="form.lot" :placeholder="$t('huahao.receivingForm.placeholder.lot')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.msl')" prop="msl">
              <el-input v-model="form.msl" :placeholder="$t('huahao.receivingForm.placeholder.msl')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.location')" prop="location">
              <el-input v-model="form.location" :placeholder="$t('huahao.receivingForm.placeholder.location')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.asnNo')" prop="asnNo">
              <el-input v-model="form.asnNo" :placeholder="$t('huahao.receivingForm.placeholder.asnNo')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.palletId')" prop="palletId">
              <el-input v-model="form.palletId" :placeholder="$t('huahao.receivingForm.placeholder.palletId')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.receivingTime')" prop="receivingTime">
              <el-date-picker
                v-model="form.receivingTime"
                type="datetime"
                :placeholder="$t('huahao.receivingForm.placeholder.receivingTime')"
                value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.flag')" prop="flag">
              <el-radio-group v-model="form.flag">
                <el-radio label="0">{{ $t('huahao.receivingForm.no') }}</el-radio>
                <el-radio label="1">{{ $t('huahao.receivingForm.yes') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
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

<script setup name="ReceivingForm" lang="ts">
import { useI18n } from 'vue-i18n';
import { listReceivingForm, getReceivingForm, delReceivingForm, addReceivingForm, updateReceivingForm } from '@/api/huahao/receivingForm';
import { ReceivingFormVO, ReceivingFormQuery, ReceivingFormForm } from '@/api/huahao/receivingForm/types';

const { t } = useI18n();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const receivingFormList = ref<ReceivingFormVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const receivingFormFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ReceivingFormForm = {
  id: undefined,
  rcId: undefined,
  partNo: undefined,
  accNo: undefined,
  quantity: undefined,
  dc: undefined,
  lot: undefined,
  msl: undefined,
  location: undefined,
  asnNo: undefined,
  palletId: undefined,
  receivingTime: undefined,
  flag: '0',
  remark: undefined
};

const data = reactive<PageData<ReceivingFormForm, ReceivingFormQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    rcId: undefined,
    partNo: undefined,
    asnNo: undefined,
    flag: undefined
  },
  rules: {}
});

const { queryParams, form } = toRefs(data);

// 使用 computed 包装验证规则
const rules = computed(() => ({
  partNo: [
    { required: true, message: t('huahao.receivingForm.rules.partNoRequired'), trigger: 'blur' }
  ]
}));

/** 查询收料明细列表 */
const getList = async () => {
  loading.value = true;
  const res = await listReceivingForm(queryParams.value);
  receivingFormList.value = res.rows;
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
  receivingFormFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ReceivingFormVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = t('huahao.receivingForm.addTitle');
};

/** 修改按钮操作 */
const handleUpdate = async (row?: ReceivingFormVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getReceivingForm(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = t('huahao.receivingForm.editTitle');
};

/** 提交按钮 */
const submitForm = () => {
  receivingFormFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateReceivingForm(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addReceivingForm(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess(t('huahao.common.operationSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: ReceivingFormVO) => {
  const _ids = row?.id || ids.value;
  
  let confirmMessage = '';
  if (row) {
    confirmMessage = t('huahao.receivingForm.deleteConfirm', { partNo: row.partNo });
  } else {
    const count = ids.value.length;
    confirmMessage = t('huahao.receivingForm.deleteBatchConfirm', { count });
  }
  
  await proxy?.$modal.confirm(confirmMessage).finally(() => (loading.value = false));
  await delReceivingForm(_ids);
  proxy?.$modal.msgSuccess(t('huahao.common.deleteSuccess'));
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'huahao/receivingForm/export',
    {
      ...queryParams.value
    },
    `receiving_form_${new Date().getTime()}.xlsx`
  );
};

onMounted(() => {
  getList();
});
</script>
