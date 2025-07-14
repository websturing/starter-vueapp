// composables/useDataTable.ts
import { computed, ref, watch } from 'vue'

export function useDataTable<T>(initialData: T[]) {
    const search = ref('')
    const page = ref(0)
    const rowsPerPage = ref(10)

    const filteredData = computed(() => {
        if (!search.value.trim()) return initialData
        return initialData.filter((item: any) =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(search.value.toLowerCase())
            )
        )
    })

    const paginatedData = computed(() => {
        const start = page.value * rowsPerPage.value
        return filteredData.value.slice(start, start + rowsPerPage.value)
    })

    const totalRecords = computed(() => filteredData.value.length)

    watch([search], () => {
        page.value = 0 // reset to page 0 on search change
    })

    return {
        search,
        page,
        rowsPerPage,
        paginatedData,
        totalRecords
    }
}
