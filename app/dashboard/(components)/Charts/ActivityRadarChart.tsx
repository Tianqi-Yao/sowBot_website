"use client";

import React from "react";
import { Radar } from "@ant-design/charts";

// Sample data (Ensure to replace this with actual fetched data)
const sampleData = [
    { item: "Activity A", value: 80 },
    { item: "Activity B", value: 70 },
    { item: "Activity C", value: 90 },
    { item: "Activity D", value: 60 },
    { item: "Activity E", value: 85 },
];

export  function ActivityRadarChart({ data = sampleData }) {
    const config = {
        data,
        xField: "item",
        yField: "value",
        appendPadding: [10, 10, 10, 10],
        area: {
            style: {
                fill: "rgba(24, 144, 255, 0.3)",
            },
        },
        line: {
            style: {
                stroke: "#1890FF",
            },
        },
        point: {
            size: 4,
            shape: "circle",
            style: {
                fill: "#1890FF",
                stroke: "#fff",
                lineWidth: 2,
            },
        },
        tooltip: {
            showTitle: false,
            formatter: (datum: { item: string; value: number }) => ({
                name: datum.item,
                value: datum.value.toFixed(1),
            }),
        },
    };

    return <Radar {...config} />;
};
