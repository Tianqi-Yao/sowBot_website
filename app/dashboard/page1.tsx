"use client"; // Mark as client component

import React from "react";
import { Card, Col, Row, Statistic, Typography, Table, Space } from "antd";
import {
    Line,
    Pie,
    Gauge,
    Radar,
    RadialBar,
    Scatter,
    Violin,
    Liquid,
} from "@ant-design/charts";
import type { TableColumnsType } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

// Mock data
const generateFakeData = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        group: ["A", "B", "C"][Math.floor(Math.random() * 3)],
        dim: Math.floor(Math.random() * 300),
        lactation: Math.floor(Math.random() * 4) + 1,
        daysSinceBreeding: Math.floor(Math.random() * 200),
        reproductionStatus: Math.random() > 0.5 ? "Pregnant" : "Not Pregnant",
        lastAlert: dayjs()
            .subtract(Math.floor(Math.random() * 30), "days")
            .format("YYYY-MM-DD HH:mm:ss"),
        healthState: ["Healthy", "Warning", "Critical"][
            Math.floor(Math.random() * 3)
        ],
        rumination: Math.floor(Math.random() * 600),
        eating: Math.floor(Math.random() * 400),
    }));
};

const data = generateFakeData(200);

// Chart data
const lineData = data.map((item) => ({
    date: item.lastAlert,
    value: item.daysSinceBreeding,
}));

const pieData = [
    {
        type: "Healthy",
        value: data.filter((item) => item.healthState === "Healthy").length,
    },
    {
        type: "Warning",
        value: data.filter((item) => item.healthState === "Warning").length,
    },
    {
        type: "Critical",
        value: data.filter((item) => item.healthState === "Critical").length,
    },
];

const radarData = [
    { item: "Health", value: 80 },
    { item: "Reproduction", value: 90 },
    { item: "Activity", value: 70 },
    { item: "Nutrition", value: 85 },
    { item: "Behavior", value: 75 },
];

const radialBarData = [
    { name: "Health", value: 80 },
    { name: "Reproduction", value: 90 },
    { name: "Activity", value: 70 },
    { name: "Nutrition", value: 85 },
    { name: "Behavior", value: 75 },
];

const scatterData = data.map((item) => ({
    x: item.daysSinceBreeding,
    y: item.rumination,
    color: item.healthState,
}));

const densityData = data.map((item) => ({
    value: item.daysSinceBreeding,
    category: item.group,
}));

const violinData = data.map((item) => ({
    value: item.daysSinceBreeding,
    category: item.group,
}));

const liquidData = 0.65; // Liquid chart data

// Table column definitions
const columns: TableColumnsType<any> = [
    {
        title: "Animal ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Group",
        dataIndex: "group",
        key: "group",
    },
    {
        title: "Days Since Breeding",
        dataIndex: "daysSinceBreeding",
        key: "daysSinceBreeding",
    },
    {
        title: "Reproduction Status",
        dataIndex: "reproductionStatus",
        key: "reproductionStatus",
    },
    {
        title: "Last Alert",
        dataIndex: "lastAlert",
        key: "lastAlert",
    },
    {
        title: "Health State",
        dataIndex: "healthState",
        key: "healthState",
    },
];

// Health Alerts Card
const HealthAlertsCard = () => (
    <Card title="Health Alerts">
        <Space direction="vertical" size="middle">
            <Statistic title="Total Sick Cows" value={21} />
            <Statistic title="New Sick Cows <24h" value={15} />
            <Statistic title="Very Sick" value="5/21" />
            <Statistic title="Temperature Alert" value="16/21" />
            <Statistic title="Suspicious-sick" value="16/21" />
            <Statistic title="No Movement" value="0/21" />
            <Statistic title="Sick Calves" value="5/21" />
        </Space>
    </Card>
);

export default function DashboardPage() {
    return (
        <div style={{ padding: 24 }}>
            {/* Title */}
            <Title level={2}>Pregnancy Detection Dashboard</Title>
            <Text type="secondary">Real-time monitoring of pregnancy status and health data</Text>

            {/* Key Metrics */}
            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Count"
                            value={data.length}
                            valueStyle={{ color: "#3f8600" }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Pregnant Count"
                            value={
                                data.filter(
                                    (item) =>
                                        item.reproductionStatus === "Pregnant"
                                ).length
                            }
                            valueStyle={{ color: "#3f8600" }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Healthy Count"
                            value={
                                data.filter(
                                    (item) => item.healthState === "Healthy"
                                ).length
                            }
                            valueStyle={{ color: "#3f8600" }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Warning Count"
                            value={
                                data.filter(
                                    (item) => item.healthState === "Warning"
                                ).length
                            }
                            valueStyle={{ color: "#cf1322" }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Charts */}
            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={12}>
                    <Card title="Days Since Breeding Trend">
                        <Line
                            data={lineData}
                            xField="date"
                            yField="value"
                            point={{ size: 5, shape: "circle" }}
                            color="#3f8600"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Health Status Distribution">
                        <Pie
                            data={pieData}
                            angleField="value"
                            colorField="type"
                            radius={0.8}
                            label={{
                                type: "inner",
                                offset: "-30%",
                                content: "{value}",
                            }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* More Charts */}
            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={6}>
                    <Card title="Gauge">
                        <Gauge
                            percent={0.75}
                            range={{ color: "#30BF78" }}
                            statistic={{ content: "75%" }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Radar Chart">
                        <Radar
                            data={radarData}
                            xField="item"
                            yField="value"
                            area={{ style: { fill: "#30BF78" } }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Radial Bar Chart">
                        <RadialBar
                            data={radialBarData}
                            xField="name"
                            yField="value"
                            radius={0.8}
                            innerRadius={0.2}
                            color="#30BF78"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <HealthAlertsCard />
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={12}>
                    <Card title="Scatter Plot">
                        <Scatter
                            data={scatterData}
                            xField="x"
                            yField="y"
                            colorField="color"
                            size={5}
                            shape="circle"
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={12}>
                    <Card title="Violin Plot">
                        <Violin
                            data={violinData}
                            xField="category"
                            yField="value"
                            shape="violin"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Liquid Chart">
                        <Liquid
                            percent={liquidData}
                            outline={{ border: 4, distance: 8 }}
                            wave={{ length: 128 }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Table */}
            <Card style={{ marginTop: 24 }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
}