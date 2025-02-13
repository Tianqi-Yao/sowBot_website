export interface FilterConfig {
    type: "dropdown" | "range" | "time" | "none"; // 新增 "time" 类型
    min?: number; // range 最小值
    max?: number; // range 最大值
    startDate?: string; // time 起始日期
    endDate?: string; // time 结束日期
}

export const filterConfig: Record<string, FilterConfig> = {
    id: { type: "none" },
    group: { type: "dropdown" },
    dim: { type: "range", min: 0, max: 300 },
    lactation: { type: "dropdown" },
    daysSinceBreeding: { type: "range", min: 0, max: 200 },
    reproductionStatus: { type: "dropdown" },
    lastAlert: { type: "time", startDate: "2024-01-01", endDate: "2026-12-31" }, // 使用时间筛选
    healthState: { type: "dropdown" },
    rumination: { type: "range", min: 0, max: 600 },
    eating: { type: "range", min: 0, max: 400 },
};
