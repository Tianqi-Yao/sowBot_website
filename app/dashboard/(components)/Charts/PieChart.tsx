"use client";

import React from "react";
import { Pie } from "@ant-design/plots";

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

export function PieChart({ data = sampleData, total = sampleDataTotal }) {
    const config = {
        data,
        angleField: "value",
        colorField: "type",
        innerRadius: 0.6,
        width: 200,
        height: 300,
        // padding: [0, 0, 0, 0],
        style: {
            inset: 1,
            stroke: "#fff",
        },
        label: false,
        // {
        //     text: (d) => `${((d.value / total.value) * 100).toFixed(2)}%`,
        //     style: {
        //         fontWeight: "bold",
        //         fontSize: 12,
        //     },
        //     position: "outside",
        // },
        legend: false,
        // {
        //     color: {
        //         title: false,
        //         // position: "right",
        //         itemLabelFontSize: 10,
        //         itemMarkerSize: 10,
        //     },
        // },
        // annotations: [
        //     {
        //         type: "text",
        //         style: {
        //             text: `Total\n${total.value}`,
        //             x: "50%",
        //             y: "50%",
        //             textAlign: "center",
        //             fontSize: 28,
        //             fontStyle: "bold",
        //         },
        //     },
        // ],
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
