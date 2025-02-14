"use client";

import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import { PregnancyData } from "@/app/dashboard/(types)/PregnancyData";

type KeyMetricsCardProps = {
    data: PregnancyData[];
};

export const KeyMetricsCard = ({ data }: KeyMetricsCardProps) => {
    const [metrics, setMetrics] = useState({
        totalCount: 0,
        pregnantCount: 0,
        healthyCount: 0,
        warningCount: 0,
    });

    useEffect(() => {
        // Calculate metrics on the client side
        const calculatedMetrics = data.reduce(
            (acc, item) => {
                acc.totalCount += 1;
                if (item.reproductionStatus === "Pregnant") {
                    acc.pregnantCount += 1;
                }
                if (item.healthState === "Healthy") {
                    acc.healthyCount += 1;
                }
                if (item.healthState === "Warning") {
                    acc.warningCount += 1;
                }
                return acc;
            },
            {
                totalCount: 0,
                pregnantCount: 0,
                healthyCount: 0,
                warningCount: 0,
            }
        );

        setMetrics(calculatedMetrics);
    }, [data]);

    return (
        <Row gutter={16} style={{ marginTop: 24 }}>
            <Col span={6}>
                <Card>
                    <Statistic
                        title="Total Count"
                        value={metrics.totalCount}
                        valueStyle={{ color: "#3f8600" }}
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title="Pregnant Count"
                        value={metrics.pregnantCount}
                        valueStyle={{ color: "#3f8600" }}
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title="Healthy Count"
                        value={metrics.healthyCount}
                        valueStyle={{ color: "#3f8600" }}
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title="Warning Count"
                        value={metrics.warningCount}
                        valueStyle={{ color: "#cf1322" }}
                    />
                </Card>
            </Col>
        </Row>
    );
};