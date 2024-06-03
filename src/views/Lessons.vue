<template>
  <div class="my-5 container">
    <h1 class="fw-bolder mb-4 text-center">Lessons & <span class="text-danger">Activities</span></h1>

    <div class="d-flex flex-wrap flex-md-nowrap gap-3">
      <SearchBar searchId="search" v-model:searchValue="search" v-model:isLoading="isLoading"
        @searchFunction="getLessons" />

      <div class="d-flex gap-3 w-100">
        <SelectGroup selectId="sortBy" :options="sortOptions" v-model:selectValue="sortBy" @selectFunction="getLessons"
          label="Sort By" :group="true" size="lg" />

        <button @click="toggleSortOrder" class="btn btn-lg btn-primary rounded-4" data-mdb-ripple-init>
          <i :class="`fa-solid fa-arrow-${sortOrderAsc ? 'up' : 'down'}-wide-short`"></i>
        </button>
      </div>
    </div>

    <div v-if="!lessons" class="text-center my-5">
      <div class="spinner-border"></div>
    </div>

    <div v-else class="w-100" :class="[isLoading ? 'placeholder bg-light' : '']">
      <div v-if="lessons.length > 0" class="mt-5">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          <div v-for="lesson in lessons" class="col">
            <div class="card h-100 rounded-9 w-100 text-light bg-gradient"
              :class="[lesson.spaces == 0 || !canAddToCart(lesson) ? 'opacity-50' : 'lesson-card', `bg-${lesson.color}`]"
              @click="addToCart(lesson)" data-mdb-ripple-init :data-mdb-ripple-color="lesson.color" role="button">
              <div class="card-body d-flex flex-column text-center gap-4 h-100">
                <div class="my-auto lesson-image">
                  <img v-if="lesson.image" class="w-100" :src="lesson.image" :alt="lesson.subject">
                  <i v-else class="fa-duotone fa-10x fa-fw" :class="lesson.icon"></i>
                </div>
                <div class="d-flex flex-column gap-4">
                  <h2 class="card-title mb-0 fw-bold">{{ lesson.subject }}</h2>
                  <h4 class="card-subtitle mb-0 opacity-75 fw-semibold">AED {{ lesson.price }}</h4>
                  <div class="fs-5 card-text d-flex gap-1 flex-wrap justify-content-center">
                    <span class="badge bg-light bg-opacity-10 fw-normal">
                      <span class="text-warning">★</span>
                      {{ lesson.average_rating || 0 }} ({{ lesson.ratings ? lesson.ratings.length : 0 }})
                    </span>
                    <span class="badge bg-light bg-opacity-10 fw-normal">{{ lesson.location }}</span>
                    <span class="badge bg-light bg-opacity-10 fw-normal">
                      {{ lesson.spaces }} spaces
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 d-flex flex-column flex-lg-row justify-content-lg-between align-items-center gap-4">
          <PaginationWrapper v-model:pagination="pagination" label="lessons">
            <Pagination v-model:pagination="pagination" v-model:isLoading="isLoading"
              @paginationFunction="getLessons" />
            <SelectGroup selectId="lessonsPerPage" :options="paginationOptions" v-model:selectValue="pagination.length"
              @selectFunction="getLessons" label="lessons per page" :group="false" />
          </PaginationWrapper>
        </div>
      </div>

      <div v-else class="alert alert-danger mt-4" role="alert" v-text="lessonsErrorMessage"></div>
    </div>
  </div>
</template>

<script>
import { sendRequestToServer, notify } from '@/assets/scripts';
import Pagination from '@/components/Pagination.vue';
import SearchBar from '@/components/SearchBar.vue'
import SelectGroup from '@/components/SelectBar.vue';
import PaginationWrapper from '@/components/PaginationWrapper.vue';

export default {
  components: { SearchBar, SelectGroup, Pagination, PaginationWrapper },

  data() {
    return {
      search: "",
      isLoading: false,
      sortOptions: [
        { "name": "Subject", "value": "subject" },
        { "name": "Location", "value": "location" },
        { "name": "Price", "value": "price" },
        { "name": "Availability (spaces)", "value": "spaces" },
        { "name": "Rating", "value": "average_rating" },
        { "name": "Rating Count", "value": "rating_count" },
      ],
      sortBy: "subject",
      sortOrderAsc: true,
      lessons: null,
      lessonsErrorMessage: "No lessons found.",
      pagination: {
        defaultLength: 6,
        page: 0,
        length: 6,
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
      savedLessons: this.$root.savedLessons,
      cart: this.$root.cart,
    }
  },

  created() {
    this.getLessons()
  },

  methods: {
    async getLessons() {
      this.isLoading = true;
      const data = {
        search: this.search,
        sortBy: this.sortBy,
        sortOrder: this.sortOrderAsc ? "asc" : "desc",
        ...this.pagination,
      };
      try {
        const URL = `${this.$root.serverURL}lessons`
        const response = await sendRequestToServer(URL, data);
        this.pagination = { ...this.pagination, ...response.pagination };
        this.paginationOptions[0].value = this.pagination.defaultLength
        this.paginationOptions.at(-1).value = this.pagination.total
        this.lessons = response.lessons;
      } catch (error) {
        this.lessons = [];
        this.lessonsErrorMessage = "Failed to load lessons.";
        console.log(`${this.lessonsErrorMessage} Error: ${error}`);
      }
      this.isLoading = false;
    },

    toggleSortOrder() {
      this.sortOrderAsc = !this.sortOrderAsc;
      this.getLessons()
    },

    addToCart(lesson) {
      if (this.canAddToCart(lesson)) {
        const lessonId = lesson._id;
        this.cart.push(lessonId);
        notify(`Added <b>${lesson.subject}</b> to cart!`);
        const isLessonSaved =
          this.savedLessons.filter((l) => l._id === lessonId).length === 0;
        if (isLessonSaved) {
          this.savedLessons.push(lesson);
        }
      } else {
        notify("No more spaces available.", "danger");
      }
    },

    cartItemCount(lessonId) {
      return this.cart.filter((id) => id === lessonId).length;
    },

    canAddToCart(lesson) {
      return lesson.spaces > this.cartItemCount(lesson._id);
    },
  },
}
</script>