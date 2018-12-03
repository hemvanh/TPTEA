// Configuration for your app
module.exports = function(ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: ['i18n', 'axios', 'vuelidate', 'addressbar-color'],
    css: ['app.styl'],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons', // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'hash',
      publicPath: '',
      // gzip: true,
      // vueCompiler: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        })
      },
    },
    devServer: {
      https: true,
      // port: 8080,
      open: true, // opens browser window automatically
      proxy: {
        '/api': {
          target: 'http://localhost:8888',
          // pathRewrite: {'^/api': ''},
        },
      },
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        // TPTEA
        'QSearch',
        'QTable',
        'QAlert',
        // 'QAjaxBar',
        'QSpinner',
        'QSpinnerPie',
        'QLayoutFooter',
        'QSelect',
        'QTh',
        'QTr',
        'QTd',
        'QTableColumns',
        'QModal',
        'QModalLayout',
        'QField',
        'QInput',
        'QChip',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QItemSeparator',
        'QSpinnerBars',

        // TPTEA
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl',
        'QParallax',
        'QPageSticky',
        'QScrollObservable',
        'QCollapsible',
        'QItemTile',
        'QCheckbox',
        'QRadio',
        'QBtnGroup',
        'QToggle',
        'QTree',
        'QDialog',
      ],
      directives: ['Ripple', 'CloseOverlay'],
      // Quasar plugins
      plugins: ['Notify', 'AddressbarColor'],
      iconSet: 'material-icons',
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false,
    },
    pwa: {
      workboxPluginMode: 'InjectManifest',
      // workboxPluginMode: 'GenerateSW',
      // workboxOptions: {},
      manifest: {
        name: 'TP-Tea Hong Kong',
        short_name: 'TP-Tea',
        description: 'TP-Tea. The Best Tea in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#F6F3EC',
        theme_color: '#027be3',
        start_url: '/',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      },
    },
  }
}
