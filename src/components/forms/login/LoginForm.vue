<script setup lang="ts">
import { useLoginForm } from '@/composables/login/useLoginForm';

const { email, password, errors, isSubmitting, onSubmit } = useLoginForm()
</script>

<template>
    <form @submit.prevent="onSubmit" class="space-y-4">

        <div class="mb-3">
            <input name="email" type="email" class="form-control form-control-lg" v-model="email" placeholder="Email"
                rules="required|email" aria-label="Email" />
            <span class="fst-italic text-sm text-danger">{{ errors.email }}</span>
        </div>

        <div class="mb-3">
            <input name="password" type="password" class="form-control form-control-lg" rules="required|min:8"
                v-model="password" placeholder="Password" aria-label="Password" />
            <span class="fst-italic text-sm text-danger">{{ errors.password }}</span>
        </div>

        <div class="text-center">
            <button type="submit" class="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Sign in
            </button>
        </div>
    </form>
</template>
