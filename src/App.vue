<template>
    <Notivue v-slot="item">
        <Notification :item="item" :class="{
            'mt-15': isLoginPage
        }" />
    </Notivue>

    <router-view />
</template>

<script setup>
import { Notification, Notivue } from 'notivue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const isLoginPage = computed(() => route.name === 'Login')

</script>
<style scoped>
.mt-15 {
    margin-top: 90px;
}
</style>