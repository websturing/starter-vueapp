<template>
    <div>

        <div class="min-height-300 bg-dark position-absolute w-100"></div>
        <aside
            class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
            id="sidenav-main">
            <div class="sidenav-header">
                <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                    aria-hidden="true" id="iconSidenav"></i>
                <a class="navbar-brand m-0" href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html "
                    target="_blank">
                    <img src="../assets/img/logo-ct-dark.png" width="26px" height="26px" class="navbar-brand-img h-100"
                        alt="main_logo">
                    <span class="ms-1 font-weight-bold">{{ meta?.app_name || "Vue App" }}</span>
                </a>
            </div>
            <hr class="horizontal dark mt-0">
            <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul class="navbar-nav">
                    <template v-for="item in permissions || []" :key="item.id">
                        <li class="nav-item" v-if="item.children.length == 0">
                            <a :class="['nav-link', routeModules?.module === capitalize(item.slug) ? 'active' : '']"
                                :href="$router.resolve({ name: item.slug }).href"
                                @click.prevent="$router.push({ name: item.slug })">
                                <div
                                    class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i :class="[item.icon, 'text-dark text-sm opacity-10 icon']"></i>
                                </div>
                                <span class="nav-link-text ms-1">{{ item.name }}</span>
                            </a>
                        </li>
                    </template>
                    <template v-for="item in permissions || []" :key="item.id">
                        <!-- Header Item (hanya tampil jika punya children) -->
                        <li class="nav-item" v-if="item?.name && Array.isArray(item.children) && item.children.length">
                            <h6 class="ps-4 ms-2 text-sm opacity-6">
                                {{ item.name }}
                            </h6>
                        </li>

                        <!-- Children Items -->
                        <template v-if="Array.isArray(item?.children) && item.children.length">
                            <li class="nav-item" v-for="child in item.children || []" :key="child.id">
                                <a :class="['nav-link', routeModules?.module === capitalize(child?.slug) ? 'active' : '']"
                                    style="cursor:pointer"
                                    @click.prevent="child?.slug && $router.push({ name: child.slug })">
                                    <div
                                        class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                        <i :class="[child.icon, 'text-dark text-sm opacity-10 icon']"></i>
                                    </div>
                                    <span class="nav-link-text ms-1">
                                        {{ child?.name || 'Unnamed' }} <!-- Fallback text -->
                                    </span>
                                </a>
                            </li>
                        </template>
                    </template>
                </ul>
            </div>
            <div class="sidenav-footer mx-3 ">
                <a href="https://www.creative-tim.com/learning-lab/bootstrap/license/argon-dashboard" target="_blank"
                    class="btn btn-dark btn-sm w-100 mb-3">Documentation</a>
                <button class="btn btn-danger btn-sm mb-0 w-100" @click="confirm1()" type="button">Logout</button>
            </div>
        </aside>
        <main class="main-content position-relative border-radius-lg ">

            <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur"
                data-scroll="false">
                <div class="container-fluid py-1 px-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-white"
                                    href="javascript:;">Pages</a>
                            </li>
                            <li class="breadcrumb-item text-sm text-white active" aria-current="page">{{
                                routeModules?.module }}
                            </li>
                        </ol>
                        <h6 class="font-weight-bolder text-white mb-0">{{ routeModules?.module }}</h6>
                    </nav>
                    <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                            <div class="input-group">
                                <span class="input-group-text text-body"><i class="fas fa-search"
                                        aria-hidden="true"></i></span>
                                <input type="text" class="form-control" placeholder="Type here...">
                            </div>
                        </div>
                        <ul class="navbar-nav  justify-content-end">
                            <li class="nav-item d-flex align-items-center">
                                <a href="javascript:;" class="nav-link text-white font-weight-bold px-0">
                                    <i class="fa fa-user me-sm-1"></i>
                                    <span class="d-sm-inline d-none">{{ user?.email }}</span>
                                </a>
                            </li>
                            <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                                <a href="javascript:;" class="nav-link text-white p-0" id="iconNavbarSidenav">
                                    <div class="sidenav-toggler-inner">
                                        <i class="sidenav-toggler-line bg-white"></i>
                                        <i class="sidenav-toggler-line bg-white"></i>
                                        <i class="sidenav-toggler-line bg-white"></i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <router-view />
            <ConfirmDialog></ConfirmDialog>
        </main>

    </div>
</template>

<script setup lang="ts">
import { useAdminMenu } from '@/composables/useAdminMenu';
import { getModulesFromRoute } from '@/lib/routeParser';
import { useApplicationStore } from '@/stores/application';
import { useAuthStore } from '@/stores/auth';
import { push } from 'notivue';
import { storeToRefs } from 'pinia';
import { ConfirmDialog } from 'primevue';
import { useConfirm } from "primevue/useconfirm";
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const appStore = useApplicationStore();

const authStore = useAuthStore();
const confirm = useConfirm();
const route = useRoute();
const router = useRouter();

const routeModules = computed(() => getModulesFromRoute(route));
const { email, user } = storeToRefs(authStore)
const { meta } = storeToRefs(appStore)

const confirm1 = () => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Logout',
            severity: 'danger',
        },
        accept: async () => {
            const notification = push.promise("Working on it...")
            try {
                await authStore.logout();
                await new Promise(resolve => setTimeout(resolve, 1200))
                await Promise.all([
                    notification.resolve({
                        message: `Logout successful.`,
                    }),
                    window.location.reload()
                ])
            } catch (error: any) {
                console.error(error)
                const message = error?.response?.data?.message || 'Invalid credentials, please try again.'

                notification.reject({
                    message,
                })
            }

        },
        reject: () => {

        }
    });
};

onMounted(() => {
    appStore.fetchAppMeta()
})

const {
    permissions
} = useAdminMenu()

function capitalize(str: string) {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

</script>
