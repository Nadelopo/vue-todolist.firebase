import type { InjectionKey, Ref } from 'vue'

export const setOpenKey: InjectionKey<(t: boolean) => void> = Symbol('setOpen')

export const openKey: InjectionKey<Ref<boolean>> = Symbol('open')

export const setThemeKey: InjectionKey<(t: string) => void> = Symbol('setTheme')
