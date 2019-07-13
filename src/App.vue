<template>
  <div id="app">
    <h1 style="display:none">Sistema de Trade</h1>
    <CurrencyModal v-if="modal" @close="modal = false"/>
    <Navigation v-if="!modal"/>
    <h2 v-if="!modal">Gerenciamento</h2>
    <HourForm v-if="!modal"/>
    <ResultCatalog v-if="!modal"/>
    <CandlesHistory v-if="!modal"/>
    <CyclesHistory v-if="!modal"/>
    <h2 v-if="!modal">Entradas</h2>
    <section class="row" v-if="!modal">
      <AnalyticTable/>
      <Cataloger/>
    </section>

    <footer class="footer">
      2019 - Desenvolvido por Leonardo Vilarinho
      <small>Queremos ajudar a todos, logo a ultilização comercial do sistema é totalmente PROIBIDA.</small>
    </footer>
  </div>
</template>

<script>
import CurrencyModal from './components/CurrencyModal.vue'
import Navigation from './components/Navigation.vue'
import HourForm from './components/HourForm.vue'
import ResultCatalog from './components/ResultCatalog.vue'
import CandlesHistory from './components/CandlesHistory.vue'
import CyclesHistory from './components/CyclesHistory.vue'
import AnalyticTable from './components/AnalyticTable.vue'
import Cataloger from './components/Cataloger.vue'

export default {
  name: 'app',
  components: {
    CurrencyModal,
    Navigation,
    HourForm,
    ResultCatalog,
    CandlesHistory,
    CyclesHistory,
    AnalyticTable,
    Cataloger
  },
  data: () => ({
    modal: true
  })
}
</script>

<style lang="sass">
@import '@/colors.sass'

.footer
  display: flex
  flex-flow: column
  color: $input-text
  text-align: center
  justify-content: center
  letter-spacing: 1px
  padding-top: 6px

::-webkit-scrollbar
  width: 6px
::-webkit-scrollbar-track
  background: $background
::-webkit-scrollbar-thumb
  background: $orange
::-webkit-scrollbar-thumb:hover
  background: darken($orange, 10%)

*
  padding: 0px
  margin: 0px
  font-family: 'Segoe UI', sans-serif

html, body
  background: $background

h2, h1
  color: $input-text
  font-weight: 400
  padding: 0px 20px
  font-size: 20px
  text-transform: lowercase

.row
  display: flex
  width: 100%
  flex-flow: column

@media screen and (min-width:1025px)
  .row
    flex-flow: row
    > *:nth-child(1)
      width: 70%
    > *:nth-child(2)
      width: 30%

button
  cursor: pointer
  transition: all 0.2s ease-in
  &:hover
    box-shadow: 4px 2px 7px 0 rgba(lighten($input, 5%),.8)
  &:disabled
    opacity: .7
    cursor: not-allowed !important

.input__group
  margin: 5px !important
  width: calc(100% - 10px) !important
  display: flex
  flex-flow: column
  input, select
    background: $input
    color: $input-text
    padding: 20px 10px 8px
    width: calc(100% - 20px)
    border-radius: $radius
    border: none
    font-size: 16px
    line-height: 18px
    min-height: 24px
    &:focus + label, &:valid + label
      color: lighten($input-name, 20%)
  label
    position: absolute
    color: $input-name
    margin-left: 8px
    margin-top: 4px
    font-size: 11px

</style>
