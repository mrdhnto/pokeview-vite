import apiFetch from '@/libs/apiFetch'

export default {
  namespaced: true,
  state: {
    filter: false,
    detail: false,
    message: false,
    messageData: {
      title: null,
      message: null,
    }
  },
  getters: {
    getFilterStatus: state => state.filter,
    getDetailStatus: state => state.detail,
    getMessageStatus: state => state.message,
    getMessageData: state => state.messageData,
  },
  mutations: {
    UPDATE_FILTER_STATUS(state, payload) {
      state.filter = !state.filter
    },
    UPDATE_DETAIL_STATUS(state, payload) {
      state.detail = !state.detail
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
    async SET_FILTER({commit}, data) {
      try {
        await commit('UPDATE_FILTER_STATUS')
        return true
      } catch (error) {
        throw error
      }
    },
    async SET_DETAIL({commit}, data) {
      try {
        await commit('UPDATE_DETAIL_STATUS')
        return true
      } catch (error) {
        throw error
      }
    },
    async SET_MESSAGE({commit}, data) {
      try {
        await commit('UPDATE_MESSAGE_STATUS')
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