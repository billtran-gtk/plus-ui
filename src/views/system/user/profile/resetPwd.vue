<template>
  <el-form ref="pwdRef" :model="user" :rules="rules" label-width="80px">
    <el-form-item :label="$t('profile.oldPassword')" prop="oldPassword" label-width="200px">
      <el-input v-model="user.oldPassword" :placeholder="$t('profile.placeholder.oldPassword')" type="password" show-password />
    </el-form-item>
    <el-form-item :label="$t('profile.newPassword')" prop="newPassword" label-width="200px">
      <el-input v-model="user.newPassword" :placeholder="$t('profile.placeholder.newPassword')" type="password" show-password />
    </el-form-item>
    <el-form-item :label="$t('profile.confirmPassword')" prop="confirmPassword" label-width="200px">
      <el-input v-model="user.confirmPassword" :placeholder="$t('profile.placeholder.confirmPassword')" type="password" show-password />
    </el-form-item>
    <el-form-item style="margin-left: 120px;">
      <el-button type="primary" @click="submit">{{ $t('profile.save') }}</el-button>
      <el-button type="danger" @click="close">{{ $t('profile.close') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { updateUserPwd } from '@/api/system/user';
import type { ResetPwdForm } from '@/api/system/user/types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const pwdRef = ref<ElFormInstance>();
const user = ref<ResetPwdForm>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const equalToPassword = (rule: any, value: string, callback: any) => {
  if (user.value.newPassword !== value) {
    callback(new Error(t('profile.rules.passwordNotMatch')));
  } else {
    callback();
  }
};

const rules = computed(() => ({
  oldPassword: [{ required: true, message: t('profile.rules.oldPasswordRequired'), trigger: 'blur' }],
  newPassword: [
    { required: true, message: t('profile.rules.newPasswordRequired'), trigger: 'blur' },
    {
      min: 6,
      max: 20,
      message: t('profile.rules.passwordLength'),
      trigger: 'blur'
    },
    { pattern: /^[^<>"'|\\]+$/, message: t('profile.rules.passwordPattern'), trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: t('profile.rules.confirmPasswordRequired'), trigger: 'blur' },
    {
      required: true,
      validator: equalToPassword,
      trigger: 'blur'
    }
  ]
}));

/** 提交按钮 */
const submit = () => {
  pwdRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      await updateUserPwd(user.value.oldPassword, user.value.newPassword);
      proxy?.$modal.msgSuccess(t('profile.updateSuccess'));
    }
  });
};
/** 关闭按钮 */
const close = () => {
  proxy?.$tab.closePage();
};
</script>
