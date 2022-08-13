const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    themeColor: '#1c1c1c',
    msTileColor: '#1c1c1c',
    iconPaths: {
      faviconSVG: 'img/icons/favicon.svg',
      favicon32: 'img/icons/favicon.ico',
      favicon16: 'img/icons/favicon.ico',
      appleTouchIcon: 'img/icons/favicon.ico',
      maskIcon: 'img/icons/favicon.ico',
      msTileImage: 'img/icons/favicon.ico',
    },
    manifestOptions: {
      icons: [
        {
          src: './img/icons/favicon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: './img/icons/favicon.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: './img/icons/favicon.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: './img/icons/favicon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  },
})
