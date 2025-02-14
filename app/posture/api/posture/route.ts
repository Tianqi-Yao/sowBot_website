import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

const filePath = path.join(process.cwd(), "public", "ID_981_B1.csv");

interface PostureData {
    Timestamp: string;
    Posture: number; // 确保 Posture 是 number 类型
    Datetime?: Date;
    Date?: string;
    Time?: string;
}

export async function GET() {
    // console.log("GET /api/posture");

    try {
        // 读取 CSV 文件
        const file = fs.readFileSync(filePath, "utf8");

        // 解析 CSV
        const { data }: { data: PostureData[] } = Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: { Posture: true }, // 强制解析 Posture 为 number
        });

        const validData: PostureData[] = [];
        const errors: string[] = [];

        // 解析时间
        data.forEach((row, index) => {
            if (
                !row.Timestamp ||
                !/^\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2}$/.test(row.Timestamp)
            ) {
                errors.push(
                    `Row ${index + 1} has invalid Timestamp: ${row.Timestamp}`
                );
                return;
            }

            try {
                const parts = row.Timestamp.split("_");

                if (parts.length !== 6) {
                    throw new Error(`Invalid format: ${row.Timestamp}`);
                }

                // 生成 ISO 8601 格式 (YYYY-MM-DDTHH:MM:SS)
                const formattedTimestamp = `${parts[0]}-${parts[1]}-${parts[2]}T${parts[3]}:${parts[4]}:${parts[5]}`;

                row.Datetime = new Date(formattedTimestamp);

                if (isNaN(row.Datetime.getTime())) {
                    errors.push(
                        `Row ${index + 1} has an invalid date: ${row.Timestamp}`
                    );
                    return;
                }

                // 提取日期和时间
                row.Date = row.Datetime.toISOString().split("T")[0];
                row.Time = row.Datetime.toISOString()
                    .split("T")[1]
                    .split(".")[0];

                validData.push(row);
            } catch (error) {
                errors.push(
                    `Row ${index + 1} error: ${
                        error instanceof Error ? error.message : String(error)
                    }`
                );
            }
        });

        // 输出部分错误日志
        if (errors.length > 0) {
            console.warn(
                `❌ Invalid Rows (${errors.length}):`,
                errors.slice(0, 5)
            ); // 仅显示前 5 个错误
        }
        console.log(
            `✅ Valid Rows (${validData.length}):`,
            validData.slice(0, 5)
        );

        // 统计每天的 Posture 占比
        const postureCounts: Record<string, Record<number, number>> = {};

        validData.forEach(({ Date, Posture }) => {
            if (Date !== undefined && Posture !== undefined) {
                if (!postureCounts[Date]) postureCounts[Date] = {};
                postureCounts[Date][Posture] =
                    (postureCounts[Date][Posture] || 0) + 1;
            }
        });

        // 计算百分比
        const posturePercentages: Record<string, Record<number, number>> = {};
        Object.keys(postureCounts).forEach((date) => {
            const totalCount = Object.values(postureCounts[date]).reduce(
                (acc, cur) => acc + cur,
                0
            );

            posturePercentages[date] = {};

            Object.keys(postureCounts[date]).forEach((posture) => {
                posturePercentages[date][posture] =
                    (postureCounts[date][posture] / totalCount) * 100;
            });
        });

        // 输出统计结果
        // console.log("Posture Counts:", postureCounts);
        // console.log("Posture Percentages:", posturePercentages);

        const postureStatistics = {
            postureCounts,
            posturePercentages,
        };

        return NextResponse.json(postureStatistics);
    } catch (error) {
        console.error("❌ Critical Error:", error);
        return NextResponse.json(
            { error: "Failed to process data" },
            { status: 500 }
        );
    }
}
