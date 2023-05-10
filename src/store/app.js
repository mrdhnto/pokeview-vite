import apiFetch from '@/libs/apiFetch'

export default {
  namespaced: true,
  state: {
    filter: false,
    filterId: 0,
    detail: false,
    detailFav: false,
    message: false,
    messageData: {
      title: null,
      message: null,
    }
  },
  getters: {
    getFilterStatus: state => state.filter,
    getFilterActive: state => state.filterId,
    getDetailStatus: state => state.detail,
    getDetailFavStatus: state => state.detailFav,
    getMessageStatus: state => state.message,
    getMessageData: state => state.messageData,
  },
  mutations: {
    UPDATE_FILTER_STATUS(state, payload) {
      state.filter = !state.filter
    },
    UPDATE_FILTER_ID(state, payload) {
      state.filterId = parseInt(payload)
    },
    UPDATE_DETAIL_STATUS(state, payload) {
      state.detail = !state.detail
      state.detailFav = payload
    },
    UPDATE_MESSAGE_STATUS(state, payload) {
      state.message = !state.message
    },
    UPDATE_MESSAGE_DATA(state, payload) {
      state.messageData = {
        title: payload.title,
        message: payload.message
      }
    },
  },
  actions: {
    async SET_FILTER({commit}, data = false) {
      try {
        await commit('UPDATE_FILTER_STATUS', data)
        console.log(typeof data)
        if (typeof(data) === 'string') await commit('UPDATE_FILTER_ID', data)
        return true
      } catch (error) {
        throw error
      }
    },
    async CLEAR_FILTER({commit}, data) {
      try {
        await commit('UPDATE_FILTER_STATUS', data)
        await commit('UPDATE_FILTER_ID', 0)
        return true
      } catch (error) {
        throw error
      }
    },
    async SET_DETAIL({commit}, data) {
      try {
        await commit('UPDATE_DETAIL_STATUS', data)
        return true
      } catch (error) {
        throw error
      }
    },
    async SET_MESSAGE({commit}, data) {
      try {
        // await commit('UPDATE_MESSAGE_STATUS', data)
        return true
      } catch (error) {
        throw error
      }
    },
    async SET_MESSAGE_DATA({commit}, data) {
      try {
        await commit('UPDATE_MESSAGE_DATA', data)
        return true
      } catch (error) {
        throw error
      }
    },
  },
}