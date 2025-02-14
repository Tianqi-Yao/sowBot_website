"use client";

import React, { useState, useEffect } from "react";
import { generateFakeData, AnimalData } from "./(data)/fakeData";
import { Table, Button, DatePicker, Space, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import dayjs from "dayjs";
import "./TableStyles.css";

const { RangePicker } = DatePicker;

type OnChange = NonNullable<TableProps<AnimalData>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

export default function MonitorPage() {
    const [data, setData] = useState<AnimalData[]>([]);
    const [filteredData, setFilteredData] = useState<AnimalData[]>([]);
    const [dateRange, setDateRange] = useState<
        [dayjs.Dayjs | null, dayjs.Dayjs | null]
    >([null, null]);
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});

    useEffect(() => {
        const newData = generateFakeData(200);
        // console.log("Generated Data:", newData);
        setData(newData);
        setFilteredData(newData);
    }, []);

    // 处理日期筛选
    const handleDateFilter = (
        dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]
    ) => {
        setDateRange(dates);
        if (dates && dates[0] && dates[1]) {
            const start = dates[0].startOf("day").valueOf();
            const end = dates[1].endOf("day").valueOf();
            const filtered = data.filter((item) => {
                const itemDate = dayjs(item.lastAlert).valueOf();
                return itemDate >= start && itemDate <= end;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(data); // 如果没有日期范围，重置为原始数据
        }
    };

    // 表格筛选与排序处理
    const handleChange: OnChange = (pagination, filters, sorter) => {
        // console.log("Table params:", pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
    };

    // 一键重置筛选和排序
    const clearAll = () => {
        setDateRange([null, null]); // 重置日期范围
        setFilteredInfo({}); // 重置表格筛选器
        setSortedInfo({}); // 重置排序状态
        setFilteredData(data); // 重置数据为原始数据
    };

    // 表格列定义
    const columns: TableColumnsType<AnimalData> = [
        {
            title: "Animal ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
            filteredValue: filteredInfo.id || null, // 添加 filteredValue
        },
        {
            title: "Group",
            dataIndex: "group",
            key: "group",
            filters: [
                { text: "Group A", value: "A" },
                { text: "Group B", value: "B" },
                { text: "Group C", value: "C" },
            ],
            filteredValue: filteredInfo.group || null,
            onFilter: (value, record) => record.group === value,
        },
        {
            title: "Lactation",
            dataIndex: "lactation",
            key: "lactation",
            sorter: (a, b) => a.lactation - b.lactation,
            sortOrder:
                sortedInfo.columnKey === "lactation" ? sortedInfo.order : null,
            filteredValue: filteredInfo.lactation || null, // 添加 filteredValue
        },
        {
            title: "Days Since Breeding",
            dataIndex: "daysSinceBreeding",
            key: "daysSinceBreeding",
            sorter: (a, b) => a.daysSinceBreeding - b.daysSinceBreeding,
            sortOrder:
                sortedInfo.columnKey === "daysSinceBreeding"
                    ? sortedInfo.order
                    : null,
            filteredValue: filteredInfo.daysSinceBreeding || null, // 添加 filteredValue
        },
        {
            title: "Reproduction Status",
            dataIndex: "reproductionStatus",
            key: "reproductionStatus",
            filters: [
                { text: "Pregnant", value: "Pregnant" },
                { text: "Not Pregnant", value: "Not Pregnant" },
            ],
            filteredValue: filteredInfo.reproductionStatus || null,
            onFilter: (value, record) => record.reproductionStatus === value,
            render: (value, record) => (
                <Space size="middle">
                    <Tag color={value === "Pregnant" ? "green" : "volcano"}>
                        {value === "Pregnant" ? "Pregnant" : "Not Pregnant"}
                    </Tag>
                </Space>
            ),
        },
        {
            title: "Last Alert (Date)",
            dataIndex: "lastAlert",
            key: "lastAlert",
            render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
            sorter: (a, b) =>
                dayjs(a.lastAlert).valueOf() - dayjs(b.lastAlert).valueOf(),
            sortOrder:
                sortedInfo.columnKey === "lastAlert" ? sortedInfo.order : null,
            filteredValue: filteredInfo.lastAlert || null, // 添加 filteredValue
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <RangePicker
                        value={dateRange}
                        onChange={(dates) => {
                            setDateRange(dates);
                            handleDateFilter(dates);
                        }}
                        format="YYYY-MM-DD"
                    />
                    <Button
                        type="primary"
                        onClick={() => {
                            confirm();
                        }}
                        size="small"
                        style={{ marginLeft: 8 }}
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={() => {
                            if (clearFilters) clearFilters();
                            clearAll();
                        }}
                        size="small"
                        style={{ marginLeft: 8 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
        },
        {
            title: "Health State",
            dataIndex: "healthState",
            key: "healthState",
            render: (text, record) => (
                <span style={{ color: record.healthColor }}>{text}</span>
            ),
            filters: [
                { text: "No movement", value: "No movement" },
                { text: "Suspicious 1h", value: "Suspicious 1h" },
                { text: "Suspicious 3h", value: "Suspicious 3h" },
                { text: "Suspicious 22h", value: "Suspicious 22h" },
                { text: "Very sick 1h", value: "Very sick 1h" },
                { text: "Healthy", value: "Healthy" },
            ],
            filteredValue: filteredInfo.healthState || null,
            onFilter: (value, record) => record.healthState === value,
        },
        {
            title: "Standing (min)",
            dataIndex: "rumination",
            key: "rumination",
            sorter: (a, b) => a.rumination - b.rumination,
            sortOrder:
                sortedInfo.columnKey === "rumination" ? sortedInfo.order : null,
            filteredValue: filteredInfo.rumination || null, // 添加 filteredValue
        },
        {
            title: "Sitting  (min)",
            dataIndex: "eating",
            key: "eating",
            sorter: (a, b) => a.eating - b.eating,
            sortOrder:
                sortedInfo.columnKey === "eating" ? sortedInfo.order : null,
            filteredValue: filteredInfo.eating || null, // 添加 filteredValue
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <h1 className="text-5xl font-bold font-sans">
                Animal Monitoring Dashboard
            </h1>
            <Space style={{ marginBottom: 16 }}>
                {/* 重置按钮 */}
                <Button onClick={clearAll} type="default">
                    Reset Filtering And Sorting
                </Button>
            </Space>
            <Table<AnimalData>
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                onChange={handleChange}
                showSorterTooltip={{ target: "sorter-icon" }}
                bordered
                onRow={(record) => ({
                    style: {
                        // backgroundColor: "rgba(90, 251, 121, 0.8)"
                        fontSize: "20px",
                    },
                })}
            />
        </div>
    );
}
