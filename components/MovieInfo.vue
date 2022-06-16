<template>
  <div class="flex flex-col flex-1 gap-y-4 pt-8">
    <div class="w-full flex justify-between">
      <span class="text-base font-bold">Budget</span>
      <span>${{ movie.budget.toLocaleString() }}</span>
    </div>
    <div class="w-full flex justify-between">
      <span class="text-base font-bold">Revenue</span>
      <span>${{ movie.revenue.toLocaleString() }}</span>
    </div>
    <div class="w-full flex justify-between">
      <span class="text-base font-bold">Release Date</span>
      <span> {{ movie.release_date }}</span>
    </div>
    <div class="w-full flex justify-between">
      <span class="text-base font-bold">Runtime</span>
      <span> {{ customRuntimeText }}</span>
    </div>
    <div class="w-full flex justify-between">
      <span class="text-base font-bold">Score</span>
      <MovieRating
        :votes="movie.vote_count"
        :percent="movie.vote_average * 10"
      ></MovieRating>
    </div>
    <div class="w-full flex justify-between">
      <span class="text-base font-bold">Genres</span>
      <span>{{ genreList }}</span>
    </div>
    <div class="w-full flex justify-between">
      <span class="text-base font-bold">IMDB Link</span>
      <a
        class="underline text-blue-500"
        target="_blank"
        :href="'https://www.imdb.com/title/' + movie.imdb_id"
        >Link</a
      >
    </div>
    <div class="w-full flex justify-between">
      <span class="text-base font-bold">Homepage Link</span>
      <a
        class="underline text-blue-500"
        target="_blank"
        :href="'https://www.imdb.com/title/' + movie.imdb_id"
        >Link</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieInfo',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    customRuntimeText() {
      const date = new Date(null)
      date.setSeconds(this.movie.runtime)
      const hour = date.toISOString().substr(14, 2)
      const minute = date.toISOString().substr(17, 2)
      return `${hour}h ${minute}m`
    },
    genreList() {
      return this.movie.genres
        .reduce((f, c) => {
          f.push(c.name)
          return f
        }, [])
        .join(', ')
    },
  },
}
</script>
