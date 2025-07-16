<template>
    <div class="p-4">
        <form @submit.prevent="onSubmit">
            <div class="d-flex flex-column gap-1 mb-3">
                <FloatLabel variant="on">
                    <InputText id="over_label" size="medium" :class="{ 'p-invalid': errors?.name }" v-model="moduleName"
                        class="w-100" />
                    <label for="over_label">Module Name</label>
                </FloatLabel>
            </div>
            <div class="d-flex gap-2 mb-4">
                <FloatLabel variant="on">
                    <InputText id="over_label" size="medium" :class="{ 'p-invalid': errors?.slug }" v-model="slugName"
                        class="w-100" />
                    <label for="over_label">Slug Name</label>
                </FloatLabel>
                <ToggleButton v-model="isParent" class="w-24" onLabel="Select Parent" offLabel="Has Parent ?"
                    size="small" />

                <Select v-if="isParent" size="medium" v-model="parentId" :options="parentData" optionLabel="name"
                    placeholder="Select parent permission" />
            </div>

            <p class="text-muted">Manage Permission</p>
            <div class="d-flex flex-wrap gap-3 mb-4">
                <div class="d-flex items-center gap-2">
                    <Checkbox v-model="read" inputId="view" name="read" binary />
                    <label for="view"> View </label>
                </div>
                <div class="d-flex items-center gap-2">
                    <Checkbox v-model="create" inputId="create" name="create" binary />
                    <label for="create"> Create </label>
                </div>
                <div class="d-flex items-center gap-2">
                    <Checkbox v-model="update" inputId="update" name="update" binary />
                    <label for="update"> Update </label>
                </div>
                <div class="d-flex items-center gap-2">
                    <Checkbox v-model="deleteAction" inputId="deleteAction" name="deleteAction" binary />
                    <label for="deleteAction"> Delete </label>
                </div>
                <div class="d-flex items-center gap-2">
                    <Checkbox v-model="upload" inputId="upload" name="upload" binary />
                    <label for="upload"> Upload </label>
                </div>
                <div class="d-flex items-center gap-2">
                    <Checkbox v-model="download" inputId="download" name="download" binary />
                    <label for="download"> Download </label>
                </div>
            </div>

            <pre>
            {{ JSON.stringify({
                moduleName,
                slugName,
                isParent,
                parentId,
                permissions: {
                    read,
                    create,
                    update,
                    deleteAction,
                    upload,
                    download
                },
                errors
            }, null, 2) }}
        </pre>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary"></Button>
                <Button type="submit" label="Save"></Button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useModuleForm } from '@/modules/module/composables/useModuleForm';
import { ref } from 'vue';
const {
    name: moduleName,
    slug: slugName,
    isParent,
    parentData,
    parentId,
    create,
    update,
    read,
    deleteAction,
    upload,
    download,
    errors,
    onSubmit
} = useModuleForm();

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const visible = ref(false);

</script>