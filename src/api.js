const SERVER_URL = "http://localhost:3000";

export default {
    getStockNames() {
        return fetch(`${SERVER_URL}/stocks`).then(response => response.json());
    },

    getStockData(name, segment) {
        return fetch(`${SERVER_URL}/stocks/${name}/${segment}`).then(response =>
            response.json()
        );
    },

    fetchAll(...promises) {
        return Promise.all(promises);
    }
};
