"use client";

import { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";

export function KeyMetricsCard() {
    const [metrics, setMetrics] = useState({
        TotalMonitoredSows: 120,
        DetectedEstrusSows: 18,
        SuspectedEstrusSows: 7,
        NonEstrusSows: 95,
    });

    return (
        <Row gutter={16} style={{ marginTop: 24 }}>
            <Col span={6}>
                <Card>
                    <Statistic
                        title={
                            <div style={{ fontWeight: "bold" }}>
                                Total Monitored Sows
                            </div>
                        }
                        value={metrics.TotalMonitoredSows}
                        valueStyle={{ color: "#3f8600" }}
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title={
                            <div style={{ fontWeight: "bold" }}>
                                Estrus in Today
                            </div>
                        }
                        value={metrics.DetectedEstrusSows}
                        valueStyle={{ color: "#cf1322" }}
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title={
                            <div style={{ fontWeight: "bold" }}>
                                Estrus in Tommorrow
                            </div>
                        }
                        value={metrics.SuspectedEstrusSows}
                        valueStyle={{ color: "#3f8600" }}
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title={
                            <div style={{ fontWeight: "bold" }}>
                                Non-Estrus Sows
                            </div>
                        }
                        value={metrics.NonEstrusSows}
                        valueStyle={{ color: "#3f8600" }}
                    />
                </Card>
            </Col>
        </Row>
    );
}
