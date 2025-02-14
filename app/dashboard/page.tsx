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
                        data={{
                            total: 100,
                            bred: 50,
                            inHeat: 30,
                            preHeat: 20,
                            open: 10,
                            remove: 5,
                        }}
                        title="Barn 1"
                    />
                </Col>
                <Col span={8}>
                    <BarnCard />
                </Col>
                <Col span={8}>
                    <BarnCard />
                </Col>
                <Col span={8}>
                    <BarnCard />
                </Col>
                <Col span={8}>
                    <BarnCard />
                </Col>
                <Col span={8}>
                    <BarnCard />
                </Col>
            </Row>
        </>
    );
}
