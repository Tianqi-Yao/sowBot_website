"use client";

import React from "react";
import { Typography } from "antd";
import { KeyMetricsCard } from "@/app/dashboard/(components)/Cards/KeyMetricsCard";
import { HealthStatusPieChart } from "./(components)/Charts/HealthStatusPieChart";
import { ActivityRadarChart } from "./(components)/Charts/ActivityRadarChart";
import PostureChart4Class from "@/app/posture/(components)/PostureChart4Class";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function DashboardPage() {
    const router = useRouter(); // 使用 next/navigation 中的 useRouter

    return (
        <div style={{ padding: 24 }}>
            {/* 标题区域 */}
            <Title level={2}>Estrus Detection Dashboard</Title>
            <Text type="secondary">
                Real-time monitoring of estrus status and health data
            </Text>

            {/* 关键指标卡片 */}
            <KeyMetricsCard />

            {/* 健康告警卡片 */}
            <div style={{ marginTop: 24 }}>
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/posture")}
                >
                    <PostureChart4Class />
                </div>
            </div>

            <div style={{ marginTop: 24 }}>
                <div className="flex flex-row justify-between">
                    <ActivityRadarChart />
                    {/* <HealthStatusPieChart /> */}
                </div>
            </div>
        </div>
    );
}
