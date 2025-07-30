import { useShiftStore } from "@/modules/shift/stores/shift";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

export function useShiftUserAssignment() {
    const storeShift = useShiftStore();

    const { data: shiftData } = storeToRefs(storeShift);


    onMounted(async () => {
        await storeShift.fetchShift();
    });


    return {
        shiftData
    }
}