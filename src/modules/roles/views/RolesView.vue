<template>
    <div>
        <DataTable @edit="handleEdit" />

        <Dialog v-model:visible="showForm" modal :header="title" style="width: 70rem">
            <RoleForm :initialData="initialData" @submitted="handleFormSubmitted" />
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import DataTable from '@/modules/roles/components/RolesTable.vue';
import RoleForm from "@module/roles/components/RolesForm.vue";
import { ref } from 'vue';

const initialData = ref<any | null>(null)
const showForm = ref(false)
const title = ref('New Role')
function handleEdit(module: any) {
   initialData.value = module
  
   showForm.value = true
    if (module) {
        title.value = `Edit Role: ${module.name}`
    } else {
        initialData.value = null
        title.value = 'New Role'
    }
}

function handleFormSubmitted() {
  showForm.value = false
  
}
</script>