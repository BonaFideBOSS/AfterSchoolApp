<template>
  <template v-if="!mobile">
    <RouterLink v-for="route in routes" :to="route.path" activeClass="active" :text="route.meta.title"
      class="nav-link" />
    <a class="nav-link" :href="serverURL" target="_blank">Administrator</a>
  </template>
  <ul v-else class="nav nav-pills nav-justified gap-0 m-0 flex-nowrap">
    <li class="nav-item" v-for="route in routes">
      <RouterLink :to="route.path" activeClass="" class="py-3 nav-link m-0 rounded-0 bg-transparent" data-mdb-pill-init>
        <div class="d-flex flex-column gap-3 align-items-center">
          <span class="btn btn-lg btn-floating position-relative"
            :class="[$route.path == route.path ? 'btn-primary' : 'shadow-3']">
            <i :class="route.icon" class="fa-fw"></i>
            <span v-if="route.path == '/cart' && cart.length > 0"
              class="position-absolute top-75 start-95 translate-middle badge rounded-pill bg-danger">
              {{ cart.length }}
            </span>
          </span>
          <span class="small">{{ route.titleShort }}</span>
        </div>
      </RouterLink>
    </li>
  </ul>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: { RouterLink },
  props: ['mobile'],
  data() {
    return {
      routes: this.$router.options.routes.filter(r => r.show === true),
      serverURL: this.$root.serverURL,
      cart: this.$root.cart
    }
  }
}
</script>

<style scoped>
.top-75 {
  top: 75%
}

.start-95 {
  left: 95%
}
</style>