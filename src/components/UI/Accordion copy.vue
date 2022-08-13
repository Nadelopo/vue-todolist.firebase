<template>
  <div class="accordion__daskk231fas2" :class="{ active: visible }">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, onMounted, nextTick } from 'vue'

onMounted(async () => {
  await nextTick()
  let paddingTop = window
    .getComputedStyle(props.liRef)
    .getPropertyValue('padding-top')
  console.log(paddingTop)
})

const props = defineProps(['visible', 'heightElement', 'liRef'])

const calcHeigth = computed(() => {
  let paddingTop = null
  let paddingBottom = null
  let heightFull = null
  if (props.liRef) {
    paddingTop = window
      .getComputedStyle(props.liRef)
      .getPropertyValue('padding-top')

    paddingBottom = window
      .getComputedStyle(props.liRef)
      .getPropertyValue('padding-bottom')

    console.log(paddingTop, paddingBottom)
    heightFull =
      Number(paddingTop.replace('px', '')) +
      Number(paddingBottom.replace('px', '')) +
      props.heightElement +
      'px'
  }
  return { heightFull, paddingTop, paddingBottom }
})
</script>

<style lang="sass">

.accordion__daskk231fas2
  visibility: hidden
  opacity: 0
  transition: .3s
  padding-left: 15px
  div
    padding-top: 0!important
    padding-bottom: 0!important
    transition: .3s
    height: 0px
  &.active
    visibility: visible
    opacity: 1
    div
      padding-top: v-bind('calcHeigth.paddingTop')!important
      padding-bottom: v-bind('calcHeigth.paddingBottom')!important
      height: v-bind('calcHeigth.heightFull')

// another varian
// .accordion__daskk231fas2
//   transition: .3s
//   overflow: hidden
//   opacity: 0
//   height: 0px
//   padding-left: 15px
//   &.active
//     opacity: 1
//     transition: .5s
//     height: 200px
</style>
