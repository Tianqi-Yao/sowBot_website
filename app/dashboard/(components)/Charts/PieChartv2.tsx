"use client";

import React from "react";
import { Pie } from "@ant-design/plots";
import { title } from "process";
import { fontString } from "chart.js/helpers";

const sampleDataTotal = {
    type: "Total Monitored Sows",
    value: 120,
};

const sampleData = [
    { type: "Detected Estrus Sows", value: 18 },
    { type: "Suspected Estrus Sows", value: 7 },
    { type: "Non-Estrus Sows", value: 95 },
];

export function PieChartv2({ data = sampleData, total = sampleDataTotal }) {
    const config = {
        data,
        angleField: "value",
        colorField: "type",
        width: 400,
        height: 200,
        style: {
            inset: 1,
            stroke: "#fff",
        },
        label: {
            text: "value",
            style: {
                fontWeight: "bold",
                fontSize: 24,
            },
            position: "outside",
        },
        legend: {
            color: {
                title: false,
                position: "right",
                rowPadding: 5,
            },
        },
        interaction: {
            elementHighlight: true,
        },
        state: {
            inactive: { opacity: 0.5 },
        },
        tooltip: {
            title: "type",
            // name: "counting",
            channel: "y",
            valueFormatter: (d) => d.toFixed(0),
        },
    };
    return <Pie {...config} />;
}
