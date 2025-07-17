<template>
    <div class="p-4">
        <form @submit.prevent="onSubmit">
            <div class="d-flex flex-column gap-1 mb-3">
                <FloatLabel variant="on">
                    <InputText id="module_name" size="medium" :class="{ 'p-invalid': errors?.name }"
                        v-model="moduleName" class="w-100" />
                    <label for="module_name">Role Name</label>
                </FloatLabel>
            </div>

            <p class="text-muted">Manage Permission</p>

            <table class="table-permissions">
                <thead>
                    <tr>
                        <th class="text-center">No</th>
                        <th class="text-left">Module Name</th>
                        <th>View</th>
                        <th>Create</th>
                        <th>Update</th>
                        <th>Delete</th>
                        <th>Upload</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in permissionData" :key="item.id">
                        <td class="text-center">{{ index + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td v-for="p in item.permissions">
                            <div class="d-flex items-center gap-2">
                                <Checkbox inputId="ingredient1" name="pizza" value="Cheese" />
                                <label for="ingredient1"> {{ p.action }} </label>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="d-flex justify-end gap-2">
                <Button type="button" label="Reset" variant="text" severity="danger" @click="resetForm" />
                <Button type="submit" icon="icon icon-save-for-later-2"
                    :label="isEdit ? 'Apply Changes' : 'Create New'" />
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { useRoleForm } from '@/modules/roles/composables/useRoleForm';

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
    parentData,
    errors,
    onSubmit,
    isEdit,
    resetForm,
    permissionData
} = useRoleForm(props.initialData)
</script>
