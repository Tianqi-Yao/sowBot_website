import { AnimalData } from "../(data)/fakeData";

interface MonitorTableProps {
    data: AnimalData[];
    page: number;
    pageSize: number;
    isPaginated: boolean;
    filters: { [key: string]: string | number | undefined };
    updateFilter: (
        column: keyof AnimalData,
        value: string | number | undefined
    ) => void;
    getFilteredValues: (key: keyof AnimalData) => string[];
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
    const columns = [
        { key: "id", label: "Animal ID" },
        { key: "group", label: "Group" },
        { key: "dim", label: "DIM" },
        { key: "lactation", label: "Lactation" },
        { key: "daysSinceBreeding", label: "Days Since Breeding" },
        { key: "reproductionStatus", label: "Reproduction Status" },
        { key: "lastAlert", label: "Last Alert" },
        { key: "healthState", label: "Health State" },
        { key: "rumination", label: "Rumination (min)" },
        { key: "eating", label: "Eating (min)" },
    ];

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">#</th>
                        {columns.map(({ key, label }) => (
                            <th
                                key={key}
                                className="border px-4 py-2 cursor-pointer"
                                onClick={() =>
                                    requestSort(key as keyof AnimalData)
                                }
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
                        {columns.map(({ key }) => (
                            <td key={key} className="border px-4 py-2">
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
                                    {getFilteredValues(
                                        key as keyof AnimalData
                                    ).map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((animal, index) => (
                        <tr
                            key={`${animal.id}-${index}`}
                            className="text-center"
                        >
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
