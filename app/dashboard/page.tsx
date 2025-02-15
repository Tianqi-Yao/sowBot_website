"use client";

import React from "react";
import { KeyMetricsCard } from "@/app/dashboard/(components)/Cards/KeyMetricsCard";
import { PieChart } from "./(components)/Charts/PieChart";
import { ActivityRadarChart } from "./(components)/Charts/ActivityRadarChart";
import PostureChart4Class from "@/app/posture/(components)/PostureChart4Class";
import { Card1 } from "@/app/dashboard/(components)/Cards/Card1";
import { Card2 } from "@/app/dashboard/(components)/Cards/Card2";
import { Card3 } from "@/app/dashboard/(components)/Cards/Card3";
import { BarnCard } from "./(components)/Cards/BarnCard";
import { useRouter } from "next/navigation";
import { Col, Row } from "antd";

export default function DashboardPage() {
    const router = useRouter(); // 使用 next/navigation 中的 useRouter

    return (
        <>
            <div className="text-5xl mb-4 font-bold">
                Estrus Detection Dashboard
            </div>
            <Row gutter={[16, 24]}>
                <Col span={12}>
                    <Card1 />
                </Col>
                <Col span={6}>
                    <Card2 />
                </Col>
                <Col span={6}>
                    <Card3 />
                </Col>
                <Col span={8}>
                    <BarnCard
                        data={[
                            { type: "Bred", value: 25 },
                            { type: "In-Heat", value: 45 },
                            { type: "Pre-Heat", value: 30 },
                            { type: "Open", value: 41 },
                            { type: "Remove", value: 1 },
                        ]}
                        total={{
                            type: "Total Sows",
                            value: 141,
                        }}
                        title="Barn 1"
                    />
                </Col>
                <Col span={8}>
                    <BarnCard
                        data={[
                            { type: "Bred", value: 35 },
                            { type: "In-Heat", value: 35 },
                            { type: "Pre-Heat", value: 30 },
                            { type: "Open", value: 40 },
                            { type: "Remove", value: 2 },
                        ]}
                        total={{
                            type: "Total Sows",
                            value: 142,
                        }}
                        title="Barn 2"
                    />
                </Col>
                <Col span={8}>
                    <BarnCard
                        data={[
                            { type: "Bred", value: 30 },
                            { type: "In-Heat", value: 40 },
                            { type: "Pre-Heat", value: 20 },
                            { type: "Open", value: 25 },
                            { type: "Remove", value: 2 },
                        ]}
                        total={{
                            type: "Total Sows",
                            value: 117,
                        }}
                        title="Barn 3"
                    />
                </Col>
            </Row>
        </>
    );
}
