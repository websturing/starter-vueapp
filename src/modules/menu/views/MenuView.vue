<template>
    <div>
        <DataTableModule @edit="handleEdit" />


        <Dialog v-model:visible="showForm" modal :header="title" style="width: 50rem">
            <FormModule :initialData="selectedModule" @close="showForm = false" />
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import FormModule from '@/modules/module/components/ModuleForm.vue';
import DataTableModule from '@/modules/module/components/ModuleTable.vue';
import { ref } from 'vue';

const showForm = ref(false)
const selectedModule = ref<any | null>(null)
const title = ref('New Module')
function handleEdit(module: any) {
    selectedModule.value = module
    showForm.value = true

    if (module) {
        title.value = `Edit Module: ${module.name}`
    } else {
        selectedModule.value = null
        title.value = 'New Module'
    }
}

</script>