<script setup lang="ts">
const props = withDefaults(defineProps<{
    title?: string
    search?: string
    onRefresh?: () => void
    onCreate?: () => void
    showCreate?: boolean
    labelCreate?: string
}>(), {
    title: undefined,
    search: '',
    onRefresh: undefined,
    onCreate: undefined,
    showCreate: true,
    labelCreate: 'Create New'
})

const emit = defineEmits(['update:search'])

const handleSearch = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    emit('update:search', value)
}

const handleRefresh = () => {
    props.onRefresh?.()
}

const handleCreate = () => {
    props.onCreate?.()
}
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
                    <InputText :model-value="search" @input="handleSearch" placeholder="Search..." size="small" />
                </IconField>
            </div>
            <div class="d-flex gap-1 align-items-center">
                <Button label="Refresh" icon="pi pi-refresh" @click="handleRefresh" severity="warn" size="small"
                    variant="text" />
                <Button v-if="showCreate" @click="handleCreate" :label="labelCreate" icon="icon icon-file-add-3"
                    size="small" />
            </div>
        </div>
        <slot />
    </div>
</template>
