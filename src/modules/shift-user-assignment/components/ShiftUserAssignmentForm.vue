<template>
    <div>
        <div class="card">
            <div class="card-body">

                <div id="title mb-4">
                    <h6 class="fw-bold">Create Shift User Assignment</h6>
                </div>
                <form @submit.prevent="onSubmit">
                    <div class="d-flex gap-2 mt-3">
                        <FloatLabel variant="on">
                            <Select id="employee" v-model="employeeSelected" @update:modelValue="fnEmployeeSelected" filter :options="employeeData"
                                showClear optionLabel="user.name" style="width:350px">
                                <template #option="slotProps">
                                    <div class="flex items-center">
                                        <p class="fw-bold mb-0">{{ slotProps.option.user?.name ?? 'User not associated'
                                        }}
                                        </p>
                                        <span class="text-sm text-muted">
                                            {{ slotProps.option.employeeCode }} |
                                            {{ slotProps.option.position }}
                                        </span>
                                    </div>
                                </template>
                            </Select>
                            <label for="employee">Employee <sup>*</sup></label>
                        </FloatLabel>

                         <FloatLabel variant="on" style="width:150px">
                    <DatePicker id="startTime-timeonly" v-model="effectiveDateDate"
                        :class="{ 'p-invalid': errors?.effectiveDate }" dateFormat="dd-mm-yy" manualInput fluid />
                    <label for="startTime-timeonly">Effective Date <sup>*</sup></label>
                </FloatLabel>

                        <SelectButton v-model="shiftSelected" :options="shiftData" optionLabel="name" />
                    </div>
                    <div class="datatable-wrapper mt-3">
                        <table class="table-employeeSelected">
                            <thead>
                                <tr>
                                    <th class="text-center">No</th>
                                    <th width="180px">Employee Code</th>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Department</th>
                                    <th class="text-center">Shift</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="employeeSelectedData?.length">
                                    <tr v-for="(item, index) in employeeSelectedData" :key="item.id">
                                        <td class="text-center fw-bold">{{ index + 1 }}</td>
                                        <td>{{ item.employeeCode }}</td>
                                        <td>{{ item.user?.name ?? 'User Not Associated' }}</td>
                                        <td>{{ item.position }}</td>
                                        <td>{{ item.department }}</td>
                                        <td class="text-center">
                                            <Button :label="shiftSelected?.name ?? '-'" size="small" />
                                        </td>
                                        <td class="text-center">
                                            <Button icon="pi pi-trash" aria-label="delete" severity="danger"
                                                size="small" @click="fnRemoveEmployee(item.id)" variant="text"
                                                rounded />
                                        </td>
                                    </tr>
                                </template>

                                <tr v-else>
                                    <td colspan="7" class="text-danger text-center p-5">
                                        <i class="pi pi-filter-slash me-2"></i> No Employee Selected
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- Erro Views -->
                    <div class="card card-body" v-if="Object.keys(errors).length">
                        <p class="mb-2 d-flex align-items-center"><i
                                class="icon icon-warning-sign-3 text-danger me-2"></i> Something Went
                            Wrong</p>
                        <p v-for="(label, key) in errors" :key="label" class="mb-1">
                            <span class="me-3 fw-bold"> {{ key }} :</span>
                            <span class="text-sm text-danger">{{ label }}</span>
                        </p>
                    </div>
                    <!-- Button Form Submit  -->
                    <div class="mt-2">
                        <Button type="submit" label="Save" size="small" icon="pi pi-file-export" iconPos="right" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useShiftUserAssignmentForm } from '@module/shift-user-assignment/composables/useShiftUserAssignmentForm';


const {
    employeeData,
    shiftData,
    employeeSelected,
    shiftSelected,
    employeeSelectedData,
    errors,
    fnEmployeeSelected,
    fnRemoveEmployee,
    onSubmit,
    effectiveDateDate,
    effectiveDate
} = useShiftUserAssignmentForm()

</script>
<style scoped>
.table-employeeSelected {
    width: 100%;
    border-collapse: collapse;
}

.table-employeeSelected th,
td {
    padding: 5px;
    border-bottom: 1px solid #dfdfdf;
    text-align: left !important;
}
</style>