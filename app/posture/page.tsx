import PostureChartOld from "./(components)/PostureChart_old";
import PostureChart from "./(components)/PostureChart";

export default function PosturePage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Posture Page</h1>
            <div>
                <PostureChart />
            </div>
            <div>
                <PostureChartOld />
            </div>
        </div>
    );
}
