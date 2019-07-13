<template>
  <section class="content">
    <table class="analytic">
      <thead>
        <tr>
          <th>Cenário</th>
          <th>#</th>
          <th class="green">Sim</th>
          <th class="red">Não</th>
          <th>Estocástico</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>MACRO</td>
          <td>Duplicação</td>
          <td class="green">{{ macroDuple.valids }}%</td>
          <td class="red">{{ macroDuple.invalids }}%</td>
          <td>{{ stochasticDuple }}%</td>
        </tr>

        <tr>
          <td>MACRO</td>
          <td>Triplicação</td>
           <td class="green">{{ macroTriple.valids }}%</td>
          <td class="red">{{ macroTriple.invalids }}%</td>
          <td>{{ stochasticTriple }}%</td>
        </tr>
      </tbody>
    </table>

    <table class="analytic">
      <thead>
        <tr>
          <th>Cenário</th>
          <th>#</th>
          <th class="green">Sim</th>
          <th class="red">Não</th>
          <th>Estocástico</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>MICRO</td>
          <td class="blue">D. Azul</td>
          <td class="green">{{ microDupleBlue.valids }}%</td>
          <td class="red">{{ microDupleBlue.invalids }}%</td>
          <td>{{ stochasticDupleBlue }}%</td>
        </tr>

        <tr>
          <td>MICRO</td>
          <td class="pink">D. Rosa</td>
          <td class="green">{{ microDuplePink.valids }}%</td>
          <td class="red">{{ microDuplePink.invalids }}%</td>
          <td>{{ stochasticDuplePink }}%</td>
        </tr>

        <tr>
          <td>MICRO</td>
          <td class="blue">T. Azul</td>
          <td class="green">{{ microTripleBlue.valids }}%</td>
          <td class="red">{{ microTripleBlue.invalids }}%</td>
          <td>{{ stochasticTripleBlue }}%</td>
        </tr>

        <tr>
          <td>MICRO</td>
          <td class="pink">T. Rosa</td>
          <td class="green">{{ microTriplePink.valids }}%</td>
          <td class="red">{{ microTriplePink.invalids }}%</td>
          <td>{{ stochasticTriplePink }}%</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  data: () => ({
    cycles: []
  }),
  created () {
    this.$bus.$on('on-cycles-updated', value => {
      this.cycles = value
    })
  },
  computed: {
    stringfyCycles () {
      return this.cycles.reduce((a, i) => `${a}${i.value}`, '')
    },
    cyclesStringOnlyDuples () {
      let str = this.stringfyCycles
      while (str.includes('111')) {
        str = str.replace(/111/g, '11')
      }

      while (str.includes('000')) {
        str = str.replace(/000/g, '00')
      }
      return str
    },
    cyclesStringOnlyTriples () {
      let str = this.stringfyCycles
      while (str.includes('1111')) {
        str = str.replace(/1111/g, '111')
      }

      while (str.includes('0000')) {
        str = str.replace(/0000/g, '000')
      }
      return str
    },
    macroDuple () {
      return this.identifierPatterns(['011', '100'], ['010', '101'])
    },
    macroTriple () {
      return this.identifierPatterns(['0111', '1000'], ['0110', '1001', '1101', '0010'])
    },
    stochasticDuple () {
      return this.stochasticMacroByPattern(this.cyclesStringOnlyDuples, ['00', '11'])
    },
    stochasticTriple () {
      return this.stochasticMacroByPattern(this.cyclesStringOnlyTriples, ['000', '111'])
    },
    microDupleBlue () {
      return this.identifierPatterns(['011'], ['010'])
    },
    microDuplePink () {
      return this.identifierPatterns(['100'], ['101'])
    },
    microTripleBlue () {
      return this.identifierPatterns(['0111'], ['0110', '0010'])
    },
    microTriplePink () {
      return this.identifierPatterns(['1000'], ['1001', '1101'])
    },
    stochasticDupleBlue () {
      return this.stochasticMicroByPattern(this.cyclesStringOnlyDuples, ['11'])
    },
    stochasticDuplePink () {
      return this.stochasticMicroByPattern(this.cyclesStringOnlyDuples, ['00'])
    },
    stochasticTripleBlue () {
      return this.stochasticMicroByPattern(this.cyclesStringOnlyTriples, ['111'])
    },
    stochasticTriplePink () {
      return this.stochasticMicroByPattern(this.cyclesStringOnlyTriples, ['000'])
    }
  },
  methods: {
    removeCyclesDuplicated (str, cycle) {
      while (str.includes(`${cycle}${cycle}`)) {
        str = str.replace(new RegExp(`${cycle}${cycle}`, 'g'), cycle)
      }

      return str
    },
    stochasticMicroByPattern (cTr, pattern) {
      const cycle = pattern[0].split('')[0]
      const patternLength = pattern[0].length
      const reverseCycle = cycle === '0' ? '1' : '0'

      cTr = this.removeCyclesDuplicated(cTr, reverseCycle)
      cTr = cTr.split(reverseCycle).filter(i => i !== '').reverse()

      let stoch = 0
      let stoped = false
      console.log(cycle, patternLength, cTr)
      cTr.forEach(item => {
        if (item.length === patternLength && !stoped) stoch++
        else stoped = true
      })

      return stoch <= 8 && stoch > 0 ? (+`${(9 - stoch)}0`).toFixed(2) : (0).toFixed(2)
    },
    stochasticMacroByPattern (cTr, pattern) {
      const lastChars = cTr.substr(cTr.length - pattern[0].length)
      const initialStr = pattern.includes(lastChars) ? cTr : cTr.substr(0, cTr.length - (pattern[0].length - 1))
      const str = initialStr.split('').reverse().join('')
      const croped = str.match(new RegExp(`.{1,${pattern[0].length}}`, 'g')) || []
      let stoch = 0
      let stoped = false

      croped.forEach(c => {
        if (pattern.includes(c) && !stoped) stoch++
        else stoped = true
      })

      return stoch <= 8 && stoch > 0 ? (+`${(9 - stoch)}0`).toFixed(2) : (0).toFixed(2)
    },
    identifierPatterns (validPattern, invalidPattern) {
      let stringCycles = ''
      let __valids = 0
      let __invalids = 0

      this.cycles.forEach(cycle => {
        stringCycles += `${cycle.value}`
        const lastValidChars = stringCycles.substr(stringCycles.length - validPattern[0].length)
        const lastInvalidChars = stringCycles.substr(stringCycles.length - invalidPattern[0].length)

        if (stringCycles.length === validPattern[0].length - 1) {
          const newValidPattern = validPattern.map(i => i.substr(1))
          if (newValidPattern.includes(stringCycles)) __valids++
        }

        if (validPattern.includes(lastValidChars)) __valids++
        if (invalidPattern.includes(lastInvalidChars)) __invalids++
      })

      const pt = { valids: __valids, invalids: __invalids, total: __valids + __invalids }
      const valids = pt.total === 0 ? 0 : ((pt.valids / (pt.valids + pt.invalids)) * 100).toFixed(2)
      const invalids = pt.total === 0 ? 0 : ((pt.invalids / (pt.invalids + pt.valids)) * 100).toFixed(2)

      return { valids, invalids }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/colors.sass'
.content
  width: calc(100% - 16px)
  margin: 6px
  display: flex
  flex-flow: column
.analytic
  width: calc(100% - 4px)
  margin: 2px
  border-collapse: collapse
  border: 1px dashed $background
  border-radius: $radius
  th, td
    border: 1px dashed $background
    padding: 8px 10px
    color: $input-text
  td
    background: $input
    text-align: center
    font-size: 13px
  td:nth-child(1)
    font-weight: bolder
    font-size: 12px
    background: darken($input, 8%)
  th
    background: darken($input, 7%)
    font-size: 12px
  tbody tr:hover
    td
      cursor: pointer
      background: darken($input, 2.5%)
    td:nth-child(1)
      background: darken($input, 6%)
    td.red
      background: rgba($red, 0.6)
    td.green
      background: rgba($green, 0.6)
    td.blue
      background: rgba($blue, 0.6)
    td.pink
      background: rgba($pink, 0.6)

  td.red
    background: rgba($red, 0.4)
  td.green
    background: rgba($green, 0.4)
  td.blue
    background: rgba($blue, 0.4)
  td.pink
    background: rgba($pink, 0.4)
  th.red
    background: rgba(darken($red, 15%), 0.6)
  th.green
    background: rgba(darken($green, 15%), 0.6)

@media screen and (min-width:1025px)
  .content
    flex-flow: row
  th, td
    padding: 10px
  td
    font-size: 14px
</style>
