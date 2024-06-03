<template>
  <p class="mb-0">
    <span>Showing {{ pagination.start }} to {{ pagination.end }} out of {{ pagination.filtered }} {{ label }}</span>
    <span v-if="pagination.filtered != pagination.total">
      (filtered from {{ pagination.total }} {{ label }})
    </span>
  </p>
  <slot></slot>
</template>

<script>
export default {
  props: ['pagination', 'label']
}
</script>
