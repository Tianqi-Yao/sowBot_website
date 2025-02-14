"use client";

import React from "react";
import { Card, Space, Statistic } from "antd";

export const HealthAlertsCard = () => (
    <Card title="Health Alerts">
        <Space direction="vertical" size="middle">
            <Statistic title="Total Sick Animals" value={21} />
            <Statistic title="New Sick Animals <24h" value={15} />
            <Statistic title="Very Sick" value="5/21" />
            <Statistic title="Temperature Alert" value="16/21" />
            <Statistic title="Suspicious-sick" value="16/21" />
            <Statistic title="No Movement" value="0/21" />
            <Statistic title="Sick Calves" value="5/21" />
        </Space>
    </Card>
);
