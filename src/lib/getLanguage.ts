import { Dictionary, Language } from '@/types/language'

const languages: Record<Language, () => Promise<Dictionary>> = {
    en: () => import('@/languages/en.json').then((module) => module.default),
    'zh-CN': () =>
        import('@/languages/zh-CN.json').then((module) => module.default)
}

export const getLanguage = async (locale: Language) => {
    return await languages[locale]()
}
