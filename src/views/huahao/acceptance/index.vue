<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <!--            <el-form-item :label="$t('huahao.acceptance.receiptNo')" prop="receiptNo">-->
            <!--              <el-input-->
            <!--                v-model="queryParams.receiptNo"-->
            <!--                :placeholder="$t('huahao.acceptance.placeholder.receiptNo')"-->
            <!--                clearable-->
            <!--                @keyup.enter="handleQuery"-->
            <!--              />-->
            <!--            </el-form-item>-->
            <el-form-item :label="$t('huahao.receivingFormReport.accNo')" prop="accNo" label-width="130px">
              <el-select
                v-model="queryParams.receiptNo"
                :placeholder="$t('huahao.receivingFormReport.selectAccNo')"
                clearable
                filterable
                style="width: 200px"
              >
                <el-option v-for="item in accNoOptions" :key="item.accNo" :label="item.fileName" :value="item.accNo" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('huahao.acceptance.asnNo')" prop="asnNo">
              <el-input v-model="queryParams.asnNo" :placeholder="$t('huahao.acceptance.placeholder.asnNo')" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item :label="$t('huahao.acceptance.partNo')" prop="partNo" label-width="80px">
              <el-input v-model="queryParams.partNo" :placeholder="$t('huahao.acceptance.placeholder.partNo')" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
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
          <!--          <el-col :span="1.5">-->
          <!--            <el-button type="primary" plain icon="Plus" @click="handleAdd">{{ $t('huahao.common.add') }}</el-button>-->
          <!--          </el-col>-->
          <!-- <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()">{{ $t('huahao.common.delete') }}</el-button>
          </el-col> -->
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport">{{ $t('huahao.common.export') }}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Upload" @click="handleImport">{{ $t('huahao.common.import') }}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Search" @click="handleOracleQuery">{{ $t('huahao.acceptance.oracleQuery') }}</el-button>
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
      <!-- 从 Oracle 查验收单对话框 -->
      <el-dialog
        v-model="oracleDialog.visible"
        :title="$t('huahao.acceptance.oracleQueryTitle')"
        width="500px"
        append-to-body
        @opened="focusOracleInput"
      >
        <el-form ref="oracleFormRef" :model="oracleForm" :rules="oracleFormRules" label-width="130px">
          <el-form-item :label="$t('huahao.acceptance.receiptNo')" prop="receiptNo">
            <el-input
              ref="oracleReceiptNoRef"
              v-model="oracleForm.receiptNo"
              :placeholder="$t('huahao.acceptance.placeholder.oracleReceiptNo')"
              clearable
              @keyup.enter="submitOracleQuery"
            />
          </el-form-item>
        </el-form>
        <div class="el-upload__tip text-center">
          <div class="text-red">{{ $t('huahao.acceptance.oracleQueryTip') }}</div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button :loading="oracleLoading" type="primary" @click="submitOracleQuery">{{ $t('huahao.common.confirm') }}</el-button>
            <el-button @click="cancelOracleQuery">{{ $t('huahao.common.cancel') }}</el-button>
          </div>
        </template>
      </el-dialog>
      <el-table v-loading="loading" border :data="dataList" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column type="index" :label="$t('huahao.common.no')" width="80" align="center" :index="indexMethod" />
        <el-table-column :label="$t('huahao.acceptance.receiptNo')" align="center" prop="receiptNo" />
        <el-table-column :label="$t('huahao.acceptance.partNo')" align="center" prop="partNo" />
        <el-table-column :label="$t('huahao.acceptance.asnNo')" align="center" prop="asnNo" />
        <el-table-column :label="$t('huahao.acceptance.msl')" align="center" prop="msl" />
        <el-table-column :label="$t('huahao.acceptance.locator')" align="center" prop="locator" />
        <el-table-column :label="$t('huahao.acceptance.quantity')" align="center" prop="quantity" />
        <el-table-column :label="$t('huahao.acceptance.receivedQuantity')" align="center" prop="receivedQuantity" />
        <!--        <el-table-column :label="$t('huahao.common.operation')" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip :content="$t('huahao.common.edit')" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip :content="$t('huahao.common.delete')" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>-->
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>

    <!-- 收料明细表格 -->
    <el-card shadow="hover" class="mt-4">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg font-medium">{{ $t('huahao.receivingForm.title') }}</span>
          <div>
            <el-button type="primary" plain icon="Plus" @click="handleReceivingAdd">{{ $t('huahao.common.add') }}</el-button>
            <el-button type="primary" plain icon="Plus" @click="handleReceivingDelete">{{ $t('huahao.common.delete') }}</el-button>
            <el-button v-hasPermi="['huahao:receivingForm:export']" type="warning" plain icon="Download" @click="handleGenerateAsn">{{
              $t('huahao.common.generateAsnFile')
            }}</el-button>
            <el-button type="warning" plain icon="Download" @click="handleReceivingExport">{{ $t('huahao.common.export') }}</el-button>
          </div>
        </div>
      </template>
      <el-table v-loading="receivingLoading" border :data="receivingFormList" row-key="id" @selection-change="handleReceivingSelectionChange">
        <el-table-column type="selection" width="55" :selectable="(row) => row.flag !== '1'"></el-table-column>
        <el-table-column type="index" :label="$t('huahao.common.no')" width="60" align="center" />
        <el-table-column :label="$t('huahao.receivingForm.rcId')" align="center" prop="rcId" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('huahao.receivingForm.partNo')" align="center" prop="partNo" :show-overflow-tooltip="true" />
        <!--        <el-table-column :label="$t('huahao.receivingForm.accNo')" align="center" prop="accNo" :show-overflow-tooltip="true" />-->
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
              <el-button :disabled="scope.row.flag === '1'" link type="primary" icon="Edit" @click="handleReceivingUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip :content="$t('huahao.common.delete')" placement="top">
              <el-button :disabled="scope.row.flag === '1'" link type="primary" icon="Delete" @click="handleReceivingDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="receivingTotal > 0"
        v-model:page="receivingQueryParams.pageNum"
        v-model:limit="receivingQueryParams.pageSize"
        :total="receivingTotal"
        @pagination="getReceivingList"
      />
    </el-card>

    <!-- 添加或修改收料明细对话框 -->
    <el-dialog v-model="receivingDialog.visible" :title="receivingDialog.title" width="800px" append-to-body>
      <el-form ref="receivingFormRef" :model="receivingForm" :rules="receivingFormRules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.rcId')" prop="rcId">
              <div class="flex items-center" v-if="receivingDialog.addFlag">
                <el-input class="flex-1" disabled v-model="receivingForm.rcId" :placeholder="$t('huahao.receivingForm.placeholder.rcId')" />
                <el-button class="ml-1" type="primary" @click="handleGenerateRCId">{{ $t('huahao.receivingForm.generateButton') }}</el-button>
              </div>
              <el-input v-else v-model="receivingForm.rcId" :placeholder="$t('huahao.receivingForm.placeholder.rcId')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.partNo')" prop="partNo">
              <el-input
                :disabled="!receivingDialog.addFlag"
                v-model="receivingForm.partNo"
                :placeholder="$t('huahao.receivingForm.placeholder.partNo')"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.accNo')" prop="accNo">
              <el-input disabled v-model="receivingForm.accNo" :placeholder="$t('huahao.receivingForm.placeholder.accNo')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.quantity')" prop="quantity">
              <el-input-number v-model="receivingForm.quantity" :min="0" controls-position="right" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.dc')" prop="dc">
              <el-input v-model="receivingForm.dc" :placeholder="$t('huahao.receivingForm.placeholder.dc')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.lot')" prop="lot">
              <el-input v-model="receivingForm.lot" :placeholder="$t('huahao.receivingForm.placeholder.lot')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.msl')" prop="msl">
              <el-input v-model="receivingForm.msl" :placeholder="$t('huahao.receivingForm.placeholder.msl')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.location')" prop="location">
              <el-input v-model="receivingForm.location" :placeholder="$t('huahao.receivingForm.placeholder.location')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.asnNo')" prop="asnNo">
              <el-input v-model="receivingForm.asnNo" :placeholder="$t('huahao.receivingForm.placeholder.asnNo')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.palletId')" prop="palletId">
              <div class="flex items-center">
                <el-input class="flex-1" disabled v-model="receivingForm.palletId" :placeholder="$t('huahao.receivingForm.placeholder.palletId')" />
                <el-button class="ml-1" type="primary" @click="handleGeneratePalletId">{{ $t('huahao.receivingForm.generateButton') }}</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.receivingTime')" prop="receivingTime">
              <el-date-picker
                v-model="receivingForm.receivingTime"
                type="datetime"
                :placeholder="$t('huahao.receivingForm.placeholder.receivingTime')"
                value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('huahao.receivingForm.flag')" prop="flag">
              <el-radio-group v-model="receivingForm.flag">
                <el-radio label="0">{{ $t('huahao.receivingForm.no') }}</el-radio>
                <el-radio label="1">{{ $t('huahao.receivingForm.yes') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="receivingButtonLoading" type="primary" @click="submitReceivingForm">{{ $t('huahao.common.confirm') }}</el-button>
          <el-button @click="cancelReceiving">{{ $t('huahao.common.cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 添加或修改验收单对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" append-to-body>
      <el-form ref="formRef" :model="form" :rules="formRules" label-width="100px">
        <el-form-item :label="$t('huahao.acceptance.receiptNo')" prop="receiptNo">
          <el-input :disabled="acceptanceDialogFlag" v-model="form.receiptNo" :placeholder="$t('huahao.acceptance.placeholder.receiptNo')" />
        </el-form-item>
        <el-form-item :label="$t('huahao.acceptance.asnNo')" prop="asnNo">
          <el-input :disabled="acceptanceDialogFlag" v-model="form.asnNo" :placeholder="$t('huahao.acceptance.placeholder.asnNo')" />
        </el-form-item>
        <el-form-item :label="$t('huahao.acceptance.partNo')" prop="partNo">
          <el-input v-model="form.partNo" :placeholder="$t('huahao.acceptance.placeholder.partNo')" />
        </el-form-item>
        <el-form-item :label="$t('huahao.acceptance.quantity')" prop="quantity">
          <el-input v-model="form.quantity" :placeholder="$t('huahao.acceptance.placeholder.quantity')" type="number" />
        </el-form-item>
        <el-form-item :label="$t('huahao.acceptance.msl')" prop="msl">
          <el-input v-model="form.msl" :placeholder="$t('huahao.acceptance.placeholder.msl')" />
        </el-form-item>
        <el-form-item :label="$t('huahao.acceptance.locator')" prop="locator">
          <el-input v-model="form.locator" :placeholder="$t('huahao.acceptance.placeholder.locator')" />
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

<script setup name="Acceptance" lang="ts">
import {
  listData,
  getData,
  delData,
  updateData,
  addData,
  getAccNoOptions,
  generatePalletId,
  generateRcId,
  queryFromOracle
} from '@/api/huahao/acceptance';
import { listReceivingForm, getReceivingForm, delReceivingForm, addReceivingForm, updateReceivingForm } from '@/api/huahao/receivingForm';
import { globalHeaders } from '@/utils/request';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { t } = useI18n();

const dataList = ref([]);
const receivingFormList = ref([]);
const buttonLoading = ref(false);
const loading = ref(true);
const receivingLoading = ref(false);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const receivingIds = ref<Array<string | number>>([]);
const single = ref(true);
const receivingSingle = ref(true);
const multiple = ref(true);
const receivingMultiple = ref(true);
const total = ref(0);
const receivingTotal = ref(0);
const uploadRef = ref();
const queryFormRef = ref<ElFormInstance>();
const formRef = ref<ElFormInstance>();
const receivingFormRef = ref<ElFormInstance>();

// 收料明细对话框控制
const receivingDialog = reactive<DialogOption>({
  visible: false,
  title: '',
  addFlag: false
});

const receivingButtonLoading = ref(false);

// 新增编辑弹框控制
const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

// 导入弹框控制
const importDialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

// 从 Oracle 查验收单弹框控制
const oracleDialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const oracleLoading = ref(false);
const oracleFormRef = ref<ElFormInstance>();
const oracleReceiptNoRef = ref<ElInputInstance>();
const oracleForm = ref({ receiptNo: '' });

// 从 Oracle 查验收单的表单验证规则
const oracleFormRules = computed(() => ({
  receiptNo: [{ required: true, message: t('huahao.acceptance.rules.receiptNoRequired'), trigger: 'blur' }]
}));

// 上传配置
const baseUrl = import.meta.env.VITE_APP_BASE_API;
const uploadUrl = ref(baseUrl + '/pda/acceptance/import');
const uploadHeaders = ref(globalHeaders());

const initFormData = {
  id: undefined,
  receiptNo: undefined,
  asnNo: undefined,
  partNo: undefined,
  quantity: undefined,
  msl: undefined,
  locator: undefined
};

const form = ref({ ...initFormData });

// 收料明细表单数据
const receivingInitFormData = {
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
  flag: '0'
};

const receivingForm = ref({ ...receivingInitFormData });

// 收料明细表单验证规则
const receivingFormRules = computed(() => ({
  // rcId: [{ required: true, message: t('huahao.receivingForm.rules.rcIdNoRequired'), trigger: 'blur' }],
  partNo: [{ required: true, message: t('huahao.receivingForm.rules.partNoRequired'), trigger: 'blur' }]
}));

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  // 从 Oracle 查完会把验收单号填回来，所以这里要标出型别，不能让它被推断成 undefined
  receiptNo: undefined as string | undefined,
  asnNo: undefined,
  partNo: undefined,
  msl: undefined,
  locator: undefined
});

const accNoOptions = ref<Array<{ accNo: string; fileName: string }>>([]);

// 收料明细查询参数
const receivingQueryParams = ref({
  pageNum: 1,
  pageSize: 10,
  accNo: undefined,
  asnNo: undefined,
  partNo: undefined,
  flag: undefined
});

// 表单验证规则（使用 computed 确保语言切换时更新）
const formRules = computed(() => ({
  receiptNo: [{ required: true, message: t('huahao.acceptance.rules.receiptNoRequired'), trigger: 'blur' }],
  asnNo: [{ required: true, message: t('huahao.acceptance.rules.asnNoRequired'), trigger: 'blur' }],
  partNo: [{ required: true, message: t('huahao.acceptance.rules.partNoRequired'), trigger: 'blur' }],
  quantity: [{ required: true, message: t('huahao.acceptance.rules.quantityRequired'), trigger: 'blur' }],
  msl: [{ required: true, message: t('huahao.acceptance.rules.mslRequired'), trigger: 'blur' }],
  locator: [{ required: true, message: t('huahao.acceptance.rules.locatorRequired'), trigger: 'blur' }]
}));

/** 查询验收单列表 */
const getList = async () => {
  loading.value = true;
  const res = await listData(queryParams.value);
  dataList.value = res.rows;
  total.value = res.total;
  loading.value = false;

  // 同步查询收料明细
  await getReceivingList();
};
/** 生成PalletId */
const handleGeneratePalletId = async () => {
  const res = await generatePalletId();
  receivingForm.value.palletId = res.data;
};

/** 生成RcId */
const handleGenerateRCId = async () => {
  const res = await generateRcId();
  receivingForm.value.rcId = res.data;
};

/** 查询收料明细列表 */
const getReceivingList = async () => {
  receivingLoading.value = true;
  // 使用验收单的查询条件同步到收料明细
  const syncParams = {
    ...receivingQueryParams.value,
    accNo: queryParams.value.receiptNo,
    asnNo: queryParams.value.asnNo,
    partNo: queryParams.value.partNo
  };

  const res = await listReceivingForm(syncParams);
  receivingFormList.value = res.rows;
  receivingTotal.value = res.total;
  receivingLoading.value = false;
};

/** 获取验收单号选项列表 */
const loadAccNoOptions = async () => {
  try {
    const res = await getAccNoOptions();
    accNoOptions.value = res.data || [];

    // 如果有数据，默认选中第一个
    // if (accNoOptions.value.length > 0) {
    //   queryParams.value.receiptNo = accNoOptions.value[0].accNo;
    // }
  } catch (error) {
    console.error('获取验收单号列表失败:', error);
  }
};

// 自定义序号计算方法
const indexMethod = (index: number) => {
  return (queryParams.value.pageNum - 1) * queryParams.value.pageSize + index + 1;
};

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
};

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  formRef.value?.resetFields();
};

/** 搜索按钮操作 */
const handleQuery = () => {
  // 检查是否所有查询条件都为空
  const hasCondition = queryParams.value.receiptNo || queryParams.value.asnNo || queryParams.value.partNo;

  if (!hasCondition) {
    // 如果所有条件都为空，则显示提示信息，不清空现有数据
    proxy?.$modal.msgWarning(t('huahao.acceptance.queryConditionRequired'));
    return;
  }

  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: any[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 收料明细多选框选中数据 */
const handleReceivingSelectionChange = (selection: any[]) => {
  receivingIds.value = selection.map((item) => item.id);
  receivingSingle.value = selection.length != 1;
  receivingMultiple.value = !selection.length;
};
const acceptanceDialogFlag = ref(false);
/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  acceptanceDialogFlag.value = false;
  dialog.title = t('huahao.acceptance.addTitle');
};

/** 修改按钮操作 */
const handleUpdate = async (row?: any) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getData(_id);
  Object.assign(form.value, res.data);
  await nextTick();
  formRef.value?.clearValidate();
  dialog.visible = true;
  acceptanceDialogFlag.value = true;
  dialog.title = t('huahao.acceptance.editTitle');
};

/** 提交按钮 */
const submitForm = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateData(form.value).finally(() => (buttonLoading.value = false));
        proxy?.$modal.msgSuccess(t('huahao.common.operationSuccess'));
      } else {
        await addData(form.value).finally(() => (buttonLoading.value = false));
        proxy?.$modal.msgSuccess(t('huahao.common.operationSuccess'));
      }
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: any) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm(t('huahao.acceptance.deleteConfirm', { id: row?.partNo })).finally(() => (loading.value = false));
  await delData(_ids);
  proxy?.$modal.msgSuccess(t('huahao.common.deleteSuccess'));
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  if (!queryParams.value.receiptNo) {
    proxy?.$modal.msgError(t('huahao.receivingFormReport.selectAccNoFirst'));
    return;
  }
  // 导出时移除分页参数，导出所有数据
  const exportParams = { ...queryParams.value };
  delete exportParams.pageNum;
  delete exportParams.pageSize;

  proxy?.download('pda/acceptance/export', exportParams, `acceptance_${new Date().getTime()}.xlsx`);
};
/** 生成ASN文件 */
const handleGenerateAsn = () => {
  // 检查是否选择了验收单号
  if (!queryParams.value.receiptNo) {
    proxy?.$modal.msgError(t('huahao.receivingFormReport.selectAccNoFirst'));
    return;
  }

  // 检查是否有未提交的数据
  if (receivingFormList.value.length === 0) {
    proxy?.$modal.msgError(t('huahao.receivingFormReport.noDataForAccNo'));
    return;
  }

  // 查找当前选中的验收单对应的文件名
  const selectedOption = accNoOptions.value.find((item) => item.accNo === queryParams.value.receiptNo);
  const fileNameWithoutExt = selectedOption?.fileName?.replace(/\.[^/.]+$/, '') || queryParams.value.receiptNo;

  // 确认生成ASN文件
  proxy?.$modal
    .confirm(t('huahao.receivingFormReport.generateAsnConfirm'))
    .then(async () => {
      // 生成文件名：文件名_时间戳.xlsx
      const fileName = `${fileNameWithoutExt}_${new Date().getTime()}.xlsx`;

      // 调用后端接口生成ASN文件
      await proxy?.download(
        'huahao/receivingForm/generateAsn',
        {
          accNo: queryParams.value.receiptNo
        },
        fileName
      );

      // 延迟刷新列表，等待后端更新flag
      setTimeout(() => {
        getList();
      }, 1500);
    })
    .catch(() => {});
};

