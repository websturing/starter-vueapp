<template>
    <div class="p-4">
        <form @submit.prevent="handleSubmit">
            <div class="d-flex flex-column gap-1 mb-3">
                <FloatLabel variant="on">
                    <InputText id="module_name" size="medium" :class="{ 'p-invalid': errors?.name }" v-model="name"
                        class="w-100" />
                    <label for="module_name">Full Name</label>
                </FloatLabel>
            </div>

            <div class="d-flex gap-2 mb-4">
                <FloatLabel variant="on" class="flex-grow-1">
                    <InputText id="slug_name" size="medium" :class="{ 'p-invalid': errors?.email }" v-model="email"
                        class="w-100" />
                    <label for="slug_name">Email</label>
                </FloatLabel>
                <FloatLabel variant="on" class="flex-grow-1">
                    <MultiSelect filter class="w-100" id="on_roles" :class="{ 'p-invalid': errors?.role_names }"
                        v-model="role_names" :options="roleData" optionLabel="name" optionValue="name"
                        placeholder="Select parent module" />
                    <label for="on_roles">On Label</label>
                </FloatLabel>
            </div>


            <div class="d-flex justify-end gap-2">
                <Button type="button" label="Reset" variant="text" severity="danger" @click="resetForm" />
                <Button type="submit" icon="icon icon-save-for-later-2"
                    :label="isEdit ? 'Apply Changes' : 'Create New'" />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useUserForm } from '@/modules/user/composables/useUserForm';

// Props
const props = defineProps<{
    initialData?: {
        id?: number
        name: string
        email: string,
        role_names: Array<string>
    }
}>()

const emit = defineEmits(['submitted'])

// Wrap submit dan emit di komponen Vue ini
const handleSubmit = async () => {
    await onSubmit()
    emit('submitted')

}


// Composable: create/edit tergantung props
const {
    name,
    email,
    role_names,
    roleData,
    errors,
    onSubmit,
    isEdit,
    resetForm
} = useUserForm(props.initialData)
</script>
