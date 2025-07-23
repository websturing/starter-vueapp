<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-lg-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-body">
                        <user-table @edit="handleEdit"></user-table>

                        <Dialog v-model:visible="showForm" modal :header="title" style="width: 70rem">
                            <user-view :initialData="initialData" @submitted="handleFormSubmitted"></user-view>
                        </Dialog>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import userView from "@module/user/components/UserForm.vue";
import userTable from "@module/user/components/UserTable.vue";

import { ref } from 'vue';

const initialData = ref<any | null>(null)
const showForm = ref(false)
const title = ref('New User')
function handleEdit(module: any) {

    initialData.value = module

    showForm.value = true
    if (module) {
        title.value = `Edit User: ${module.name}`
    } else {
        initialData.value = null
        title.value = 'New User'
    }
}

function handleFormSubmitted() {
    showForm.value = false

}
</script>