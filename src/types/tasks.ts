import type { Ref } from 'vue'

export type Ttask = {
  category: number
  date: {
    seconds: number
    nanoseconds: number
  }
  id: number
  status: boolean
  title: string
}

export type TCategory = Ref<{
  id: number | null
  title: string
}>
