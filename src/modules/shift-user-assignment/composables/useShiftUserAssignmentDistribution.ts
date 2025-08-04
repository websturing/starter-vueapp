import { useShiftStore } from "@/modules/shift/stores/shift";
import { useShiftUserAssignmentStore } from "@module/shift-user-assignment/stores/shiftUserAssignment";
import { storeToRefs } from "pinia";

export function useShiftUserAssignmentDistribution() {
    const store = useShiftUserAssignmentStore();
    const storeShift = useShiftStore();

    const { dataSummary: summaryAssignment, loading: summaryAssignmentLoading } = storeToRefs(store);
    const { data: shiftData, loading: shiftLoading } = storeToRefs(storeShift);

    const fnfetchSUmmaryAssignments = async () => {
         await store.fetchShiftUserAssignmentSummary()
    }
    const fnfetchShift = async () =>{
        await storeShift.fetchShift();
    }


    return {
        summaryAssignment,
        summaryAssignmentLoading,
        shiftData,
        shiftLoading,
        fnfetchShift,
        fnfetchSUmmaryAssignments
    }
}