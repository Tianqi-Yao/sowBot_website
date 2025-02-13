"use client";
import { useEffect, useState } from "react";
import { generateFakeData, AnimalData } from "../(data)/fakeData";
import MonitorTable from "../(components)/MonitorTable";
import { useFilter } from "../(hooks)/useFilter";

export default function MonitorPage() {
    const [data, setData] = useState<AnimalData[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 30;
    const [isPaginated, setIsPaginated] = useState(true);

    // 使用 useFilter 管理筛选和排序
    const {
        filters,
        updateFilter,
        filteredData,
        resetFilter,
        getFilteredValues,
        requestSort,
        sortConfig,
    } = useFilter(data);

    // 加载数据（仅在组件挂载时运行一次）
    useEffect(() => {
        setData(generateFakeData(100)); // 生成 100 条数据
    }, []);

    // 监听 `filteredData` 变化时重置分页
    useEffect(() => {
        setPage(1); // 重新筛选数据后，回到第一页
    }, [filteredData]);

    // 计算分页数据
    const paginatedData = isPaginated
        ? filteredData.slice((page - 1) * pageSize, page * pageSize)
        : filteredData;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Monitor Page</h1>

            {/* 切换分页模式 */}
            <button
                onClick={() => setIsPaginated(!isPaginated)}
                className="px-3 py-2 bg-purple-500 text-white rounded-md mb-4"
            >
                {isPaginated ? "Show All" : "Enable Pagination"}
            </button>

            {/* 表格 */}
            <MonitorTable
                data={paginatedData}
                page={page}
                pageSize={pageSize}
                isPaginated={isPaginated}
                filters={filters}
                updateFilter={updateFilter}
                getFilteredValues={getFilteredValues}
                requestSort={requestSort}
                sortConfig={sortConfig}
                resetFilter={resetFilter}
            />

            {/* 分页控制（仅在分页模式下显示） */}
            {isPaginated && (
                <div className="flex justify-center space-x-2 mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="px-3 py-2 bg-gray-300 rounded-md"
                    >
                        Prev
                    </button>
                    <span className="px-4 py-2">Page {page}</span>
                    <button
                        disabled={page * pageSize >= filteredData.length}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-3 py-2 bg-gray-300 rounded-md"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
