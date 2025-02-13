export interface AnimalData {
    id: number;
    group: number;
    dim: number;
    lactation: number;
    daysSinceBreeding: number;
    reproductionStatus: string;
    lastAlert: string;
    healthState: string;
    healthColor: string; // 对应不同颜色
    rumination: number;
    eating: number;
}

const healthStates = [
    { state: "No movement", color: "gray-400" },
    { state: "Suspicious 1h", color: "yellow-400" },
    { state: "Suspicious 3h", color: "yellow-500" },
    { state: "Suspicious 22h", color: "yellow-600" },
    { state: "Very sick 1h", color: "red-500" },
    { state: "Healthy", color: "green-500" },
];

export const generateFakeData = (count: number): AnimalData[] => {
    const generatedIds = new Set<number>(); // 记录已生成的 ID

    return Array.from({ length: count }, () => {
        let newId;
        do {
            newId = Math.floor(4000 + Math.random() * 1000); // 生成 4000-5000 之间的 ID
        } while (generatedIds.has(newId)); // 确保 ID 不重复
        generatedIds.add(newId);

        const health =
            healthStates[Math.floor(Math.random() * healthStates.length)];
        const hours = Math.floor(Math.random() * 24);
        const minutes = Math.floor(Math.random() * 60);
        const seconds = Math.floor(Math.random() * 60);

        return {
            id: newId,
            group: Math.floor(Math.random() * 100) + 1,
            dim: Math.floor(Math.random() * 300),
            lactation: Math.floor(Math.random() * 4) + 1,
            daysSinceBreeding: Math.floor(Math.random() * 200),
            reproductionStatus:
                Math.random() > 0.5 ? "Pregnant" : "Not Pregnant",
            lastAlert: `2025-04-01 ${String(hours).padStart(2, "0")}:${String(
                minutes
            ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
            healthState: health.state,
            healthColor: health.color,
            rumination: Math.floor(Math.random() * 600),
            eating: Math.floor(Math.random() * 400),
        };
    });
};
