export const generateFakeData = (count: number) => {
    const generatedIds = new Set<number>(); // 记录已生成的 ID

    return Array.from({ length: count }, () => {
        let newId;
        do {
            newId = Math.floor(4000 + Math.random() * 1000); // 生成 4000-5000 之间的 ID
        } while (generatedIds.has(newId)); // 确保 ID 不重复
        generatedIds.add(newId);

        // 生成随机的 group a b c d
        const group = "ABC"[Math.floor(Math.random() * 3)];

        const BCS = Math.floor(Math.random() * 5) + 1;
        const hours = Math.floor(Math.random() * 24);
        const minutes = Math.floor(Math.random() * 60);
        const seconds = Math.floor(Math.random() * 60);

        const status = ["Bred", "In-Heat", "Pre-Heat", "Open", "Removed"][
            Math.floor(Math.random() * 5)
        ];

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
            Status: status,
            lastAlert: lastAlert,
            BCS: BCS,
        };
    });
};
