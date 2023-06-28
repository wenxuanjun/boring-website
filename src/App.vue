<template>
  <v-app>
    <v-app-bar elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon color="default" @click="drawer = !drawer" />
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
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import { mdiHome, mdiHumanMaleBoard, mdiInformation } from '@mdi/js'
import lightBackgound from '@/assets/light.jpg'
import darkBackgound from '@/assets/dark.jpg'

try {
  const theme = useTheme()
  document.body.removeChild(document.getElementById("app-loader"))
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
} catch {
  console.log("Failed to init page, have a nice day!")
}

const drawer = ref(false)

const contentStyle = computed(() => {
  const theme = useTheme()
  return {
    backgroundSize: 'cover',
    backgroundImage: 'url(' + (theme.global.current.value.dark ? darkBackgound : lightBackgound) + ')'
  }
})
</script>
