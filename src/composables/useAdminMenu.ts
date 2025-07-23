import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

export function useAdminMenu(initialData: any = null) {
    const store = useAuthStore()

    const { permissions } = storeToRefs(store)

    return {
        permissions
    }
}