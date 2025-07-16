import { useModuleStore } from '@/modules/module/stores/module'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref, watch } from 'vue'
import { permissionModuleCreateSchema } from '../schemas/moduleSchema'

export function useModuleForm() {
    const moduleStore = useModuleStore()
    const { data: parentData } = storeToRefs(moduleStore)

    const parentId = ref(null)
    const create = ref(false)
    const update = ref(false)
    const read = ref(true)
    const deleteAction = ref(false)
    const upload = ref(false)
    const download = ref(false)

    const { handleSubmit, errors, isSubmitting } = useForm<{
        name: string
        slug: string
    }>({
        validationSchema: permissionModuleCreateSchema,
    })

    const { value: name } = useField<string>('name')
    const { value: slug } = useField<string>('slug')



    const isParent = ref(false)
    const isEdit = ref(false)

    const resetForm = () => {
        name.value = ''
        name.value = ''
        parentId.value = null
    }


    const onSubmit = handleSubmit(async (values) => {

    });


    /** FUNCTION BASE */
    onMounted(async () => {
        try {
            await moduleStore.fetchModule()
        } catch (error) {
            console.error('Error fetching permissions:', error)
        }
    })


    /** If Parent not selected parentId Must Be Null */
    watch(isParent, async () => {
        if (!isParent.value) {
            parentId.value = null
        }
    }, { immediate: true })


    return {
        name,
        slug,
        parentId,
        create,
        update,
        read,
        deleteAction,
        upload,
        download,
        isParent,
        isEdit,
        resetForm,
        onSubmit,
        parentData,
        errors
    }
}