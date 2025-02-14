"use client";

import { Radar } from "@ant-design/plots";
import React from "react";

// Sample data (Ensure to replace this with actual fetched data)
const sampleData = [
    { item: "Design", type: "Type A Score", score: 70 },
    { item: "Design", type: "Type B Score", score: 30 },
    { item: "Development", type: "Type A Score", score: 60 },
    { item: "Development", type: "Type B Score", score: 70 },
    { item: "Marketing", type: "Type A Score", score: 50 },
    { item: "Marketing", type: "Type B Score", score: 60 },
    { item: "Users", type: "Type A Score", score: 40 },
    { item: "Users", type: "Type B Score", score: 50 },
    { item: "Test", type: "Type A Score", score: 60 },
    { item: "Test", type: "Type B Score", score: 70 },
    { item: "Language", type: "Type A Score", score: 70 },
    { item: "Language", type: "Type B Score", score: 50 },
    { item: "Technology", type: "Type A Score", score: 50 },
    { item: "Technology", type: "Type B Score", score: 40 },
    { item: "Support", type: "Type A Score", score: 30 },
    { item: "Support", type: "Type B Score", score: 40 },
    { item: "Sales", type: "Type A Score", score: 60 },
    { item: "Sales", type: "Type B Score", score: 40 },
    { item: "UX", type: "Type A Score", score: 50 },
    { item: "UX", type: "Type B Score", score: 60 },
];

export function ActivityRadarChart({ data = sampleData }) {
    const config = {
        data,
        xField: "item",
        yField: "score",
        colorField: "type",
        shapeField: "smooth",
        area: {
            style: {
                fillOpacity: 0.5,
            },
        },
        scale: {
            x: { padding: 0.5, align: 0 },
            y: { tickCount: 5, domainMax: 80 },
        },
        axis: { x: { grid: true }, y: { zIndex: 1, title: false } },
        style: {
            lineWidth: 2,
        },
    };
    return <Radar {...config} />;
}
