<template>
    <div class="p-4">
        <form @submit.prevent="handleSubmit">
            <!-- Bagian employee form -->
            <div class="d-flex align-items-center  gap-1 mb-3 ">
                <FloatLabel variant="on" style="width:160px">
                    <InputText readonly="true" variant="filled" id="module_name" size="medium"
                        :class="{ 'p-invalid': errors?.employeeCode }" v-model="employeeCode" class="w-100" />
                    <label for="module_name">Employee Code <sup>*</sup></label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="department" size="medium" :class="{ 'p-invalid': errors?.department }"
                        v-model="department" class="w-100" />
                    <label for="department">Department <sup>*</sup></label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="position" size="medium" :class="{ 'p-invalid': errors?.position }" v-model="position"
                        class="w-100" />
                    <label for="position">Position <sup>*</sup></label>
                </FloatLabel>
                <FloatLabel variant="on" style="width:150px">
                    <DatePicker id="startTime-timeonly" v-model="joinDateDate"
                        :class="{ 'p-invalid': errors?.joinDate }" dateFormat="dd-mm-yy" manualInput fluid />
                    <label for="startTime-timeonly">Join Date <sup>*</sup></label>
                </FloatLabel>
                <ToggleSwitch id="isActive" v-model="active"></ToggleSwitch>
                <label for="isActive">Active</label>
            </div>
            <pre>{{ errors }}</pre>
            <form-card-error v-if="Object.keys(errors).length" :errors="errors"></form-card-error>
            <div class="d-flex justify-end gap-2 mt-4">
                <Button type="button" label="Reset" variant="text" severity="danger" @click="resetForm" />
                <Button type="submit" icon="icon icon-save-for-later-2" :label="isEdit ? 'Apply Changes' : 'Create New'"
                    :loading="isSubmitting" />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { SubmitHandlerResult } from "@/types/submitHandlerVeeValidate";
import { useEmployeeForm } from '@module/employee/composables/useEmployeeForm';
import type { EmployeeForm } from '@module/employee/schemas/employeeFormSchema';

const props = defineProps<{
    initialData?: Partial<EmployeeForm> & { id?: number }
}>();

const emit = defineEmits<{
    (e: 'submitted'): void
}>()

// Wrap submit dan emit di komponen Vue ini
const handleSubmit = async () => {
    const result = await onSubmit() as SubmitHandlerResult<EmployeeForm>
    if (result.valid) {
        emit('submitted')
    } else {
        console.log('Form invalid', result.errors)
    }
}

const {
    employeeCode,
    position,
    department,
    joinDate,
    joinDateDate,
    active,
    userId,
    isEdit,
    onSubmit,
    resetForm,
    parentData,
    errors,
    isSubmitting,
    nextEmployeeCode,
} = useEmployeeForm(props.initialData);
</script>