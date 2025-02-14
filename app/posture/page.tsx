import PostureChartOld from "./(components)/PostureChart_old";
import PostureChart from "./(components)/PostureChart";
import PostureChart4Class from "./(components)/PostureChart4Class";
import PostureChartSwitch from "./(components)/PostureChartSwitch";

export default function PosturePage() {
    return (
        <div className="p-6">
            {/* <h1 className="text-2xl font-bold mb-4 ">Posture Page</h1> */}
            <div>
                <PostureChartSwitch />
            </div>
            <div>
                <PostureChart />
            </div>
            <div>
                <PostureChart4Class />
            </div>
            
            <div>
                <PostureChartOld />
            </div>
        </div>
    );
}
