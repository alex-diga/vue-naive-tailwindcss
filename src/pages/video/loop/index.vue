<template>
  <div class="m-3">
    <router-link to="/" class="mr-20">首页</router-link>
    <router-link to="/video/multiple">点击进入多路视频播放</router-link>
    <img
      class="w-5.5 h-5.5 cursor-pointer"
      :src="shouldShow ? hideImg : showImg"
      alt=""
      @click="handleShow"
    />
  </div>
  <div class="flex">
    <div class="subjectList" v-show="shouldShow">
      <el-input v-model="search.key" style="width: 265px" placeholder="搜索" />
      <el-tree
        class="treeBox"
        ref="treeRef"
        style="max-width: 600px"
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps"
        @check="onTreecheck"
      />

      <div class="flex items-center justify-between mt-1.5">
        <div class="btn" @click="handlePlay">
          {{ isPlaying ? '取消' : '播放' }}
        </div>
        <div class="flex items-center">
          <span class="mr-1.5 tip">已选</span>
          <span class="checkNum">{{ shouldPlayLen }}</span>
        </div>
      </div>
    </div>
    <div
      class="flex-auto h-full overflow-y-auto overflow-x-hidden grid gap-2.5 grid-cols-3 grid-rows-3"
    >
      <VideoPlayer
        v-bind="item"
        :hide-tip="true"
        v-for="item in playingList"
        :key="item.id"
      ></VideoPlayer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import showImg from '@/assets/video/show.png'
import hideImg from '@/assets/video/hide.png'
import VideoPlayer from '../components/player.vue'
import type { IPlayer } from '../types'

type ISearch = {
  key: string
  total: number
  pageNum: number
  pageSize: number
}

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const defaultProps = {
  children: 'children',
  label: 'label'
}

const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          { id: 9, label: 'Level three 1-1-1' },
          { id: 10, label: 'Level three 1-1-2' }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      { id: 5, label: 'Level two 2-1' },
      { id: 6, label: 'Level two 2-2' }
    ]
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      { id: 7, label: 'Level two 3-1' },
      { id: 8, label: 'Level two 3-2' }
    ]
  }
]

const isPlaying = ref(false)
const shouldShow = ref(true)
const playingList = ref<IPlayer[]>([])
const shouldPlayList = ref<IPlayer[]>([])
const search = reactive<ISearch>({
  key: '',
  pageNum: 1,
  total: 0,
  pageSize: 18
})

const shouldPlayLen = computed(() => shouldPlayList.value.length || 0)

const handleShow = () => {
  shouldShow.value = !shouldShow.value
}

const handlePlay = () => {
  isPlaying.value = !isPlaying.value
}

const onTreecheck = (...args: any) => {
  console.log('onTreecheck', args)
}
</script>

<style scoped lang="less">
.subjectList {
  width: 265px;
  height: 100%;
  margin-right: 4px;

  .treeBox {
    width: 100%;
    height: 90%;
  }

  .btn {
    width: 94px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    background: url(@/assets/video/btn1.png) no-repeat center center;
    &:hover {
      background: url(@/assets/video/btn.png) no-repeat center center;
    }
  }
}
</style>
