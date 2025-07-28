<template>
  <div class="p-4">
    <form @submit.prevent="handleSubmit">
      <div class="d-flex align-items-center  gap-1 mb-3 ">
        <FloatLabel variant="on" class="flex-grow-1">
          <InputText id="module_name" size="medium" :class="{ 'p-invalid': errors?.name }" v-model="name"
            class="w-100" />
          <label for="module_name">Name <sup>*</sup></label>
        </FloatLabel>
        <FloatLabel variant="on" style="width:150px">
          <DatePicker id="startTime-timeonly" v-model="startTimeDate" :class="{ 'p-invalid': errors?.startTime }"
            manualInput timeOnly fluid />
          <label for="startTime-timeonly">Start Time <sup>*</sup></label>
        </FloatLabel>
        <FloatLabel variant="on" style="width:150px">
          <DatePicker id="endTime-timeonly" v-model="endTimeDate" manualInput timeOnly fluid
            :class="{ 'p-invalid': errors?.endTime }" />
          <label for="endTime-timeonly">End Time <sup>*</sup></label>
        </FloatLabel>
        <FloatLabel variant="on" style="width:150px">
          <DatePicker id="endTime-timeonly" v-model="toleranceDate" manualInput timeOnly fluid
            :class="{ 'p-invalid': errors?.tolerance }" />
          <label for="endTime-timeonly">Tolerance<sup>*</sup></label>
        </FloatLabel>

        <ToggleSwitch id="isNightShift" v-model="isNightShift"></ToggleSwitch>
        <label for="isNightShift">Night Shift ?</label>
      </div>

      <form-card-error v-if="Object.keys(errors).length" :errors="errors"></form-card-error>
      <div class="d-flex justify-end gap-2 mt-4">
        <Button type="button" label="Reset" variant="text" severity="danger" @click="resetForm" />
        <Button type="submit" icon="icon icon-save-for-later-2" :label="isEdit ? 'Apply Changes' : 'Create New'" />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import FormCardError from "@/components/FormCardError.vue";
import { useShiftForm } from '@/modules/shift/composables/useShiftForm';
import type { ShiftForm } from '@/modules/shift/schemas/shiftFormSchema';
import { SubmitHandlerResult } from "@/types/submitHandlerVeeValidate";
import { ref } from "vue";

const time = ref(null);

const props = defineProps<{
  initialData?: Partial<ShiftForm> & { id?: number }
}>()

const emit = defineEmits<{
  (e: 'submitted'): void
}>()

// Wrap submit dan emit di komponen Vue ini
const handleSubmit = async () => {
  const result = await onSubmit() as SubmitHandlerResult<ShiftForm>
  if (result.valid) {
    emit('submitted')
  } else {
    console.log('Form invalid', result.errors)
  }
}

// Composable: create/edit tergantung props
const {
  name,
  startTime,
  endTime,
  startTimeDate,
  endTimeDate,
  toleranceDate,
  isNightShift,
  tolerance,
  isEdit,
  onSubmit,
  resetForm,
  parentData,
  errors,
  isSubmitting
} = useShiftForm(props.initialData)
</script>