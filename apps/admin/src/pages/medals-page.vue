<template>
  <div class="page-stack">
    <div class="toolbar">
      <el-input v-model="keyword" placeholder="搜索勋章名称、短名称或标识" clearable @keyup.enter="loadData" />
      <el-button type="primary" @click="openCreateDialog">新增勋章</el-button>
      <el-button @click="loadData">查询</el-button>
    </div>

    <el-table :data="rows" border v-loading="loading">
      <el-table-column label="预览" width="120">
        <template #default="scope">
          <div class="medal-preview">
            <img v-if="scope.row.iconImage" :src="scope.row.iconImage" alt="勋章图标" />
            <div v-else class="medal-preview-placeholder">{{ scope.row.starLevel }}★</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template #default="scope">
          <div class="name-stack">
            <strong>{{ scope.row.shortName || scope.row.name }}</strong>
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="medalKey" label="标识" />
      <el-table-column prop="starLevel" label="星级" width="100" />
      <el-table-column prop="unlockMeters" label="解锁米数" width="120" />
      <el-table-column prop="animationPreset" label="动画" width="110" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column label="操作" width="220" fixed="right">
        <template #default="scope">
          <el-button link type="primary" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button link type="primary" @click="viewDetail(scope.row)">详情</el-button>
          <el-button link type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="760px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="110px">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="勋章标识" prop="medalKey">
              <el-input v-model="form.medalKey" placeholder="如 stair-master" :disabled="isEditing" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="短名称" prop="shortName">
              <el-input v-model="form.shortName" placeholder="卡片上展示的短名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="完整名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="星级" prop="starLevel">
              <el-select v-model="form.starLevel" style="width: 100%">
                <el-option :value="1" label="1 星" />
                <el-option :value="2" label="2 星" />
                <el-option :value="3" label="3 星" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细说明" prop="description">
              <el-input v-model="form.description" type="textarea" :rows="4" placeholder="详细描述勋章的达成条件和展示文案" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标地址" prop="iconImage">
              <el-input v-model="form.iconImage" placeholder="https://..." />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="背景地址" prop="backgroundImage">
              <el-input v-model="form.backgroundImage" placeholder="详情页大图地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="动画预设" prop="animationPreset">
              <el-select v-model="form.animationPreset" style="width: 100%">
                <el-option label="sparkle" value="sparkle" />
                <el-option label="glow" value="glow" />
                <el-option label="float" value="float" />
                <el-option label="pulse" value="pulse" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="动画时长(ms)" prop="animationDuration">
              <el-input-number v-model="form.animationDuration" :min="300" :max="10000" :step="100" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="解锁米数" prop="unlockMeters">
              <el-input-number v-model="form.unlockMeters" :min="0" :step="50" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基础米数" prop="baseMeters">
              <el-input-number v-model="form.baseMeters" :min="0" :step="50" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sortOrder">
              <el-input-number v-model="form.sortOrder" :min="0" :step="1" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" style="width: 100%">
                <el-option label="启用" value="enabled" />
                <el-option label="停用" value="disabled" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="submitForm">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
import { createAdminMedal, deleteAdminMedal, fetchAdminMedalDetail, fetchAdminMedals, updateAdminMedal } from '../api/medals';

const keyword = ref('');
const loading = ref(false);
const saving = ref(false);
const dialogVisible = ref(false);
const isEditing = ref(false);
const editId = ref('');
const formRef = ref<FormInstance>();
const rows = ref<Array<Record<string, any>>>([]);

const emptyForm = () => ({
  medalKey: '',
  shortName: '',
  name: '',
  description: '',
  iconImage: '',
  backgroundImage: '',
  animationPreset: 'sparkle',
  animationDuration: 1200,
  baseMeters: 0,
  unlockMeters: 0,
  starLevel: 1,
  sortOrder: 0,
  status: 'enabled',
});

const form = reactive(emptyForm());

const rules: FormRules = {
  medalKey: [{ required: true, message: '请输入勋章标识', trigger: 'blur' }],
  name: [{ required: true, message: '请输入勋章名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入详细说明', trigger: 'blur' }],
  baseMeters: [{ required: true, message: '请输入基础米数', trigger: 'change' }],
  unlockMeters: [{ required: true, message: '请输入解锁米数', trigger: 'change' }],
};

