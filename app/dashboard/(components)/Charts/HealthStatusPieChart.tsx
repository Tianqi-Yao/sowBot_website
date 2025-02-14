"use client";

import React from "react";
import { Pie } from "@ant-design/plots";
import { PregnancyData } from "@/app/dashboard/(types)/PregnancyData";

type HealthStatusPieChartProps = {
    data: PregnancyData[];
};

export const HealthStatusPieChart = ({ data }: HealthStatusPieChartProps) => {
    // 统计健康状态数据
    const chartData = [
        {
            name: "Healthy",
            value: data.filter((item) => item.healthState === "Healthy").length,
        },
        {
            name: "Warning",
            value: data.filter((item) => item.healthState === "Warning").length,
        },
        {
            name: "Critical",
            value: data.filter((item) => item.healthState === "Critical")
                .length,
        },
    ];

    const config = {
        data: chartData,
        angleField: "value",
        colorField: "name",
        innerRadius: 0.6,
        legend: false,
        labels: [
            {
                text: "name",
                style: { fontSize: 10, fontWeight: "bold" },
            },
            {
                text: (d: any, i: number, dataArr: any[]) =>
                    i < dataArr.length - 3 ? d.value : "",
                style: {
                    fontSize: 9,
                    dy: 12,
                },
            },
        ],
        style: {
            stroke: "#fff",
            inset: 1,
            radius: 10,
        },
        scale: {
            color: {
                palette: "spectral",
                offset: (t: number) => t * 0.8 + 0.1,
            },
        },
    };

    return <Pie {...config} />;
};
