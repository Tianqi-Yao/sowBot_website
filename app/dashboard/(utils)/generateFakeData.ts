import dayjs from "dayjs";
import { PregnancyData } from "@/app/dashboard/(types)/PregnancyData";

export const generateFakeData = (count: number): PregnancyData[] => {
    return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        group: ["A", "B", "C"][Math.floor(Math.random() * 3)], // 随机分组
        dim: Math.floor(Math.random() * 300), // 哺乳天数 0-300
        lactation: Math.floor(Math.random() * 4) + 1, // 泌乳期 1-4
        daysSinceBreeding: Math.floor(Math.random() * 200), // 配种天数 0-200
        reproductionStatus: Math.random() > 0.5 ? "Pregnant" : "Not Pregnant", // 50% 概率怀孕
        lastAlert: dayjs()
            .subtract(Math.floor(Math.random() * 30), "days")
            .format("YYYY-MM-DD HH:mm:ss"), // 近30天的随机告警时间
        healthState: ["Healthy", "Warning", "Critical"][
            Math.floor(Math.random() * 3)
        ], // 健康状态
        rumination: Math.floor(Math.random() * 600), // 反刍时间 0-600分钟
        eating: Math.floor(Math.random() * 400), // 进食时间 0-400分钟
    }));
};
