<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in list_items" :key="item.title" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-card flat tile>
          <v-card-text>
            <small><a class="white--text" src="http://www.beian.miit.gov.cn">湘ICP备19013090号-1</a></small>
          </v-card-text>
        </v-card>
      </template>
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
import { mdiHome, mdiTeach, mdiTools, mdiInformation } from "@mdi/js";

export default {
  props: {
    source: String
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  data() {
    return {
      list_items: [
        { title: "Home", icon: mdiHome, link: "/" },
        { title: "Malageed", icon: mdiTeach, link: "/malageed" },
        { title: "Tools", icon: mdiTools, link: "/tools" },
        { title: "About", icon: mdiInformation, link: "/about" }
      ],
      drawer: null
    };
  }
};
</script>
