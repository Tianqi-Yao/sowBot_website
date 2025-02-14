"use client";
import { useEffect, useState } from "react";
import { Column } from "@ant-design/charts";
import { Button } from "antd";

const mergedPostureLabels: { [key: string]: string } = {
    "0": "Lateral Lying",
    "1": "Lateral Lying",
    "2": "Sitting (SIT)",
    "3": "Sternal Lying",
    "4": "Sternal Lying",
    "5": "Standing (STA)",
};

const originalPostureLabels: { [key: string]: string } = {
    "0": "Lateral Lying Left (LLL)",
    "1": "Lateral Lying Right (LLR)",
    "2": "Sitting (SIT)",
    "3": "Sternal Lying Left (SLL)",
    "4": "Sternal Lying Right (SLR)",
    "5": "Standing (STA)",
};

export default function PostureChart() {
    const [chartData, setChartData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [useMerged, setUseMerged] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("posture/api/posture");
                if (!res.ok) throw new Error("Failed to fetch data");

                const data = await res.json();

                const postureLabels = useMerged
                    ? mergedPostureLabels
                    : originalPostureLabels;

                if (!data.posturePercentages)
                    throw new Error("Invalid API response structure");

                const posturePercentages = data.posturePercentages;
                const dates = Object.keys(posturePercentages).sort();

                const formattedData: any[] = [];
                dates.forEach((date) => {
                    const totals: Record<string, number> = {};
                    Object.keys(postureLabels).forEach((key) => {
                        const label = postureLabels[key];
                        totals[label] =
                            (totals[label] || 0) +
                            (posturePercentages[date]?.[key] || 0);
                    });

                    const total = Object.values(totals).reduce(
                        (sum, val) => sum + val,
                        0
                    );
                    Object.entries(totals).forEach(([label, value]) => {
                        const percentage =
                            total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                        formattedData.push({
                            date,
                            posture: label,
                            percentage: parseFloat(percentage),
                        });
                    });
                });

                setChartData(formattedData);
            } catch (err) {
                console.error("Error fetching posture data:", err);
                setError("Failed to load chart data.");
            }
        }
        fetchData();
    }, [useMerged]);

    const config = {
        data: chartData,
        xField: "date",
        yField: "percentage",
        colorField: "posture",
        percent: true,
        stack: true,
        interaction: {
            tooltip: {
                shared: true,
            },
        },
        tooltip: { channel: "y0", valueFormatter: ".0%" },
    };

    return (
        <div className="flex flex-col bg-white shadow-md rounded-md h-2/3 w-3/4 pb-14 pl-9">
            <h2 className="text-xl font-bold mb-4">
                Posture Distribution Over Time (Percentage)
            </h2>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl">
                    {useMerged
                        ? "Posture Distribution"
                        : "Detailed Posture Distribution"}
                </h2>
                <Button onClick={() => setUseMerged(!useMerged)}>
                    Switch to {useMerged ? "Detail" : "Original"} View
                </Button>
            </div>
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
