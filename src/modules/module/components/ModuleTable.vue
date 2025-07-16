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
    refresh,
    onRowEdit,
    onRowDelete,
} = useModuleTable()

const columns = [
    { field: 'no', header: 'No' },
    { field: 'name', header: 'Module Name' },
    { field: 'slug', header: 'Slug' },
    { field: 'actions', header: 'actions' },
]
</script>

<template>
    <div class="space-y-4">
        <DataTableAction v-model:search="search" :onRefresh="refresh" :onPageChange="onPageChange"
            :onCreate="() => router.push('/users/create')" :showCreate="true" labelCreate="Create Permission">

            <BaseDataTable :columns="columns" :data="data" :loading="loading" :page="page" :rows="rows"
                :totalRecords="totalRecords" :onPageChange="onPageChange" @edit-row="onRowEdit"
                @delete-row="onRowDelete" :actionLabels="{ edit: 'Modify Module', delete: 'Remove Module' }" />

        </DataTableAction>
    </div>
</template>
