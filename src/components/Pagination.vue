<template>
  <nav>
    <ul class="pagination justify-content-center mb-0">
      <li class="page-item" :class="{ 'disabled': pagination.page <= 1 || isLoading }">
        <a class="page-link" href="" @click.prevent="pagination.page = 1; triggerPagination()" data-mdb-ripple-init>
          <i class="fa-solid fa-angles-left"></i>
        </a>
      </li>
      <li class="page-item" :class="{ 'disabled': pagination.page <= 1 || isLoading }">
        <a class="page-link" href="" @click.prevent="pagination.page--; triggerPagination()" data-mdb-ripple-init>
          <i class="fa-solid fa-angle-left"></i>
        </a>
      </li>
      <li v-for="pageNumber in displayedPages" class="page-item"
        :class="{ 'active': pageNumber === pagination.page, 'disabled': isLoading }">
        <a class="page-link" href="" @click.prevent="pagination.page = pageNumber; triggerPagination()"
          data-mdb-ripple-init>
          {{ pageNumber }}
        </a>
      </li>
      <li class="page-item" :class="{ 'disabled': pagination.totalPages == pagination.page || isLoading }">
        <a class="page-link" href="" @click.prevent="pagination.page++; triggerPagination()" data-mdb-ripple-init>
          <i class="fa-solid fa-angle-right"></i>
        </a>
      </li>
      <li class="page-item" :class="{ 'disabled': pagination.totalPages == pagination.page || isLoading }">
        <a class="page-link" href="" @click.prevent="pagination.page = pagination.totalPages; triggerPagination()"
          data-mdb-ripple-init>
          <i class="fa-solid fa-angles-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pagination', 'isLoading'],
  emits: ['update:pagination', 'paginationFunction', 'update:isLoading'],

  methods: {
    triggerPagination() {
      this.$emit('paginationFunction')
    },
  },

  computed: {
    displayedPages() {
      const pagination = this.pagination
      const visibleButtons = 3;
      const pageCount = pagination.totalPages;
      let start = Math.max(1, pagination.page - (visibleButtons - 2));
      let end = Math.min(pageCount, start + (visibleButtons - 1));

      if (end - start < visibleButtons - 1) {
        end = Math.min(pageCount, pagination.page + (visibleButtons - 2));
        start = Math.max(1, end - (visibleButtons - 1));
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  }
}
</script>