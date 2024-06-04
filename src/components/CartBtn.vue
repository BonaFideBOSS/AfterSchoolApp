<template>
  <div id="cart" class="d-none d-lg-block">
    <button @click="switchPage" type="button" class="btn btn-lg position-relative btn-shockwave"
      :class="[cart.length > 0 ? 'btn-primary' : 'btn-secondary', cart.length > 0 && $route.name != 'cart' ? 'is-active' : '']"
      :disabled="cart.length == 0 && $route.name != 'cart'" data-mdb-ripple-init>
      <i class="fa-solid" :class="[$route.name == 'cart' ? 'fa-home' : 'fa-cart-shopping']"></i>
      <span v-if="$route.name != 'cart'" class="position-absolute badge rounded-pill badge-danger"
        v-text="cart.length"></span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: this.$root.cart
    }
  },
  methods: {
    switchPage() {
      return this.$route.name == "cart" ? this.$router.push('/') : this.$router.push('/cart')
    }
  },
}
</script>

<style scoped>
#cart {
  position: fixed;
  bottom: 7%;
  right: 5%;
  z-index: 2;
}

#cart .btn {
  border-radius: 50% !important;
  height: 70px;
  width: 70px;
  overflow: unset;
}

#cart .btn .badge {
  left: 65%;
  top: -5px;
}

.btn-shockwave.is-active {
  animation: shockwaveJump 1s ease-out infinite;
}

.btn-shockwave.is-active:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  animation: shockwave 1s .65s ease-out infinite;
}

.btn-shockwave.is-active:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  animation: shockwave 1s .5s ease-out infinite;
}

@-webkit-keyframes shockwaveJump {
  0% {
    transform: scale(1);
  }

  40% {
    transform: scale(1.08);
  }

  50% {
    transform: scale(0.98);
  }

  55% {
    transform: scale(1.02);
  }

  60% {
    transform: scale(0.98);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes shockwaveJump {
  0% {
    transform: scale(1);
  }

  40% {
    transform: scale(1.08);
  }

  50% {
    transform: scale(0.98);
  }

  55% {
    transform: scale(1.02);
  }

  60% {
    transform: scale(0.98);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes shockwave {
  0% {
    transform: scale(1);
    box-shadow: 0 0 2px rgba(var(--mdb-primary-rgb), 0.25), inset 0 0 1px rgba(var(--mdb-primary-rgb), 0.25);
  }

  95% {
    box-shadow: 0 0 50px transparent, inset 0 0 30px transparent;
  }

  100% {
    transform: scale(2.25);
  }
}
</style>