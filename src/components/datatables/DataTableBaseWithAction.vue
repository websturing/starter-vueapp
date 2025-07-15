<script setup lang="ts">
const props = withDefaults(defineProps<{
    title?: string
    search?: string
    onSearch?: (val: string) => void
    onRefresh?: () => void
    onCreate?: () => void
    showCreate?: boolean
    labelCreate?: string
}>(), {
    search: '',
    onSearch: () => { },
    onRefresh: () => { },
    onCreate: () => { },
    showCreate: true,
    labelCreate: 'Create New'
})

const emit = defineEmits(['update:search'])
</script>


<template>
    <div class="space-y-4">

        <h4 v-if="title" class="text-xl font-semibold mb-4">{{ title }}</h4>
        <div class="d-flex justify-content-between items-center align-items-center mb-2">
            <div>
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText :value="props.search"
                        @input="e => props.onSearch?.((e.target as HTMLInputElement).value)" placeholder="Search..."
                        size="small" />
                </IconField>
            </div>
            <div class="d-flex gap-1 align-items-center ">
                <Button label="Refresh" icon="pi pi-refresh" @click="onRefresh" severity="warn" size="small"
                    variant="text" />
                <Button v-if="showCreate" @click="onCreate" :label="labelCreate" icon="icon icon-file-add-3"
                    size="small" />
            </div>
        </div>
        <slot />
    </div>
</template>
