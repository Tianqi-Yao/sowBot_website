"use client";

import React from "react";
import { KeyMetricsCard } from "@/app/dashboard/(components)/Cards/KeyMetricsCard";
import { PieChart } from "./(components)/Charts/PieChart";
import { ActivityRadarChart } from "./(components)/Charts/ActivityRadarChart";
import PostureChart4Class from "@/app/posture/(components)/PostureChart4Class";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter(); // 使用 next/navigation 中的 useRouter

    return (
        <div style={{ padding: 24 }}>
            {/* 标题区域 */}
            <div className="text-5xl mb-4 font-bold">Estrus Detection Dashboard</div>
            <div className="text-3xl mb-4 font-medium">
                Real-time monitoring of estrus status
            </div>

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
                    <ActivityRadarChart />
            </div>
            <div style={{ marginTop: 24 }}>
                    <PieChart />
            </div>
        </div>
    );
}