/** 收料明细新增按钮操作 */
const handleReceivingAdd = () => {
  if (!queryParams.value.receiptNo) {
    proxy?.$modal.msgError(t('huahao.receivingFormReport.selectAccNoFirst'));
    return;
  }
  resetReceiving();
  receivingDialog.visible = true;
  receivingDialog.addFlag = true;
  receivingForm.value.accNo = queryParams.value.receiptNo;
  receivingDialog.title = t('huahao.receivingForm.addTitle');
};

/** 收料明细修改按钮操作 */
const handleReceivingUpdate = async (row?: any) => {
  resetReceiving();
  receivingDialog.addFlag = false;
  const _id = row?.id || receivingIds.value[0];
  const res = await getReceivingForm(_id);
  Object.assign(receivingForm.value, res.data);
  receivingDialog.visible = true;
  receivingDialog.title = t('huahao.receivingForm.editTitle');
};

/** 收料明细表单重置 */
const resetReceiving = () => {
  receivingForm.value = { ...receivingInitFormData };
  receivingFormRef.value?.resetFields();
};

/** 收料明细取消按钮 */
const cancelReceiving = () => {
  resetReceiving();
  receivingDialog.visible = false;
};

/** 收料明细提交按钮 */
const submitReceivingForm = () => {
  receivingFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      receivingButtonLoading.value = true;
      if (receivingForm.value.id) {
        await updateReceivingForm(receivingForm.value).finally(() => (receivingButtonLoading.value = false));
        proxy?.$modal.msgSuccess(t('huahao.common.operationSuccess'));
      } else {
        await addReceivingForm(receivingForm.value).finally(() => (receivingButtonLoading.value = false));
        proxy?.$modal.msgSuccess(t('huahao.common.operationSuccess'));
      }
      receivingDialog.visible = false;
      await getReceivingList();
    }
  });
};

