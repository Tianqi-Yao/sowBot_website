import { filterConfig } from "../(config)/filterConfig";
import { columns } from "../(config)/columns";
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
                                onClick={resetFilter}
                                className="px-3 py-1 bg-gray-300 rounded-md"
                            >
                                Reset
                            </button>
                        </td>
                        {columns.map(({ key }) => {
                            const config = filterConfig[key];

                            return (
                                <td key={key} className="border px-4 py-2">
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

                                    {config.type === "range" && (
                                        <div className="flex space-x-2">
                                            <input
                                                type="number"
                                                min={config.min}
                                                max={config.max}
                                                placeholder="Min"
                                                className="w-1/2 border rounded-md p-1"
                                                onChange={(e) =>
                                                    updateFilter(
                                                        key as keyof AnimalData,
                                                        { start: e.target.value }
                                                    )
                                                }
                                            />
                                            <input
                                                type="number"
                                                min={config.min}
                                                max={config.max}
                                                placeholder="Max"
                                                className="w-1/2 border rounded-md p-1"
                                                onChange={(e) =>
                                                    updateFilter(
                                                        key as keyof AnimalData,
                                                        { end: e.target.value }
                                                    )
                                                }
                                            />
                                        </div>
                                    )}

                                    {config.type === "time" && (
                                        <div className="flex space-x-2">
                                            <input
                                                type="date"
                                                min={config.startDate}
                                                max={config.endDate}
                                                className="w-1/2 border rounded-md p-1"
                                                placeholder="Start Date"
                                                onChange={(e) =>
                                                    updateFilter(
                                                        key as keyof AnimalData,
                                                        {
                                                            ...(filters[key] as any),
                                                            start: e.target.value,
                                                        }
                                                    )
                                                }
                                            />
                                            <input
                                                type="date"
                                                min={config.startDate}
                                                max={config.endDate}
                                                className="w-1/2 border rounded-md p-1"
                                                placeholder="End Date"
                                                onChange={(e) =>
                                                    updateFilter(
                                                        key as keyof AnimalData,
                                                        {
                                                            ...(filters[key] as any),
                                                            end: e.target.value,
                                                        }
                                                    )
                                                }
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
