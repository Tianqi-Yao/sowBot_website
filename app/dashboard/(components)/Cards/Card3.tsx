import { Card, Row, Col } from "antd";
import { LaptopMinimalCheck,Router,Server, Bot } from "lucide-react";

const sampleData = {
    idle: 3,
    inServes: 8,
    offline: 1,
};

export function Card3({ data = sampleData }) {
    return (
        <Card className="h-full">
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <div className="flex flex-row items-center">
                        <LaptopMinimalCheck
                            className="mr-2"
                            size={40}
                            color="rgb(236, 51, 51)"
                            strokeWidth={2}
                        />
                        <p className="bold font-bold text-4xl">System status</p>
                    </div>
                </Col>
                <Col span={24}>
                    <Card className="h-full">
                        <div className="flex flex-row items-center">
                            <Bot
                                className="mr-2"
                                size={26}
                                color="rgb(236, 51, 51)"
                                strokeWidth={2}
                            />
                            <p className="bold text-lg">Devices</p>
                        </div>
                        <p>All Online</p>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card className="h-full">
                        <div className="flex flex-row items-center">
                            <Server
                                className="mr-2"
                                size={26}
                                color="rgb(236, 51, 51)"
                                strokeWidth={2}
                            />
                            <p className="bold text-lg">Server</p>
                        </div>
                        <p>All Online</p>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card className="h-full">
                        <div className="flex flex-row items-center">
                            <Router
                                className="mr-2"
                                size={26}
                                color="rgb(236, 51, 51)"
                                strokeWidth={2}
                            />
                            <p className="bold text-lg">Router</p>
                        </div>
                        <p>All Online</p>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}
