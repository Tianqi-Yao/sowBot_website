"use client";
import { useEffect, useState } from "react";
import { generateFakeData, AnimalData } from "../(data)/fakeData";
import MonitorTable from "../(components)/MonitorTable";
import { useFilter } from "../(hooks)/useFilter";
import { usePagination } from "../(hooks)/usePagination";

export default function MonitorPage() {
    const [data, setData] = useState<AnimalData[]>([]);
    const { page, setPage, paginate } = usePagination();
    const [isPaginated, setIsPaginated] = useState(true);

    const {
        filters,
        updateFilter,
        filteredData,
        resetFilter,
        getFilteredValues,
        requestSort,
        sortConfig,
    } = useFilter(data);

    // 生成假数据
    useEffect(() => {
        setData(generateFakeData(200)); // 生成 200 条数据
    }, []);

    // 筛选后重置分页
    useEffect(() => {
        setPage(1);
    }, [filteredData]);

    const paginatedData = isPaginated ? paginate(filteredData) : filteredData;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Animal Monitoring Dashboard
            </h1>

            {/* 分页开关 */}
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setIsPaginated(!isPaginated)}
                    className="px-3 py-2 bg-purple-500 text-white rounded-md"
                >
                    {isPaginated ? "Show All" : "Enable Pagination"}
                </button>
            </div>

            {/* 数据表格 */}
            <MonitorTable
                data={paginatedData}
                page={page}
                pageSize={30}
                isPaginated={isPaginated}
                filters={filters}
                updateFilter={updateFilter}
                getFilteredValues={getFilteredValues}
                requestSort={requestSort}
                sortConfig={sortConfig}
                resetFilter={resetFilter}
            />

            {/* 分页控件 */}
            {isPaginated && (
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className={`px-4 py-2 bg-gray-300 rounded-md ${
                            page === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">Page {page}</span>
                    <button
                        disabled={page * 30 >= filteredData.length}
                        onClick={() => setPage((prev) => prev + 1)}
                        className={`px-4 py-2 bg-gray-300 rounded-md ${
                            page * 30 >= filteredData.length
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
