<script setup lang="ts">
import { useDataTable } from '@/composables/useDataTable'
import { ref } from 'vue'

const dummyData = ref([
    { id: 1, name: 'Andi', role: 'Admin' },
    { id: 2, name: 'Yuni', role: 'User' },
    { id: 3, name: 'Uwais', role: 'Guest' },
    // ... data lainnya
])

const {
    search,
    page,
    rowsPerPage,
    paginatedData,
    totalRecords
} = useDataTable(dummyData.value)
</script>

<template>
    <div class="p-4 space-y-4">
        <div class="d-flex">
            <div>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-search"></i>
                    </InputGroupAddon>
                    <InputText v-model="search" placeholder="Search..." />
                </InputGroup>
            </div>
            <div></div>
        </div>

        <div class="datatable-wrapper mt-3">
            <DataTable :value="paginatedData" stripedRows responsiveLayout="scroll" class="custom-grid">
                <Column field="id" header="ID" />
                <Column field="name" header="Name" />
                <Column field="role" header="Role" />
            </DataTable>

            <Paginator :rows="rowsPerPage" :totalRecords="totalRecords" :first="page * rowsPerPage"
                @page="e => page = e.page" :rowsPerPageOptions="[5, 10, 20]" />
        </div>
    </div>
</template>
