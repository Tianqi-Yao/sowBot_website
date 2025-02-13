import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { filterConfig } from "../../(config)/filterConfig";
import { columns } from "../../(config)/columns";
import { AnimalData } from "../(data)/fakeData";

interface MonitorTableProps {
    data: AnimalData[];
    page: number;
    pageSize: number;
    isPaginated: boolean;
    filters: { [key: string]: string | number | { start?: string; end?: string } | undefined };
    updateFilter: (
        column: keyof AnimalData,
        value: string | number | { start?: string; end?: string } | undefined
    ) => void;
    getFilteredValues: (key: keyof AnimalData) => (string | number)[];
    requestSort: (key: keyof AnimalData) => void;
    sortConfig: { key: keyof AnimalData; direction: "asc" | "desc" } | null;
    resetFilter: () => void;
}

export default function MonitorTable({
    data,
    page,
    pageSize,
    isPaginated,
    filters,
    updateFilter,
    getFilteredValues,
    requestSort,
    sortConfig,
    resetFilter,
}: MonitorTableProps) {
    // 临时输入状态（数值和时间）
    const [inputValues, setInputValues] = useState<{ [key: string]: { start?: string; end?: string } }>({});

    // 统一提交输入框的值
    const handleSubmit = (key: string) => {
        const value = inputValues[key];
        updateFilter(key as keyof AnimalData, value);
    };

    // 处理输入变化
    const handleInputChange = (key: string, field: "start" | "end", newValue: string) => {
        setInputValues((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                [field]: newValue,
            },
        }));
    };

    // 处理按键事件 (Enter 提交)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, key: string) => {
        if (e.key === "Enter") {
            handleSubmit(key);
            e.currentTarget.blur(); // 失去焦点
        }
    };

    // 处理失去焦点事件
    const handleBlur = (key: string) => {
        handleSubmit(key);
    };

    const handleDateSubmit = (key: string) => {
        const value = inputValues[key];
        updateFilter(key as keyof AnimalData, {
            start: value?.start?.toISOString().split('T')[0],
            end: value?.end?.toISOString().split('T')[0],
        });
    };

    // 重置筛选 + 重置临时输入
    const handleReset = () => {
        resetFilter();
        setInputValues({});
    };

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse border border-gray-300">
                {/* 表头 */}
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">#</th>
                        {columns.map(({ key, label }) => (
                            <th
                                key={key}
                                className="border px-4 py-2 cursor-pointer"
                                onClick={() => requestSort(key as keyof AnimalData)}
                            >
                                {label}{" "}
                                {sortConfig?.key === key
                                    ? sortConfig.direction === "asc"
                                        ? "▲"
                                        : "▼"
                                    : "⬍"}
                            </th>
                        ))}
                    </tr>
                    {/* 筛选行 */}
                    <tr className="bg-gray-100">
                        <td className="border px-4 py-2">
                            <button
                                onClick={handleReset}
                                className="px-3 py-1 bg-gray-300 rounded-md"
                            >
                                Reset
                            </button>
                        </td>
                        {columns.map(({ key }) => {
                            const config = filterConfig[key];

                            return (
                                <td key={key} className="border px-4 py-2">
                                    {/* Dropdown 类型 */}
                                    {config.type === "dropdown" && (
                                        <select
                                            value={filters[key] || ""}
                                            onChange={(e) =>
                                                updateFilter(
                                                    key as keyof AnimalData,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-md p-1"
                                        >
                                            <option value="">All</option>
                                            {getFilteredValues(key as keyof AnimalData).map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    )}

                                    {/* 数值区间类型 */}
                                    {config.type === "range" && (
                                        <div className="flex space-x-2">
                                            <input
                                                type="number"
                                                value={inputValues[key]?.start || ""}
                                                placeholder={`Min (${config.min ?? "N/A"})`}
                                                className="w-1/2 border rounded-md p-1"
                                                onChange={(e) =>
                                                    handleInputChange(key, "start", e.target.value)
                                                }
                                                onKeyDown={(e) => handleKeyDown(e, key)}
                                                onBlur={() => handleBlur(key)}
                                            />
                                            <input
                                                type="number"
                                                value={inputValues[key]?.end || ""}
                                                placeholder={`Max (${config.max ?? "N/A"})`}
                                                className="w-1/2 border rounded-md p-1"
                                                onChange={(e) =>
                                                    handleInputChange(key, "end", e.target.value)
                                                }
                                                onKeyDown={(e) => handleKeyDown(e, key)}
                                                onBlur={() => handleBlur(key)}
                                            />
                                        </div>
                                    )}

                                    {/* 使用 react-datepicker 实现时间区间筛选 */}
                                    {config.type === "time" && (
                                        <div className="flex space-x-2">
                                            <DatePicker
                                                selected={inputValues[key]?.start || null}
                                                onChange={(date) => {
                                                    handleInputChange(key, "start", date);
                                                }}
                                                onCalendarClose={() => handleDateSubmit(key)} // 日历关闭时提交
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="Start Date"
                                                className="w-fit border rounded-md p-1"
                                                isClearable
                                            />
                                            <DatePicker
                                                selected={inputValues[key]?.end || null}
                                                onChange={(date) => {
                                                    handleInputChange(key, "end", date);
                                                }}
                                                onCalendarClose={() => handleDateSubmit(key)} // 日历关闭时提交
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="End Date"
                                                className="w-fit border rounded-md p-1"
                                                isClearable
                                            />
                                        </div>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                </thead>

                {/* 表体 */}
                <tbody>
                    {data.map((animal, index) => (
                        <tr key={`${animal.id}-${index}`} className="text-center">
                            <td className="border px-4 py-2">
                                {isPaginated
                                    ? (page - 1) * pageSize + index + 1
                                    : index + 1}
                            </td>
                            {columns.map(({ key }) => (
                                <td key={key} className="border px-4 py-2">
                                    {animal[key as keyof AnimalData]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
