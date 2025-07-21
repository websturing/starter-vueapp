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
            <div class="datatable-wrapper">
                <table class="table-permissions">
                    <thead>
                        <tr>
                            <th class="text-center">No</th>
                            <th style="text-align: left  !important;">Module Name</th>
                            <th class="text-center">View</th>
                            <th>Create</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Upload</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, index) in permissionData">
                            <RolesPermissionRowTable :item="item" :index="index + 1" :level="0"
                                v-model:permissionCheckBox="permissionCheckBox" />
                        </template>
                    </tbody>
                </table>
                <pre>{{
                    permissionCheckBox }}</pre>
            </div>
            <div class="d-flex justify-end gap-2 mt-4">
                <Button type="button" label="Reset" variant="text" severity="danger" @click="resetForm" />
                <Button type="submit" icon="icon icon-save-for-later-2"
                    :label="isEdit ? 'Apply Changes' : 'Create New'" />
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { useRoleForm } from '@/modules/roles/composables/useRoleForm';
import RolesPermissionRowTable from "@module/roles/components/RolesPermissionRowTable.vue";
// Props
const props = defineProps<{
    initialData?: {
        id?: number
        name: string
        guard_name: string
    }
}>()


// Composable: create/edit tergantung props
const {
    name: moduleName,
    permissions: permissionCheckBox,
    parentData,
    errors,
    onSubmit,
    isEdit,
    resetForm,
    permissionData
} = useRoleForm(props.initialData)
</script>