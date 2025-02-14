"use client";

import React from "react";
import { Pie } from "@ant-design/plots";
import { title } from "process";

const sampleDataTotal = {
    type: "Total Monitored Sows",
    value: 120,
};

const sampleData = [
    { type: "Detected Estrus Sows", value: 18 },
    { type: "Suspected Estrus Sows", value: 7 },
    { type: "Non-Estrus Sows", value: 95 },
];

export function PieChart({ data = sampleData, total = sampleDataTotal }) {
    const config = {
        data,
        angleField: "value",
        colorField: "type",
        innerRadius: 0.5,
        width: 400,
        height: 300,
        style: {
            inset: 1,
            stroke: "#fff", 
        },
        label: {
            text: (d) => `${(d.value / total.value).toFixed(4) * 100}%`,
            style: {
                fontWeight: "bold",
                fontSize: 14,
            },
        },
        // legend: {
        //     color: {
        //         title: false,
        //         position: "right",
        //         rowPadding: 6,
        //         itemLabelFontSize: 18,
        //         itemMarkerSize: 18,
        //     },
        // },
        annotations: [
            {
                type: "text",
                style: {
                    text: `Total\n${total.value}`,
                    x: "50%",
                    y: "50%",
                    textAlign: "center",
                    fontSize: 28,
                    fontStyle: "bold",
                },
            },
        ],
        tooltip: {
            title: "type",
            // name: "counting",
            channel: "y",
            valueFormatter: (d) => d.toFixed(0),
        },
        interaction: {
            elementHighlight: true,
        },
        state: {
            inactive: { opacity: 0.5 },
        },
    };
    return <Pie {...config} />;
}
