import { Card, Row, Col } from "antd";
import { Bot, CirclePause, CirclePlay, BotOff   } from "lucide-react";

const sampleData = {
    idle: 3,
    inServes: 8,
    offline: 1,
};

export function Card2({ data = sampleData }) {
    return (
        <Card className="h-full">
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <div className="flex flex-row items-center">
                        <Bot
                            className="mr-2"
                            size={40}
                            color="rgb(236, 51, 51)"
                            strokeWidth={2}
                        />
                        <p className="bold font-bold text-4xl">
                            SowBot Devices
                        </p>
                    </div>
                </Col>
                <Col span={24}>
                    <Card className="h-full">
                        <div className="flex flex-row items-center">
                            <CirclePause
                                className="mr-2"
                                size={26}
                                color="rgb(236, 51, 51)"
                                strokeWidth={2}
                            />
                            <p className="bold text-lg">Idle</p>
                        </div>
                        <p>{data.idle}</p>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card className="h-full">
                        <div className="flex flex-row items-center">
                            <CirclePlay
                                className="mr-2"
                                size={26}
                                color="rgb(236, 51, 51)"
                                strokeWidth={2}
                            />
                            <p className="bold text-lg">In-Serves</p>
                        </div>
                        <p>{data.inServes}</p>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card className="h-full">
                        <div className="flex flex-row items-center">
                            <BotOff 
                                className="mr-2"
                                size={26}
                                color="rgb(236, 51, 51)"
                                strokeWidth={2}
                            />
                            <p className="bold text-lg">Off-Line</p>
                        </div>
                        <p>{data.offline}</p>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}
