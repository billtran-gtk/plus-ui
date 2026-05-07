<template>
  <div class="base-upload">
    <el-upload
      ref="uploadFile"
      :action="uploadUrl"
      :headers="headers"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :file-list="fileList"
      :limit="limit"
      :multiple="multiple"
      :auto-upload="false"
      drag
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">
          {{ tipText }}
          <!-- 添加下载模板超链接 -->
          <span class="download-template-link" @click="downloadTemplate">
            <el-icon><Download /></el-icon>
            下载模板
          </span>
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage, type UploadFile, type UploadRawFile } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';
import { globalHeaders } from '@/utils/request';

// 定义组件Props接口
interface Props {
  uploadUrl: string; // 上传地址通过props传递
  downloadUrl?: string; // 下载模板的URL
  downloadFilename?: string;
  limit?: number;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // MB
  fileList?: UploadFile[];
  autoUpload?: boolean; // 自动上传属性
}
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const headers = ref(globalHeaders());
const props = withDefaults(defineProps<Props>(), {
  downloadUrl: '',
  downloadFilename: 'template.xlsx',
  limit: 5,
  multiple: true,
  maxSize: 10,
  fileList: () => [],
  autoUpload: false // 默认不自动上传
});
const downloadLoading = ref(false); // 下载加载状态
const downloadTemplate = async () => {
  if (!props.downloadUrl) {
    proxy?.$modal.msgWarning('未配置模板下载地址');
    emit('download', '下载失败：未配置模板地址');
    return;
  }

  downloadLoading.value = true;

  try {
    // 如果是本地文件（public目录下的文件）
    if (props.downloadUrl.startsWith('/') && !props.downloadUrl.includes('://')) {
      // 直接创建链接下载本地文件
      const link = document.createElement('a');
      link.href = props.downloadUrl;
      link.download = props.downloadFilename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      proxy?.$modal.msgSuccess('模板下载开始');
      emit('download', props.downloadFilename);
    } else {
      // // 远程文件，通过API下载
      // const response = await axios({
      //   url: props.downloadUrl,
      //   method: 'GET',
      //   responseType: 'blob', // 必须指定为blob类型才能下载
      //   headers: props.headers // 使用上传的headers，确保认证一致
      // });
      //
      // // 创建Blob URL并下载
      // const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = blobUrl;
      // link.download = props.downloadFilename;
      // link.style.display = 'none';
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      //
      // // 释放Blob URL内存
      // window.URL.revokeObjectURL(blobUrl);
      //
      // ElMessage.success('模板下载成功');
      // emit('download', props.downloadFilename);
    }
  } catch (error) {
    console.error('模板下载失败:', error);
    proxy?.$modal.msgError('模板下载失败，请重试');
    emit('download', '下载失败');
  } finally {
    downloadLoading.value = false;
  }
};
// 定义组件事件
const emit = defineEmits<{
  success: [response: any, file: UploadFile, fileList: UploadFile[]];
  error: [error: Error, file: UploadFile, fileList: UploadFile[]];
  progress: [event: any, file: UploadFile, fileList: UploadFile[]];
}>();

const uploadFile = ref();
const fileList = ref<UploadFile[]>(props.fileList);

// 计算提示文本
const tipText = computed(() => {
  const parts = [];
  if (props.accept) {
    parts.push(`支持格式: ${props.accept}`);
  }
  parts.push(`单文件不超过${props.maxSize}MB`);
  if (props.limit > 1) {
    parts.push(`最多上传${props.limit}个文件`);
  }
  return parts.join('，');
});

// 上传前校验
const beforeUpload = (file: UploadRawFile) => {
  // 文件类型校验
  if (props.accept && !props.accept.split(',').some((type) => file.name.toLowerCase().endsWith(type.replace('.', '')))) {
    proxy?.$modal.msgError(`文件格式不支持，请上传${props.accept}格式的文件`);
    return false;
  }

  // 文件大小校验
  const isLtMaxSize = file.size / 1024 / 1024 < props.maxSize;
  if (!isLtMaxSize) {
    proxy?.$modal.msgError(`文件大小不能超过 ${props.maxSize}MB!`);
    return false;
  }

  return true;
};

// 上传成功处理
const handleSuccess = (response: any, file: UploadFile, fileList: UploadFile[]) => {
  proxy?.$modal.msgSuccess(`${file.name} 上传成功`);
  emit('success', response, file, fileList);
};

// 上传失败处理
const handleError = (error: Error, file: UploadFile, fileList: UploadFile[]) => {
  proxy?.$modal.msgError(`${file.name} 上传失败`);
  emit('error', error, file, fileList);
};

// 上传进度处理
const handleProgress = (event: any, file: UploadFile, fileList: UploadFile[]) => {
  emit('progress', event, file, fileList);
};

// 暴露给父组件的方法
defineExpose({
  // 清空文件列表
  clearFiles: () => {
    uploadFile.value?.clearFiles();
    fileList.value = [];
  },
  // 手动上传
  submit: () => {
    if (uploadFile.value) {
      uploadFile.value.submit();
      return true;
    }
    return false;
  },
  // 获取当前文件列表
  getFileList: () => fileList.value
});
</script>

<style scoped>
.base-upload {
  width: 100%;
}
.download-template-link {
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  color: #409eff;
  cursor: pointer;
  font-size: 12px;
  transition: color 0.3s;
}

.download-template-link:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.download-template-link .el-icon {
  margin-right: 4px;
  font-size: 12px;
}
</style>
