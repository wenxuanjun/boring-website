<template>
  <v-app>
    <v-app-bar elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          color="default"
          @click="drawer = !drawer"
        />
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list nav density="compact">
        <v-list-item to="/">
          <template v-slot:prepend>
            <v-icon :icon="mdiHome"></v-icon>
          </template>
          <v-list-item-title>首页</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about">
          <template v-slot:prepend>
            <v-icon :icon="mdiInformation"></v-icon>
          </template>
          <v-list-item-title>关于</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main :style="contentStyle">
      <v-container>
        <v-row>
          <v-col xl="6" offset-xl="3" md="8" offset-md="2">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import { useHead } from '@unhead/vue'
import { mdiHome, mdiInformation } from '@mdi/js'
import darkBackground from '@/assets/bg-light.svg'
import lightBackground from '@/assets/bg-dark.svg'

try {
  const loaderElement = document.getElementById("app-loader")
  document.body.removeChild(loaderElement)
} catch {}

const drawer = ref(null)

const theme = useTheme()
const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
theme.global.name.value = darkTheme ? 'dark' : 'light'

const contentStyle = {
  backgroundSize: 'cover',
  backgroundImage: 'url("' + (darkTheme ? darkBackground : lightBackground) + '")'
}

useHead({
  title: "首页",
  titleTemplate: "%s | 一个极其无聊的网页"
})

</script>
