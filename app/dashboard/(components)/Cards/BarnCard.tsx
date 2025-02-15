import { Card, Row, Col, Divider } from "antd";
import { House } from "lucide-react";
import { PieChart } from "../Charts/PieChart";

const sampleDataTotal = {
    value: 400,
};

const sampleData = [
    { type: "Bred", value: 90 },
    { type: "In-Heat", value: 120 },
    { type: "Pre-Heat", value: 80 },
    { type: "Open", value: 90 },
    { type: "Remove", value: 20 },
];

export function BarnCard({
    data = sampleData,
    total = sampleDataTotal,
    title = "Barn X",
}) {
    return (
        <Card>
            <div className="flex flex-row items-center">
                <House
                    className="mr-2"
                    size={40}
                    color="rgb(236, 51, 51)"
                    strokeWidth={2}
                />
                <p className="bold font-bold text-4xl">{title}</p>
            </div>
            <p className="bold font-bold text-lg text-zinc-500 mt-2.5">
                Monitored Sows
            </p>
            <p className="bold text-6xl font-bold">{data.total}</p>
            {/* <Divider style={{ borderColor: "rgb(168, 162, 154)" }} /> */}
            <Row gutter={[16, 24]}>
                <Col span={12}>
                    <PieChart data={data} total={total} />
                </Col>
                <Col span={12}>
                    <Row gutter={[4, 8]}>
                        <Col span={16} className="text-2xl font-semibold ">Total Sows</Col>
                        <Col span={8} className="text-2xl font-semibold ">Bred</Col>
                        <Col span={16} className="text-2xl font-semibold"><p className="pl-10">{total.value}</p></Col>
                        <Col span={8} className="text-2xl font-semibold ">
                            <p className="pl-2">{data.find((item) => item.type === "Bred").value}</p>
                        </Col>
                        <Divider
                            style={{ borderColor: "rgb(168, 162, 154)" }}
                        />
                        <Col span={12} className="text-xl font-semibold flex items-center justify-center">In-Heat</Col>
                        <Col span={12} className="text-xl font-semibold flex items-center justify-center">Pre-Heat</Col>
                        <Col span={12} className="text-xl font-semibold flex items-center justify-center">
                            {data.find((item) => item.type === "In-Heat").value}
                        </Col>
                        <Col span={12} className="text-xl font-semibold flex items-center justify-center ">
                            {
                                data.find((item) => item.type === "Pre-Heat")
                                    .value
                            }
                        </Col>
                        <Col span={12} className="text-xl font-semibold flex items-center justify-center">Open</Col>
                        <Col span={12} className="text-xl font-semibold flex items-center justify-center">Removed</Col>
                        <Col span={12} className="text-xl font-semibold flex items-center justify-center">
                            {data.find((item) => item.type === "Open").value}
                        </Col>
                        <Col span={12} className="text-xl font-semibold flex items-center justify-center">
                            {data.find((item) => item.type === "Remove").value}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}
