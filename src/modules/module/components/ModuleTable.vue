<script setup lang="ts">
import BaseDataTable from '@/components/datatables/DataTableBase.vue'
import DataTableAction from '@/components/datatables/DataTableBaseWithAction.vue'
import { useModuleTable } from '@/modules/module/composables/useModuleTable'
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
} = useModuleTable()

const columns = [
    { field: 'no', header: 'No' },
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
            </BaseDataTable>
        </DataTableAction>
    </div>
</template>
