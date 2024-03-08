<template>
  <div class="text-3xl p-8">Home</div>
  <router-link class="mr-20" to="/video/loop">点击进入循环播放视频</router-link>
  <router-link to="/video/multiple">点击进入多路视频播放</router-link>

  <el-row class="m-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>

  <el-button large @click="toDark">{{ themeTip }}</el-button>

  <el-time-picker v-model="value1" placeholder="Arbitrary time" />
  <el-time-picker v-model="value2" arrow-control placeholder="Arbitrary time" />

  <el-calendar v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const themeTip = ref('dark')
const value = ref(new Date())
const value1 = ref()
const value2 = ref()

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})
const toggleDark = useToggle(isDark)

const toDark = () => {
  toggleDark()
  themeTip.value = themeTip.value === 'light' ? 'dark' : 'light'
}
</script>

<style scoped></style>
