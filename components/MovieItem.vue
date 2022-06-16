<template>
  <nuxt-link
    :to="`movies/${movie.id}`"
    class="radius-sm bg-gray-100 flex rounded-md overflow-hidden border border-custom-gray-300"
  >
    <div class="h-[190px] w-[128px] flex p-1 rounded-l-md">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        class="w-full object-cover rounded-l-md"
      />
    </div>
    <div class="flex flex-col py-4 px-3">
      <h3 class="text-base font-bold line-clamp-2 mb-auto">
        {{ movie.title }}
      </h3>
      <span class="text-gray-600 text-xs mb-4">{{ movie.release_date }}</span>
      <ul class="flex flex-wrap list-disc list-inside gap-4">
        <li
          v-for="genre in genreItems"
          :key="genre.id"
          class="text-gray-600 text-xs"
        >
          {{ genre.name }}
        </li>
      </ul>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'MovieItem',
  props: {
    movie: {
      type: Object,
      required: true,
    },
    genres: {
      type: Array,
      required: true,
    },
  },
  computed: {
    genreItems() {
      return this.genres.filter((item) =>
        this.movie.genre_ids.includes(item.id)
      )
    },
  },
}
</script>
