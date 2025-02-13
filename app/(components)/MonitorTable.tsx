import { AnimalData } from "../(data)/fakeData";
import { ColumnConfig } from "../(config)/columnConfig";

interface MonitorTableProps {
    data: AnimalData[];
    page: number;
    pageSize: number;
    isPaginated: boolean;
    filters: { [key: string]: string | number | { min?: number; max?: number } | undefined };
    updateFilter: (
        column: keyof AnimalData,
        value: string | number | { min?: number; max?: number } | undefined
    ) => void;
    getFilteredValues: (key: keyof AnimalData) => string[];
    requestSort: (key: keyof AnimalData) => void;
    sortConfig: { key: keyof AnimalData; direction: "asc" | "desc" } | null;
    resetFilter: () => void;
    columnConfig: ColumnConfig[];
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
    columnConfig,
}: MonitorTableProps) {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">#</th>
                        {columnConfig.map(({ key, label }) => (
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
                    <tr className="bg-gray-100">
                        <td className="border px-4 py-2">
                            <button
                                onClick={resetFilter}
                                className="px-3 py-1 bg-gray-300 rounded-md"
                            >
                                Reset
                            </button>
                        </td>
                        {columnConfig.map(({ key, filterType, range }) => {
                            if (filterType === "none") return <td key={key} className="border px-4 py-2"></td>;

                            return (
                                <td key={key} className="border px-4 py-2">
                                    {filterType === "dropdown" ? (
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
                                    ) : filterType === "range" ? (
                                        <div className="flex space-x-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={(filters[key] as { min?: number })?.min || ""}
                                                onChange={(e) =>
                                                    updateFilter(key as keyof AnimalData, {
                                                        ...(filters[key] as { min?: number; max?: number }),
                                                        min: e.target.value ? Number(e.target.value) : undefined,
                                                    })
                                                }
                                                className="w-1/2 border rounded-md p-1"
                                                min={range?.min}
                                                max={range?.max}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={(filters[key] as { max?: number })?.max || ""}
                                                onChange={(e) =>
                                                    updateFilter(key as keyof AnimalData, {
                                                        ...(filters[key] as { min?: number; max?: number }),
                                                        max: e.target.value ? Number(e.target.value) : undefined,
                                                    })
                                                }
                                                className="w-1/2 border rounded-md p-1"
                                                min={range?.min}
                                                max={range?.max}
                                            />
                                        </div>
                                    ) : null}
                                </td>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((animal, index) => (
                        <tr key={`${animal.id}-${index}`} className="text-center">
                            <td className="border px-4 py-2">
                                {isPaginated
                                    ? (page - 1) * pageSize + index + 1
                                    : index + 1}
                            </td>
                            {columnConfig.map(({ key }) => (
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