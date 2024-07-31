// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: [
        "@nuxt/image",
        '@nuxtjs/tailwindcss',
        "shadcn-nuxt",
        "@nuxtjs/google-fonts",
        "@nuxt/icon",
        '@pinia/nuxt',
        '@vee-validate/nuxt',
    ],
    shadcn: {
        prefix: 'ui',
        componentDir: './components/ui'
    },
    googleFonts: {
        families: {
            Lato: {
                wght: [300, 400, 700],
                ital: [300]
            }
        }
    },
    pinia: {
        storesDirs: ['./stores/**',],
    },
    veeValidate: {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
            Form: 'VeeForm',
            Field: 'VeeField',
            FieldArray: 'VeeFieldArray',
            ErrorMessage: 'VeeErrorMessage',
        },
    },
})