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
                    optionValue="id" placeholder="Select parent permission" />
            </div>

            <pre>{{ parentId }}</pre>
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