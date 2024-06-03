<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg shadow-0 mt-3">
      <div class="container-fluid">
        <RouterLink class="navbar-brand fs-3" to="/">
          <img class="me-3" src="@/assets/img/logo.png" />
          <span class="satisfy-regular text-danger fw-bold">After</span><span
            class="satisfy-regular fw-bold">School</span>
        </RouterLink>
        <button class="navbar-toggler" type="button" data-mdb-ripple-init data-mdb-toggle="sidenav"
          data-mdb-target="#sidenav-1">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse">
          <div class="navbar-nav ms-auto">
            <NavLinks />
          </div>
        </div>
      </div>
    </nav>
  </div>

  <RouterView />
  <CartBtn />

  <footer class="py-4">
    <div class="container small d-flex flex-column flex-lg-row justify-content-lg-between gap-2 text-center">
      <p class="mb-0">&copy {{ new Date().getFullYear() != 2024 ? '2024 - ' : '' }}{{ new Date().getFullYear() }}
        {{ siteName }}
      </p>
      <p class="mb-0">Designed by Amaan Al Mir - M00999011</p>
      <a href="mailto:am4013@live.mdx.ac.uk">am4013@live.mdx.ac.uk</a>
    </div>
  </footer>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import NavLinks from "@/components/NavLinks.vue";
import CartBtn from "@/components/CartBtn.vue";

export default {
  components: { NavLinks, CartBtn },

  data() {
    return {
      siteName: "AfterSchool",
      serverURL: "https://afterschoolbackend.vercel.app/",
      cart: [],
      savedLessons: []
    }
  },

  mounted() {
    document.querySelectorAll('[data-mdb-ripple-init]').forEach((el) => {
      new mdb.Ripple(el)
    });
  },

  created() {
    this.getCart()
  },

  methods: {
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
      localStorage.setItem('savedLessons', JSON.stringify(this.savedLessons))
    },

    getCart() {
      var savedCart = localStorage.getItem('cart')
      var savedLessons = localStorage.getItem('savedLessons')
      if (savedCart && savedLessons) {
        this.cart = JSON.parse(savedCart)
        this.savedLessons = JSON.parse(savedLessons)
      }
    }
  },

  watch: {
    cart: {
      handler: 'saveCart',
      deep: true,
    }
  }

}
</script>