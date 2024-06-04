<template>
  <div class="container my-5">
    <h1 class="fw-bolder mb-4 text-center">My Orders</h1>
    <SearchBar searchId="myOrdersSearch" v-model:searchValue="search" v-model:isLoading="isLoading"
      @searchFunction="getMyOrders" class="mb-4" />

    <div v-if="!myOrders" class="text-center my-5">
      <div class="spinner-border"></div>
    </div>

    <div v-else class="w-100" :class="[isLoading ? 'placeholder bg-light' : '']">
      <div v-if="myOrders.length">
        <div class="table-responsive">
          <table class="table align-middle table-hover text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Lessons</th>
                <th>Name</th>
                <th>Phone</th>
                <th>IP Address</th>
                <th>Datetime</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order, index in myOrders" :key="order._id">
                <td>{{ index + pagination.start }}</td>
                <td>
                  <div v-for="lesson in order.booked_lessons">
                    {{ lesson.subject }} (x{{ lesson.quantity }})
                  </div>
                </td>
                <td>{{ order.username }}</td>
                <td>{{ order.phone }}</td>
                <td>{{ order.ip_address }}</td>
                <td>
                  {{ new Intl.DateTimeFormat('default', { dateStyle: 'long', timeStyle: 'short' }).format(new
                    Date(order.datetime)) }}
                </td>
                <td>AED {{ order.total_price }}</td>
                <td>
                  <div v-if="order.ip_address == user.ipAddress">
                    <button v-if="order.booked_lessons.length == 1" data-mdb-ripple-init
                      :class="`btn btn-sm btn${order.booked_lessons[0].my_rating ? '-outline' : ''}-warning fw-bold w-100`"
                      @click="ratingModalOneOrder = order; ratingModalTwoLesson = order.booked_lessons[0]; userRating = 0; ratingMessage = ''"
                      data-mdb-modal-init data-mdb-target="#ratingModalTwo">
                      {{ order.booked_lessons[0].my_rating ? `★ ${order.booked_lessons[0].my_rating}` : 'Rate' }}
                    </button>
                    <button v-else class="btn btn-sm btn-warning w-100" data-mdb-ripple-init data-mdb-modal-init
                      data-mdb-target="#ratingModalOne" @click="ratingModalOneOrder = order">
                      Rate
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="mt-3 d-flex flex-column flex-lg-row justify-content-lg-between align-items-center gap-4">
          <PaginationWrapper v-model:pagination="pagination" label="orders">
            <Pagination v-model:pagination="pagination" v-model:isLoading="isLoading"
              @paginationFunction="getMyOrders" />
            <SelectBar selectId="ordersPerPage" :options="paginationOptions" v-model:selectValue="pagination.length"
              @selectFunction="getMyOrders" label="Orders per page" :group="false" />
          </PaginationWrapper>
        </div>

      </div>

      <div v-else class="alert alert-danger" role="alert">
        <span :class="{ 'fw-bold': !search }">No order history found</span>
        <span v-if="!search"> in your current network. If you have ordered from a different network, try
          searching by your <strong>name</strong> or <strong>phone</strong>.
        </span>
      </div>
    </div>
  </div>

  <!-- Rating Modal One - Lesson Selection -->
  <div class="modal fade" id="ratingModalOne" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content rounded-7">
        <div class="modal-header">
          <h5 class="modal-title">Select a lesson</h5>
          <button type="button" class="btn-close" data-mdb-ripple-init data-mdb-dismiss="modal"></button>
        </div>
        <div class="modal-body p-0">
          <div class="table-responsive">
            <table class="table align-middle table-hover text-nowrap mb-0">
              <tbody>
                <tr v-for="lesson in ratingModalOneOrder.booked_lessons">
                  <td><i class="fa-duotone fa-2x fa-fw" :class="`${lesson.icon} text-${lesson.color}`"></i></td>
                  <th class="w-100">{{ lesson.subject }}</th>
                  <td>
                    <button @click="ratingModalTwoLesson = lesson; userRating = 0; ratingMessage = ''"
                      :class="`w-100 btn btn-sm btn${lesson.my_rating ? '-outline' : ''}-warning`" data-mdb-ripple-init
                      data-mdb-modal-init data-mdb-target="#ratingModalTwo">
                      {{ lesson.my_rating ? `★ ${lesson.my_rating}` : 'Rate' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Rating Modal One -->

  <!-- Rating Modal Two - Lesson Rating -->
  <div class="modal fade" id="ratingModalTwo" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-7">
        <div class="modal-header">
          <h5 class="modal-title">Rate this lesson</h5>
          <button type="button" class="btn-close" data-mdb-ripple-init data-mdb-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          <i class="fa-duotone fa-3x fa-fw"
            :class="`${ratingModalTwoLesson.icon} text-${ratingModalTwoLesson.color}`"></i>
          <h5 class="mt-2 mb-3">{{ ratingModalTwoLesson.subject }}</h5>
          <ul class="rating justify-content-center" data-mdb-rating-init data-mdb-dynamic="true">
            <li v-for="rating, index in ['Bad', 'Poor', 'OK', 'Good', 'Excellent']">
              <i class="fal fa-star fa-2x text-warning" :title="rating" @click="userRating = index + 1"></i>
            </li>
          </ul>
          <p class="mt-3 mb-0" v-if="ratingMessage" v-html="ratingMessage"></p>
        </div>
        <div class="modal-footer border-0 mx-auto">
          <button v-if="ratingMessage" class="btn btn-secondary" data-mdb-ripple-init data-mdb-modal-init
            data-mdb-target="#ratingModalOne">
            Go back
          </button>
          <button type="button" class="btn btn-warning" data-mdb-ripple-init :disabled="!userRating"
            @click="rateLesson">
            Rate
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Rating Modal Two -->
</template>

<script>
import { sendRequestToServer, btnLoader } from '@/assets/scripts';
import Pagination from '@/components/Pagination.vue';
import PaginationWrapper from '@/components/PaginationWrapper.vue';
import SearchBar from '@/components/SearchBar.vue';
import SelectBar from '@/components/SelectBar.vue';


export default {
  components: { SearchBar, PaginationWrapper, Pagination, SelectBar },

  data() {
    return {
      myOrders: null,
      search: "",
      isLoading: "",
      pagination: {
        page: 0,
        length: 0,
        total: 0,
        filtered: 0,
        totalPages: 0,
        start: 0,
        end: 0,
      },
      paginationOptions: [
        { "name": "Default", "value": 0 },
        { "name": "5", "value": 5 },
        { "name": "10", "value": 10 },
        { "name": "All", "value": 0 }
      ],
      ratingModalOneOrder: {},
      ratingModalTwoLesson: {},
      userRating: 0,
      ratingMessage: "",
      user: { ipAddress: "" }
    }
  },

  created() {
    this.getMyOrders()
  },

  methods: {
    async getMyOrders() {
      this.isLoading = true;
      const data = { search: this.search, ...this.pagination };
      try {
        const URL = `${this.$root.serverURL}order/myorders`
        const response = await sendRequestToServer(URL, data);
        this.pagination = response.pagination;
        this.paginationOptions[0].value = this.pagination.defaultLength
        this.paginationOptions.at(-1).value = this.pagination.total
        this.myOrders = response.orders;
        if (!this.search && this.myOrders) {
          this.user.ipAddress = this.myOrders[0].ip_address;
        }
      } catch (error) {
        this.myOrders = [];
        console.log(`Error getting orders: ${error}`);
      }
      this.isLoading = false;
    },

    async rateLesson(event) {
      const btn = event.target;
      const btnText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = btnLoader;

      try {
        const data = {
          lessonId: this.ratingModalTwoLesson._id,
          rating: this.userRating,
        };
        const URL = `${this.$root.serverURL}lessons/rate`
        const result = await sendRequestToServer(URL, data, "PUT");
        if (result.ratingSuccessful) {
          this.ratingMessage = "Thanks for rating!";
          await this.getMyOrders();
          this.ratingModalOneOrder = this.myOrders.filter((order) => order._id == this.ratingModalOneOrder._id)[0] || {};
        }
      } catch (error) {
        this.ratingMessage = error;
        console.log(error);
      }

      btn.disabled = false;
      btn.innerHTML = btnText;
    },
  },

  mounted() {
    document.querySelectorAll(".modal").forEach(modal => { new mdb.Modal(modal) })
    new mdb.Rating(document.querySelector(".rating"));
  },

  watch: {
    ratingModalTwoLesson() {
      document.querySelectorAll(".rating .fa-star").forEach((el) => {
        el.classList.remove("fas", "active");
      });
    },
  }
}
</script>