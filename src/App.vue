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
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about">
          <template v-slot:prepend>
            <v-icon :icon="mdiInformation"></v-icon>
          </template>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main :style="contentStyle">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'
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
  backgroundImage: 'url(' + (darkTheme ? darkBackground : lightBackground) + ')'
}
</script>
