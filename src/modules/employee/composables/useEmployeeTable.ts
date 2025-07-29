import { handleApiResponse } from "@/lib/toast"
import { useEmployeeStore } from '@/modules/employee/stores/employee'
import { computed, ref, watch } from 'vue'

export function useEmployeeTable() {
    const store = useEmployeeStore()

    const searchRef = ref('') // rename untuk hindari konflik dengan prop `search`
    const page = ref(0)
    const rows = ref(10)

    const filtered = computed(() => {
        if (!searchRef.value) return store.data;

        const searchTerm = searchRef.value.toLowerCase();

        return store.data.filter(module => {
            return Object.values(module).some(value => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(searchTerm);
                } else if (typeof value === 'object' && value !== null) {
                    return Object.values(value).some(
                        nestedValue =>
                            typeof nestedValue === 'string' &&
                            nestedValue.toLowerCase().includes(searchTerm)
                    ); // <- Kurung ini tadi yang hilang
                }
                return false;
            });
        });

    });

    const paginated = computed(() => {
        const start = page.value * rows.value
        return filtered.value.slice(start, start + rows.value)
    })

    const refresh = async () => {
        await store.fetchEmployee()
    }

    const onPageChange = (e: any) => {
        page.value = e.page
        rows.value = e.rows
    }

    const onRowEdit = (row: any) => {
        alert(`Edit Module: ${row.name}`)
    }
    const onRowDelete = async (row: any) => {
        const res = await store.deleteEmployee(row.id)
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
