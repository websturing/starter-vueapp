<template>
    <div>
        <DataTableModule @edit="handleEdit" @create="handleCreate" />
        <Dialog v-model:visible="showForm" modal header="Module Form">
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

function handleEdit(module: any) {
    selectedModule.value = module
    showForm.value = true
}

function handleCreate() {
    selectedModule.value = null // Form kosong
    showForm.value = true
}
</script>