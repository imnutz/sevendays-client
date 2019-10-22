import { html, render } from "lit-html";
import Chart from "chart.js";

let chartInstance;

const stockOptions = (stockNames = [], dispatch) => {
    const changeHandler = (evt) => {
        const value = evt.target.value;

        dispatch("selectName", value);
    };

    return html`
        <div class="stock-options">
            <span>Stock Option:</span>
            <select @change=${changeHandler}>
                ${stockNames.map(
                    name => html`<option value=${name}>${name}</options>`
                )}
            </select>
        </div>
    `;
};

const stockApp = (stockNames = [], dispatch) => {
    return html`
        ${stockOptions(stockNames, dispatch)}
        <div class="chart-container">
            <span>loading data...</span>
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>
    `;
};

const getLabels = (data = []) => {
    return data.map(stock => stock.date);
};

const getValues = (data = []) => {
    return data.map(stock => stock.value);
};

const updateChart = (stockData = []) => {
    const ctx = document.querySelector("#myChart");
    const labels = getLabels(stockData || []),
        values = getValues(stockData || []);

    document.querySelector(".chart-container span").style.display = "none";

    if (!chartInstance) {
        chartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "Stock value",
                        data: values,

                        backgroundColor: "rgba(0, 0, 255, 0.8)",
                        borderColor: "rgba(0, 0, 155, 1)",
                        borderWidth: 1
                    }
                ]
            }
        });
    } else {
        chartInstance.data.labels = getLabels(stockData);
        chartInstance.data.datasets[0].data = getValues(stockData);
        chartInstance.update();
    }
};

const renderApp = app => {
    render(app, document.querySelector("#app"));
};

export default { stockOptions, updateChart, renderApp, stockApp };
