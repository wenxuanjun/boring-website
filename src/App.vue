<style>
.v-card {
  border-radius: 12px !important;
}
</style>

<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" aria-label="Navigation Drawer" />
      </template>
      <template v-slot:append>
        <v-btn icon @click="initSettings" @click.stop="settings.dialog = true" aria-label="Open Settings">
          <v-icon :icon="settings.icon"></v-icon>
        </v-btn>
      </template>
      <v-dialog v-model="settings.dialog" max-width="600px">
        <v-card>
          <v-card-title>设置</v-card-title>
          <v-card-text>
            <v-container>
              <v-form>
                <v-select v-model="settings.theme.value" :items="settings.theme.items" label="主题"></v-select>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="settings.dialog = false">取消</v-btn>
            <v-btn color="primary" text @click="saveSettings">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list nav density="compact">
        <v-list-item v-for="item in list_items" :key="item.title" :to="item.link">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main :style="content_style">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mdiHome, mdiHumanMaleBoard, mdiTools, mdiInformation, mdiCog } from "@mdi/js"
import { useTheme } from 'vuetify'
import lightBackgound from '@/assets/image/light.jpg'
import darkBackgound from '@/assets/image/dark.jpg'

export default {
  created() {
    try {
      const theme = useTheme()
      document.body.removeChild(document.getElementById("app-loader"))
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    } catch {
      console.log("Have a nice day!")
    }
  },
  methods: {
    initSettings: function () {
      const theme = useTheme()
      this.settings.theme.value = theme.global.current.value.dark
    },
    saveSettings: function () {
      const theme = useTheme()
      theme.global.current.value = this.settings.theme.value ? 'dark' : 'light'
      this.settings.dialog = false;
    }
  },
  computed: {
    content_style: function () {
      const theme = useTheme()
      return {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + (theme.global.current.value.dark ? darkBackgound : lightBackgound) + ')'
      }
    }
  },
  data() {
    return {
      list_items: [
        { title: "Home", icon: mdiHome, link: "/" },
        { title: "Malageed", icon: mdiHumanMaleBoard, link: "/malageed" },
        { title: "Tool", icon: mdiTools, link: "/tool" },
        { title: "About", icon: mdiInformation, link: "/about" }
      ],
      settings: {
        icon: mdiCog,
        dialog: false,
        theme: {
          value: window.matchMedia('(prefers-color-scheme: dark)').matches,
          items: [
            { text: "亮色", value: false },
            { text: "暗色", value: true }
          ]
        }
      },
      drawer: null
    }
  }
}
</script>
