export interface AnimalData {
    id: number;
    group: string;
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

        // 生成随机的 group a b c d
        const group = "ABC"[Math.floor(Math.random() * 3)];

        const health =
            healthStates[Math.floor(Math.random() * healthStates.length)];
        const hours = Math.floor(Math.random() * 24);
        const minutes = Math.floor(Math.random() * 60);
        const seconds = Math.floor(Math.random() * 60);
        
        // 随机生成最后一次报警时间和日期 从2025 1月1日开始到 20256月31日23时59分59秒
        const lastAlertDate = new Date();
        lastAlertDate.setFullYear(2025);
        lastAlertDate.setMonth(Math.floor(Math.random() * 6) + 1);
        lastAlertDate.setDate(Math.floor(Math.random() * 28) + 1);
        lastAlertDate.setHours(hours);
        lastAlertDate.setMinutes(minutes);
        lastAlertDate.setSeconds(seconds);
        const lastAlert = lastAlertDate.toLocaleString();

        return {
            id: newId,
            group: group,
            lactation: Math.floor(Math.random() * 4) + 1,
            daysSinceBreeding: Math.floor(Math.random() * 200),
            reproductionStatus:
                Math.random() > 0.5 ? "Pregnant" : "Not Pregnant",
            lastAlert: lastAlert,
            healthState: health.state,
            healthColor: health.color,
            rumination: Math.floor(Math.random() * 600),
            eating: Math.floor(Math.random() * 400),
        };
    });
};
