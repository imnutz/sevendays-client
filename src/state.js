const SECONDS_30 = 30 * 1000;

export default {
    timerId: null,
    represent(model) {
        const app = this.view.stockApp(model.stockNames, this.dispatch);

        this.view.renderApp(app);
        if (model.stockData && model.stockData.length) {
            this.view.updateChart(model.stockData);
        }
        this.nextAction(model);
    },

    nextAction(model) {
        if (model.isSegmentReset()) {
            if (this.timerId) {
                clearInterval(this.timerId);
            }

            this.timerId = setInterval(() => {
                this.dispatch("fetchNext7");
            }, SECONDS_30);
        }
    }
};
