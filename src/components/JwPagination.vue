<template>
  <div class="flex items-center justify-between py-3 pagination">
    <div class="flex flex-1 justify-between text-center sm:hidden">
      <a
        href="#"
        class="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium w-24"
        :class="
          pages.prev
            ? 'text-gray-700 hover:bg-gray-50 cursor-pointer'
            : 'text-gray-400 cursor-not-allowed'
        "
        @click="pages.prev ? newPage(pages.prev) : null"
        >Previous</a
      >
      <a
        href="#"
        class="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium w-24"
        :class="
          pages.next
            ? 'text-gray-700 hover:bg-gray-50 cursor-pointer'
            : 'text-gray-400 cursor-not-allowed'
        "
        @click="pages.next ? newPage(pages.next) : null"
        >Next</a
      >
    </div>
    <div
      class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between text-sm font-light"
    >
      <div>
        Showing <span class="font-normal">{{ from }}</span> to
        <span class="font-normal">{{ to }}</span> of
        <span class="font-normal">{{ totalRecords }}</span> results
      </div>
      <div>
        <nav
          class="isolate inline-flex text-base items-center font-light bg-white rounded border border-gray-200"
          aria-label="Pagination"
        >
          <a
            href="#"
            class="relative inline-flex border-l rounded-l border-gray-100 px-4 py-1"
            :class="
              pages.prev
                ? 'hover:bg-gray-100 hover:text-[#5270ED] cursor-pointer'
                : 'text-gray-400 cursor-not-allowed'
            "
            @click="pages.prev ? newPage(pages.prev) : null"
          >
            Previous
          </a>
          <span v-for="(n, i) in pages.items" :key="i">
            <a
              href="#"
              class="relative inline-flex border-r border-gray-100 px-4 py-1 hover:bg-gray-100"
              :class="{ 'bg-gray-100 text-[#5270ED]': isCurrentPage(n) }"
              @click="
                () => {
                  console.log(
                    'Page clicked:',
                    n,
                    'currentPage:',
                    currentPage,
                    'match:',
                    currentPage === n
                  );
                  newPage(n);
                }
              "
            >
              {{ n }}
            </a>
          </span>
          <a
            href="#"
            class="relative inline-flex border rounded-r border-gray-100 px-4 py-1"
            :class="
              pages.next
                ? 'hover:bg-gray-100 hover:text-[#5270ED] cursor-pointer'
                : 'text-gray-400 cursor-not-allowed'
            "
            @click="pages.next ? newPage(pages.next) : null"
          >
            Next
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalRecords: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      from: 1,
      to: this.perPage,
      maxPages: Math.ceil(this.totalRecords / this.perPage),
      pages: {},
    };
  },
  computed: {
    isCurrentPage() {
      return (pageNumber) => {
        const result = this.currentPage === pageNumber;
        console.log('isCurrentPage check:', {
          pageNumber,
          currentPage: this.currentPage,
          result,
        });
        return result;
      };
    },
  },
  watch: {
    currentPage: {
      handler: function (val) {
        console.log('JwPagination currentPage changed:', val);
        this.setPage();
      },
      immediate: true,
    },
    totalRecords: function (val) {
      this.maxPages = Math.ceil(val / this.perPage);
      this.setPage();
    },
    perPage: function (val) {
      this.maxPages = Math.ceil(this.totalRecords / val);
      this.setPage();
    },
  },
  mounted() {
    // Initialize pagination without triggering API call
    this.setPage();
  },
  methods: {
    newPage: function (page) {
      if (page > 0 && page <= this.maxPages) {
        // Don't update internal state, just emit the event
        // Let the parent handle the state update
        this.$emit('onchange', page);
      }
    },
    setPage() {
      // Use the prop value instead of internal state
      const currentPage = this.currentPage;
      console.log('setPage called with currentPage:', currentPage);

      this.from = this.perPage * (currentPage - 1) + 1;
      const to = this.from + this.perPage - 1;
      this.to = to > this.totalRecords ? this.totalRecords : to;

      console.log('Before paginate() - pages:', this.pages);
      this.pages = this.paginate();
      console.log('After paginate() - pages:', this.pages);

      // Debug logging
      console.log('setPage called:', {
        currentPage: currentPage,
        from: this.from,
        to: this.to,
        totalRecords: this.totalRecords,
        perPage: this.perPage,
        pages: this.pages,
      });
    },
    paginate() {
      const current = this.currentPage;
      const max = this.maxPages;

      console.log('paginate() called with:', {
        current,
        max,
        currentPage: this.currentPage,
      });

      if (!current || !max) return null;

      let prev = current === 1 ? null : current - 1;
      let next = current === max ? null : current + 1;
      let items = [1];

      if (current === 1 && max === 1) return { current, prev, next, items };
      if (current > 4) items.push('…');

      let r = 2,
        r1 = current - r,
        r2 = current + r;

      for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i);

      if (r2 + 1 < max) items.push('…');
      if (r2 < max) items.push(max);

      const result = { current, prev, next, items };
      console.log('paginate() returning:', result);
      return result;
    },
  },
};
</script>

<style scoped>
.pagination {
  font-family: 'Inter', sans-serif !important;
}
</style>
