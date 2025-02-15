"use client";

import React from "react";
import { Pie } from "@ant-design/plots";
import { title } from "process";
import { fontString } from "chart.js/helpers";

const sampleDataTotal = {
    type: "Total Sows",
    value: 400,
};

const sampleData = [
    { type: "Bred", value: 90 },
    { type: "In-Heat", value: 120 },
    { type: "Pre-Heat", value: 80 },
    { type: "Open", value: 90 },
    { type: "Removed", value: 20 },
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
                fontSize: 12,
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