/** 收料明细删除按钮操作 */
const handleReceivingDelete = async (row?: any) => {
  if (!queryParams.value.receiptNo) {
    proxy?.$modal.msgError(t('huahao.receivingFormReport.selectAccNoFirst'));
    return;
  }
  const _ids = row?.id || receivingIds.value;

  let confirmMessage = '';
  if (row.id) {
    confirmMessage = t('huahao.receivingForm.deleteConfirm', { partNo: row.partNo });
  } else {
    const count = receivingIds.value.length;
    confirmMessage = t('huahao.receivingForm.deleteBatchConfirm', { count });
  }

  await proxy?.$modal.confirm(confirmMessage).finally(() => (receivingLoading.value = false));
  await delReceivingForm(_ids);
  proxy?.$modal.msgSuccess(t('huahao.common.deleteSuccess'));
  await getReceivingList();
};

/** 收料明细导出按钮操作 */
const handleReceivingExport = () => {
  if (!queryParams.value.receiptNo) {
    proxy?.$modal.msgError(t('huahao.receivingFormReport.selectAccNoFirst'));
    return;
  }
  // 使用同步的查询条件导出
  const syncParams = {
    accNo: queryParams.value.receiptNo,
    asnNo: queryParams.value.asnNo,
    partNo: queryParams.value.partNo
  };

  proxy?.download('huahao/receivingForm/export', syncParams, `receiving_form_${new Date().getTime()}.xlsx`);
};
const handleImport = () => {
  importDialog.visible = true;
  importDialog.title = t('huahao.acceptance.importTitle');
};

