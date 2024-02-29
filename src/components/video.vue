<template>
  <video
    ref="videoEl"
    :muted="true"
    :width="props.width || 500"
    :height="props.height || 500"
  ></video>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import flvjs from 'flv.js'

type IProps = {
  url: string
  width?: number | string
  height?: number | string
}

const props = defineProps<IProps>()
const videoEl = ref()
const flvPlayer = ref()

const play = () => {
  if (flvjs.isSupported() && props.url) {
    flvPlayer.value = flvjs.createPlayer({
      type: 'flv',
      isLive: true,
      cors: true,
      hasAudio: false,
      hasVideo: true,
      url: props.url
    })

    flvPlayer.value.attachMediaElement(videoEl.value as HTMLVideoElement)
    flvPlayer.value.load()
    flvPlayer.value.play()
    flvPlayer.value.on(
      flvjs.Events.ERROR,
      (errorType: unknown, errorDetail: unknown, errorInfo: unknown) => {
        console.log('errorType--->', errorType)
        console.log('errorDetail--->', errorDetail)
        console.log('errorInfo--->', errorInfo)
      }
    )
  }
}

watch([props.url], () => {
  play()
})

onMounted(() => {
  play()
})

onBeforeUnmount(() => {
  if (flvPlayer.value) {
    flvPlayer.value.unload()
    flvPlayer.value.detachMediaElement()
    flvPlayer.value.destroy()
  }
})
</script>

<style scoped lang="less"></style>
