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
            <Col span={6} className="max-w-xs">
                <Card>
                    <Statistic
                        title={
                            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                Total Monitored Sows
                            </div>
                        }
                        value={metrics.TotalMonitoredSows}
                        valueStyle={{ color: "rgb(39, 181, 14)" }}
                    />
                </Card>
            </Col>
            <Col span={6} className="max-w-xs">
                <Card>
                    <Statistic
                        title={
                            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                Estrus in Today
                            </div>
                        }
                        value={metrics.DetectedEstrusSows}
                        valueStyle={{ color: "rgb(209, 29, 29)" }}
                    />
                </Card>
            </Col>
            <Col span={6} className="max-w-xs">
                <Card>
                    <Statistic
                        title={
                            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                Estrus in Tommorrow
                            </div>
                        }
                        value={metrics.SuspectedEstrusSows}
                        valueStyle={{ color: "rgb(98, 83, 197)" }}
                    />
                </Card>
            </Col>
            <Col span={6} className="max-w-xs">
                <Card>
                    <Statistic
                        title={
                            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                Non-Estrus Sows
                            </div>
                        }
                        value={metrics.NonEstrusSows}
                        valueStyle={{ color: "rgb(214, 187, 37)" }}
                    />
                </Card>
            </Col>
        </Row>
    );
}
