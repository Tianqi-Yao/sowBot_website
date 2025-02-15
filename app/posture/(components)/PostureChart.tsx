"use client";
import { useEffect, useState } from "react";
import { Column } from "@ant-design/charts";

const postureLabels: { [key: string]: string } = {
    "0": "Lateral Lying Left (LLL)",
    "1": "Lateral Lying Right (LLR)",
    "2": "Sitting (SIT)",
    "3": "Sternal Lying Left (SLL)",
    "4": "Sternal Lying Right (SLR)",
    "5": "Standing (STA)",
};

const colors = [
    "#000000",
    "#52c41a",
    "#faad14",
    "#eb2f96",
    "#722ed1",
    "#13c2c2",
];

export default function PostureChart() {
    const [chartData, setChartData] = useState<any[]>([]);
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
                const dates = Object.keys(posturePercentages).sort(); // 日期排序

                // 转换数据为 Ant Design Charts 所需格式
                const formattedData: any[] = [];
                dates.forEach((date) => {
                    const total = Object.values(
                        posturePercentages[date] || {}
                    ).reduce((sum: number, val: number) => sum + val, 0);
                    Object.keys(postureLabels).forEach((key, index) => {
                        const value = posturePercentages[date]?.[key] || 0;
                        const percentage =
                            total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                        formattedData.push({
                            date,
                            posture: postureLabels[key],
                            percentage: parseFloat(percentage),
                        });
                    });
                });

                // console.log("Formatted chart data:", formattedData);
                setChartData(formattedData);
            } catch (err) {
                console.error("Error fetching posture data:", err);
                setError("Failed to load chart data.");
            }
        }
        fetchData();
    }, []);

    const config = {
        data: chartData,
        xField: "date",
        yField: "percentage",
        colorField: "posture",
        // scale: {
        //     color: {
        //         range: colors,
        //     },
        // },
        percent: true,
        stack: true,
        interaction: {
            tooltip: {
                shared: true,
            },
        },
        axis: {
            x: {
                labelFontSize: 15,
                labelFill: "rgb(0, 0, 0)",
                labelFontWeight: 600,
            },
            y: {
                labelFontSize: 15,
                labelFill: "rgb(0, 0, 0)",
                labelFontWeight: 600,
            },
        },
        legend: {
            color: {
                itemMarker: "rect", //图标类型

                itemMarkerSize: 18, //图标大小

                itemLabelFontSize: "16px",

                itemSpan: 1000,
            },
        },
        tooltip: { channel: "y0", valueFormatter: ".0%" },
    };

    return (
        <div className="flex flex-col bg-white shadow-md rounded-md h-2/3 w-3/4 pb-14 pl-9">
            <h2 className="text-xl font-semibold mb-4">
                Posture Changes Over Time (Percentage)
            </h2>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : chartData.length > 0 ? (
                <Column {...config} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
