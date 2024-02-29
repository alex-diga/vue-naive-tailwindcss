<template>
  <div class="w-4/5 flex flex-wrap items-center">
    <span class="w-1/2">1</span>
    <span class="w-1/2">2</span>
    <span class="w-1/2">3</span>
    <span class="w-1/2">4</span>
  </div>
  <Video :url="videoUrl"></Video>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Video from '@/components/video.vue'

const videoUrl = ref(
  'http://191.136.2.121:3554/40606499003726552912368959825241/2844696442.flv'
)

onMounted(() => {})
</script>

<style scoped lang="less"></style>
