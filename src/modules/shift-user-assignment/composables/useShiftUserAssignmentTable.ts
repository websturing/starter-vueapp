import { handleApiResponse } from "@/lib/toast";
import { useShiftUserAssignmentStore } from "@module/shift-user-assignment/stores/shiftUserAssignment";
import { computed, ref, watch } from 'vue';
export function useShiftUserAssignmentTable() {
    const store = useShiftUserAssignmentStore()

    const searchRef = ref('') // rename untuk hindari konflik dengan prop `search`
    const page = ref(0)
    const rows = ref(10)

    const filtered = computed(() => {
        if (!searchRef.value) return store.data

        return store.data.filter(module =>
            module.user.toLowerCase().includes(searchRef.value.toLowerCase()) ||
            module.shift.toLowerCase().includes(searchRef.value.toLowerCase()) ||
            module.time.toLowerCase().includes(searchRef.value.toLowerCase())
        )
    })

    const paginated = computed(() => {
        const start = page.value * rows.value
        return filtered.value.slice(start, start + rows.value)
    })

    const refresh = async () => {
        await store.fetchShiftUserAssignment()
    }

    const onPageChange = (e: any) => {
        page.value = e.page
        rows.value = e.rows
    }

    const onRowEdit = (row: any) => {
        alert(`Edit Module: ${row.name}`)
    }
    const onRowDelete = async (row: any) => {
        const res = await store.deleteShiftUserAssignment(row.id);
        handleApiResponse(res);
    }

    watch(searchRef, async () => {
        page.value = 0
        if (store.data.length === 0) {
            await refresh()
        }
    }, { immediate: true })

    // expose computed with getter/setter for v-model compatibility
    const search = computed({
        get: () => searchRef.value,
        set: val => searchRef.value = val
    })

    return {
        search,
        page,
        rows,
        data: paginated,
        totalRecords: computed(() => filtered.value.length),
        loading: computed(() => store.loading),
        refresh,
        onPageChange,
        onRowEdit,
        onRowDelete
    }
}