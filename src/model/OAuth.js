import 'localstorage-polyfill';

export default class OAuth {

    static set token (token) {
        localStorage.token = token;
    }

    static get token () {
        return localStorage.token;
    }

    static get bearerToken() {
        return 'Bearer ' + this.token;
    }

    static get headers() {
        return { Authorization: this.bearerToken };
    }
}