import { useModuleStore } from '@/modules/module/stores/module'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref, watch } from 'vue'
import { permissionModuleCreateSchema } from '../schemas/moduleSchema'

export function useModuleForm(initialData: any = null) {
    const moduleStore = useModuleStore()
    const { data: parentData } = storeToRefs(moduleStore)

    const parentId = ref<number | null>(initialData?.parent_id || null)

    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm, setValues } = useForm<{
        name: string
        slug: string
    }>({
        validationSchema: permissionModuleCreateSchema,
        initialValues: {
            name: initialData?.name || '',
            slug: initialData?.slug || ''
        }
    })

    const { value: name } = useField<string>('name')
    const { value: slug } = useField<string>('slug')

    const isParent = ref(initialData?.parent_id == null ? false : true) // true jika tidak ada parent_id
    const isEdit = ref(!!initialData?.id) // true kalau edit


    console.log('Initial Data:', initialData)
    console.log('Initial Data:', !initialData?.parent_id)

    const resetForm = () => {
        veeResetForm({
            values: {
                name: '',
                slug: ''
            },
            errors: {}
        })
        parentId.value = null
        isParent.value = false
    }

    const onSubmit = handleSubmit(async (values) => {
        try {
            const moduleData = {
                name: values.name,
                slug: values.slug,
                parent_id: parentId.value
            }

            if (isEdit.value && initialData?.id) {
                await moduleStore.updateModule(initialData.id, moduleData)
            } else {
                await moduleStore.createModule(moduleData)
                resetForm()
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    })

    onMounted(async () => {
        try {
            await moduleStore.fetchModule()
        } catch (error) {
            console.error('Error fetching modules:', error)
        }
    })

    watch(isParent, () => {
        if (!isParent.value) {
            parentId.value = null
        }
    }, { immediate: true })

    return {
        name,
        slug,
        parentId,
        isParent,
        isEdit,
        onSubmit,
        resetForm,
        parentData,
        errors,
        isSubmitting,
    }
}
