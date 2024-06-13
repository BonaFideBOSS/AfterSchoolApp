<template>
  <div class="container my-5">
    <h1 class="fw-bolder mb-4 text-center">My Cart</h1>
    <div class="small d-flex flex-wrap text-nowrap justify-content-center justify-content-md-end mb-2"
      v-if="cart.length > 0">
      <RouterLink to="/" class="btn btn-link" data-mdb-ripple-init data-mdb-ripple-color="dark">
        <i class="fa-solid fa-share fa-flip-horizontal me-2"></i>
        <span>Continue shopping</span>
      </RouterLink>
      <button @click="emptyCart" class="btn text-danger btn-link" data-mdb-ripple-init data-mdb-ripple-color="dark">
        <i class="fa-solid fa-trash-can me-2"></i>
        <span>Empty cart</span>
      </button>
    </div>

    <div v-if="cart.length > 0">
      <div class="table-responsive">
        <table class="table align-middle table-hover text-nowrap">
          <thead>
            <tr>
              <th>#</th>
              <th colspan="2">Lesson</th>
              <th class="text-end">Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="fs-5">
            <tr v-for="lesson, index in cartDetails">
              <td>{{ index + 1 }}</td>
              <td>
                <i class="fa-duotone fa-2x fa-fw" :class="`${lesson.icon} text-${lesson.color}`"></i>
              </td>
              <td class="text-start w-100">
                <p class="mb-0">{{ lesson.subject }}</p>
                <p class="mb-0 small text-muted">{{ lesson.location }}</p>
              </td>
              <td class="text-end">
                <p class="mb-0 small text-muted">{{ lesson.quantity }}x{{ lesson.price }}</p>
                <p class="mb-0">AED {{ lesson.total }}</p>
              </td>
              <td class="text-center">
                <button @click="removeFromCart(lesson)" class="btn btn-sm btn-outline-danger rounded-4"
                  data-mdb-ripple-init data-mdb-ripple-color="dark">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot class="fs-5 text-end">
            <tr>
              <th colspan="3">Total:</th>
              <th>AED {{ cartTotal }}</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      <Checkout :cartDetails="cartDetails" :cartTotal="cartTotal" />
    </div>

    <div v-else class="text-center">
      <p class="fs-5">Your cart is empty.</p>
      <RouterLink to="/" class="btn btn-lg btn-primary rounded-4" data-mdb-ripple-init data-mdb-ripple-color="dark">
        Browse lessons
      </RouterLink>
    </div>
  </div>
</template>

<script>
import Checkout from '@/components/Checkout.vue';
import { RouterLink } from 'vue-router'
export default {
  components: { RouterLink, Checkout },

  data() {
    return {
      savedLessons: this.$root.savedLessons,
      cart: this.$root.cart,
    }
  },

  methods: {
    emptyCart() {
      this.cart.length = 0
      this.savedLessons.length = 0
    },

    removeFromCart(lesson) {
      const index = this.cart.lastIndexOf(lesson._id);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    },

    canRemoveFromCart(lesson) {
      return this.cartItemCount(lesson._id) > 0;
    },

    cartItemCount(lessonId) {
      return this.cart.filter((id) => id === lessonId).length;
    },
  },

  computed: {
    cartDetails() {
      const uniqueLessonIds = Array.from(new Set(this.cart));
      return uniqueLessonIds.map((lessonId) => {
        const lesson = this.savedLessons.find(
          (lesson) => lesson._id === lessonId
        );
        const quantity = this.cartItemCount(lessonId);
        this.booked_lessons = {}
        return {
          ...lesson,
          quantity,
          total: quantity * lesson.price,
        };
      });
    },

    cartTotal() {
      return this.cartDetails.reduce((sum, lesson) => sum + lesson.total, 0);
    },
  }
}
</script>