const dialogTitle = computed(() => (isEditing.value ? '编辑勋章' : '新增勋章'));

function resetForm() {
  Object.assign(form, emptyForm());
}

function hydrateForm(data: Record<string, any>) {
  Object.assign(form, {
    medalKey: data.medalKey ?? '',
    shortName: data.shortName ?? '',
    name: data.name ?? '',
    description: data.description ?? '',
    iconImage: data.iconImage ?? '',
    backgroundImage: data.backgroundImage ?? '',
    animationPreset: data.animationPreset ?? 'sparkle',
    animationDuration: data.animationDuration ?? 1200,
    baseMeters: data.baseMeters ?? 0,
    unlockMeters: data.unlockMeters ?? 0,
    starLevel: data.starLevel ?? 1,
    sortOrder: data.sortOrder ?? 0,
    status: data.status ?? 'enabled',
  });
}

async function loadData() {
  loading.value = true;
  try {
    const result = await fetchAdminMedals({ keyword: keyword.value, page: 1, pageSize: 20 });
    rows.value = result.list;
  } finally {
    loading.value = false;
  }
}

function openCreateDialog() {
  isEditing.value = false;
  editId.value = '';
  resetForm();
  dialogVisible.value = true;
}

async function openEditDialog(row: Record<string, any>) {
  isEditing.value = true;
  editId.value = String(row.medalId ?? row._id ?? '');
  resetForm();
  if (editId.value) {
    const detail = await fetchAdminMedalDetail(editId.value);
    hydrateForm(detail);
  } else {
    hydrateForm(row);
  }
  dialogVisible.value = true;
}

function viewDetail(row: Record<string, any>) {
  const shortName = row.shortName || row.name || '未命名';
  ElMessageBox.alert(
    `短名称：${shortName}\n完整名称：${row.name ?? '-'}\n标识：${row.medalKey ?? '-'}\n说明：${row.description ?? '-'}\n图标：${row.iconImage ?? '-'}\n背景：${row.backgroundImage ?? '-'}\n动画：${row.animationPreset ?? '-'} / ${row.animationDuration ?? '-'}ms`,
    '勋章详情',
    { confirmButtonText: '关闭', dangerouslyUseHTMLString: false },
  ).catch(() => undefined);
}

async function submitForm() {
  if (!formRef.value) {
    return;
  }

  const valid = await formRef.value.validate().catch(() => false);
  if (!valid) {
    return;
  }

  saving.value = true;
  try {
    const payload = {
      medalKey: form.medalKey.trim(),
      shortName: form.shortName.trim(),
      name: form.name.trim(),
      description: form.description.trim(),
      iconImage: form.iconImage.trim() || undefined,
      backgroundImage: form.backgroundImage.trim() || undefined,
      animationPreset: form.animationPreset,
      animationDuration: Number(form.animationDuration),
      baseMeters: Number(form.baseMeters),
      unlockMeters: Number(form.unlockMeters),
      starLevel: Number(form.starLevel),
      sortOrder: Number(form.sortOrder),
      status: form.status,
    };

    if (isEditing.value && editId.value) {
      await updateAdminMedal(editId.value, payload);
      ElMessage.success('勋章已更新');
    } else {
      await createAdminMedal(payload);
      ElMessage.success('勋章已创建');
    }

    dialogVisible.value = false;
    await loadData();
  } finally {
    saving.value = false;
  }
}

async function handleDelete(row: Record<string, any>) {
  const medalId = String(row.medalId ?? row._id ?? '');
  if (!medalId) {
    return;
  }

  await ElMessageBox.confirm(`确认删除勋章「${row.shortName || row.name || medalId}」吗？`, '删除勋章', {
    type: 'warning',
    confirmButtonText: '删除',
    cancelButtonText: '取消',
  });

  await deleteAdminMedal(medalId);
  ElMessage.success('勋章已删除');
  await loadData();
}

onMounted(loadData);
</script>

<style scoped>
.page-stack {
  display: grid;
  gap: 16px;
}

.toolbar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.medal-preview {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  overflow: hidden;
  background: #fff7e6;
  display: grid;
  place-items: center;
}

.medal-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.medal-preview-placeholder {
  font-weight: 800;
  color: #d97706;
}

.name-stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name-stack span {
  color: var(--admin-subtle);
  font-size: 12px;
}
</style>