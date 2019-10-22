export default {
    intents: {
        "selectName": "selectName",
        "startApp": "startApp",
        "fetchNext7": "fetchNext7"
    },

    create(config) {
        this.state = config.state;
        this.action = config.action;
        this.model = config.model;
        this.view = config.view;

        this.api = config.api;

        this._wireComponents();
    },

    _wireComponents() {
        this.action.present = this.model.present.bind(this.model);
        this.action.api = this.api;

        this.model.represent = this.state.represent.bind(this.state);
        this.model.api = this.api;

        this.state.view = this.view;
        this.state.dispatch = this.dispatch.bind(this);
    },

    dispatch(action, ...args) {
        var action = [].slice.call(arguments).shift(),
            args = [].slice.call(arguments, 1);

        this.action[(this.intents[action])](...args);
    }
}
