<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <v-btn block href="http://demo.wendster.com" dark>点击以访问DEMO站点</v-btn>
        <v-card style="margin-top:20px">
          <v-card-title>最新动态</v-card-title>
          <v-card-text>
            <p>我又双叒叕回来啦！</p>
            <p>注：DEMO站点包含最新特性与错误修复。</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-card-title>Something to Play</v-card-title>
          <v-card-text>
            <v-time-picker full-width scrollable color="grey"></v-time-picker>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-skeleton-loader type="card-avatar, article, actions"></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>