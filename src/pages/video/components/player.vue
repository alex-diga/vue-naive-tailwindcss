<template>
  <div
    class="relative h-full w-full playerBox"
    :class="[isFullscreen ? '' : 'borderBox']"
    ref="el"
  >
    <div
      class="tipBox w-full absolute left-0 bottom-0 z-10 flex justify-between px-3"
      v-if="props.hideTip"
    >
      <span class="videoName mr-2" :title="props.name" v-show="!isFullscreen">
        {{ props.name }}
      </span>
      <div>
        <el-icon
          color="#FFFFFF"
          class="mr-2.5 cursor-pointer"
          @click="onCancel"
        >
          <Minus />
        </el-icon>
        <el-icon class="cursor-pointer" color="#FFFFFF" @click="toggle">
          <Rank />
        </el-icon>
      </div>
    </div>
    <Video
      ref="el"
      :url="props.url || flvUrl"
      width="100%"
      height="100%"
    ></Video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFullscreen } from '@vueuse/core'
import Video from '@/components/video/index.vue'
import { getflvurl } from '@/utils/request'
import type { IPlayer } from '../types'

type IProps = IPlayer & {
  hideTip?: boolean
}

const props = defineProps<IProps>()
const emits = defineEmits<{
  (e: 'onCancel', player: IPlayer): void
}>()

const el = ref()
const flvUrl = ref('')

const { toggle, isFullscreen } = useFullscreen(el)

onMounted(() => {
  getUrl()
})

const onCancel = () => {
  emits('onCancel', props)
}

const getUrl = () => {
  if (!props.url) {
    getflvurl([props.code]).then((res) => {
      if (res.code === 200) {
        flvUrl.value = res?.result?.[props.code]
      }
    })
  }
}
</script>

<style scoped lang="less">
.playerBox {
  .tipBox {
    opacity: 0;
    transition: opacity 0.5s linear;
  }

  .videoName {
    flex: 1;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
  }

  &:hover {
    .tipBox {
      opacity: 1;
    }
  }
}
.borderBox {
  border: 1px solid #d8d8d8;
}
</style>
