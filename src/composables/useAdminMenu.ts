import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

export function useAdminMenu(initialData: any = null) {
    const store = useAuthStore()

    const { menu } = storeToRefs(store)

    return {
        menu
    }
}