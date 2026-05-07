<template>
  <div class="dashboard-container">
    <div class="welcome-card">
      <div class="welcome-header">
        <h1 class="welcome-title">{{ $t('dashboard.welcome') }}</h1>
        <h2 class="system-name">{{ $t('dashboard.systemName') }}</h2>
        <p class="description">{{ $t('dashboard.description') }}</p>
      </div>

      <div class="quick-access">
        <h3 class="section-title">{{ $t('dashboard.quickAccess') }}</h3>
        <div class="access-grid">
          <el-card class="access-card" shadow="hover" @click="navigateTo('/huahao/acceptance')">
            <div class="card-content">
              <el-icon :size="40" color="#409EFF">
                <Document />
              </el-icon>
              <span class="card-title">{{ $t('dashboard.acceptanceManagement') }}</span>
            </div>
          </el-card>
          <el-card class="access-card" shadow="hover" @click="navigateTo('/huahao/networkFile')">
            <div class="card-content">
              <el-icon :size="40" color="#E6A23C">
                <List />
              </el-icon>
              <span class="card-title">{{ $t('dashboard.networkFile') }}</span>
            </div>
          </el-card>
          <el-card class="access-card" shadow="hover" @click="navigateTo('/huahao/materialMapping')">
            <div class="card-content">
              <el-icon :size="40" color="#67C23A">
                <Connection />
              </el-icon>
              <span class="card-title">{{ $t('dashboard.materialMapping') }}</span>
            </div>
          </el-card>

          <el-card class="access-card" shadow="hover" @click="navigateTo('/huahao/acceptanceReport')">
            <div class="card-content">
              <el-icon :size="40" color="#E6A23C">
                <List />
              </el-icon>
              <span class="card-title">{{ $t('dashboard.acceptanceFormImportReport') }}</span>
            </div>
          </el-card>

          <el-card class="access-card" shadow="hover" @click="navigateTo('/huahao/receivingFormReport')">
            <div class="card-content">
              <el-icon :size="40" color="#F56C6C">
                <DataAnalysis />
              </el-icon>
              <span class="card-title">{{ $t('dashboard.receivingFormReport') }}</span>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Index">
import { Document, Connection, List, DataAnalysis } from '@element-plus/icons-vue';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped lang="scss">
.dashboard-container {
  padding: 20px;
  min-height: calc(100vh - 84px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-card {
  max-width: 1200px;
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 60px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.welcome-header {
  text-align: center;
  margin-bottom: 60px;
}

.welcome-title {
  font-size: 28px;
  color: #666;
  margin-bottom: 10px;
  font-weight: 300;
}

.system-name {
  font-size: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  font-weight: 700;
}

.description {
  font-size: 18px;
  color: #999;
  font-weight: 300;
}

.quick-access {
  margin-top: 40px;
}

.section-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 500;
}

.access-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.access-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  gap: 16px;
}

.card-title {
  font-size: 18px;
  color: #333;
  font-weight: 500;
  text-align: center;
}

@media (max-width: 768px) {
  .welcome-card {
    padding: 40px 20px;
  }

  .system-name {
    font-size: 36px;
  }

  .access-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style>
