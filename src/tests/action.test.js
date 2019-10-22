jest.mock("../api");

import api from "../api";
import action from "../action";

const stockNames = ["a", "b", "c"];

action.api = api;

api.getStockNames.mockImplementation(() => Promise.resolve(stockNames));

test("should start application", () => {
    const present = (names) => {
        expect(names).not.toBeNull();
        expect(names).toStrictEqual(stockNames);
    };

    action.present = present;
    action.startApp();
});
