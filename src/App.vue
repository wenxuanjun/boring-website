<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in list_items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <v-btn icon @click="initSettings" @click.stop="settings.dialog = true">
        <v-icon>{{ settings.icon }}</v-icon>
      </v-btn>
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
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mdiHome, mdiTeach, mdiTools, mdiInformation, mdiCog } from "@mdi/js";

export default {
  props: {
    source: String
  },
  created() {
    document.body.removeChild(document.getElementById("app-loader"));
  },
  methods: {
    initSettings: function() {
      this.settings.theme.value = this.$vuetify.theme.dark;
    },
    saveSettings: function() {
      this.$vuetify.theme.dark = this.settings.theme.value;
      this.settings.dialog = false;
    }
  },
  data() {
    return {
      list_items: [
        { title: "Home", icon: mdiHome, link: "/" },
        { title: "Malageed", icon: mdiTeach, link: "/malageed" },
        { title: "Tool", icon: mdiTools, link: "/tool" },
        { title: "About", icon: mdiInformation, link: "/about" }
      ],
      settings: {
        icon: mdiCog,
        dialog: false,
        theme: {
          value: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
          items: [
            { text: "亮色", value: false },
            { text: "暗色", value: true }
          ]
        }
      },
      drawer: null
    };
  }
};
</script>
