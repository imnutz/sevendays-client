jest.mock("../api");

import api from "../api";
import model from "../model";

const data = [
    { date: "2002-01-11", name: "DTE", value: "41.02" },
    { date: "2002-01-14", name: "DTE", value: "41.42" },
    { date: "2002-01-15", name: "DTE", value: "42.01" },
    { date: "2002-01-16", name: "DTE", value: "41.98" },
    { date: "2002-01-17", name: "DTE", value: "41.66" },
    { date: "2002-01-18", name: "DTE", value: "41.74" },
    { date: "2002-01-22", name: "DTE", value: "40.95" }
];
const nextdata = [
    { date: "2002-01-21", name: "DTE", value: "41.02" },
    { date: "2002-01-24", name: "DTE", value: "41.42" },
    { date: "2002-01-25", name: "DTE", value: "42.01" },
];


model.api = api;

test("should accept stock names list", () => {
    api.getStockData.mockImplementation(() => Promise.resolve(data));
    const represent = m => {
        expect(m.stockNames).toStrictEqual(["a"]);
    };
    model.represent = represent;
    model.present({ names: ["a"] });
});

test("should fetch first data", () => {
    api.getStockData.mockImplementation(() => Promise.resolve(data));
    const represent = m => {
        expect(m.stockData).toStrictEqual(data);
    };
    model.represent = represent;
    model.present({ names: ["a"] });
});

test("should fetch next data", () => {
    api.getStockData.mockImplementation(() => Promise.resolve(nextdata));
    const represent = m => {
        expect(m.stockData).toStrictEqual(nextdata);
    };
    model.represent = represent;
    model.present({ fetchNext7: true});
});
