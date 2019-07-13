<template>
  <section class="navigation">
    <button disabled class="navigation__info">{{ getDay }}</button>
    <button disabled class="navigation__info">{{ getCurrency }}</button>
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value="ZX8BCU4KSY2HY" />
      <input type="image" src="https://www.paypalobjects.com/pt_BR/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Faça doações com o botão do PayPal" />
      <img alt="" border="0" src="https://www.paypal.com/pt_BR/i/scr/pixel.gif" width="1" height="1" />
    </form>

  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getDay',
      'getCurrency'
    ])
  }
}
</script>

<style lang="sass" scoped>
@import '@/colors.sass'

.navigation
  display: flex
  margin: 5px
  width: calc(100% - 10px)
  flex-flow: row
  button, form
    border-radius: $radius
    border: none
    color: $active-text
    padding: 14px 20px
    text-transform: uppercase
    font-weight: 500
    margin: 0px 5px
    width: calc(100% - 10px)
    background: $input
    text-align: center

@media screen and (min-width:1025px)
  .navigation
    justify-content: flex-end
</style>
