<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-lg-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-body">
                        <user-table></user-table>
                        <user-view></user-view>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import userView from "@module/user/components/UserForm.vue";
import userTable from "@module/user/components/UserTable.vue";

</script>