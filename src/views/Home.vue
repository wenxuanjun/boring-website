<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <v-btn block href="http://demo.wendster.com" dark>点击以访问Demo站点</v-btn>
        <v-card style="margin-top:20px">
          <v-card-title>琐言碎语</v-card-title>
          <v-card-text>
            <p>我又双叒叕回来啦！</p>
            <p>注：DEMO站点包含最新特性与错误修复。</p>
          </v-card-text>
        </v-card>
        <v-card style="margin-top:20px">
          <v-card-title>最新动态</v-card-title>
          <v-divider></v-divider>
          <v-list two-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>[新增] 回滚悬浮按钮</v-list-item-title>
                <v-list-item-subtitle>支持回滚的Malageed简直如德芙一般丝滑</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>[修复] 标点半／全角不一致</v-list-item-title>
                <v-list-item-subtitle>统一格式至少能让枯燥的Malageed美观一点</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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