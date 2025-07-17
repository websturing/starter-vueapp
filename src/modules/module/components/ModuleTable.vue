<script setup lang="ts">
import BaseDataTable from '@/components/datatables/DataTableBase.vue'
import DataTableAction from '@/components/datatables/DataTableBaseWithAction.vue'
import { useModuleTable } from '@/modules/module/composables/useModuleTable'
import { useRouter } from 'vue-router'

const emit = defineEmits(['edit', 'create'])
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
    { field: 'parent', header: 'parent' },
    { field: 'actions', header: 'actions' },
]


function handleEdit(row: any) {
    emit('edit', row)
}
function handleCreate(row: any) {
    emit('create', row)
}
</script>

<template>
    <div class="space-y-4">
        <DataTableAction v-model:search="search" :onRefresh="refresh" :onPageChange="onPageChange"
            :onCreate="() => emit('edit', null)" :showCreate="true" labelCreate="Create Permission">

            <BaseDataTable :columns="columns" :data="data" :loading="loading" :page="page" :rows="rows"
                :totalRecords="totalRecords" :onPageChange="onPageChange" @edit-row="handleEdit"
                @delete-row="onRowDelete" :actionLabels="{ edit: 'Modify Module', delete: 'Remove Module' }" />

        </DataTableAction>
    </div>
</template>
<style scoped>
::v-deep(.has-parent) {
    background-color: #f0f8ff;
    font-weight: bold;
}

::v-deep(.no-parent) {
    background-color: #fff7f7;
}
</style>
