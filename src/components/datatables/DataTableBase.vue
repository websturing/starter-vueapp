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
}>(), {
    loading: false,
    page: 0,
    rows: 10,
    totalRecords: 0,
    rowsPerPageOptions: () => [5, 10, 20]
})

</script>

<template>
    <div class="datatable-wrapper">

        <DataTable :value="data" :loading="loading" responsiveLayout="scroll" size="small">
            <template v-for="col in columns" :key="col.field">
                <Column :field="col.field" :header="col.header" />
            </template>
            <template #loading>
                <div class="custom-loading-overlay">
                    <i class="pi pi-spinner pi-spin" style="font-size: 2rem; color: #00ff00;"></i>
                    <!-- Atau gunakan SVG/animasi CSS -->
                </div>
            </template>
        </DataTable>

        <Paginator :rows="rows" :totalRecords="totalRecords" :first="page * rows" @page="onPageChange"
            :rowsPerPageOptions="rowsPerPageOptions" />
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