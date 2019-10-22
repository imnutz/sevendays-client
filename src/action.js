export default {
    selectName(name) {
        this.present({
            selectedName: name
        });
    },

    fetchNext7() {
        this.present({ fetchNext7: true })
    },

    startApp() {
        this.api.getStockNames().then(data => this.present(data));
    }
}
