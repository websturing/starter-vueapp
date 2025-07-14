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
    <DataTable :value="data" :loading="loading" showGridlines responsiveLayout="scroll">
        <template v-for="col in columns" :key="col.field">
            <Column :field="col.field" :header="col.header" />
        </template>
    </DataTable>

    <Paginator :rows="rows" :totalRecords="totalRecords" :first="page * rows" @page="onPageChange"
        :rowsPerPageOptions="rowsPerPageOptions" />
</template>
