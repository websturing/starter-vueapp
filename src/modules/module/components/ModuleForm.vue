<template>
    <div class="p-4">
        <form @submit.prevent="onSubmit">
            <div class="d-flex flex-column gap-1 mb-3">
                <FloatLabel variant="on">
                    <InputText id="module_name" size="medium" :class="{ 'p-invalid': errors?.name }"
                        v-model="moduleName" class="w-100" />
                    <label for="module_name">Module Name</label>
                </FloatLabel>
            </div>

            <div class="d-flex gap-2 mb-4">
                <FloatLabel variant="on">
                    <InputText id="slug_name" size="medium" :class="{ 'p-invalid': errors?.slug }" v-model="slugName"
                        class="w-100" />
                    <label for="slug_name">Slug Name</label>
                </FloatLabel>

                <ToggleButton v-model="isParent" class="w-24" onLabel="Select Parent" offLabel="Has Parent?"
                    size="small" />

                <Select v-if="isParent" size="medium" v-model="parentId" :options="parentData" optionLabel="name"
                    optionValue="id" placeholder="Select parent module" />
            </div>

            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="resetForm" />
                <Button type="submit" :label="isEdit ? 'Update' : 'Save'" />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useModuleForm } from '@/modules/module/composables/useModuleForm';

// Props
const props = defineProps<{
    initialData?: {
        id?: number
        name: string
        slug: string
        parent_id?: number | null
    }
}>()

// Composable: create/edit tergantung props
const {
    name: moduleName,
    slug: slugName,
    isParent,
    parentId,
    parentData,
    errors,
    onSubmit,
    isEdit,
    resetForm
} = useModuleForm(props.initialData)
</script>
