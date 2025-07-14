<script setup lang="ts">
import BaseDataTable from '@/components/datatables/DataTableBase.vue'
import { usePermissionTable } from '@module/permission/composables/usePermissionTable'

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
        <div class="flex justify-between items-center">
            <InputText v-model="search" placeholder="Cari permission..." />
            <button class="btn btn-primary" @click="refresh">Refresh</button>
        </div>

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
    </div>
</template>
