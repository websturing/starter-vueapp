<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-lg-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-body">
                        <user-table></user-table>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import userTable from "@module/user/components/UserTable.vue";

</script>