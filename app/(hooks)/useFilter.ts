import { useState, useEffect } from "react";
import { AnimalData } from "../(data)/fakeData";
import { ColumnConfig } from "../(config)/columnConfig";

export function useFilter(data: AnimalData[], columnConfig: ColumnConfig[]) {
    const [filters, setFilters] = useState<{
        [key: string]: string | number | { min?: number; max?: number } | undefined;
    }>({});
    const [filteredData, setFilteredData] = useState<AnimalData[]>(data);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof AnimalData;
        direction: "asc" | "desc";
    } | null>(null);

    // 当 data 变化时，自动更新 filteredData
    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    // 更新筛选条件，并立即筛选数据
    const updateFilter = (
        column: keyof AnimalData,
        value: string | number | { min?: number; max?: number } | undefined
    ) => {
        setFilters((prev) => {
            const newFilters = { ...prev, [column]: value || undefined };
            return newFilters;
        });

        let newData = [...data];
        Object.entries({ ...filters, [column]: value || undefined }).forEach(
            ([key, val]) => {
                if (val !== undefined) {
                    const columnConfigItem = columnConfig.find((col) => col.key === key);
                    if (columnConfigItem?.filterType === "range" && typeof val === "object") {
                        // 区间筛选
                        newData = newData.filter((item) => {
                            const itemValue = item[key as keyof AnimalData];
                            if (typeof itemValue === "number") {
                                return (
                                    (val.min === undefined || itemValue >= val.min) &&
                                    (val.max === undefined || itemValue <= val.max)
                                );
                            }
                            return true;
                        });
                    } else {
                        // 普通筛选
                        newData = newData.filter(
                            (item) => String(item[key as keyof AnimalData]) === String(val)
                        );
                    }
                }
            }
        );

        setFilteredData(newData);
    };

    // 获取当前筛选条件下可选的唯一值
    const getFilteredValues = (key: keyof AnimalData) => {
        let filteredSet = new Set<string | number>();
        filteredData.forEach((item) => {
            filteredSet.add(item[key]);
        });
        return Array.from(filteredSet).sort();
    };

    // 排序
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

        setFilteredData((prevData) => {
            return [...prevData].sort((a, b) => {
                const valueA = a[key];
                const valueB = b[key];

                if (typeof valueA === "string" && typeof valueB === "string") {
                    return sortConfig?.direction === "asc"
                        ? valueA.localeCompare(valueB)
                        : valueB.localeCompare(valueA);
                } else if (
                    typeof valueA === "number" &&
                    typeof valueB === "number"
                ) {
                    return sortConfig?.direction === "asc"
                        ? valueA - valueB
                        : valueB - valueA;
                }
                return 0;
            });
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