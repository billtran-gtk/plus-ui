<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item :label="$t('huahao.receivingFormReport.receivingTime')" prop="receivingTime" label-width="155px">
              <el-date-picker
                v-model="receivingTimeRange"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t('huahao.common.startDate')"
                :end-placeholder="$t('huahao.common.endDate')"
                value-format="YYYY-MM-DD"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item :label="$t('huahao.receivingFormReport.accNo')" prop="accNo" label-width="130px">
              <el-select
                v-model="queryParams.accNo"
                :placeholder="$t('huahao.receivingFormReport.selectAccNo')"
                clearable
                filterable
                style="width: 200px"
              >
                <el-option v-for="item in accNoOptions" :key="item.accNo" :label="item.fileName" :value="item.accNo" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('huahao.receivingFormReport.asnNo')" prop="asnNo" label-width="80px">
              <el-input
                v-model="queryParams.asnNo"
                :placeholder="$t('huahao.receivingFormReport.placeholder.asnNo')"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item label-width="0">
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
          <!--          <el-col :span="1.5">-->
          <!--            <el-button v-hasPermi="['huahao:receivingForm:export']" type="warning" plain icon="Download" @click="handleGenerateAsn">{{-->
          <!--              $t('huahao.common.generateAsnFile')-->
          <!--            }}</el-button>-->
          <!--          </el-col>-->
          <el-col :span="1.5">
            <el-button v-hasPermi="['huahao:receivingForm:export']" type="warning" plain icon="Download" @click="handleExport">{{
              $t('huahao.common.export')
            }}</el-button>
          </el-col>
          <right-toolbar v-model:show-search="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="receivingFormList">
        <el-table-column :label="$t('huahao.common.no')" type="index" width="60" align="center">
          <template #default="scope">
            <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('huahao.receivingForm.rcId')" align="center" prop="rcId" :show-overflow-tooltip="true" />

        <el-table-column :label="$t('huahao.receivingForm.partNo')" align="center" prop="partNo" :show-overflow-tooltip="true" />

        <!--        <el-table-column :label="$t('huahao.receivingForm.accNo')" align="center" prop="accNo" :show-overflow-tooltip="true" />-->

        <el-table-column :label="$t('huahao.receivingForm.quantity')" align="center" prop="quantity" />

        <el-table-column :label="$t('huahao.receivingForm.dc')" align="center" prop="dc" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('huahao.receivingForm.dcCodeOriginal')" align="center" prop="dcCodeOriginal" :show-overflow-tooltip="true" />

        <el-table-column :label="$t('huahao.receivingForm.lot')" align="center" prop="lot" :show-overflow-tooltip="true" />

        <el-table-column :label="$t('huahao.receivingForm.msl')" align="center" prop="msl" />

        <el-table-column :label="$t('huahao.receivingForm.location')" align="center" prop="location" :show-overflow-tooltip="true" />

        <el-table-column :label="$t('huahao.receivingForm.asnNo')" align="center" prop="asnNo" :show-overflow-tooltip="true" />

        <el-table-column :label="$t('huahao.receivingForm.palletId')" align="center" prop="palletId" :show-overflow-tooltip="true" />

        <el-table-column :label="$t('huahao.receivingForm.receivingTime')" align="center" prop="receivingTime" width="180" />
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
  </div>
</template>

<script setup name="ReceivingFormReport" lang="ts">
import { useI18n } from 'vue-i18n';
import { listReceivingForm } from '@/api/huahao/receivingForm';
import { getAccNoOptions } from '@/api/huahao/acceptance';
import { ReceivingFormVO, ReceivingFormQuery } from '@/api/huahao/receivingForm/types';

const { t } = useI18n();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const receivingFormList = ref<ReceivingFormVO[]>([]);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);
const accNoOptions = ref<Array<{ accNo: string; fileName: string }>>([]);

const queryFormRef = ref<ElFormInstance>();
const receivingTimeRange = ref<[string, string]>([]);

const data = reactive<PageData<any, ReceivingFormQuery>>({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    accNo: undefined,
    asnNo: undefined,
    flag: '0', // 默认查询未提交的数据
    params: {}
  },
  rules: {}
});

const { queryParams } = toRefs(data);

/** 获取验收单号选项列表 */
const loadAccNoOptions = async () => {
  try {
    const res = await getAccNoOptions();
    accNoOptions.value = res.data || [];

    // 如果有数据，默认选中第一个
    if (accNoOptions.value.length > 0) {
      queryParams.value.accNo = accNoOptions.value[0].accNo;
    }
  } catch (error) {
    console.error('获取验收单号列表失败:', error);
  }
};

/** 查询收料明细列表 */
const getList = async () => {
  // 如果没有选择验收单号，不查询数据
  if (!queryParams.value.accNo) {
    receivingFormList.value = [];
    total.value = 0;
    loading.value = false;
    return;
  }

  loading.value = true;

  // 处理时间范围参数
  if (receivingTimeRange.value && receivingTimeRange.value.length === 2) {
    queryParams.value.params = {
      beginReceivingTime: receivingTimeRange.value[0] + ' 00:00:00',
      endReceivingTime: receivingTimeRange.value[1] + ' 23:59:59'
    };
  } else {
    queryParams.value.params = {};
  }

  const res = await listReceivingForm(queryParams.value);
  receivingFormList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  receivingTimeRange.value = [];
  queryFormRef.value?.resetFields();
  handleQuery();
};

/** 导出按钮操作 */
const handleExport = () => {
  // 使用同步的查询条件导出
  const syncParams = {
    ...queryParams.value
  };
  proxy?.download('huahao/receivingForm/export', syncParams, `receiving_form_${new Date().getTime()}.xlsx`);
};

/** 生成ASN文件 */
const handleGenerateAsn = () => {
  // 检查是否选择了验收单号
  if (!queryParams.value.accNo) {
    proxy?.$modal.msgError(t('huahao.receivingFormReport.selectAccNoFirst'));
    return;
  }

  // 检查是否有未提交的数据
  if (receivingFormList.value.length === 0) {
    proxy?.$modal.msgError(t('huahao.receivingFormReport.noDataForAccNo'));
    return;
  }

  // 查找当前选中的验收单对应的文件名
  const selectedOption = accNoOptions.value.find((item) => item.accNo === queryParams.value.accNo);
  const fileNameWithoutExt = selectedOption?.fileName?.replace(/\.[^/.]+$/, '') || queryParams.value.accNo;

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
          accNo: queryParams.value.accNo
        },
        fileName
      );
      // 提示用户
      proxy?.$modal.msgSuccess(t('huahao.receivingFormReport.generateAsnSuccess'));

      // 延迟刷新列表，等待后端更新flag
      setTimeout(() => {
        getList();
      }, 1500);
    })
    .catch(() => {});
};

onMounted(async () => {
  await loadAccNoOptions(); // 先获取验收单号列表并设置默认值
  getList(); // 然后查询数据
});
</script>
