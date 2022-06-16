<template>
  <section class="container mx-auto pb-16">
    <template v-if="movie">
      <div
        class="w-full bg-custom-gray-200 rounded-md flex items-center mt-[70px] py-[18px] px-8 gap-x-[64px]"
      >
        <nuxt-link
          to="/movies"
          class="h-[33px] w-[92px] rounded-full bg-custom-blue-100 flex items-center justify-center cursor-pointer text-white"
          >Back</nuxt-link
        >
        <div class="flex flex-col">
          <span class="text-lg font-bold">
            {{ movie.title }}
          </span>
          <span class="text-lg">
            {{ movie.tagline }}
          </span>
        </div>
      </div>

      <div class="w-full mt-[78px] flex gap-x-[70px]">
        <div class="w-[330px] h-[495px]">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="w-full object-cover rounded-xl"
          />
        </div>

        <MovieInfo :movie="movie"></MovieInfo>
      </div>
      <div class="w-full mt-[50px]">
        <p>{{ movie.overview }}</p>
      </div>
      <div class="w-full mt-[80px]">
        <span class="text-lg font-bold">Credit:</span>
        <p>{{ creditList.join(', ') }}</p>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: 'MovieId',
  data() {
    return {
      loading: {
        initial: true,
      },
      movie: null,
      genres: [],
      credits: null,
      page: 1,
    }
  },
  computed: {
    creditList() {
      if (!this.credits) return
      const allCredits = Object.values(this.credits).reduce((f, c) => {
        if (Array.isArray(c)) f.push(...c)
        return f
      }, [])

      return allCredits
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10)
        .reduce((f, c) => {
          f.push(c.name)
          return f
        }, [])
    },
  },
  async mounted() {
    const params = {
      params: { api_key: 'f62f750b70a8ef11dad44670cfb6aa57' },
    }

    const urls = [
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}`,
      'https://api.themoviedb.org/3/genre/movie/list',
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}/credits`,
    ]

    const requests = urls.map((url) => this.$axios.get(url, params))

    await Promise.all(requests).then((responses) => {
      this.movie = responses[0].data
      this.genres = responses[1].data.genres
      this.credits = responses[2].data
    })

    this.loading.initial = false
  },
}
</script>
