<template>
  <section class="container mx-auto">
    <div class="w-full flex justify-center py-12" v-if="loading.initial">
      <div
        class="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"
      ></div>
    </div>
    <template v-else>
      <div
        class="w-full bg-custom-gray-200 rounded-md flex items-center justify-between mt-[70px] py-[26px] px-8 gap-x-[64px]"
      >
        <div class="flex items-center gap-x-8">
          <span>Search by release date:</span>
          <div class="flex flex-col relative">
            <span class="absolute -top-6">from</span>
            <input
              type="date"
              v-model="searchParams['release_date.gte']"
              :max="searchParams['release_date.lte']"
              class="h-[32px] w-[260px] rounded-md px-4"
            />
          </div>
          <div class="flex flex-col relative">
            <span class="absolute -top-6">to</span>
            <input
              type="date"
              v-model="searchParams['release_date.lte']"
              :min="searchParams['release_date.gte']"
              class="h-[32px] w-[260px] rounded-md px-4"
            />
          </div>
        </div>
        <span
          class="h-[33px] w-[92px] rounded-full bg-custom-blue-100 flex items-center justify-center cursor-pointer text-white"
          @click="searchMovies"
          >Search</span
        >
      </div>
      <div
        class="grid grid-cols-3 gap-x-16 gap-y-8 relative mt-[120px]"
        :class="{ 'is-loading': loading.page }"
      >
        <template v-for="movie in movies">
          <movie-item
            :key="'movie-' + movie.id"
            :movie="movie"
            :genres="genres"
          ></movie-item>
        </template>
      </div>
      <div
        class="flex flex-col items-center w-full mt-[170px] mb-[100px] gap-y-4"
      >
        <div class="flex items-center justify-center gap-4">
          <span
            @click="nextPage"
            :class="{ 'hover:text-blue-500 cursor-pointer': totalPages > page }"
            >Next Page</span
          >
          |
          <span
            @click="previousPage"
            :class="{ 'hover:text-blue-500 cursor-pointer': page > 1 }"
            >Previous Page</span
          >
        </div>
        <span class="text-[#989898]">{{ indexesText }}</span>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: 'movie-list',
  layout: 'main',
  data() {
    return {
      loading: {
        initial: true,
        page: true,
      },
      movies: [],
      genres: [],
      page: 1,
      searchParams: {},
      totalPages: null,
    }
  },
  computed: {
    indexesText() {
      return `Showing results ${(this.page - 1) * 20 + 1} - ${this.page * 20}`
    },
  },
  mounted() {
    this.getGenres()
    this.getMovies()
  },
  methods: {
    async getGenres() {
      await this.$axios
        .get('https://api.themoviedb.org/3/genre/movie/list', {
          params: { api_key: 'f62f750b70a8ef11dad44670cfb6aa57' },
        })
        .then((response) => {
          this.genres = response.data.genres
        })
        .catch((err) => {
          console.log('errpr happened!', err.response)
        })
    },
    async getMovies() {
      await this.$axios
        .get(`https://api.themoviedb.org/3/discover/movie`, {
          params: {
            api_key: 'f62f750b70a8ef11dad44670cfb6aa57',
            page: this.page,
            ...this.searchParams,
          },
        })
        .then((response) => {
          this.movies = response.data.results
          this.totalPages = response.data.total_pages
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        })
        .catch((err) => {
          console.log('errpr happened!', err.response)
        })

      this.loading.initial = false
      this.loading.page = false
    },
    previousPage() {
      if (this.page === 1) return
      if (this.loading.page) return
      this.loading.page = true

      this.page--
      this.getMovies()
    },
    nextPage() {
      if (this.page >= this.totalPages) return

      if (this.loading.page) return
      this.loading.page = true
      this.page++
      this.getMovies()
    },
    searchMovies() {
      if (this.loading.page) return
      this.loading.page = true
      this.page = 1

      this.getMovies()
    },
  },
}
</script>
<style scoped>
.is-loading ::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.01);
  width: 100%;
  height: 100%;
}
</style>
