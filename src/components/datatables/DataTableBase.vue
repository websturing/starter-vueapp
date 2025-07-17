<script setup lang="ts">
const props = withDefaults(defineProps<{
    columns: { field: string; header: string }[]
    data: any[]
    loading?: boolean
    totalRecords?: number
    page?: number
    rows?: number
    rowsPerPageOptions?: number[]
    onPageChange?: (e: any) => void
    actionLabels?: {
        edit?: string
        delete?: string
    }
}>(), {
    loading: false,
    page: 0,
    rows: 10,
    totalRecords: 0,
    rowsPerPageOptions: () => [5, 10, 20],
    actionLabels: () => ({
        edit: 'Edit',
        delete: 'Delete'
    })
})
import { useConfirm } from "primevue/useconfirm";
const emit = defineEmits(['delete-row', 'edit-row']);
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
            emit('delete-row', data);
        },
        reject: () => {

        }
    })
}

</script>

<template>
    <div class="datatable-wrapper">
        <DataTable :value="data" :loading="loading" :paginator="true" :rows="rows" :lazy="true" :first="page * rows"
            :totalRecords="totalRecords" :rowsPerPageOptions="rowsPerPageOptions" @page="onPageChange"
            responsiveLayout="scroll" dataKey="id" size="small">

            <template v-for="col in columns" :key="col.field">
                <Column v-if="col.field === 'no'" :header="col.header">
                    <template #body="slotProps">
                        {{ (page * rows) + slotProps.index + 1 }}
                    </template>
                </Column>
                <Column v-else-if="col.field === 'actions'" :header="col.header">
                    <template #body="slotProps">
                        <div class="d-flex gap-2">
                            <Button @click="$emit('edit-row', slotProps.data)" size="small" severity="info"
                                aria-label="edit" class="p-button-icon-only" icon="icon icon-edit-3"
                                v-tooltip.left="actionLabels.edit" rounded />
                            <Button @click="requireConfirmation($event, slotProps.data)" class="p-button-icon-only"
                                size="small" severity="danger" aria-label="delete" icon="icon icon-trash-can"
                                v-tooltip.left="actionLabels.delete" rounded />
                        </div>
                    </template>
                </Column>

                <Column v-else :field="col.field" :header="col.header" />
            </template>

            <template #loading>
                <div class="custom-loading-overlay">
                    <i class="pi pi-spinner pi-spin" style="font-size: 2rem; color: #00ff00;"></i>
                    <!-- Atau gunakan SVG/animasi CSS -->
                </div>
            </template>
        </DataTable>
    </div>
</template>
<style scoped>
.custom-loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}
</style>