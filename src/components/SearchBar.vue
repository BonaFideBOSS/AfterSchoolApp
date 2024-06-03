<template>
  <div class="input-group input-group-lg border rounded-4 overflow-hidden">
    <label class="input-group-text border-0" :for="searchId">
      <i v-if="!isLoading" class="fa-solid fa-magnifying-glass"></i>
      <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
    </label>
    <input @input="handleInput" :id="searchId" :name="searchId" class="form-control border-0" type="text"
      placeholder="Search" autocomplete="off" @keyup.enter="triggerSearch" />
    <span v-if="searchValue" class="input-group-text border-0" role="button" @click="clearInput">✕</span>
  </div>
</template>

<script>
import { debounce } from '@/assets/scripts';

export default {
  props: ['searchId', 'searchValue', 'isLoading'],
  emits: ['update:searchValue', 'searchFunction', 'update:isLoading'],

  methods: {
    handleInput(event) {
      this.$emit('update:searchValue', event.target.value)
      this.$emit('update:isLoading', true)
      this.triggerSearch()
    },

    clearInput() {
      this.$emit('update:searchValue', '')
      document.getElementById(this.searchId).value = '';
      this.triggerSearch()
    },

    triggerSearch: debounce(function () {
      this.$emit('searchFunction')
    })
  }
}
</script>