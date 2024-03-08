<template>
  <div class="m-3">
    <router-link to="/" class="mr-20">首页</router-link>
    <router-link to="/video/loop">点击进入循环播放视频</router-link>
    <img
      class="w-5.5 h-5.5 cursor-pointer"
      :src="shouldShow ? hideImg : showImg"
      alt=""
      @click="handleShow"
    />
  </div>
  <div class="flex testBox">
    <div class="playerList" v-show="shouldShow">
      <el-input
        clearable
        v-model="search.key"
        class="inputSearch mb-2"
        placeholder="输入设备名称"
        @change="onInputChange"
      >
        <template #append>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-checkbox-group
        class="checkGroup"
        v-model="checkList"
        @change="onCheckChange"
      >
        <div
          class="w-full relative checkItem"
          v-for="item in playerList"
          :key="item.id"
        >
          <el-checkbox
            :label="item.name"
            :value="item"
            class="w-full px-3 checkBox"
          />
          <span
            class="w-1.5 h-1.5 tip absolute top-1/2 right-2.5"
            :class="[item.status === 0 ? 'green' : 'orgin']"
          ></span>
        </div>
      </el-checkbox-group>

      <div class="flex items-center justify-between mt-1.5">
        <div class="flex items-center">
          <span class="mr-1.5 tip">已选</span>
          <span class="checkNum">{{ checkLen }}</span>
        </div>

        <el-pagination
          :small="true"
          :hide-on-single-page="false"
          :total="search.total"
          :page-size="search.pageSize"
          :pager-count="5"
          layout="prev, pager, next"
          @change="onPageChange"
        />
      </div>
    </div>
    <div
      class="flex-auto h-full overflow-y-auto overflow-x-hidden"
      :class="clsName"
    >
      <VideoPlayer
        v-bind="item"
        @on-cancel="onCancel"
        v-for="item in checkList"
        :key="item.id"
      ></VideoPlayer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getVideoList } from '@/utils/request'
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

const checkList = ref<IPlayer[]>([])
const playerList = ref<IPlayer[]>([])
const shouldShow = ref(true)
const search = reactive<ISearch>({
  key: '',
  pageNum: 1,
  total: 0,
  pageSize: 18
})

const checkLen = computed(() => checkList.value.length || 0)

const clsName = computed(() => {
  const length = checkList.value.length
  if (length > 4) {
    return 'grid gap-2.5 grid-cols-3 grid-rows-3'
  } else if (length > 1) {
    return 'grid gap-2.5 grid-cols-2 grid-rows-2'
  } else {
    return ''
  }
})

onMounted(() => {
  getList()
})

const getList = () => {
  getVideoList(search.pageNum, 18, search.key).then((res) => {
    if (res.code == 200) {
      search.total = (res?.result?.total || 0) as number
      playerList.value = (res?.result?.records || []) as IPlayer[]
    }
  })
}

const onInputChange = () => {
  search.pageNum = 1
  getList()
}

const onCheckChange = () => {
  if (checkList.value.length > 9) {
    checkList.value.splice(0, 1)
  }
}

const onPageChange = (cur: number) => {
  search.pageNum = cur
  getList()
}

const onCancel = (player: IPlayer) => {
  const index = checkList.value.findIndex((check) => check.id === player.id)
  checkList.value.splice(index, 1)
}

const handleShow = () => {
  shouldShow.value = !shouldShow.value
}
</script>

<style scoped lang="less">
.testBox {
  width: 1200px;
  height: 800px;
}

.playerList {
  width: 265px;
  height: 100%;
  margin-right: 4px;

  .inputSearch {
    width: 265px;
  }
  .checkGroup {
    width: 100%;
    height: 90%;
  }

  .checkBox {
    height: 36px;
    background: url(@/assets/video/bg.png) no-repeat center center;

    &:hover {
      background: url(@/assets/video/bgHlight.png) no-repeat center center;
    }
  }

  .checkItem {
    .checkBox.is-checked {
      background: url(@/assets/video/bgHlight.png) no-repeat center center;
    }
    & + .checkItem {
      margin-top: 4px;
    }
  }

  :deep(.el-checkbox) {
    .el-checkbox__label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
    }
  }

  .tip {
    border-radius: 50%;
  }
  .green {
    background-color: #76f9b5;
  }

  .orange {
    background: #fd9e40;
  }

  .tip {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.65);
  }
  .checkNum {
    font-family: MiSans;
    font-size: 16px;
    font-weight: 500;
    color: #37b9ff;
  }
}
</style>
../types
