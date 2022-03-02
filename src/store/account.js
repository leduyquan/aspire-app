import AuthService  from '../services/auth/auth.service';
import { router } from '../routes';

const state = {
    token: localStorage.getItem('accessToken') || '',
    status: ''
}

const mutations = {
    loginRequest(state) {
        state.status = 'loading';
    },
    loginSuccess(state, token) {
        state.status = 'success';
        state.token = token;
    },
    loginFailure(state) {
        state.status = 'error';
    },
    logout(state) {
        state.status = '';
        state.token = null;
    },
};

const actions = {
    login({ commit }, { email, password }) {
        commit('loginRequest');
        AuthService.login(email, password)
            .then(
                payload => {
                    commit('loginSuccess', payload.data.token);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                }
            );
    },
    logout({ commit }) {
        AuthService.logout();
        commit('logout');
    },
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
};

export const account = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};