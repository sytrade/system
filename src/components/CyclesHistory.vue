<template>
  <section>
    <h2>Ciclos</h2>
    <section class="history" id="history__cycles">
      <span
        v-for="(cycle, cid) in cyclesBluePink"
        :key="cid"
        :class="{ 'history__cycle--pink': cycle.value === 0, 'history__cycle--blue': cycle.value === 1 }"
        class="history__cycle"
      >
        {{ cycle.time }}
      </span>
    </section>

    <section class="history__legend">
      <span class="history__legend--pink">{{ pinkCycles }}</span>
      <span class="history__legend--blue">{{ blueCycles }}</span>
    </section>

    <!-- <section class="history" id="history__cycles">
      <span
        v-for="(cycle, cid) in cyclesOrangeGreen"
        :key="cid"
        :class="{ 'history__cycle--orange': cycle.value === 0, 'history__cycle--green': cycle.value === 1 }"
        class="history__cycle"
      >
        {{ cycle.time }}
      </span>
    </section>

    <section class="history__legend">
      <span class="history__legend--orange">{{ orangeCycles }}</span>
      <span class="history__legend--green">{{ greenCycles }}</span>
    </section> -->
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    money: 0
  }),
  mounted () {
    this.$bus.$emit('on-cycles-updated', this.cyclesBluePink)
    this.scrollBottom()
  },
  computed: {
    ...mapGetters([
      'getCandles'
    ]),
    pinkCycles () {
      return this.cyclesBluePink.reduce((a, i) => {
        if (i.value === 0) {
          a += 1
        }
        return a
      }, 0)
    },
    blueCycles () {
      return this.cyclesBluePink.reduce((a, i) => {
        if (i.value === 1) {
          a += 1
        }
        return a
      }, 0)
    },
    orangeCycles () {
      return this.cyclesOrangeGreen.reduce((a, i) => {
        if (i.value === 0) {
          a += 1
        }
        return a
      }, 0)
    },
    greenCycles () {
      return this.cyclesOrangeGreen.reduce((a, i) => {
        if (i.value === 1) {
          a += 1
        }
        return a
      }, 0)
    },
    cyclesBluePink () {
      let cycles = []
      let stringCandles = ''

      const validBlues = ['2111', '1222', '0111', '0222']
      const validPinks = ['2112', '1221', '0112', '0221']

      this.getCandles.forEach(candle => {
        stringCandles += `${candle.value}`
        const last4Chars = stringCandles.substr(stringCandles.length - 4)

        if (validBlues.includes(last4Chars)) {
          cycles.push({ value: 1, time: candle.time })
        }

        if (validPinks.includes(last4Chars)) {
          cycles.push({ value: 0, time: candle.time })
        }
      })

      return cycles
    },
    cyclesOrangeGreen () {
      let cycles = []
      let stringCandles = ''

      const validGreens = ['2122', '1211', '0122', '0211']
      const validOranges = ['2121', '1212', '0121', '0212']

      this.getCandles.forEach(candle => {
        stringCandles += `${candle.value}`
        const last4Chars = stringCandles.substr(stringCandles.length - 4)

        if (validGreens.includes(last4Chars)) {
          cycles.push({ value: 1, time: candle.time })
        }

        if (validOranges.includes(last4Chars)) {
          cycles.push({ value: 0, time: candle.time })
        }
      })

      return cycles
    }
  },
  watch: {
    cyclesBluePink (value) {
      this.scrollBottom()
      this.$bus.$emit('on-cycles-updated', value)
    }
  },
  methods: {
    scrollBottom () {
      setTimeout(() => {
        const historycycles = document.getElementById('history__cycles')
        historycycles.scrollTop = historycycles.scrollHeight - historycycles.clientHeight
      }, 100)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/colors.sass'

.history
  display: flex
  width: calc(100% - 20px)
  margin: 5px 10px
  flex-flow: row wrap
  height: 76px
  overflow-y: auto
  .history__cycle
    width: calc(10% - 12px)
    padding: 10px 5px
    background: $input
    color: $input-text
    text-align: center
    font-weight: 500
    font-size: 11px
    white-space: nowrap
    border: 1px dashed $background
    border-radius: $radius
    height: 16px
    &.history__cycle--pink
      background: $pink
      color: $input-text
    &.history__cycle--blue
      background: $blue
      color: $input-text
    &.history__cycle--orange
      background: $orange
      color: $input-text
    &.history__cycle--green
      background: darken($green, 10%)
      color: $input-text

.history__legend
  display: flex
  width: calc(100% - 20px)
  margin: 2px 10px
  flex-flow: row
  justify-content: flex-end
  > *
    padding: 2px 0px
    font-weight: bolder
    &:not(:last-child):after
      content: '/'
      color: $active-text
      padding: 0px 4px
    &.history__legend--pink
      color: $pink
    &.history__legend--blue
      color: $blue
    &.history__legend--orange
      color: $orange
    &.history__legend--green
      color: darken($green, 10%)

@media screen and (min-width:1025px)
  .history
    height: 153px
  .history__cycle
    width: calc(5% - 12px) !important
</style>
