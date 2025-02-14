import { useState, useEffect } from "react";
import { AnimalData } from "../(data)/fakeData";
import { filterConfig } from "../(config)/filterConfig";

export function useFilter(data: AnimalData[]) {
    const [filters, setFilters] = useState<{
        [key: string]:
            | string
            | number
            | { start?: string; end?: string }
            | undefined;
    }>({});
    const [filteredData, setFilteredData] = useState<AnimalData[]>(data);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof AnimalData;
        direction: "asc" | "desc";
    } | null>(null);

    // 当数据变化时重置筛选
    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    // 更新筛选条件并立即筛选
    const updateFilter = (
        column: keyof AnimalData,
        value: string | number | { start?: string; end?: string } | undefined
    ) => {
        setFilters((prev) => ({
            ...prev,
            [column]: value || undefined,
        }));
    };

    // 获取筛选值集合
    const getFilteredValues = (key: keyof AnimalData) => {
        let filteredSet = new Set<string | number>();
        filteredData.forEach((item) => {
            filteredSet.add(item[key]);
        });
        return Array.from(filteredSet).sort();
    };

    // 数据筛选逻辑
    useEffect(() => {
        let newData = [...data];

        Object.entries(filters).forEach(([key, value]) => {
            const config = filterConfig[key];

            if (value !== undefined && config) {
                if (config.type === "dropdown" && typeof value === "string") {
                    newData = newData.filter(
                        (item) =>
                            String(item[key as keyof AnimalData]) === value
                    );
                } else if (
                    config.type === "range" &&
                    typeof value === "object"
                ) {
                    // 数值区间筛选
                    newData = newData.filter((item) => {
                        const val = Number(item[key as keyof AnimalData]);
                        const { start, end } = value as {
                            start?: number;
                            end?: number;
                        };
                        return (!start || val >= start) && (!end || val <= end);
                    });
                } else if (
                    config.type === "time" &&
                    typeof value === "object"
                ) {
                    // 时间区间筛选 (仅比较日期，忽略时区)
                    newData = newData.filter((item) => {
                        const itemDate = new Date(
                            item[key as keyof AnimalData] as string
                        );
                        const { start, end } = value as {
                            start?: string;
                            end?: string;
                        };

                        // 提取纯日期部分进行比较 (忽略时区)
                        const itemDateOnly = new Date(
                            itemDate.getFullYear(),
                            itemDate.getMonth(),
                            itemDate.getDate()
                        );

                        const startDate = start ? new Date(start) : null;
                        const endDate = end ? new Date(end) : null;

                        const startDateOnly = startDate
                            ? new Date(
                                    startDate.getFullYear(),
                                    startDate.getMonth(),
                                    startDate.getDate() + 1
                                )
                            : null;

                        const endDateOnly = endDate
                            ? new Date(
                                    endDate.getFullYear(),
                                    endDate.getMonth(),
                                    endDate.getDate() + 1
                                )
                            : null;

                        return (
                            (!startDateOnly || itemDateOnly >= startDateOnly) &&
                            (!endDateOnly || itemDateOnly <= endDateOnly)
                        );
                    });
                }
            }
        });

        // 排序
        if (sortConfig) {
            newData.sort((a, b) => {
                const valueA = a[sortConfig.key];
                const valueB = b[sortConfig.key];

                if (typeof valueA === "string" && typeof valueB === "string") {
                    return sortConfig.direction === "asc"
                        ? valueA.localeCompare(valueB)
                        : valueB.localeCompare(valueA);
                } else if (
                    typeof valueA === "number" &&
                    typeof valueB === "number"
                ) {
                    return sortConfig.direction === "asc"
                        ? valueA - valueB
                        : valueB - valueA;
                }
                return 0;
            });
        }

        setFilteredData(newData);
    }, [filters, sortConfig, data]);

    // 排序请求
    const requestSort = (key: keyof AnimalData) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    // 重置筛选
    const resetFilter = () => {
        setFilters({});
        setFilteredData(data);
    };

    return {
        filters,
        updateFilter,
        filteredData,
        resetFilter,
        getFilteredValues,
        requestSort,
        sortConfig,
    };
}
