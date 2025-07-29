<script setup lang="ts">
import BaseDataTable from '@/components/datatables/DataTableBase.vue'
import DataTableAction from '@/components/datatables/DataTableBaseWithAction.vue'
import { useEmployeeTable } from '@/modules/employee/composables/useEmployeeTable'
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
} = useEmployeeTable()

const columns = [
    { field: 'no', header: 'No' },
    { field: 'employeeCode', header: 'Employee Code' },
    { field: 'department', header: 'Department' },
    { field: 'position', header: 'Position' },
    { field: 'joinDate', header: 'Join Date' },
    { field: 'active', header: 'Active' },
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
            :onCreate="() => emit('edit', null)" :showCreate="true" labelCreate="Create Employee">

            <BaseDataTable :columns="columns" :data="data" :loading="loading" :page="page" :rows="rows"
                :totalRecords="totalRecords" :onPageChange="onPageChange" @edit-row="handleEdit"
                @delete-row="onRowDelete" :actionLabels="{ edit: 'Modify Role', delete: 'Remove Role' }" />

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
