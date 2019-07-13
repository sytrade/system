<template>
  <form @submit.prevent="submit" class="result">
    <span class="result__money">
      <sup>Saldo</sup>
      <span class="result__money--green">${{ (+money).toFixed(2) }}</span>
      <span class="result__total" :class="{'result__money--green': getEntries > 0, 'result__money--red': getEntries < 0}">(${{ getEntries.toFixed(2) }})</span>
    </span>

    <section v-if="(getEntries < +getWin && getEntries > +getLoss * -1) || getEntries == 0"  class="result__input input__group">
      <input v-model="entry" :disabled="disabled" required type="number" step="0.01" id="entry">
      <label for="entry">Resultado de Entrada</label>
    </section>

    <section v-if="(getEntries < +getWin && getEntries > +getLoss * -1) || getEntries == 0" class="result__submit">
      <button :disabled="disabled">Computar</button>
    </section>

    <section v-if="getEntries >= +getWin && getEntries != 0" class="result__tag result__tag--green">
      Parabéns! Você atingiu sua meta, está liberado agora :)
    </section>

    <section v-if="getEntries <= +getLoss * -1 && getEntries != 0" class="result__tag result__tag--red">
      Ops, infelizmente hoje deu loss, mas não se desanime!
    </section>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    disabled: true,
    entry: 0,
    money: 0
  }),
  computed: {
    ...mapGetters([
      'getMoney',
      'getWin',
      'getLoss',
      'getEntries'
    ])
  },
  created () {
    this.$bus.$on('on-day-started', () => {
      this.money = this.getMoney
      this.disabled = false
    })
  },
  methods: {
    ...mapActions([
      'setMoney',
      'setEntries'
    ]),
    submit () {
      const entry = +this.entry
      this.setEntries(this.getEntries + entry)
      this.money = +this.getMoney + this.getEntries

      if (this.getEntries >= this.getWin) {
        this.setMoney(+this.getMoney + this.getEntries)
        this.$bus.$emit('on-day-ended')
      }

      if (this.getEntries <= (this.getLoss * -1)) {
        this.setMoney(+this.getMoney + this.getEntries)
        this.$bus.$emit('on-day-ended')
      }
      this.entry = 0
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/colors.sass'

.result
  display: flex
  margin: 10px
  width: calc(100% - 20px)
  flex-flow: row
  .result__tag
    padding: 10px
    width: calc(100% - 20px)
    color: $active-text
    border-radius: $radius
    text-align: center
    font-weight: bolder
    &.result__tag--green
      background: $green
    &.result__tag--red
      background: $red
  .result__money
    align-self: center
    padding-right: 10px
    width: calc(100% - 10px)
    font-size: 24px
    text-align: center
    font-weight: bolder
    color: $price
    sup
      color: $input-name
      font-size: 12px
      position: absolute
      margin-top: -10px
    .result__total
      font-size: 14px
      color: $input-text
      padding-left: 10px
      align-self: center
      &.result__money--red
        color: $red
      &.result__money--green
        color: $green
  .result__input
    width: 100%
  .result__submit
    display: flex
    margin: 5px
    width: calc(100% - 10px)
    button
      border-radius: $radius
      border: none
      background: $orange
      color: $active-text
      padding: 14px 20px
      text-transform: uppercase
      font-weight: 500
      width: 100%

@media screen and (min-width:1025px)
  .result
    justify-content: flex-end
    .result__input
      width: 10% !important
    .result__submit
      width: calc(10% - 10px)
</style>
