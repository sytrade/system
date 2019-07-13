<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h1 style="text-align:center;font-size:34px">SyTrade Free</h1>
          </div>

          <div class="modal-body">
            <h2>Selecione a paridade</h2>
            <section class="input__group">
              <select :disabled="loading" v-model="currency" required id="currency" style="width:100%; margin-bottom: 10px">
                <option value="none">Nenhuma</option>
                <option value="audcad">AUD/CAD</option>
                <option value="audusd">AUD/USD</option>
                <option value="audjpy">AUD/JPY</option>

                <option value="cadjpy">CAD/JPY</option>

                <option value="eurusd">EUR/USD</option>
                <option value="eurgbp">EUR/GBP</option>
                <option value="euraud">EUR/AUD</option>
                <option value="eurjpy">EUR/JPY</option>
                <option value="eurcad">EUR/CAD</option>
                <option value="eurchf">EUR/CHF</option>

                <option value="gbpusd">GBP/USD</option>
                <option value="gbpnzd">GBP/NZD</option>
                <option value="gbpchf">GBP/CHF</option>
                <option value="gbpcad">GBP/CAD</option>
                <option value="gbpaud">GBP/AUD</option>
                <option value="gbpjpy">GBP/JPY</option>

                <option value="nzdusd">NZD/USD</option>

                <option value="usdjpy">USD/JPY</option>
                <option value="usdcad">USD/CAD</option>
                <option value="usdchf">USD/CHF</option>
              </select>
              <label for="currency">Paridade</label>
            </section>
            <button :disabled="loading" @click="submit">Começar</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    currency: 'none',
    loading: false
  }),
  created () {
    this.currency = this.getCurrency
  },
  computed: {
    ...mapGetters([
      'getCurrency'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrency'
    ]),
    submit () {
      this.loading = true
      this.setCurrency(this.currency)
      setTimeout(() => {
        this.$emit('close')
      }, 100)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/colors.sass'
button
  border-radius: $radius
  border: none
  background: $orange
  color: $active-text
  padding: 14px 20px
  text-transform: uppercase
  font-weight: 500
  margin: 0px 5px
  width: calc(100% - 10px)

.modal-mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba($input, .3)
  display: table
  transition: opacity .3s ease

.modal-wrapper
  display: table-cell
  vertical-align: middle

.modal-container
  width: 50%
  margin: 0px auto
  padding: 20px 30px
  background-color: $background
  color: $active-text
  border-radius: 2px
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
  transition: all .3s ease

.modal-header h3
  margin-top: 0
  color: $active-text

.modal-body
  margin: 20px 0

.modal-default-button
  float: right

.modal-enter
  opacity: 0

.modal-leave-active
  opacity: 0

.modal-enter .modal-container,
.modal-leave-active .modal-container
  -webkit-transform: scale(1.1)
  transform: scale(1.1)
</style>
