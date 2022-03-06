import CardService  from '../services/card.service';

const state = {
    cards: [],
    status: ''
}

const mutations = {
    getCardAllRequest(state) {
        state.status = 'loading';
    },
    getCardAllSuccess(state, data) {
        state.status = 'success';
        state.cards = data;
    },
    getCardAllFailure(state) {
        state.status = 'error';
    },
};

const actions = {
    async getCardAll({ commit }) {
        try {
            commit('getCardAllRequest');
            const response = await CardService.getCardAll();
            commit('getCardAllSuccess', response.data);
        } catch (error) {
            commit('getCardAllFailure', error);
        }
    },
};

const getters = {
    cards: state => state.cards.map(item => ({
        ...item,
        isShowNumber: false
    })),
    status: state => state.status,
};

export const card = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};