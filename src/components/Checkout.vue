<template>
  <div class="text-end mt-4">
    <button data-mdb-ripple-init data-mdb-toggle="sidenav" data-mdb-target="#checkoutPage"
      class="btn btn-lg btn-warning btn-rounded col-12 col-md-5 col-lg-3">
      <span>Checkout</span>
      <i class="fa-solid fa-arrow-right ms-2"></i>
    </button>
  </div>

  <!-- Checkout -->
  <nav data-mdb-sidenav-init id="checkoutPage" class="sidenav py-4 w-100" data-mdb-mode="push" data-mdb-right="true"
    data-mdb-backdrop="true" data-mdb-scroll-container="#checkoutPageContent">
    <div class="container">
      <button data-mdb-ripple-init data-mdb-toggle="sidenav" data-mdb-target="#checkoutPage"
        class="btn btn-lg btn-secondary text-dark btn-floating">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    </div>
    <div id="checkoutPageContent" class="container text-center mb-4 pb-4">
      <img class="pageLogo mb-4" src="@/assets/img/bag.png" alt="checkout">
      <h1 class="fw-bolder mb-4 text-center">Checkout</h1>
      <p class="text-muted">Please fill the checkout form.</p>
      <form @submit.prevent="submitOrder" class="offset-md-3 col-md-6 offset-lg-4 col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input v-model="user.name" @input="validateUserName" type="text" id="username" class="form-control"
              placeholder="username" autocomplete="off"
              :class="{ 'border-danger': !user.isNameValid && user.name, 'border-success': user.isNameValid && user.name }" />
            <label for="username">Name</label>
          </div>
          <span v-if="!user.isNameValid && user.name" class="small text-danger">
            Name must only contain letters.
          </span>
        </div>

        <div class="mb-3">
          <div class="form-floating">
            <input v-model="user.phone" @input="validateUserPhone" type="tel" id="phone" class="form-control"
              placeholder="phone" autocomplete="off"
              :class="{ 'border-danger': !user.isPhoneValid && user.phone, 'border-success': user.isPhoneValid && user.phone }" />
            <label for="phone">Phone</label>
          </div>
          <span v-if="!user.isPhoneValid && user.phone" class="small text-danger">
            Phone must only contain numbers.
          </span>
        </div>

        <button :disabled="!(user.isNameValid && user.isPhoneValid)" type="submit" class="w-100 btn btn-lg"
          data-mdb-ripple-init :class="[user.isNameValid && user.isPhoneValid ? 'btn-success' : 'btn-secondary']">
          Submit Order
        </button>
      </form>
    </div>
  </nav>
  <!-- End of Checkout -->

  <!-- Order Completion Message -->
  <div class="modal fade" id="checkoutResult" tabindex="-1" data-mdb-backdrop="static" data-mdb-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-7">
        <div class="modal-body text-center">
          <div v-if="checkoutSuccessful">
            <i class="fa-light fa-circle-check fa-5x text-success my-4"></i>
            <h5 class="mb-0">Order Submitted!</h5>
          </div>
          <div v-else>
            <i class="fa-light fa-circle-x fa-5x text-danger my-4"></i>
            <h5 class="mb-0" v-text="orderErrorMessage"></h5>
          </div>
        </div>
        <div class="modal-footer border-0 mx-auto">
          <button v-if="checkoutSuccessful" @click="$router.push('/myorders')" class="btn btn-secondary"
            data-mdb-dismiss="modal" data-mdb-ripple-init>
            My order history
          </button>
          <button class="btn btn-primary" data-mdb-dismiss="modal" data-mdb-ripple-init>
            Okay
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Order Completion Message -->
</template>

<script>
import { sendRequestToServer, btnLoader } from '@/assets/scripts';
export default {
  props: ['cartDetails', 'cartTotal'],

  data() {
    return {
      savedLessons: this.$root.savedLessons,
      cart: this.$root.cart,
      user: {
        name: "",
        phone: "",
        isNameValid: false,
        isPhoneValid: false,
      },
      checkoutSuccessful: false,
      orderErrorMessage: "Order Failed!",
    }
  },

  mounted() {
    var checkoutPage = document.getElementById('checkoutPage');
    if (checkoutPage) {
      new mdb.Sidenav(checkoutPage)
      checkoutPage.addEventListener('show.mdb.sidenav', () => { document.body.style.overflow = "hidden" })
      checkoutPage.addEventListener('hide.mdb.sidenav', () => { document.body.style.overflow = "unset" })
    }
  },

  methods: {
    validateUserName() {
      this.user.isNameValid = /^[a-zA-Z]+$/.test(this.user.name);
    },

    validateUserPhone() {
      this.user.isPhoneValid = /^\d+$/.test(this.user.phone);
    },

    async submitOrder(event) {
      const btn = event.target.querySelector('[type="submit"]');
      const btnText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = btnLoader;
      try {
        if (!(this.user.isNameValid && this.user.isPhoneValid)) {
          this.orderErrorMessage = "Username or phone is invalid.";
          throw Error(this.orderErrorMessage);
        }

        const data = {
          username: this.user.name,
          phone: parseInt(this.user.phone),
          booked_lessons: this.cartDetails.map((item) => ({
            _id: item._id,
            quantity: item.quantity,
            total: item.total,
          })),
          total_price: this.cartTotal,
        };
        const URL = `${this.$root.serverURL}order/new`
        const result = await sendRequestToServer(URL, data);
        if (result.orderSuccessful) {
          this.checkoutSuccessful = true;
          this.$router.push('/');
          document.body.style.overflow = "unset"
          this.$nextTick(() => {
            this.cart.length = 0
            this.savedLessons.length = 0
          })
        } else {
          this.orderErrorMessage = result.errorMessage;
          throw Error(this.orderErrorMessage);
        }
      } catch (error) {
        console.log(error);
      } finally {
        const modal = document.getElementById("checkoutResult");
        new mdb.Modal(modal).show();
        modal.addEventListener("hidden.mdb.modal", () => {
          this.checkoutSuccessful = false;
        });
        btn.disabled = false;
        btn.innerHTML = btnText;
      }
    },

  },
}
</script>

<style scoped>
.pageLogo {
  width: 150px;
}
</style>