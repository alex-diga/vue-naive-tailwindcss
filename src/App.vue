<script setup lang="ts">
import { createTheme, inputDark, datePickerDark } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'

const darkTheme = createTheme([inputDark, datePickerDark])
</script>

<template>
  <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
    <router-view></router-view>
  </n-config-provider>
</template>

<style scoped></style>
