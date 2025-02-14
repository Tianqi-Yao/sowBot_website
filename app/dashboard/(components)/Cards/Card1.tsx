import { Card, Progress, Divider } from "antd";
import { PieChart } from "../Charts/PieChart";
import { Stethoscope } from "lucide-react";

const sampleData = {
    total: 400,
    bred: 90,
    inHeat: 120,
    preHeat: 80,
    open: 90,
    remove: 20,
};

export function Card1({ data = sampleData }) {
    return (
        <Card>
            <div className="flex justify-between">
                <div>
                    <div className="flex flex-row items-center">
                        <Stethoscope
                            className="mr-2"
                            size={40}
                            color="rgb(236, 51, 51)"
                            strokeWidth={2}
                        />
                        <p className="bold font-bold text-4xl">Heat Alearts</p>
                    </div>
                    <p className="bold font-bold text-lg text-zinc-500 mt-2.5">
                        Total Monitored Sows
                    </p>

                    <p className="bold text-6xl font-bold">{data.total}</p>
                </div>
                <div className=" max-w-xl">
                    <PieChart />
                </div>
            </div>
            {/* -------------------------------------------------------------------------- */
            /*                                     content                                     */
            /* -------------------------------------------------------------------------- */}
            <Divider style={{ borderColor: "rgb(168, 162, 154)" }} />
            <p className="bold text-lg">Bred</p>
            <Progress
                status="active"
                strokeColor="rgb(24, 144, 255)"
                percent={(data.bred / data.total) * 100}
                format={() => `${data.bred}/${data.total}`}
            />
            <p className="bold text-lg">In-Heat</p>
            <Progress
                status="active"
                strokeColor="rgb(74, 255, 24)"
                percent={(data.inHeat / data.total) * 100}
                format={() => `${data.inHeat}/${data.total}`}
            />
            <p className="bold text-lg">Pre-Heat</p>
            <Progress
                status="active"
                strokeColor="rgb(245, 153, 47)"
                percent={(data.preHeat / data.total) * 100}
                format={() => `${data.preHeat}/${data.total}`}
            />
            <p className="bold text-lg">Open</p>
            <Progress
                status="active"
                strokeColor="rgb(153, 45, 236)"
                percent={(data.open / data.total) * 100}
                format={() => `${data.open}/${data.total}`}
            />
            <p className="bold text-lg">Removed</p>
            <Progress
                status="active"
                strokeColor="rgb(230, 45, 70)"
                percent={(data.remove / data.total) * 100}
                format={() => `${data.remove}/${data.total}`}
            />
        </Card>
    );
}
