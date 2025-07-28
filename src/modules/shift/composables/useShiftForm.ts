import { handleApiResponse } from "@/lib/toast"
import type { ShiftForm } from '@/modules/shift/schemas/shiftFormSchema'
import { useShiftStore } from '@/modules/shift/stores/shift'
import { withValidation } from "@/types/withValidation"
import { shiftFormSchema } from '@module/shift/schemas/shiftFormSchema'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref, watch } from 'vue'

export function useShiftForm(initialData: any = null) {
    const store = useShiftStore();
    const { data: parentData } = storeToRefs(store);
    const isEdit = ref(!!initialData?.id);

    // Fungsi konversi Date ke "HH:mm"
    const formatTime = (date: Date | string | null): string => {
        if (!date) return '';

        if (typeof date === 'string') {
            // Jika format sudah HH:mm, return langsung
            if (/^\d{2}:\d{2}$/.test(date)) return date;
            // Jika format HH:mm:ss, ambil hanya HH:mm
            if (/^\d{2}:\d{2}:\d{2}$/.test(date)) return date.substring(0, 5);
            return date; // fallback untuk format lain
        }

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Fungsi konversi "HH:mm" ke Date (untuk initial value)
    const parseTime = (timeStr: string): Date | null => {
        if (!timeStr) return null;
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm, setValues, setFieldValue } = useForm<ShiftForm>({
        validationSchema: toTypedSchema(shiftFormSchema),
        initialValues: {
            name: initialData?.name ?? '',
            startTime: formatTime(initialData?.startTime) ?? '',
            endTime: formatTime(initialData?.endTime) ?? '',
            isNightShift: initialData?.isNightShift ?? false,
            tolerance: formatTime(initialData?.tolerance) ?? '00:10',
        },
    });

    const { value: name } = useField<string>('name');
    const { value: startTime } = useField<string>('startTime');
    const { value: endTime } = useField<string>('endTime');
    const { value: isNightShift } = useField<boolean>('isNightShift');
    const { value: tolerance } = useField<string>('tolerance');

    // Local refs untuk binding v-model di Calendar (harus pakai Date)
    const startTimeDate = ref<Date | null>(parseTime(initialData?.startTime ?? ''));
    const endTimeDate = ref<Date | null>(parseTime(initialData?.endTime ?? ''));
    const toleranceDate = ref<Date | null>(parseTime(initialData?.tolerance ?? ''));


    // Set current time for new entries
    if (!isEdit.value) {
        const now = new Date();
        const currentTime = formatTime(now);
        startTimeDate.value = now;
        toleranceDate.value = parseTime("00:10");
        setFieldValue('startTime', currentTime);
        setFieldValue('tolerance', "00:10");
    }

    // Setiap kali waktu berubah, update nilai string di form
    watch([startTimeDate, endTimeDate, toleranceDate], ([newStart, newEnd, newTolerance]) => {
        startTime.value = formatTime(newStart);
        endTime.value = formatTime(newEnd);
        tolerance.value = formatTime(newTolerance);
    });

    const resetForm = () => {
        const now = new Date();
        const currentTime = formatTime(now);

        startTimeDate.value = now;
        endTimeDate.value = null;
        toleranceDate.value = parseTime('00:10');

        veeResetForm({
            values: {
                name: '',
                startTime: currentTime, // Reset to current time
                endTime: '',
                isNightShift: false,
                tolerance: '00:10',
            },
            errors: {}
        });
    };

    const onSubmit = handleSubmit(
        withValidation<ShiftForm>(async (values) => {
            if (isEdit.value) {
                const res = await store.updateShift(initialData.id!, values);
                console.log('edit data', res);
                handleApiResponse(res);
            } else {
                const res = await store.createShift(values);
                handleApiResponse(res);
                resetForm();
            }
        })
    );

    onMounted(async () => {
        await store.fetchShift();
    });

    return {
        name,
        startTime,
        endTime,
        startTimeDate, // Gunakan ini di v-model Calendar
        endTimeDate,   // Gunakan ini di v-model Calendar
        toleranceDate,
        isNightShift,
        tolerance,
        isEdit,
        onSubmit,
        resetForm,
        parentData,
        errors,
        isSubmitting,
    };
}
