import { useModuleStore } from '@/modules/module/stores/module'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref, watch } from 'vue'
import { permissionModuleCreateSchema } from '../schemas/moduleSchema'

export function useModuleForm() {
    const moduleStore = useModuleStore()
    const { data: parentData } = storeToRefs(moduleStore)

    const parentId = ref(null)

    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm } = useForm<{
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
        veeResetForm({
            values: {
                name: '',
                slug: ''
            },
            errors: {} // Reset semua error
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
            };

            if (isEdit.value) {
                // Logika untuk edit jika diperlukan
            } else {
                await moduleStore.createModule(moduleData);
                resetForm();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
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
        isParent,
        isEdit,
        resetForm,
        onSubmit,
        parentData,
        errors
    }
}