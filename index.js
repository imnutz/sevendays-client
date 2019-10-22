import state from "./src/state";
import action from "./src/action";
import model from "./src/model";
import view from "./src/view";
import api from "./src/api";

import app from "./src/app";

app.create({
    state,
    action,
    model,
    view,
    api
});

app.dispatch("startApp");
