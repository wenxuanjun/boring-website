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
import { mdiInformation } from "@mdi/js";

export default {
  props: {
    source: String
  },
  created() {
    this.$vuetify.theme.dark = true;
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?e7f8d870262a62bf7b4f23ddc7c3c174";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  },
  data() {
    return {
      items: [
        { title: "Home", icon: mdiHome, link: "/" },
        { title: "Malageed", icon: mdiTeach, link: "/malageed" },
        { title: "About", icon: mdiInformation, link: "/about" }
      ],
      drawer: null,
      right: null
    };
  }
};
</script>