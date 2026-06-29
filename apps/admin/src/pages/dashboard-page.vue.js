import { computed, onMounted, reactive } from 'vue';
import { fetchDashboardStats } from '../api/dashboard';
const stats = reactive({
    totalUsers: 0,
    activeUsers: 0,
    totalRecords: 0,
    medalConfigs: 0,
    enabledMedals: 0,
    unlockedMedals: 0,
    totalFloors: 0,
    totalMeters: 0,
    recentUsers: [],
    recentRecords: [],
});
const metrics = computed(() => [
    { label: '用户总数', value: stats.totalUsers },
    { label: '活跃用户', value: stats.activeUsers },
    { label: '累计记录', value: stats.totalRecords },
    { label: '累计楼层', value: stats.totalFloors },
    { label: '累计米数', value: stats.totalMeters },
    { label: '已解锁勋章', value: stats.unlockedMedals },
]);
onMounted(async () => {
    Object.assign(stats, await fetchDashboardStats());
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['metric-card']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-card']} */ ;
/** @type {__VLS_StyleScopedClasses['section-card']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['two-column']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-grid']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "metric-grid" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.metrics))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({
        key: (item.label),
        ...{ class: "metric-card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (item.label);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (item.value);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "two-column" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "section-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
const __VLS_0 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    data: (__VLS_ctx.stats.recentUsers),
    border: true,
}));
const __VLS_2 = __VLS_1({
    data: (__VLS_ctx.stats.recentUsers),
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    prop: "nickname",
    label: "昵称",
}));
const __VLS_6 = __VLS_5({
    prop: "nickname",
    label: "昵称",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_8 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    prop: "openid",
    label: "OpenID",
}));
const __VLS_10 = __VLS_9({
    prop: "openid",
    label: "OpenID",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const __VLS_12 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    prop: "status",
    label: "状态",
}));
const __VLS_14 = __VLS_13({
    prop: "status",
    label: "状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "section-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
const __VLS_16 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    data: (__VLS_ctx.stats.recentRecords),
    border: true,
}));
const __VLS_18 = __VLS_17({
    data: (__VLS_ctx.stats.recentRecords),
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    prop: "meters",
    label: "米数",
}));
const __VLS_22 = __VLS_21({
    prop: "meters",
    label: "米数",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    prop: "floors",
    label: "楼层",
}));
const __VLS_26 = __VLS_25({
    prop: "floors",
    label: "楼层",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    prop: "source",
    label: "来源",
}));
const __VLS_30 = __VLS_29({
    prop: "source",
    label: "来源",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
var __VLS_19;
/** @type {__VLS_StyleScopedClasses['dashboard-page']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-card']} */ ;
/** @type {__VLS_StyleScopedClasses['two-column']} */ ;
/** @type {__VLS_StyleScopedClasses['section-card']} */ ;
/** @type {__VLS_StyleScopedClasses['section-card']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            stats: stats,
            metrics: metrics,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
