"use client";

import React, { useState, useEffect } from "react";
import { generateFakeData } from "./(data)/fakeData";
import { Table, Button, DatePicker, Space, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import dayjs from "dayjs";
import "./TableStyles.css";
import { useMountMergeState } from "@ant-design/pro-components";

const { RangePicker } = DatePicker;

type OnChange = NonNullable<TableProps["onChange"]>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

export default function MonitorPage() {
    const [data, setData] = useMountMergeState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dateRange, setDateRange] = useState<
        [dayjs.Dayjs | null, dayjs.Dayjs | null]
    >([null, null]);
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});

    useEffect(() => {
        const newData = generateFakeData(200);
        console.log("Generated Data:", newData);
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
    const columns: TableColumnsType = [
        {
            title: "Animal ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
            filteredValue: filteredInfo.id || null, // 添加 filteredValue
        },
        {
            title: "Pen",
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
            title: "Barn",
            dataIndex: "lactation",
            key: "lactation",
            sorter: (a, b) => a.lactation - b.lactation,
            sortOrder:
                sortedInfo.columnKey === "lactation" ? sortedInfo.order : null,
            filteredValue: filteredInfo.lactation || null, // 添加 filteredValue
        },
        {
            title: "Move in Days",
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
            title: "Status",
            dataIndex: "Status",
            key: "Status",
            filters: [
                { text: "Bred", value: "Bred" },
                { text: "In-Heat", value: "In-Heat" },
                { text: "Pre-Heat", value: "Pre-Heat" },
                { text: "Open", value: "Open" },
                { text: "Removed", value: "Removed" },
            ],
            filteredValue: filteredInfo.Status || null,
            onFilter: (value, record) => record.Status === value,
            render: (value, record) => (
                <Space size="middle">
                    <Tag
                        color={
                            value === "Bred"
                                ? "green"
                                : value === "In-Heat"
                                ? "red"
                                : value === "Pre-Heat"
                                ? "orange"
                                : value === "Open"
                                ? "blue"
                                : "gray"
                        }
                    >
                        {value}
                    </Tag>
                </Space>
            ),
        },
        {
            title: "Last Checked",
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
            title: "Body Condition Score (BCS)",
            dataIndex: "BCS",
            key: "BCS",
            className: 'BCS',
            filters: [
                { text: "1", value: "1" },
                { text: "2", value: "2" },
                { text: "3", value: "3" },
                { text: "4", value: "4" },
                { text: "5", value: "5" },
            ],
            filteredValue: filteredInfo.healthState || null,
            onFilter: (value, record) => record.BCS === value,
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
            <Table
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
