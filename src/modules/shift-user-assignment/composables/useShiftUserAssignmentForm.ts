import { formatDate } from "@/lib/formater";
import { handleApiResponse } from "@/lib/toast";
import { Employee } from "@/modules/employee/schemas/employeeSchema";
import { useEmployeeStore } from "@/modules/employee/stores/employee";
import { useShiftStore } from "@/modules/shift/stores/shift";
import { withValidation } from "@/types/withValidation";
import type { ShiftUserAssignmentForm } from "@module/shift-user-assignment/schemas/shiftUserAssignmentFormSchema";
import { shiftUserAssignmentFormSchema } from "@module/shift-user-assignment/schemas/shiftUserAssignmentFormSchema";
import { useShiftUserAssignmentStore } from "@module/shift-user-assignment/stores/shiftUserAssignment";
import type { Shift } from "@module/shift/schemas/shiftSchema";
import { toTypedSchema } from '@vee-validate/zod';
import { storeToRefs } from "pinia";
import { useField, useForm } from 'vee-validate';
import { onMounted, ref, watch } from "vue";

export function useShiftUserAssignmentForm(initialData: any = null) {
    const storeEmployee = useEmployeeStore();
    const storeShiftUserAssignment = useShiftUserAssignmentStore();
    const storeShift = useShiftStore();

    const now = new Date();
    const currentTime = formatDate(now);
    const effectiveDateDate =  ref<string>(currentTime);

    const employeeSelected = ref(null); // tidak dipakai di form, boleh dihapus kalau tidak digunakan

    const { data: employeeData } = storeToRefs(storeEmployee);
    const { data: shiftData } = storeToRefs(storeShift);

    const {
        handleSubmit,
        errors,
        isSubmitting,
        resetForm: veeResetForm,
        setValues,
        setFieldValue,
    } = useForm<ShiftUserAssignmentForm>({
        validationSchema: toTypedSchema(shiftUserAssignmentFormSchema),
        initialValues: {
            shiftSelected: {
                id: 0,
                name: ""
            },
            employeeSelectedData: [],
            effectiveDate: currentTime
        },
    });

    const { value: shiftSelected } = useField<Shift>('shiftSelected');
    const { value: employeeSelectedData } = useField<Employee[]>('employeeSelectedData', []);
    const { value: effectiveDate } = useField<string>('effectiveDate');

    /** Table Employee Action */
    const fnEmployeeSelected = (employee: Employee) => {
        const isAlreadySelected = employeeSelectedData.value.some(
            (e: Employee) => e.id === employee.id
        );

        if (!isAlreadySelected) {
            employeeSelectedData.value.push(employee);
        }
    };


    const fnRemoveEmployee = (id: number) => {
        const index = employeeSelectedData.value.findIndex((e) => e.id === id);
        if (index !== -1) {
            employeeSelectedData.value.splice(index, 1);
        }
    };


    watch([effectiveDateDate], ([newDate]) => {
        effectiveDateDate.value = currentTime;
    });

    const resetForm = () => {
        employeeSelected.value = null
        veeResetForm({
            values: {
                shiftSelected: {
                    id: 0,
                    name: ""
                },
                employeeSelectedData: [],
                effectiveDate: currentTime
            },
            errors: {}
        });
    };

    const onSubmit = handleSubmit(
        withValidation<ShiftUserAssignmentForm>(async (values) => {
            const res = await storeShiftUserAssignment.createUShiftUserAssignment(values);
            handleApiResponse(res);
            resetForm();

        })
    );

    onMounted(async () => {
        await storeEmployee.fetchEmployee();
    });

    return {
        employeeData,
        employeeSelected,
        shiftSelected,
        shiftData,
        employeeSelectedData,
        effectiveDateDate,
        effectiveDate,
        fnEmployeeSelected,
        fnRemoveEmployee,
        handleSubmit,
        errors,
        isSubmitting,
        veeResetForm,
        setValues,
        setFieldValue,
        onSubmit
    };
}
