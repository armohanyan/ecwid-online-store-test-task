<template>
  <div class="pagination">
    <div class="pagination__status showing-status">
      Showing
      <span class="showing-status__pages">
        {{ startItem }} – {{ endItem }}
      </span>
      of <span class="showing-status__total">{{ totalItems }}</span> items.
    </div>

    <div>
      <button
        class="btn btn-default btn-medium pagination__nav pagination__nav--prev"
        :disabled="currentPage <= 1"
        @click="$emit('update:currentPage', currentPage - 1)"
      >
        <span class="svg-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
            <path fill="#010101"
                  d="M18.5 3.85l-8.9 9.02 8.9 9.27c.66.65.66 1.71 0 2.36-.67.65-1.74.65-2.4 0L6 14.06c-.33-.33-.5-.76-.5-1.18 0-.43.17-.86.5-.1L16.1 1.49c.66-.65 1.74-.65 2.41 0 .66.65.66 1.71-.01 2.36z" />
          </svg>
        </span>
      </button>

      <span class="pagination__label">
        Page:
        <span class="pagination__current">
          <input
            type="number"
            class="form-control input-medium"
            :value="currentPage"
            @input="$emit('update:currentPage', parseInt($event.target.value))"
            :min="1"
            :max="totalPages"
          />
        </span>
        of <span class="pagination__total">{{ totalPages }}</span>
      </span>

      <button
        class="btn btn-default btn-medium pagination__nav pagination__nav--next"
        :disabled="currentPage >= totalPages"
        @click="$emit('update:currentPage', currentPage + 1)"
      >
        <span class="svg-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
            <path fill="#010101"
                  d="M7.5 22.15l8.9-9.02-8.9-9.28c-.66-.65-.66-1.71 0-2.36.67-.65 1.74-.65 2.4 0L20 11.94c.33.33.5.76.5 1.18 0 .43-.17.86-.5 1.18L9.9 24.51c-.66.65-1.74.65-2.41 0-.66-.65-.66-1.71.01-2.36z" />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { currentPage, itemsPerPage, totalItems, totalPages } = defineProps<{
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}>()

const startItem = computed(() => (currentPage - 1) * itemsPerPage + 1)
const endItem = computed(() =>
  Math.min(currentPage * itemsPerPage, totalItems),
)
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>
