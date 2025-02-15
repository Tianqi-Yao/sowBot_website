"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// 注册 Chart.js 组件
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const postureLabels: { [key: string]: string } = {
    "0": "Lateral Lying Left (LLL)",
    "1": "Lateral Lying Right (LLR)",
    "2": "Sitting (SIT)",
    "3": "Sternal Lying Left (SLL)",
    "4": "Sternal Lying Right (SLR)",
    "5": "Standing (STA)",
};

const colors = ["blue", "green", "yellow", "orange", "red", "purple"];

export default function PostureChartOld() {
    const [chartData, setChartData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("posture/api/posture");
                if (!res.ok) throw new Error("Failed to fetch data");

                const data = await res.json();

                // console.log("Fetched data:", data);

                if (!data.posturePercentages)
                    throw new Error("Invalid API response structure");

                const posturePercentages = data.posturePercentages;

                const dates = Object.keys(posturePercentages).sort(); // 确保日期按时间顺序排列

                // 生成数据集
                const datasets = Object.keys(postureLabels).map(
                    (key, index) => ({
                        label: postureLabels[key],
                        data: dates.map(
                            (date) => posturePercentages[date]?.[key] || 0
                        ), // 确保默认值是 0
                        backgroundColor: colors[index],
                    })
                );

                // console.log("Chart data:", { dates, datasets });

                setChartData({
                    labels: dates,
                    datasets: datasets,
                });
            } catch (err) {
                console.error("Error fetching posture data:", err);
                setError("Failed to load chart data.");
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-col bg-white shadow-md rounded-md h-2/3 w-screen pb-14 pl-9">
            <h2 className="text-xl font-semibold mb-4">
                Posture Changes Over Time
            </h2>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : chartData ? (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: { legend: { position: "top" } },
                        scales: {
                            y: {
                                stacked: true,
                                max: 100, // 👈 Y 轴最大值固定为 100
                                title: {
                                    display: true,
                                    text: "Percentage (%)",
                                },
                            },
                            x: { stacked: true,title: {
                                display: false,
                                text: "date",
                            }, },
                        },
                    }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
