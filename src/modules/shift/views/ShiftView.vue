<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-lg-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-body">
                        <DataTable @edit="handleEdit" />

                        <Dialog v-model:visible="showForm" modal :header="title" style="width: 70rem">
                            <RoleForm :initialData="initialData" @submitted="handleFormSubmitted" />
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import RoleForm from "@module/shift/components/ShiftForm.vue";
import DataTable from '@module/shift/components/ShiftTable.vue';
import { ref } from 'vue';

const initialData = ref<any | null>(null)
const showForm = ref(false)
const title = ref('New Shift')
function handleEdit(module: any) {
    initialData.value = module

    showForm.value = true
    if (module) {
        title.value = `Edit Role: ${module.name}`
    } else {
        initialData.value = null
        title.value = 'New Shift'
    }
}

function handleFormSubmitted() {
    showForm.value = false

}
</script>