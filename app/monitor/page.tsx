"use client";
import { useEffect, useState } from "react";
import { generateFakeData, AnimalData } from "../(data)/fakeData";
import MonitorTable from "../(components)/MonitorTable";
import { useFilter } from "../(hooks)/useFilter";
import { usePagination } from "../(hooks)/usePagination";
import { columnConfig } from "../(config)/columnConfig";

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
    } = useFilter(data, columnConfig);

    useEffect(() => {
        setData(generateFakeData(100));
    }, []);

    useEffect(() => {
        setPage(1);
    }, [filteredData]);

    const paginatedData = isPaginated ? paginate(filteredData) : filteredData;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Monitor Page</h1>
            <button
                onClick={() => setIsPaginated(!isPaginated)}
                className="px-3 py-2 bg-purple-500 text-white rounded-md mb-4"
            >
                {isPaginated ? "Show All" : "Enable Pagination"}
            </button>
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
                columnConfig={columnConfig}
            />
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
                        disabled={page * 30 >= filteredData.length}
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