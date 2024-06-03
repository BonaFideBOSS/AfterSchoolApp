<template>
  <RouterLink v-for="route in $router.options.routes" :to="route.path" activeClass="active" :text="route.meta.title"
    class="nav-link"></RouterLink>
  <a class="nav-link" :href="$root.serverURL" target="_blank">Administrator</a>
</template>