<template>
  <div class="container my-5">
    <h1 class="display-1 fw-bolder">404 - Page not found</h1>
    <p class="my-3">Oops, the page you're looking for has been moved or never existed.</p>
    <RouterLink to="/" class="btn btn-lg btn-primary">Go back to homepage</RouterLink>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
export default {
  components: { RouterLink }
}
</script>