/** 打开「从 Oracle 查验收单」对话框 */
const handleOracleQuery = () => {
  oracleForm.value.receiptNo = '';
  oracleFormRef.value?.resetFields();
  oracleDialog.visible = true;
  oracleDialog.title = t('huahao.acceptance.oracleQueryTitle');
};

/** 对话框打开后把光标移到输入框，扫码枪不必先点一下 */
const focusOracleInput = () => {
  oracleReceiptNoRef.value?.focus();
};

/** 输入或扫描验收单号 → 后端查 Oracle → 落地 MySQL */
const submitOracleQuery = () => {
  oracleFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) {
      return;
    }

    const receiptNo = oracleForm.value.receiptNo.trim();
    oracleLoading.value = true;
    try {
      const res = await queryFromOracle(receiptNo);
      const rows = res.data || [];
      oracleDialog.visible = false;
      proxy?.$modal.msgSuccess(t('huahao.acceptance.oracleQuerySuccess', { count: rows.length }));

      // 刚落地的验收单要能从下拉框选到，所以选项与列表都得重查
      await loadAccNoOptions();
      queryParams.value.receiptNo = receiptNo;
      queryParams.value.pageNum = 1;
      await getList();
    } catch {
      // 错误讯息已由 request.ts 的拦截器依 errorCode 做过国际化，这里只要让对话框留着重扫
    } finally {
      oracleLoading.value = false;
    }
  });
};

/** 取消「从 Oracle 查验收单」 */
const cancelOracleQuery = () => {
  oracleDialog.visible = false;
  oracleLoading.value = false;
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
    if (response.code === 500) {
      if (response.msg === 'importDataNullFailed') {
        proxy?.$modal.msgError(t('huahao.acceptance.importDataNullFailed'));
      }
      if (response.msg === 'importDataDiffFailed') {
        proxy?.$modal.msgError(t('huahao.acceptance.importDataDiffFailed'));
      }
      if (response.msg === 'importDataSysFailed') {
        proxy?.$modal.msgError(t('huahao.acceptance.importDataSysFailed'));
      }
      if (response.msg === 'IMPORT_DATA_FAILED') {
        // 使用国际化的错误消息
        proxy?.$modal.msgError(t('huahao.common.importDataFailed'));
      }
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

onMounted(async () => {
  // 页面初始化时不自动查询，保持空数据状态
  await loadAccNoOptions();
  loading.value = false;
  receivingLoading.value = false;
});
</script>
