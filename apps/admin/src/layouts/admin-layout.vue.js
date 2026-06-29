import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminAuthStore } from '../stores/auth';
const route = useRoute();
const router = useRouter();
const auth = useAdminAuthStore();
const pageTitle = computed(() => {
    if (route.path.includes('medals'))
        return '勋章配置';
    if (route.path.includes('users'))
        return '小程序用户信息';
    return '统计主页';
});
function handleLogout() {
    auth.logout();
    router.push('/login');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['brand-title']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-shell']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElContainer;
/** @type {[typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "admin-shell" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "admin-shell" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({
    ...{ class: "sidebar glass-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "brand" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "brand-mark" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "brand-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "brand-subtitle" },
});
const __VLS_5 = {}.ElMenu;
/** @type {[typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    defaultActive: (__VLS_ctx.route.path),
    router: true,
    ...{ class: "menu" },
    backgroundColor: "transparent",
    textColor: "#1f2933",
    activeTextColor: "#0f766e",
}));
const __VLS_7 = __VLS_6({
    defaultActive: (__VLS_ctx.route.path),
    router: true,
    ...{ class: "menu" },
    backgroundColor: "transparent",
    textColor: "#1f2933",
    activeTextColor: "#0f766e",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.ElMenuItem;
/** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    index: "/dashboard",
}));
const __VLS_11 = __VLS_10({
    index: "/dashboard",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
var __VLS_12;
const __VLS_13 = {}.ElMenuItem;
/** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    index: "/medals",
}));
const __VLS_15 = __VLS_14({
    index: "/medals",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
var __VLS_16;
const __VLS_17 = {}.ElMenuItem;
/** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    index: "/users",
}));
const __VLS_19 = __VLS_18({
    index: "/users",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
var __VLS_20;
var __VLS_8;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sidebar-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.auth.username || 'su');
const __VLS_21 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ 'onClick': {} },
    type: "primary",
    plain: true,
    size: "small",
}));
const __VLS_23 = __VLS_22({
    ...{ 'onClick': {} },
    type: "primary",
    plain: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
let __VLS_25;
let __VLS_26;
let __VLS_27;
const __VLS_28 = {
    onClick: (__VLS_ctx.handleLogout)
};
__VLS_24.slots.default;
var __VLS_24;
const __VLS_29 = {}.ElContainer;
/** @type {[typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    ...{ class: "content-wrap" },
}));
const __VLS_31 = __VLS_30({
    ...{ class: "content-wrap" },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_32.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "page-header glass-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
(__VLS_ctx.pageTitle);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "content-panel glass-card" },
});
const __VLS_33 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({}));
const __VLS_35 = __VLS_34({}, ...__VLS_functionalComponentArgsRest(__VLS_34));
var __VLS_32;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['admin-shell']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['glass-card']} */ ;
/** @type {__VLS_StyleScopedClasses['brand']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-mark']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-title']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['glass-card']} */ ;
/** @type {__VLS_StyleScopedClasses['content-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['glass-card']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            route: route,
            auth: auth,
            pageTitle: pageTitle,
            handleLogout: handleLogout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
