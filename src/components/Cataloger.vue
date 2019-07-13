<template>
  <section class="cataloger">
    <button @click="addCandle(1)" :disabled="getEntries >= +getWin || getEntries <= +getLoss * -1" class="cataloger--green">
      Subiu
    </button>
    <button @click="addCandle(0)" :disabled="getEntries >= +getWin || getEntries <= +getLoss * -1">
      Doji
    </button>
    <button @click="addCandle(2)" :disabled="getEntries >= +getWin || getEntries <= +getLoss * -1" class="cataloger--red">
      Desceu
    </button>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getWin',
      'getEntries',
      'getLoss',
      'getTime',
      'getLasthour',
      'getHour',
      'getCandles'
    ])
  },
  methods: {
    ...mapActions([
      'setCandles',
      'setLasthour'
    ]),
    addCandle (type) {
      this.setCandles(this.getCandles.concat([
        { value: type, time: this.generateHour() }
      ]))
    },
    generateHour () {
      if (this.getLasthour === null) {
        this.setLasthour(this.getHour)
        return this.getHour
      }

      const crop = this.getLasthour.split(':')
      let hours = +crop[0]
      let minutes = +crop[1]

      if ((minutes + (+this.getTime)) < 60) {
        minutes += +this.getTime
      } else {
        if (hours < 23) {
          hours++
        } else {
          hours = 0
        }

        minutes += +this.getTime
        minutes -= 60
      }

      if (hours < 10) {
        hours = `0${hours}`
      }

      if (minutes < 10) {
        minutes = `0${minutes}`
      }

      this.setLasthour(`${hours}:${minutes}`)
      return `${hours}:${minutes}`
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/colors.sass'

.cataloger
  display: flex
  width: calc(100% - 20px)
  margin: 10px
  border-collapse: collapse
  align-items: stretch
  button
    align-content: stretch
    color: $active-text
    padding: 10px
    height: 100%
    border: none
    border-radius: $radius
    margin: 5px 0px
    cursor: pointer
    font-size: 12px
    font-weight: bolder
    text-transform: uppercase
    width: calc(100% - 20px)
    background: $input
    &.cataloger--green
      background: $green
    &.cataloger--red
      background: $red

@media screen and (min-width:1025px)
  .cataloger
    flex-flow: column

</style>
