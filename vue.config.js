module.exports = {
  "publicPath": "",
  "pluginOptions": {
    "cordovaPath": "src-cordova",
    electronBuilder: {
      builderOptions: {
        appId: "id.my.hantamkoding.ppdb.manusa",
        productName: "PPDB 2020 SMK Ma\'arif NU 1 Ajibarang",
        artifactName: "ppd-manusa-${version}.${ext}",
        publish: [
          {
            provider: "github",
            owner: "Hantam Koding",
            repo: "ppdbmanusa_frontend",
            releaseType: 'draft'
          }
        ]
      }
    }
  },
  "transpileDependencies": [
    "vuetify",
    'vue-echarts',
    'resize-detector'
  ]
}