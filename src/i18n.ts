import { i18n } from '@lingui/core'
import { en, ru, uk } from 'make-plural/plurals'

export const locales = {
  en: "English",
  ru: 'Russian',
  uk: "Ukrainian",
};
// export const defaultLocale = "en";

i18n.loadLocaleData({
  en: { plurals: en },
  ru: { plurals: ru },
  uk: { plurals: uk },
})

/**
* We do a dynamic import of just the catalog that we need
* @param locale any locale string
*/
export async function dynamicActivate(loc: string) {
  const locale = locales.hasOwnProperty(loc) ? loc : 'en'
  const { messages } = await import(`./locale/${locale}/messages`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}