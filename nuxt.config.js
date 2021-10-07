export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'B&E Wedding',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '我們要在10/16結婚了!',
      },
      {
        hid: 'apple-mobile-web-app-title',
        property: 'apple-mobile-web-app-title',
        content: 'B&E Wedding',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'B&E Wedding',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '我們要在10/16結婚了!',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css',
        // href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-p5.client.js',
    '~/plugins/vue-fullpage.client.js',
    '~/plugins/scroll-animater.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://firebase.nuxtjs.org/
    '@nuxtjs/firebase',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  firebase: {
    config: {
      apiKey: 'AIzaSyBrc47_g9H6RUlFpNZzalVqzQ5kmcZDds4',
      authDomain: 'bnes-328013.firebaseapp.com',
      databaseURL:
        'https://bnes-328013-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'bnes-328013',
      storageBucket: 'bnes-328013.appspot.com',
      messagingSenderId: '708956429330',
      appId: '1:708956429330:web:35b525d0454290ae838ccb',
    },
    services: {
      database: true,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          // https://github.com/vuejs/vue-loader/issues/1612#issuecomment-614542603
          esModule: false,
        },
      })
    },
    extractCSS: true,
    analyze: true,
  },
}
