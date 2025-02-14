"use client";

import React from "react";
import { Radar } from "@ant-design/charts";

type ActivityRadarChartProps = {
    data: { item: string; value: number }[];
};

export const ActivityRadarChart = ({ data }: ActivityRadarChartProps) => {
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
