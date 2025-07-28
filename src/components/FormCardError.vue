<template>
  <div>
    <div class="card card-body">
      <p class="mb-2 d-flex align-items-center"><i class="icon icon-warning-sign-3 text-danger me-2"></i> Something Went
        Wrong</p>
      <p v-for="(label, key) in errors" :key="label" class="mb-1">
        <span class="me-3 fw-bold"> {{ key }} :</span>
        <span class="text-sm text-danger">{{ label }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ErrorProps {
  errors?: Record<string, string>;
}

const props = withDefaults(defineProps<ErrorProps>(), {
  errors: () => ({}),
});

</script>