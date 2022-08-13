<template>
  <div class="accordion__daskk231fas2" :class="{ active: visible }">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps([
  'visible',
  'heightContent',
  'paddingTop',
  'paddingBottom',
])

const calcHeigth = computed(() => {
  let paddingTop = '0px'
  let paddingBottom = '0px'
  let heightFUll = '0px'

  paddingTop = props.paddingTop + 'px'
  paddingBottom = props.paddingBottom + 'px'
  heightFUll =
    props.heightContent + props.paddingTop + props.paddingBottom + 'px'

  return { heightFUll, paddingTop, paddingBottom }
})
</script>

<style lang="sass">

.accordion__daskk231fas2
  visibility: hidden
  opacity: 0
  transition: .3s
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
      height: v-bind('calcHeigth.heightFUll')

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
