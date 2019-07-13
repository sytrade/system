<template>
  <section>
    <div style="display: flex">
      <h2>Candles</h2>
    </div>
    <section class="history" id="history__candles">
      <span
        v-for="(candle, cid) in getCandles"
        :key="cid"
        :class="{ 'history__candle--green': candle.value === 1, 'history__candle--red': candle.value === 2 }"
        class="history__candle"
      >
        {{ candle.time }}
      </span>
    </section>

    <section class="history__legend">
      <span class="history__legend--green">{{ greenCandles }}</span>
      <span class="history__legend--red">{{ redCandles }}</span>
      <span class="history__legend--doji">{{ dojiCandles }}</span>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    money: 0,
    currency: null
  }),
  computed: {
    ...mapGetters([
      'getCandles'
    ]),
    dojiCandles () {
      return this.getCandles.reduce((a, i) => {
        if (i.value === 0) {
          a += 1
        }
        return a
      }, 0)
    },
    greenCandles () {
      return this.getCandles.reduce((a, i) => {
        if (i.value === 1) {
          a += 1
        }
        return a
      }, 0)
    },
    redCandles () {
      return this.getCandles.reduce((a, i) => {
        if (i.value === 2) {
          a += 1
        }
        return a
      }, 0)
    }
  },
  watch: {
    getCandles () {
      this.scrollBottom()
    }
  },
  mounted () {
    this.scrollBottom()
  },
  methods: {
    ...mapActions([
      'setCandles'
    ]),
    scrollBottom () {
      setTimeout(() => {
        const historyCandles = document.getElementById('history__candles')
        historyCandles.scrollTop = historyCandles.scrollHeight - historyCandles.clientHeight
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
  .history__candle
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
    &.history__candle--green
      background: $green
      color: $input-text
    &.history__candle--red
      background: $red
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
    &.history__legend--green
      color: $green
    &.history__legend--red
      color: $red
    &.history__legend--doji
      color: $input-text

@media screen and (min-width:1025px)
  .history
    height: 153px
  .history__candle
    width: calc(5% - 12px) !important
</style>
