<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
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
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mdiHome } from "@mdi/js";
import { mdiTeach } from "@mdi/js";
import { mdiTools } from "@mdi/js";
import { mdiInformation } from "@mdi/js";

export default {
  props: {
    source: String
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  data() {
    return {
      items: [
        { title: "Home", icon: mdiHome, link: "/" },
        { title: "Malageed", icon: mdiTeach, link: "/malageed" },
        { title: "Tools", icon: mdiTools, link: "/tools" },
        { title: "About", icon: mdiInformation, link: "/about" }
      ],
      drawer: null,
      right: null
    };
  }
};
</script>