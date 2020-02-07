<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card>
          <v-card-title>最新动态</v-card-title>
          <v-card-text>
            <p>我又双叒叕回来啦！</p>
          </v-card-text>
        </v-card>
        <v-card style="margin-top:20px">
          <v-card-title>Something to Play</v-card-title>
          <v-card-text>
            <v-time-picker full-width scrollable color="grey"></v-time-picker>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-skeleton-loader type="card-avatar, article, actions"></v-skeleton-loader>
      </v-col>
      <v-col cols="12" sm="4">
        <v-skeleton-loader type="date-picker"></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>