export interface ColumnConfig {
    key: string;
    label: string;
    filterType: "dropdown" | "range" | "none"; // 筛选类型
    range?: { min: number; max: number }; // 仅当 filterType 为 "range" 时使用
}

export const columnConfig: ColumnConfig[] = [
    { key: "id", label: "Animal ID", filterType: "none"},
    { key: "group", label: "Group", filterType: "dropdown" },
    { key: "dim", label: "DIM", filterType: "range", range: { min: 0, max: 300 } },
    { key: "lactation", label: "Lactation", filterType: "dropdown" },
    { key: "daysSinceBreeding", label: "Days Since Breeding", filterType: "range", range: { min: 0, max: 200 } },
    { key: "reproductionStatus", label: "Reproduction Status", filterType: "dropdown" },
    { key: "lastAlert", label: "Last Alert", filterType: "none" }, // 无筛选
    { key: "healthState", label: "Health State", filterType: "dropdown" },
    { key: "rumination", label: "Rumination (min)", filterType: "range", range: { min: 0, max: 600 } },
    { key: "eating", label: "Eating (min)", filterType: "range", range: { min: 0, max: 400 } },
];