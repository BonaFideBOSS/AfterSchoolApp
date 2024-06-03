<template>
  <div :class="{ 'input-group input-group-lg border rounded-4 overflow-hidden': group }">
    <label v-if="group" class="input-group-text border-0" :for="selectId">{{ label }}</label>
    <select @change="handleChange" :id="selectId" :name="selectId" :data-mdb-size="size">
      <option v-for="option in options" :value="option.value" :text="option.name"></option>
    </select>
    <label v-if="!group" class="form-label select-label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: ["selectId", "options", "selectValue", "group", "label", "size"],
  emits: ["update:selectValue", "selectFunction"],

  methods: {
    handleChange(event) {
      this.$emit("update:selectValue", event.target.value);
      this.$emit("selectFunction");
    },
  },

  mounted() {
    mdb.Select.getOrCreateInstance(document.getElementById(this.selectId));
  },
};
</script>
