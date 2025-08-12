<template>
    <div>
        <DataTableAction v-model:search="search" :onRefresh="refresh" :onPageChange="onPageChange"
            :onCreate="() => refresh" :showCreate="false" labelCreate="Create Shift">

            <BaseDataTable :columns="columns" :data="data" :loading="loading" :page="page" :rows="rows"
                :totalRecords="totalRecords" :onPageChange="onPageChange" @edit-row="handleEdit"
                @delete-row="onRowDelete" :actionLabels="{ edit: 'Modify Role', delete: 'Remove Role' }" />
        </DataTableAction>

    </div>
</template>
<script setup lang="ts">
import BaseDataTable from '@/components/datatables/DataTableBase.vue';
import DataTableAction from '@/components/datatables/DataTableBaseWithAction.vue';
import { useAttendanceTable } from '@module/attendance/composables/useAttendanceTable';
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
} = useAttendanceTable()

const columns = [
    { field: 'no', header: 'No' },
    { field: 'user', header: 'Employee Name' },
    { field: 'date', header: 'Date' },
    { field: 'checkIn', header: 'Check In' },
    { field: 'checkOut', header: 'Check Out' },
    { field: 'status', header: 'status' },
    { field: 'actions', header: 'actions' },
]

function handleEdit(row: any) {

}
function handleCreate(row: any) {

}

</script>