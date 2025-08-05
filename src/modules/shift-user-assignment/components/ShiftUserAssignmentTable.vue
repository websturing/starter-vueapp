<template>
    <div>
        <div class="d-flex justify-content-between items-center align-items-center mb-2">
            <div>
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="search" placeholder="Search..." size="small" />
                </IconField>
            </div>
            <div class="d-flex gap-1 align-items-center">
                <Button label="Refresh" icon="pi pi-refresh" @click="refresh" severity="warn" size="small"
                    variant="text" />
                <RouterLink :to="{ name: 'assignments-create' }" class="p-button-sm p-button">
                    <i class="icon icon-file-add-3"></i>
                    Create Assignments
                </RouterLink>
            </div>
        </div>

        <BaseDataTable :columns="columns" :data="data" :loading="loading" :page="page" :rows="rows"
            :totalRecords="totalRecords" :onPageChange="onPageChange" @edit-row="handleEdit" @delete-row="onRowDelete"
            :actionLabels="{ edit: 'Modify Role', delete: 'Remove Role' }">

            <template #actions="{ data }">
                <div class="d-flex gap-2">
                    <Button icon="icon icon-launch-2" size="small" rounded v-tooltip.left="'Transfer Shift'" />
                    <Button icon="pi pi-trash" class="p-button-sm p-button-rounded p-button-danger"
                        @click="requireConfirmation($event, data)" v-tooltip.left="'Delete'" />
                </div>
            </template>
        </BaseDataTable>

    </div>
</template>
<script setup lang="ts">
import BaseDataTable from '@/components/datatables/DataTableBase.vue';
import { useShiftUserAssignmentDistribution } from "@module/shift-user-assignment/composables/useShiftUserAssignmentDistribution";
import { useShiftUserAssignmentTable } from '@module/shift-user-assignment/composables/useShiftUserAssignmentTable';
import { useShiftUserAssignment } from '@module/shift-user-assignment/composables/useShiftUserAssignmentView';
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue';

const confirm = useConfirm();
const requireConfirmation = (e: Event, data: any) => {
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
            label: 'Yes, Delete it',
            severity: 'danger',
        },
        accept: () => {
            e.stopPropagation();
            onRowDelete(data)
            fnfetchShift()
            fnfetchSUmmaryAssignments()
        },
        reject: () => {

        }
    })
}


const {
    fnfetchShift,
} = useShiftUserAssignmentDistribution()

const {
    fnfetchSUmmaryAssignments
} = useShiftUserAssignment()

const emit = defineEmits(['edit', 'create'])
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
} = useShiftUserAssignmentTable()

const columns = [
    { field: 'no', header: 'No' },
    { field: 'user', header: 'User' },
    { field: 'shift', header: 'Shift Name' },
    { field: 'time', header: 'Shift Time' },
    { field: 'dateStart', header: 'Start Date' },
    { field: 'dateEnd', header: 'End Date' },
    { field: 'actions', header: 'Actions' }
]

onMounted(async () => {
    await refresh()
})

function handleEdit(row: any) {
    emit('edit', row)
}
function handleCreate(row: any) {
    emit('create', row)
}

</script>