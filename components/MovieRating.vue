<template>
  <div class="flex items-center w-[300px] justify-end">
    <span class="text-sm font-medium">{{ votes }} votes</span>
    <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
      <div
        class="h-5 bg-yellow-400 rounded"
        :style="{ width: percent + '%' }"
      ></div>
    </div>
    <span class="text-sm font-medium">70%</span>
  </div>
</template>
<script>
export default {
  name: 'MovieRating',
  props: {
    votes: {
      type: Number,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
  },
}
</script>
