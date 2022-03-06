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
    onFreezeCardRequest() {
        // state.cards =
    },
    onFreezeCardSuccess(state, data) {
        state.cards = data
    }
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
    async onFreezeCardd({ commit }, data) {
        try {
            commit('onFreezeCardRequest');
            if (data) {
                console.log('haha')
                const payload = { ...data };
                payload.status = !data.status;
                const response = await CardService.updateCard(payload.id, payload);
                // if (response.statusText === "OK") {
                //     cards[index]['status'] = payload.status;
                //   this.cardData = a
                //   console.log('cardData', this.cardData)
                //   // this.getCardAll();
                // }
                commit('onFreezeCardSuccess', response.data);
              }
        } catch (error) {
            // commit('getCardAllFailure', error);
        }
    },

};

const getters = {
    cards: state => state.cards,
    status: state => state.status,
};

export const card = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};