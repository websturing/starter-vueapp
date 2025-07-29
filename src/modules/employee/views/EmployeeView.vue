<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-lg-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-body">
                        <DataTable @edit="handleEdit" />

                        <Dialog v-model:visible="showForm" modal :header="title" style="width: 70rem">
                            <Form :initialData="initialData" @submitted="handleFormSubmitted" />
                        </Dialog>

                        <!-- <Form :initialData="initialData" @submitted="handleFormSubmitted" /> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Form from '@module/employee/components/EmployeeForm.vue';
import DataTable from '@module/employee/components/EmployeeTable.vue';
import { ref } from 'vue';

const initialData = ref<any | null>(null)
const showForm = ref(false)
const title = ref('New Shift')
function handleEdit(module: any) {
    initialData.value = module

    showForm.value = true
    if (module) {
        title.value = `Edit Employee: ${module.name}`
    } else {
        initialData.value = null
        title.value = 'New Employee'
    }
}

function handleFormSubmitted() {
    showForm.value = false

}
</script>