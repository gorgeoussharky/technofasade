

import { Component } from 'vue'

document.addEventListener('DOMContentLoaded', () => {
    const isCheckoutPage = document.querySelector('#configurator')
    if (isCheckoutPage) {
        void (async () => {
            const { createApp } = await import(/* webpackChunkName: "vue" */'vue')
            const Checkout = (await import(/* webpackChunkName: "Configurator" */ '../configurator/App.vue')) as { default: Component }

            createApp(Checkout.default).mount('#configurator')
        })()
    }
})