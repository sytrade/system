import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const stateMockup = {
  time: 1,
  hour: null,
  lasthour: null,
  candles: []
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    currency: 'none',
    money: 0,
    win: 0,
    loss: 0,
    entries: 0,
    day: null,
    states: {
      none: { ...stateMockup },
      audcad: { ...stateMockup },
      audusd: { ...stateMockup },
      audjpy: { ...stateMockup },

      cadjpy: { ...stateMockup },

      eurusd: { ...stateMockup },
      eurgbp: { ...stateMockup },
      euraud: { ...stateMockup },
      eurjpy: { ...stateMockup },
      eurcad: { ...stateMockup },
      eurchf: { ...stateMockup },

      gbpusd: { ...stateMockup },
      gbpnzd: { ...stateMockup },
      gbpchf: { ...stateMockup },
      gbpcad: { ...stateMockup },
      gbpaud: { ...stateMockup },
      gbpjpy: { ...stateMockup },

      nzdusd: { ...stateMockup },

      usdjpy: { ...stateMockup },
      usdcad: { ...stateMockup },
      usdchf: { ...stateMockup }
    }
  },
  getters: {
    getMoney: (state) => state.money,
    getWin: (state) => state.win,
    getLoss: (state) => state.loss,
    getEntries: (state) => state.entries,
    getTime: (state) => state.states[state.currency].time,
    getHour: (state) => state.states[state.currency].hour,
    getLasthour: (state) => state.states[state.currency].lasthour,
    getDay: (state) => state.day,
    getCandles: (state) => state.states[state.currency].candles,
    getCurrency: (state) => state.currency
  },
  mutations: {
    SET_MONEY: (state, value) => (state.money = value),
    SET_WIN: (state, value) => (state.win = value),
    SET_LOSS: (state, value) => (state.loss = value),
    SET_ENTRIES: (state, value) => (state.entries = value),
    SET_TIME: (state, value) => (state.states[state.currency].time = value),
    SET_HOUR: (state, value) => (state.states[state.currency].hour = value),
    SET_LASTHOUR: (state, value) => (state.states[state.currency].lasthour = value),
    SET_DAY: (state, value) => (state.day = value),
    SET_CANDLES: (state, value) => (state.states[state.currency].candles = value),
    SET_CURRENCY: (state, value) => {
      if (state.states[value] === null || state.states[value] === undefined) {
        state.states[value] = { ...stateMockup }
      }

      state.currency = value
    }
  },
  actions: {
    setMoney: ({ commit }, value) => commit('SET_MONEY', value),
    setWin: ({ commit }, value) => commit('SET_WIN', value),
    setLoss: ({ commit }, value) => commit('SET_LOSS', value),
    setEntries: ({ commit }, value) => commit('SET_ENTRIES', value),
    setTime: ({ commit }, value) => commit('SET_TIME', value),
    setHour: ({ commit }, value) => commit('SET_HOUR', value),
    setLasthour: ({ commit }, value) => commit('SET_LASTHOUR', value),
    setDay: ({ commit }, value) => commit('SET_DAY', value),
    setCandles: ({ commit }, value) => commit('SET_CANDLES', value),
    setCurrency: ({ commit }, value) => commit('SET_CURRENCY', value)
  }
})
