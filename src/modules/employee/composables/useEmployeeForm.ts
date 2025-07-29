import { formatDate } from "@/lib/formater"
import { handleApiResponse } from "@/lib/toast"
import type { EmployeeForm } from '@/modules/employee/schemas/employeeFormSchema'
import { useEmployeeStore } from '@/modules/employee/stores/employee'
import { withValidation } from "@/types/withValidation"
import { employeeFormSchema } from '@module/employee/schemas/employeeFormSchema'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref, watch } from 'vue'

export function useEmployeeForm(initialData: any = null) {
    const store = useEmployeeStore();
    const { data: parentData } = storeToRefs(store);
    const isEdit = ref(!!initialData?.id);
    const { nextEmployeeCode } = storeToRefs(store);


    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm, setValues, setFieldValue } = useForm<EmployeeForm>({
        validationSchema: toTypedSchema(employeeFormSchema),
        initialValues: {
            employeeCode: initialData?.employeeCode ?? '',
            position: initialData?.position ?? '',
            department: initialData?.department ?? '',
            joinDate: initialData?.joinDate ?? '',
            active: initialData?.active ?? true,
        }

    });

    const { value: employeeCode } = useField<string>('employeeCode');
    const { value: position } = useField<string>('position');
    const { value: department } = useField<string>('department');
    const { value: joinDate } = useField<string>('joinDate');
    const { value: active } = useField<string>('active');
    const { value: userId } = useField<number | null>('userId');


    // Local refs untuk binding v-model di Calendar (harus pakai Date)
    const joinDateDate = ref<Date | null>(initialData?.joinDate ? new Date(initialData.joinDate) : null);


    // Set current time for new entries
    if (!isEdit.value) {
        const now = new Date();
        const currentTime = formatDate(now);
        joinDateDate.value = now;
        setFieldValue('joinDate', currentTime);
    }

    // Setiap kali waktu berubah, update nilai string di form
    watch([joinDateDate, nextEmployeeCode], ([newDate, newCode]) => {
        joinDate.value = formatDate(newDate);
        employeeCode.value = newCode
    });

    const resetForm = () => {
        const now = new Date();
        const currentTime = formatDate(now);

        joinDateDate.value = now;

        veeResetForm({
            values: {
                employeeCode: '',
                position: '',
                department: '',
                joinDate: currentTime,
                active: true,
            },
            errors: {}
        });
    };

    const onSubmit = handleSubmit(
        withValidation<EmployeeForm>(async (values) => {


            // Submit
            if (isEdit.value) {
                const res = await store.updateEmployee(initialData.id!, values);
                handleApiResponse(res);
            } else {
                const res = await store.createEmployee(values);
                handleApiResponse(res);
                resetForm();
            }
        })
    );


    onMounted(async () => {
        await store.fetchEmployeeLastCode();
    });

    return {
        employeeCode,
        position,
        department,
        joinDate, // Gunakan ini di v-model Calendar
        joinDateDate,   // Gunakan ini di v-model Calendar
        active,
        userId,
        isEdit,
        onSubmit,
        resetForm,
        parentData,
        errors,
        isSubmitting,
        nextEmployeeCode
    };
}
