import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { createAdminMedal, deleteAdminMedal, fetchAdminMedalDetail, fetchAdminMedals, updateAdminMedal } from '../api/medals';
const keyword = ref('');
const loading = ref(false);
const saving = ref(false);
const dialogVisible = ref(false);
const isEditing = ref(false);
const editId = ref('');
const formRef = ref();
const rows = ref([]);
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
const rules = {
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
function hydrateForm(data) {
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
    }
    finally {
        loading.value = false;
    }
}
function openCreateDialog() {
    isEditing.value = false;
    editId.value = '';
    resetForm();
    dialogVisible.value = true;
}
async function openEditDialog(row) {
    isEditing.value = true;
    editId.value = String(row.medalId ?? row._id ?? '');
    resetForm();
    if (editId.value) {
        const detail = await fetchAdminMedalDetail(editId.value);
        hydrateForm(detail);
    }
    else {
        hydrateForm(row);
    }
    dialogVisible.value = true;
}
function viewDetail(row) {
    const shortName = row.shortName || row.name || '未命名';
    ElMessageBox.alert(`短名称：${shortName}\n完整名称：${row.name ?? '-'}\n标识：${row.medalKey ?? '-'}\n说明：${row.description ?? '-'}\n图标：${row.iconImage ?? '-'}\n背景：${row.backgroundImage ?? '-'}\n动画：${row.animationPreset ?? '-'} / ${row.animationDuration ?? '-'}ms`, '勋章详情', { confirmButtonText: '关闭', dangerouslyUseHTMLString: false }).catch(() => undefined);
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
        }
        else {
            await createAdminMedal(payload);
            ElMessage.success('勋章已创建');
        }
        dialogVisible.value = false;
        await loadData();
    }
    finally {
        saving.value = false;
    }
}
async function handleDelete(row) {
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['medal-preview']} */ ;
/** @type {__VLS_StyleScopedClasses['name-stack']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-stack" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toolbar" },
});
const __VLS_0 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.keyword),
    placeholder: "搜索勋章名称、短名称或标识",
    clearable: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.keyword),
    placeholder: "搜索勋章名称、短名称或标识",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onKeyup: (__VLS_ctx.loadData)
};
var __VLS_3;
const __VLS_8 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.openCreateDialog)
};
__VLS_11.slots.default;
var __VLS_11;
const __VLS_16 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.loadData)
};
__VLS_19.slots.default;
var __VLS_19;
const __VLS_24 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    data: (__VLS_ctx.rows),
    border: true,
}));
const __VLS_26 = __VLS_25({
    data: (__VLS_ctx.rows),
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_27.slots.default;
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "预览",
    width: "120",
}));
const __VLS_30 = __VLS_29({
    label: "预览",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_31.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "medal-preview" },
    });
    if (scope.row.iconImage) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (scope.row.iconImage),
            alt: "勋章图标",
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "medal-preview-placeholder" },
        });
        (scope.row.starLevel);
    }
}
var __VLS_31;
const __VLS_32 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    label: "名称",
}));
const __VLS_34 = __VLS_33({
    label: "名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_35.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "name-stack" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (scope.row.shortName || scope.row.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (scope.row.name);
}
var __VLS_35;
const __VLS_36 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    prop: "medalKey",
    label: "标识",
}));
const __VLS_38 = __VLS_37({
    prop: "medalKey",
    label: "标识",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const __VLS_40 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    prop: "starLevel",
    label: "星级",
    width: "100",
}));
const __VLS_42 = __VLS_41({
    prop: "starLevel",
    label: "星级",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const __VLS_44 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    prop: "unlockMeters",
    label: "解锁米数",
    width: "120",
}));
const __VLS_46 = __VLS_45({
    prop: "unlockMeters",
    label: "解锁米数",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
const __VLS_48 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    prop: "animationPreset",
    label: "动画",
    width: "110",
}));
const __VLS_50 = __VLS_49({
    prop: "animationPreset",
    label: "动画",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
const __VLS_52 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    prop: "status",
    label: "状态",
    width: "100",
}));
const __VLS_54 = __VLS_53({
    prop: "status",
    label: "状态",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
const __VLS_56 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    label: "操作",
    width: "220",
    fixed: "right",
}));
const __VLS_58 = __VLS_57({
    label: "操作",
    width: "220",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_59.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_60 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
    }));
    const __VLS_62 = __VLS_61({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    let __VLS_64;
    let __VLS_65;
    let __VLS_66;
    const __VLS_67 = {
        onClick: (...[$event]) => {
            __VLS_ctx.openEditDialog(scope.row);
        }
    };
    __VLS_63.slots.default;
    var __VLS_63;
    const __VLS_68 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
    }));
    const __VLS_70 = __VLS_69({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    let __VLS_72;
    let __VLS_73;
    let __VLS_74;
    const __VLS_75 = {
        onClick: (...[$event]) => {
            __VLS_ctx.viewDetail(scope.row);
        }
    };
    __VLS_71.slots.default;
    var __VLS_71;
    const __VLS_76 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
    }));
    const __VLS_78 = __VLS_77({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    let __VLS_80;
    let __VLS_81;
    let __VLS_82;
    const __VLS_83 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(scope.row);
        }
    };
    __VLS_79.slots.default;
    var __VLS_79;
}
var __VLS_59;
var __VLS_27;
const __VLS_84 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.dialogTitle),
    width: "760px",
    destroyOnClose: true,
}));
const __VLS_86 = __VLS_85({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.dialogTitle),
    width: "760px",
    destroyOnClose: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
__VLS_87.slots.default;
const __VLS_88 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "110px",
}));
const __VLS_90 = __VLS_89({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "110px",
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_92 = {};
__VLS_91.slots.default;
const __VLS_94 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    gutter: (16),
}));
const __VLS_96 = __VLS_95({
    gutter: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
__VLS_97.slots.default;
const __VLS_98 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    span: (12),
}));
const __VLS_100 = __VLS_99({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
__VLS_101.slots.default;
const __VLS_102 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    label: "勋章标识",
    prop: "medalKey",
}));
const __VLS_104 = __VLS_103({
    label: "勋章标识",
    prop: "medalKey",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
__VLS_105.slots.default;
const __VLS_106 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
    modelValue: (__VLS_ctx.form.medalKey),
    placeholder: "如 stair-master",
    disabled: (__VLS_ctx.isEditing),
}));
const __VLS_108 = __VLS_107({
    modelValue: (__VLS_ctx.form.medalKey),
    placeholder: "如 stair-master",
    disabled: (__VLS_ctx.isEditing),
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
var __VLS_105;
var __VLS_101;
const __VLS_110 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    span: (12),
}));
const __VLS_112 = __VLS_111({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
__VLS_113.slots.default;
const __VLS_114 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
    label: "短名称",
    prop: "shortName",
}));
const __VLS_116 = __VLS_115({
    label: "短名称",
    prop: "shortName",
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
__VLS_117.slots.default;
const __VLS_118 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
    modelValue: (__VLS_ctx.form.shortName),
    placeholder: "卡片上展示的短名称",
}));
const __VLS_120 = __VLS_119({
    modelValue: (__VLS_ctx.form.shortName),
    placeholder: "卡片上展示的短名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
var __VLS_117;
var __VLS_113;
const __VLS_122 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
    span: (12),
}));
const __VLS_124 = __VLS_123({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
__VLS_125.slots.default;
const __VLS_126 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
    label: "名称",
    prop: "name",
}));
const __VLS_128 = __VLS_127({
    label: "名称",
    prop: "name",
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
__VLS_129.slots.default;
const __VLS_130 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
    modelValue: (__VLS_ctx.form.name),
    placeholder: "完整名称",
}));
const __VLS_132 = __VLS_131({
    modelValue: (__VLS_ctx.form.name),
    placeholder: "完整名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
var __VLS_129;
var __VLS_125;
const __VLS_134 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
    span: (12),
}));
const __VLS_136 = __VLS_135({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_135));
__VLS_137.slots.default;
const __VLS_138 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    label: "星级",
    prop: "starLevel",
}));
const __VLS_140 = __VLS_139({
    label: "星级",
    prop: "starLevel",
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
__VLS_141.slots.default;
const __VLS_142 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({
    modelValue: (__VLS_ctx.form.starLevel),
    ...{ style: {} },
}));
const __VLS_144 = __VLS_143({
    modelValue: (__VLS_ctx.form.starLevel),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
__VLS_145.slots.default;
const __VLS_146 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
    value: (1),
    label: "1 星",
}));
const __VLS_148 = __VLS_147({
    value: (1),
    label: "1 星",
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
const __VLS_150 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({
    value: (2),
    label: "2 星",
}));
const __VLS_152 = __VLS_151({
    value: (2),
    label: "2 星",
}, ...__VLS_functionalComponentArgsRest(__VLS_151));
const __VLS_154 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
    value: (3),
    label: "3 星",
}));
const __VLS_156 = __VLS_155({
    value: (3),
    label: "3 星",
}, ...__VLS_functionalComponentArgsRest(__VLS_155));
var __VLS_145;
var __VLS_141;
var __VLS_137;
const __VLS_158 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
    span: (24),
}));
const __VLS_160 = __VLS_159({
    span: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_159));
__VLS_161.slots.default;
const __VLS_162 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent(__VLS_162, new __VLS_162({
    label: "详细说明",
    prop: "description",
}));
const __VLS_164 = __VLS_163({
    label: "详细说明",
    prop: "description",
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
__VLS_165.slots.default;
const __VLS_166 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
    modelValue: (__VLS_ctx.form.description),
    type: "textarea",
    rows: (4),
    placeholder: "详细描述勋章的达成条件和展示文案",
}));
const __VLS_168 = __VLS_167({
    modelValue: (__VLS_ctx.form.description),
    type: "textarea",
    rows: (4),
    placeholder: "详细描述勋章的达成条件和展示文案",
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
var __VLS_165;
var __VLS_161;
const __VLS_170 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_171 = __VLS_asFunctionalComponent(__VLS_170, new __VLS_170({
    span: (12),
}));
const __VLS_172 = __VLS_171({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_171));
__VLS_173.slots.default;
const __VLS_174 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({
    label: "图标地址",
    prop: "iconImage",
}));
const __VLS_176 = __VLS_175({
    label: "图标地址",
    prop: "iconImage",
}, ...__VLS_functionalComponentArgsRest(__VLS_175));
__VLS_177.slots.default;
const __VLS_178 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_179 = __VLS_asFunctionalComponent(__VLS_178, new __VLS_178({
    modelValue: (__VLS_ctx.form.iconImage),
    placeholder: "https://...",
}));
const __VLS_180 = __VLS_179({
    modelValue: (__VLS_ctx.form.iconImage),
    placeholder: "https://...",
}, ...__VLS_functionalComponentArgsRest(__VLS_179));
var __VLS_177;
var __VLS_173;
const __VLS_182 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_183 = __VLS_asFunctionalComponent(__VLS_182, new __VLS_182({
    span: (12),
}));
const __VLS_184 = __VLS_183({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_183));
__VLS_185.slots.default;
const __VLS_186 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({
    label: "背景地址",
    prop: "backgroundImage",
}));
const __VLS_188 = __VLS_187({
    label: "背景地址",
    prop: "backgroundImage",
}, ...__VLS_functionalComponentArgsRest(__VLS_187));
__VLS_189.slots.default;
const __VLS_190 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_191 = __VLS_asFunctionalComponent(__VLS_190, new __VLS_190({
    modelValue: (__VLS_ctx.form.backgroundImage),
    placeholder: "详情页大图地址",
}));
const __VLS_192 = __VLS_191({
    modelValue: (__VLS_ctx.form.backgroundImage),
    placeholder: "详情页大图地址",
}, ...__VLS_functionalComponentArgsRest(__VLS_191));
var __VLS_189;
var __VLS_185;
const __VLS_194 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_195 = __VLS_asFunctionalComponent(__VLS_194, new __VLS_194({
    span: (12),
}));
const __VLS_196 = __VLS_195({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_195));
__VLS_197.slots.default;
const __VLS_198 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_199 = __VLS_asFunctionalComponent(__VLS_198, new __VLS_198({
    label: "动画预设",
    prop: "animationPreset",
}));
const __VLS_200 = __VLS_199({
    label: "动画预设",
    prop: "animationPreset",
}, ...__VLS_functionalComponentArgsRest(__VLS_199));
__VLS_201.slots.default;
const __VLS_202 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_203 = __VLS_asFunctionalComponent(__VLS_202, new __VLS_202({
    modelValue: (__VLS_ctx.form.animationPreset),
    ...{ style: {} },
}));
const __VLS_204 = __VLS_203({
    modelValue: (__VLS_ctx.form.animationPreset),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_203));
__VLS_205.slots.default;
const __VLS_206 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({
    label: "sparkle",
    value: "sparkle",
}));
const __VLS_208 = __VLS_207({
    label: "sparkle",
    value: "sparkle",
}, ...__VLS_functionalComponentArgsRest(__VLS_207));
const __VLS_210 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_211 = __VLS_asFunctionalComponent(__VLS_210, new __VLS_210({
    label: "glow",
    value: "glow",
}));
const __VLS_212 = __VLS_211({
    label: "glow",
    value: "glow",
}, ...__VLS_functionalComponentArgsRest(__VLS_211));
const __VLS_214 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_215 = __VLS_asFunctionalComponent(__VLS_214, new __VLS_214({
    label: "float",
    value: "float",
}));
const __VLS_216 = __VLS_215({
    label: "float",
    value: "float",
}, ...__VLS_functionalComponentArgsRest(__VLS_215));
const __VLS_218 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_219 = __VLS_asFunctionalComponent(__VLS_218, new __VLS_218({
    label: "pulse",
    value: "pulse",
}));
const __VLS_220 = __VLS_219({
    label: "pulse",
    value: "pulse",
}, ...__VLS_functionalComponentArgsRest(__VLS_219));
var __VLS_205;
var __VLS_201;
var __VLS_197;
const __VLS_222 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_223 = __VLS_asFunctionalComponent(__VLS_222, new __VLS_222({
    span: (12),
}));
const __VLS_224 = __VLS_223({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_223));
__VLS_225.slots.default;
const __VLS_226 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_227 = __VLS_asFunctionalComponent(__VLS_226, new __VLS_226({
    label: "动画时长(ms)",
    prop: "animationDuration",
}));
const __VLS_228 = __VLS_227({
    label: "动画时长(ms)",
    prop: "animationDuration",
}, ...__VLS_functionalComponentArgsRest(__VLS_227));
__VLS_229.slots.default;
const __VLS_230 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_231 = __VLS_asFunctionalComponent(__VLS_230, new __VLS_230({
    modelValue: (__VLS_ctx.form.animationDuration),
    min: (300),
    max: (10000),
    step: (100),
    ...{ style: {} },
}));
const __VLS_232 = __VLS_231({
    modelValue: (__VLS_ctx.form.animationDuration),
    min: (300),
    max: (10000),
    step: (100),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_231));
var __VLS_229;
var __VLS_225;
const __VLS_234 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_235 = __VLS_asFunctionalComponent(__VLS_234, new __VLS_234({
    span: (12),
}));
const __VLS_236 = __VLS_235({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_235));
__VLS_237.slots.default;
const __VLS_238 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_239 = __VLS_asFunctionalComponent(__VLS_238, new __VLS_238({
    label: "解锁米数",
    prop: "unlockMeters",
}));
const __VLS_240 = __VLS_239({
    label: "解锁米数",
    prop: "unlockMeters",
}, ...__VLS_functionalComponentArgsRest(__VLS_239));
__VLS_241.slots.default;
const __VLS_242 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_243 = __VLS_asFunctionalComponent(__VLS_242, new __VLS_242({
    modelValue: (__VLS_ctx.form.unlockMeters),
    min: (0),
    step: (50),
    ...{ style: {} },
}));
const __VLS_244 = __VLS_243({
    modelValue: (__VLS_ctx.form.unlockMeters),
    min: (0),
    step: (50),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_243));
var __VLS_241;
var __VLS_237;
const __VLS_246 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_247 = __VLS_asFunctionalComponent(__VLS_246, new __VLS_246({
    span: (12),
}));
const __VLS_248 = __VLS_247({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_247));
__VLS_249.slots.default;
const __VLS_250 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_251 = __VLS_asFunctionalComponent(__VLS_250, new __VLS_250({
    label: "基础米数",
    prop: "baseMeters",
}));
const __VLS_252 = __VLS_251({
    label: "基础米数",
    prop: "baseMeters",
}, ...__VLS_functionalComponentArgsRest(__VLS_251));
__VLS_253.slots.default;
const __VLS_254 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_255 = __VLS_asFunctionalComponent(__VLS_254, new __VLS_254({
    modelValue: (__VLS_ctx.form.baseMeters),
    min: (0),
    step: (50),
    ...{ style: {} },
}));
const __VLS_256 = __VLS_255({
    modelValue: (__VLS_ctx.form.baseMeters),
    min: (0),
    step: (50),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_255));
var __VLS_253;
var __VLS_249;
const __VLS_258 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_259 = __VLS_asFunctionalComponent(__VLS_258, new __VLS_258({
    span: (12),
}));
const __VLS_260 = __VLS_259({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_259));
__VLS_261.slots.default;
const __VLS_262 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_263 = __VLS_asFunctionalComponent(__VLS_262, new __VLS_262({
    label: "排序",
    prop: "sortOrder",
}));
const __VLS_264 = __VLS_263({
    label: "排序",
    prop: "sortOrder",
}, ...__VLS_functionalComponentArgsRest(__VLS_263));
__VLS_265.slots.default;
const __VLS_266 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_267 = __VLS_asFunctionalComponent(__VLS_266, new __VLS_266({
    modelValue: (__VLS_ctx.form.sortOrder),
    min: (0),
    step: (1),
    ...{ style: {} },
}));
const __VLS_268 = __VLS_267({
    modelValue: (__VLS_ctx.form.sortOrder),
    min: (0),
    step: (1),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_267));
var __VLS_265;
var __VLS_261;
const __VLS_270 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_271 = __VLS_asFunctionalComponent(__VLS_270, new __VLS_270({
    span: (12),
}));
const __VLS_272 = __VLS_271({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_271));
__VLS_273.slots.default;
const __VLS_274 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_275 = __VLS_asFunctionalComponent(__VLS_274, new __VLS_274({
    label: "状态",
    prop: "status",
}));
const __VLS_276 = __VLS_275({
    label: "状态",
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_275));
__VLS_277.slots.default;
const __VLS_278 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_279 = __VLS_asFunctionalComponent(__VLS_278, new __VLS_278({
    modelValue: (__VLS_ctx.form.status),
    ...{ style: {} },
}));
const __VLS_280 = __VLS_279({
    modelValue: (__VLS_ctx.form.status),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_279));
__VLS_281.slots.default;
const __VLS_282 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_283 = __VLS_asFunctionalComponent(__VLS_282, new __VLS_282({
    label: "启用",
    value: "enabled",
}));
const __VLS_284 = __VLS_283({
    label: "启用",
    value: "enabled",
}, ...__VLS_functionalComponentArgsRest(__VLS_283));
const __VLS_286 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_287 = __VLS_asFunctionalComponent(__VLS_286, new __VLS_286({
    label: "停用",
    value: "disabled",
}));
const __VLS_288 = __VLS_287({
    label: "停用",
    value: "disabled",
}, ...__VLS_functionalComponentArgsRest(__VLS_287));
var __VLS_281;
var __VLS_277;
var __VLS_273;
var __VLS_97;
var __VLS_91;
{
    const { footer: __VLS_thisSlot } = __VLS_87.slots;
    const __VLS_290 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_291 = __VLS_asFunctionalComponent(__VLS_290, new __VLS_290({
        ...{ 'onClick': {} },
    }));
    const __VLS_292 = __VLS_291({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_291));
    let __VLS_294;
    let __VLS_295;
    let __VLS_296;
    const __VLS_297 = {
        onClick: (...[$event]) => {
            __VLS_ctx.dialogVisible = false;
        }
    };
    __VLS_293.slots.default;
    var __VLS_293;
    const __VLS_298 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_299 = __VLS_asFunctionalComponent(__VLS_298, new __VLS_298({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.saving),
    }));
    const __VLS_300 = __VLS_299({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.saving),
    }, ...__VLS_functionalComponentArgsRest(__VLS_299));
    let __VLS_302;
    let __VLS_303;
    let __VLS_304;
    const __VLS_305 = {
        onClick: (__VLS_ctx.submitForm)
    };
    __VLS_301.slots.default;
    var __VLS_301;
}
var __VLS_87;
/** @type {__VLS_StyleScopedClasses['page-stack']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['medal-preview']} */ ;
/** @type {__VLS_StyleScopedClasses['medal-preview-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['name-stack']} */ ;
// @ts-ignore
var __VLS_93 = __VLS_92;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            keyword: keyword,
            loading: loading,
            saving: saving,
            dialogVisible: dialogVisible,
            isEditing: isEditing,
            formRef: formRef,
            rows: rows,
            form: form,
            rules: rules,
            dialogTitle: dialogTitle,
            loadData: loadData,
            openCreateDialog: openCreateDialog,
            openEditDialog: openEditDialog,
            viewDetail: viewDetail,
            submitForm: submitForm,
            handleDelete: handleDelete,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
