<template>
  <form @submit.prevent="submit" class="hours">
    <section class="hours__input input__group">
      <input v-model="money" :disabled="disabled" required type="number" min="1" step="0.01" id="money">
      <label for="money">Banca</label>
    </section>

    <section class="hours__input input__group">
      <input v-model="win" :disabled="disabled" required type="number" min="0" step="0.01" id="win">
      <label for="win">Meta ($)</label>
    </section>

    <section class="hours__input input__group">
      <input v-model="loss" :disabled="disabled" required type="number" min="0" step="0.01" id="loss">
      <label for="loss">Stop ($)</label>
    </section>

    <section class="hours__input input__group">
      <input v-model="hour" :disabled="!disabled ? false : getHour !== null" required type="time" id="hour">
      <label for="hour">Início</label>
    </section>

    <section class="hours__input input__group">
      <input v-model="time" :disabled="!disabled ? false : getHour !== null" required type="number" min="1" step="1" id="time">
      <label for="time">Tempo (M)</label>
    </section>

    <section class="hours__submit">
      <button :disabled="!disabled ? false : getHour !== null">{{ (!disabled ? false : getHour !== null) ? 'Iniciado!' : 'Iniciar' }}</button>
    </section>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    hour: null,
    money: 0,
    time: 1,
    win: 0,
    loss: 0,
    disabled: false
  }),
  computed: {
    ...mapGetters([
      'getMoney',
      'getWin',
      'getLoss',
      'getTime',
      'getEntries',
      'getDay',
      'getHour'
    ])
  },
  created () {
    this.hour = this.getHour
    this.money = this.getMoney
    this.time = this.getTime
    this.win = this.getWin
    this.loss = this.getLoss
  },
  mounted () {
    const nowDate = new Date()
    const date = nowDate.getDate() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear()
    if (this.getDay === date) {
      this.$bus.$emit('on-day-started', false)
      this.disabled = true
    } else {
      this.setEntries(0)
    }
  },
  methods: {
    ...mapActions([
      'setMoney',
      'setWin',
      'setLoss',
      'setEntries',
      'setTime',
      'setDay',
      'setHour',
      'setCandles'
    ]),
    submit () {
      const nowDate = new Date()
      const date = nowDate.getDate() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear()

      this.setMoney(this.money)
      this.setHour(this.hour)
      if (this.disabled ? false : this.getHour === null) {
        this.setEntries(0)
      }
      this.setCandles([])
      this.setTime(this.time)
      this.setWin(this.win)
      this.setLoss(this.loss)

      this.setDay(date)
      this.$bus.$emit('on-day-started')
      this.disabled = true
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/colors.sass'

.hours
  display: flex
  margin: 5px
  width: calc(100% - 10px)
  flex-flow: row
  .hours__input
    width: 100%
  .hours__submit
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
  .hours
    justify-content: flex-end
    .hours__input
      width: 10% !important
    .hours__submit
      width: calc(10% - 10px)
</style>
