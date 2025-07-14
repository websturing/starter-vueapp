<script setup lang="ts">
import BaseDataTable from '@/components/datatables/DataTableBase.vue'
import DataTableAction from '@/components/datatables/DataTableBaseWithAction.vue'
import { usePermissionTable } from '@module/permission/composables/usePermissionTable'
import { useRouter } from 'vue-router'

const router = useRouter()
const {
    search,
    page,
    rows,
    data,
    totalRecords,
    loading,
    refresh
} = usePermissionTable()

const columns = [
    { field: 'name', header: 'Module Name' },
    { field: 'slug', header: 'Slug' },
]
</script>

<template>
    <div class="space-y-4">
        <DataTableAction :search="search" :onSearch="val => search = val" :onRefresh="refresh"
            :onCreate="() => router.push('/users/create')" :showCreate="true" :labelCreate="'Create Permission'">

            <BaseDataTable :columns="columns" :data="data" :loading="loading" :page="page" :rows="rows"
                :totalRecords="totalRecords" :onPageChange="e => page = e.page">
                <template #row="slotProps">
                    <tr>
                        <td>{{ slotProps.data.name }}</td>
                        <td>{{ slotProps.data.slug }}</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <ul class="pl-4 text-sm text-gray-500 list-disc">
                                <li v-for="perm in slotProps.data.permissions" :key="perm.permission_name">
                                    {{ perm.action }} – {{ perm.permission_name }}
                                </li>
                            </ul>
                        </td>
                    </tr>
                </template>
            </BaseDataTable>
        </DataTableAction>
    </div>
</template>
