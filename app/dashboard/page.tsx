"use client";

import React from "react";
import { Typography } from "antd";
import { generateFakeData } from "@/app/dashboard/(utils)/generateFakeData";
import { KeyMetricsCard } from "@/app/dashboard/(components)/Cards/KeyMetricsCard";
import { HealthAlertsCard } from "@/app/dashboard/(components)/Cards/HealthAlertsCard";
import { HealthStatusPieChart } from "./(components)/Charts/HealthStatusPieChart";
import { ActivityRadarChart } from "./(components)/Charts/ActivityRadarChart";

import PostureChart from "@/app/posture/(components)/PostureChart";

const { Title, Text } = Typography;

export default function DashboardPage() {
    // 生成假数据
    const data = generateFakeData(200);

    return (
        <div style={{ padding: 24 }}>
            {/* 标题区域 */}
            <Title level={2}>Pregnancy Detection Dashboard</Title>
            <Text type="secondary">
                Real-time monitoring of pregnancy status and health data
            </Text>

            {/* 关键指标卡片 */}
            <KeyMetricsCard data={data} />
            

            {/* 健康告警卡片 */}
            <div style={{ marginTop: 24 }}>
                <PostureChart />
                <HealthAlertsCard />
            </div>
            
            <div style={{ marginTop: 24 }}>
                <div className="flex flex-row justify-between">
                    <ActivityRadarChart
                        data={[
                            { item: "Health", value: 80 },
                            { item: "Reproduction", value: 90 },
                            { item: "Activity", value: 70 },
                            { item: "Nutrition", value: 85 },
                            { item: "Behavior", value: 75 },
                        ]}
                    />
                    <HealthStatusPieChart data={data} />
                </div>
            </div>
        </div>
    );
}
