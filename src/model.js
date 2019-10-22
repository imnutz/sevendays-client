export default {
    selectedStock: null,
    stockNames: null,
    stockData: null,
    currentSegment: 1,

    simpleCache: {},

    present(proposal = {}) {
        if (proposal.names) {
            this.stockNames = proposal.names;
            this.selectedStock = proposal.names[0];
            this.fetchFirstData();
        }

        if (proposal.fetchNext7) {
            const nextSegment = this.currentSegment + 1;
            const fromCache = this._fetchFromCache(
                this.selectedStock,
                nextSegment
            );

            // already in cache, just show it
            if (fromCache) {
                this.currentSegment += 1;
                this.stockData = fromCache;
                return this.represent(this);
            }

            // otherwise, fetch new ones
            this.fetchStocks(nextSegment).then(data => {
                if (data && data.length) {
                    this.currentSegment = nextSegment;
                    this.stockData = data;
                    this._cache(this.selectedStock, this.currentSegment, data);
                    this.represent(this);
                } else {
                    this.currentSegment = 1;
                    this.fetchFirstData();
                }
            });
        }

        if (
            proposal.selectedName &&
            this.selectedStock !== proposal.selectedName
        ) {
            this.selectedStock = proposal.selectedName;
            this.currentSegment = 1;

            this.fetchFirstData();
        }
    },

    fetchFirstData() {
        const fromCache = this._fetchFromCache(
            this.selectedStock,
            this.currentSegment
        );

        if (fromCache) {
            this.stockData = fromCache;
            return this.represent(this);
        }

        this.fetchStocks().then(data => {
            if (data && data.length) {
                this.stockData = data;

                this._cache(this.selectedStock, this.currentSegment, data);
                this.represent(this);
            }
        });
    },

    _cache(stock, segment, data) {
        if (!this.simpleCache[this.selectedStock]) {
            this.simpleCache[this.selectedStock] = {};
        }

        this.simpleCache[stock][segment] = data;
    },

    _fetchFromCache(stock, segment) {
        if (!this.simpleCache[stock] || !this.simpleCache[stock][segment])
            return null;

        return this.simpleCache[stock][segment];
    },

    fetchStocks(segment = 1) {
        return this.api.getStockData(this.selectedStock, segment);
    },

    isSegmentReset() {
        return this.currentSegment === 1;
    }
};
