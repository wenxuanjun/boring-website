<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card class="my-md-8 pa-md-4 mb-4">
          <v-card-title>最新动态</v-card-title>
          <v-divider></v-divider>
          <v-list lines="two">
            <v-list-item
              v-for="news in news_group"
              :key="news.title"
              :title="news.title"
              :subtitle="news.subtitle"
            />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      news_group: [
        { title: "[新增] 主题设置", subtitle: "昼铄不暗，夜昏不耀" },
        { title: "[新增] 图片转文字", subtitle: "纯本地处理，超低识别率，值得你拥有" },
        { title: "[新增] 回滚悬浮按钮", subtitle: "支持回滚的Malageed简直如德芙一般丝滑" },
        { title: "[修复] 标点半／全角不一致", subtitle: "统一格式至少能让枯燥的Malageed美观一点" }
      ]
    }
  }
}
</script>
