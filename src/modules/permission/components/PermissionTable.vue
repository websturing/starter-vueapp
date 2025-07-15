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
    onPageChange,
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
            :onPageChange="onPageChange" :onCreate="() => router.push('/users/create')" :showCreate="true"
            :labelCreate="'Create Permission'">

            <BaseDataTable :columns="columns" :data="data" :loading="loading" :page="page" :rows="rows"
                :totalRecords="totalRecords" :onPageChange="onPageChange">
                <template #row="slotProps">
                    <tr>
                        <td>{{ (page * rows) + slotProps.index + 1 }}</td>
                        <td>{{ slotProps.data.slug }}</td>
                    </tr>
                </template>
            </BaseDataTable>
        </DataTableAction>
    </div>
</template>
