<template>
    <Notivue v-slot="item">
        <Notification :item="item" :class="item.meta?.customClass" />
    </Notivue>

    <router-view />
</template>

<script setup>
import { Notification, Notivue } from 'notivue';
</script>
