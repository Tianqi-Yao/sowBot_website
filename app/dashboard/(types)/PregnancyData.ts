export type PregnancyData = {
    id: number;
    group: string; // 动物所属组
    dim: number; // 哺乳天数
    lactation: number; // 泌乳期次数
    daysSinceBreeding: number; // 配种后的天数
    reproductionStatus: "Pregnant" | "Not Pregnant"; // 繁殖状态
    lastAlert: string; // 最后告警时间
    healthState: "Healthy" | "Warning" | "Critical"; // 健康状态
    rumination: number; // 反刍时间
    eating: number; // 进食时间
};
